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
import { initializeTable, populateTable } from "./tableHelpers";
import styles from "./RiskReviewTable.module.css";

import TableHeader from "./TableHeader";
import BuySellForm from "./BuySellForm";
import EditForm from "./EditForm";
import DeleteForm from "./DeleteForm";

type TransactionData = {
  transaction_amount: number;
  transaction_price: string;
  transaction_type: string;
  transaction_date: Date;
  transaction_parent_id: string;
  uid: string;
};

type PortfolioData = {
  id: string;
  asset_symbol: string;
  asset_name: string;
  storage_type: string;
  total_amount: number;
  transaction_date: Timestamp;
};

type BuySellData = {
  id: string;
  asset_symbol: string;
  asset_name: string;
  storage_type: string;
  amount: number;
  transaction_date: string;
};

function RiskReviewTable(): JSX.Element {
  const [user] = useAuthState(auth);
  const assetData = useContext(AssetDataContext);
  const storageData = useContext(StorageDataContext);
  const [userAssetsData] = useContext(UserAssetsDataContext);
  const userAssets = userAssetsData?.userAssets;

  const tableRef = useRef<HTMLTableElement | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [transactionType, setTransactionType] = useState<"buy" | "sell">("buy");

  const [showBuySellForm, setShowBuySellForm] = useState<boolean>(false);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [showDeleteForm, setShowDeleteForm] = useState<boolean>(false);

  const [buySellData, setBuySellData] = useState<BuySellData>({
    id: "",
    asset_symbol: "",
    asset_name: "",
    storage_type: "",
    amount: 0,
    transaction_date: ""
  });
  const [editPortfolioData, setEditPortfolioData] = useState<PortfolioData>({
    id: "",
    asset_symbol: "",
    asset_name: "",
    storage_type: "",
    total_amount: 0,
    transaction_date: Timestamp.now()
  });

  const [deletePortfolioData, setDeletePortfolioData] = useState<string | null>(
    null
  );

  const [tableInitialized, setTableInitialized] = useState<boolean>(false);
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

  async function logTransaction(
    transactionData: TransactionData
  ): Promise<void> {
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
      parent_id: transactionData.transaction_parent_id,
      uid: transactionData.uid
    };

    try {
      await addDoc(transactionsRef, transactionDoc);
      console.log("Transaction successfully logged!");
    } catch (error) {
      console.error("Error logging transaction: ", error);
    }
  }

  const handleAssetBuySell = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
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
          transaction_parent_id: buySellData.id,
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

  const handleAssetUpdate = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
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

  const handleAssetDelete = async () => {
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
          <EditForm
            editPortfolioData={editPortfolioData}
            storageData={storageData}
            loading={loading}
            onSubmit={handleAssetUpdate}
            onDelete={handleAssetDelete}
            onCancel={() => setShowEditForm(false)}
            onStorageTypeChange={storage_type =>
              setEditPortfolioData({ ...editPortfolioData, storage_type })
            }
            onAmountChange={total_amount =>
              setEditPortfolioData({ ...editPortfolioData, total_amount })
            }
          />
        )}
      </div>

      <div>
        {showDeleteForm && (
          <DeleteForm
            loading={loading}
            onDelete={handleAssetDelete}
            onCancel={() => setShowDeleteForm(false)}
          />
        )}
      </div>
    </>
  );
}

export default RiskReviewTable;
