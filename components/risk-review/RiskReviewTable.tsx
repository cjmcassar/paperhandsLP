import React, { useContext, useEffect, useRef, useState } from "react";
import { AssetDataContext } from "../../contexts/apiAssetDataContext";
import { StorageDataContext } from "contexts/apiStorageDataContext";
import { UserAssetsDataContext } from "contexts/userAssetDataContext";

import { auth, db } from "../../utils/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  Timestamp,
  addDoc,
  getDocs,
  writeBatch
} from "firebase/firestore";

import { DataTable } from "simple-datatables";
import { format, fromUnixTime } from "date-fns";
import { initializeTable, populateTable } from "./tableHelpers";

import styles from "./RiskReviewTable.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import TableHeader from "./TableHeader";
import BuySellForm from "./BuySellForm";

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
  const [userAssetsData] = useContext(UserAssetsDataContext);
  const userAssets = userAssetsData?.userAssets;

  const tableRef = useRef<HTMLTableElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [transactionType, setTransactionType] = useState<"buy" | "sell">("buy");

  const [showBuySellForm, setShowBuySellForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const [buySellData, setBuySellData] = useState({
    id: "",
    asset_symbol: "",
    asset_name: "",
    storage_type: "",
    amount: 0,
    transaction_date: ""
  });
  const [editPortfolioData, setEditPortfolioData] = useState({
    id: "",
    asset_symbol: "",
    asset_name: "",
    storage_type: "",
    total_amount: 0,
    transaction_date: ""
  });

  const [deletePortfolioData, setDeletePortfolioData] = useState(null);

  const [tableInitialized, setTableInitialized] = useState(false);
  const [dataTable, setDataTable] = useState<DataTable | null>(null);

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
        setShowBuySellForm,
        setShowEditForm,
        setShowDeleteForm,
        setBuySellData,
        setEditPortfolioData,
        setDeletePortfolioData
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
      buySellData?.id,
      "transactions"
    );

    const transactionDoc = {
      transaction_amount: transactionData.transaction_amount,
      transaction_price: transactionData.transaction_price,
      transaction_type: transactionData.transaction_type,
      transaction_date: transactionData.transaction_date,
      parent_id: buySellData?.id,
      uid: transactionData.uid
    };

    try {
      await addDoc(transactionsRef, transactionDoc);
      console.log("Transaction successfully logged!");
    } catch (error) {
      console.error("Error logging transaction: ", error);
    }
  }

  const handleAssetBuySell = async e => {
    e.preventDefault();
    setLoading(true);

    const docRef = doc(db, "user_assets", buySellData?.id);
    const existingAssetData = (await getDoc(docRef)).data();

    if (!existingAssetData) return;

    const totalAmount = parseFloat(existingAssetData?.total_amount);
    if (isNaN(totalAmount)) {
      console.error("Error: Amount is not a valid number.");
      return;
    }

    const currentAsset = assetData.assetData.find(
      asset => asset.Symbol === buySellData?.asset_symbol
    );
    if (!currentAsset) {
      console.error("Error: Asset not found in assetData context.");
      return;
    }

    const currentPrice = currentAsset.Price;

    const transactionPrice = currentPrice;
    if (transactionPrice === undefined) {
      console.error("Error: Transaction price is undefined.");
      return;
    }

    let transactionAmount = buySellData?.amount;

    let newAmount = transactionAmount;
    if (transactionType === "sell") {
      newAmount = totalAmount - newAmount;
    } else {
      newAmount = totalAmount + newAmount;
    }

    if (newAmount < 0) {
      console.error("Error: New amount is negative.");
      alert(
        "Error: New amount is negative. Please check the transaction amount."
      );
      return;
    }

    updateDoc(docRef, {
      total_amount: newAmount,
      transaction_date: Timestamp.fromDate(
        new Date(buySellData.transaction_date)
      )
    })
      .then(() => {
        console.log("Document successfully updated!");

        const transactionData = {
          transaction_amount: transactionAmount,
          transaction_price: transactionPrice,
          transaction_type: transactionType,
          transaction_date: new Date(),
          uid: user.uid
        };

        logTransaction(transactionData);

        setLoading(false);
        setShowBuySellForm(false);
        setBuySellData(null);
      })
      .catch(error => {
        console.error("Error updating document: ", error);
        setLoading(false);
      });
  };

  const assetUpdate = async e => {
    e.preventDefault();
    setLoading(true);

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

        setLoading(false);
        setShowEditForm(false);
        setEditPortfolioData(null);
      })
      .catch(error => {
        console.error("Error updating document: ", error);
        setLoading(false);
      });
  };

  const assetDelete = async () => {
    setLoading(true);
    const assetId = deletePortfolioData ?? editPortfolioData?.id;
    if (!assetId) {
      console.log("Asset ID not provided.");
      return;
    }

    const docRef = doc(db, "user_assets", assetId);

    const transactionsCollectionRef = collection(docRef, "transactions");
    const transactionsSnapshot = await getDocs(transactionsCollectionRef);
    const batch = writeBatch(db);
    transactionsSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    deleteDoc(docRef)
      .then(() => {
        setShowDeleteForm(false);
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
          <TableHeader />
        </table>
      </div>

      <div>
        {showBuySellForm && (
          <BuySellForm
            buySellData={buySellData}
            transactionType={transactionType}
            storageData={storageData}
            loading={loading}
            onSubmit={handleAssetBuySell}
            onCancel={() => setShowBuySellForm(false)}
            onTransactionTypeChange={setTransactionType}
            onAmountChange={amount =>
              setBuySellData({ ...buySellData, amount })
            }
            onTransactionDateChange={transaction_date =>
              setBuySellData({ ...buySellData, transaction_date })
            }
          />
        )}
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
                      style={{ colorScheme: "dark" }}
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
                    <button
                      type="submit"
                      disabled={loading}
                      className={`${styles.addButton}`}
                    >
                      {loading ? (
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="fa-spin text-white"
                        />
                      ) : (
                        "Update"
                      )}
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
              <div className="flex flex-col lg:flex-row justify-between items-center gap-5">
                <h3 className="text-xl text-white font-medium">
                  Are you sure?
                </h3>
                <div className="flex">
                  <button
                    className="bg-danger text-white text-center px-4 py-2 rounded-lg"
                    onClick={assetDelete}
                    disabled={loading}
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
