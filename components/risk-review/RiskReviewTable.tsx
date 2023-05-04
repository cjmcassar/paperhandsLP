import React, { useContext, useEffect, useRef, useState } from "react";
import { AssetDataContext } from "../../contexts/assetDataContext";
import { StorageDataContext } from "contexts/storageDataContext";

import { auth, db } from "../../utils/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  Timestamp,
  addDoc
} from "firebase/firestore";

import { DataTable } from "simple-datatables";
import { format, fromUnixTime } from "date-fns";
import { initializeTable, populateTable } from "./tableHelpers";

import styles from "./RiskReviewTable.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface UserAsset {
  uid: string;
  asset_name: string;
  asset_symbol: string;
  total_amount: number;
  storage_type: string;
  transaction_date: string;
  transaction_type: "buy" | "sell";
  id: string;
}

function RiskReviewTable() {
  const [user] = useAuthState(auth);
  const assetData = useContext(AssetDataContext);
  const storageData = useContext(StorageDataContext);
  const tableRef = useRef<HTMLTableElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [userAssets, setUserAssets] = useState<UserAsset[]>([]);
  const [transactionType, settransactionType] = useState<"buy" | "sell">("buy");

  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [editPortfolioData, setEditPortfolioData] = useState({
    id: "",
    asset_symbol: "",
    asset_name: "",
    storage_type: "",
    total_amount: 0,
    transaction_date: ""
  });
  const [buySellData, setBuySellData] = useState({
    id: "",
    asset_symbol: "",
    asset_name: "",
    storage_type: "",
    amount: 0
  });
  const [deletePortfolioData, setDeletePortfolioData] = useState(null);

  const [tableInitialized, setTableInitialized] = useState(false);
  const [dataTable, setDataTable] = useState<DataTable | null>(null);

  useEffect(() => {
    if (user) {
      const unsubscribe = fetchUserAssets();

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [user]);

  const fetchUserAssets = () => {
    if (!user) return;

    const userAssetsQuery = query(
      collection(db, "user_assets"),
      where("uid", "==", user.uid)
    );

    const unsubscribe = onSnapshot(userAssetsQuery, querySnapshot => {
      const userAssets: UserAsset[] = [];
      querySnapshot.forEach(doc => {
        const docData = doc.data();
        const transactionDateSeconds = docData.transaction_date?.seconds;

        const data = {
          ...docData,
          transaction_date: transactionDateSeconds
            ? format(fromUnixTime(transactionDateSeconds), "yyyy-MM-dd")
            : "",
          id: doc.id
        };
        userAssets.push(data as UserAsset);
      });
      setUserAssets(userAssets);
    });

    return unsubscribe;
  };

  useEffect(() => {
    if (!tableInitialized) {
      initializeTable(
        tableRef,
        setDataTable,
        setTableInitialized,
        DataTable,
        tableInitialized
      );
    } else {
      populateTable(
        dataTable,
        userAssets,
        assetData,
        setShowEditForm,
        setShowDeleteForm,
        setEditPortfolioData,
        setDeletePortfolioData,
        setBuySellData
      );
    }

    return () => {
      if (dataTable) {
        dataTable.destroy();
      }
    };
  }, [dataTable, userAssets, assetData]);

  async function logTransaction(transactionData) {
    const transactionsRef = collection(
      db,
      "user_assets",
      editPortfolioData?.id,
      "transactions"
    );

    const transactionDoc = {
      transaction_amount: transactionData.transaction_amount,
      transaction_price: transactionData.transaction_price,
      transaction_type: transactionData.transaction_type,
      transaction_date: transactionData.transaction_date,
      uid: transactionData.uid
    };

    try {
      await addDoc(transactionsRef, transactionDoc);
      console.log("Transaction successfully logged!");
    } catch (error) {
      console.error("Error logging transaction: ", error);
    }
  }

  const assetUpdate = async e => {
    e.preventDefault();

    const docRef = doc(db, "user_assets", editPortfolioData?.id);

    let newAmount = editPortfolioData?.total_amount;

    if (newAmount < 0) {
      console.error("Error: New amount is negative.");
      alert("Error: New amount is negative. Please enter the correct amount");
      return;
    }

    updateDoc(docRef, {
      total_amount: newAmount,
      storage_type: editPortfolioData?.storage_type,
      transaction_date: Timestamp.fromDate(new Date())
    })
      .then(() => {
        console.log("Document successfully updated!");

        setShowEditForm(false);
        setEditPortfolioData(null);
      })
      .catch(error => {
        console.error("Error updating document: ", error);
      });
  };

  const assetDelete = () => {
    setLoading(true);
    const docRef = doc(
      db,
      "user_assets",
      deletePortfolioData ?? editPortfolioData?.id
    );
    deleteDoc(docRef)
      .then(() => {
        // if deletes from delete form
        setShowDeleteForm(false);

        // if deletes from edit form
        setShowEditForm(false);

        console.log("Document successfully deleted!");
        setLoading(false);
      })
      .catch(error => {
        console.error("Error removing document: ", error);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="py-5">
        <div className="flex gap-6 md:text-lg sm:text-xs text-white">
          <div className="flex gap-2 items-center">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: "#FF6262" }}
            ></div>
            <div>High Risk</div>
          </div>
          <div className="flex gap-2 items-center">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: "#FFF962" }}
            ></div>
            <div>Medium Risk</div>
          </div>
          <div className="flex gap-2 items-center">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: "#62FF97" }}
            ></div>
            <div>Low Risk</div>
          </div>
          <div className="flex gap-2 items-center">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: "#7B62FF" }}
            ></div>
            <div>Historically Safe</div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto  tour-step-2">
        <table
          ref={tableRef}
          className={`${styles.riskReviewTable} min-w-full divide-y divide-gray-200 sm:text-sm text-white`}
        >
          <thead
            className={`${styles.riskReviewTable} text-sm uppercase font-medium text-white`}
          >
            <tr>
              <th className="px-6 py-3 text-left text-xs 2xl:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Asset
              </th>
              <th>Symbol</th>
              <th>Amount</th>
              <th>Value</th>
              <th>Storage</th>
              <th>Risk</th>
              <th>Risk Review</th>
              <th>Actions</th>
            </tr>
          </thead>
        </table>
      </div>
      <div>
        {showEditForm && (
          <div className={`${styles.showForm} z-50 `}>
            <div className="bg-gray-800 p-8 rounded-lg w-5/12">
              <div className="flex justify-between items-center gap-5 mb-4">
                <h3 className="text-xl text-white font-medium">
                  Update Crypto
                </h3>
                <button
                  className="bg-danger text-white px-4 py-2 rounded-lg"
                  onClick={assetDelete}
                >
                  {loading ? (
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="fa-spin text-white"
                    />
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
              {editPortfolioData && (
                <form onSubmit={assetUpdate}>
                  <div className="mb-4">
                    <label
                      htmlFor="asset-select"
                      className="block text-white font-medium mb-2"
                    >
                      Asset
                    </label>
                    {/* <select
                      disabled={true}
                      id="asset-select"
                      name="asset"
                      className="bg-LightGrey text-white w-full border rounded px-3 py-2"
                      value={editPortfolioData.asset_name}
                    >
                      <option value={editPortfolioData?.asset_name}>
                        {editPortfolioData?.asset_name}
                      </option>
                    </select> */}
                    <input
                      type="text"
                      value={editPortfolioData.asset_name}
                      disabled={true}
                      className="bg-LightGrey text-gray-400 w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="asset-select"
                      className="block text-white font-medium mb-2"
                    >
                      Storage Type
                    </label>
                    <select
                      id="storage-select"
                      name="storageType"
                      className="bg-LightGrey text-white w-full border rounded px-3 py-2"
                      value={editPortfolioData.storage_type}
                      onChange={e => {
                        setEditPortfolioData({
                          ...editPortfolioData,
                          storage_type: e.target.value
                        });
                      }}
                    >
                      {storageData?.storageData?.map(storage => (
                        <option
                          key={storage.Storage_Method}
                          value={storage.Storage_Method}
                        >
                          {storage.Storage_Method} ({storage.Rating})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="amount-input"
                      className="block text-white font-medium mb-2"
                    >
                      Amount
                    </label>
                    <input
                      type="number"
                      id="amount-input"
                      name="amount"
                      value={editPortfolioData.total_amount}
                      onChange={e => {
                        setEditPortfolioData({
                          ...editPortfolioData,
                          total_amount: parseFloat(e.target.value)
                        });
                      }}
                      className="bg-LightGrey text-white w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="date-picker"
                      className="block text-white font-medium mb-2"
                    >
                      Last Transaction/Edit Date
                    </label>
                    <input
                      disabled={true}
                      type="date"
                      id="date-picker"
                      value={editPortfolioData.transaction_date}
                      name="transactionDate"
                      className="bg-LightGrey text-gray-400 w-full border rounded px-3 py-2"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" className={`${styles.addButton}`}>
                      Update
                    </button>
                    <button
                      type="button"
                      className={`${styles.cancelButton} hover:bg-opacity-80`}
                      onClick={() => setShowEditForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
      <div>
        {showDeleteForm && (
          <div className={`${styles.showForm} z-50 `}>
            <div className="bg-gray-800 p-8 rounded-lg w-5/12">
              <div className="flex justify-between items-center gap-5">
                <h3 className="text-xl text-white font-medium">
                  Are you sure?
                </h3>
                <div>
                  <button
                    className="bg-danger text-white text-center px-4 py-2 rounded-lg"
                    onClick={assetDelete}
                  >
                    {loading ? (
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className="fa-spin text-white"
                      />
                    ) : (
                      "Delete"
                    )}
                  </button>
                  <button
                    type="button"
                    className={`${styles.cancelButton} hover:bg-opacity-80`}
                    onClick={() => setShowDeleteForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default RiskReviewTable;
