import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where
} from "firebase/firestore";
import { auth, db } from "../../utils/firebaseClient";
import { AssetDataContext } from "../../contexts/assetDataContext";
import { StorageDataContext } from "../../contexts/storageDataContext";

import Plus from "../../public/img/dashboard/icons/plus.svg";
import Pen from "../../public/img/dashboard/icons/pen.svg";
import Question from "../../public/img/dashboard/icons/question.svg";
import styles from "./RiskReviewHeader.module.css";
import FAQModal from "../dashboard/FAQModal";

type Asset = {
  Asset: string;
  Symbol: string;
  Mcap: string;
  Price: string;
};

type UserAsset = {
  amount: string;
  asset_name: string;
  asset_symbol: string;
  storage_type: string;
  purchase_date: Date;
  uid: string;
};

function RiskReviewHeader() {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);
  const [selectedStorageType, setSelectedStorageType] = useState("");

  const openFAQModal = () => setIsFAQModalOpen(true);
  const closeFAQModal = () => setIsFAQModalOpen(false);

  const handleAddNewCrypto = () => setShowForm(true);

  const assetData = useContext(AssetDataContext);
  const storageData = useContext(StorageDataContext);

  const handleAssetSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let amount = (
      e.currentTarget.elements.namedItem("amount") as HTMLInputElement
    ).value;
    let purchaseDate = (
      e.currentTarget.elements.namedItem("purchaseDate") as HTMLInputElement
    ).value;

    if (!selectedAsset) return;

    try {
      setLoading(true);

      const user = auth.currentUser;
      if (!user) {
        console.log("User is not authenticated.");
        return;
      }

      const uid = user.uid;
      const userAssetsQuery = query(
        collection(db, "user_assets"),
        where("uid", "==", uid),
        where("asset_symbol", "==", selectedAsset.Symbol),
        where("storage_type", "==", selectedStorageType)
      );

      const querySnapshot = await getDocs(userAssetsQuery);
      if (!querySnapshot.empty) {
        // Asset is present with the same storage type
        const assetDoc = querySnapshot.docs[0];
        const assetData = assetDoc.data() as UserAsset;

        // Update the amount
        const updatedAmount = parseFloat(amount) + parseFloat(assetData.amount);
        await updateDoc(doc(db, "user_assets", assetDoc.id), {
          amount: updatedAmount.toString()
        });
      } else {
        // Asset is not present or has a different storage type, add a new document
        await addDoc(collection(db, "user_assets"), {
          amount: amount,
          asset_name: selectedAsset.Asset,
          asset_symbol: selectedAsset.Symbol,
          storage_type: selectedStorageType,
          purchase_date: new Date(purchaseDate),
          uid: uid
        });
      }

      amount = "";
      purchaseDate = "";
      setSelectedAsset(null);
      setShowForm(false);
      console.log("Document successfully written!");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAssetSelect = ({
    target: { value }
  }: React.ChangeEvent<HTMLSelectElement>) => {
    const asset = assetData.assetData?.find(
      (asset: Asset) => asset.Mcap === value
    );
    setSelectedAsset(asset);
    console.log("Selected Asset: ", asset);
  };

  const handleStorageTypeSelect = ({
    target: { value }
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStorageType(value);
  };

  const showLoading = !assetData.assetData;

  return (
    <div className="flex items-center py-5 gap-8">
      <div>
        <h2
          className={`${styles.latestOperationsTitle} ${
            showLoading ? "opacity-50" : ""
          }`}
        >
          Risk Review
          {showLoading && (
            <FontAwesomeIcon
              icon={faSpinner}
              className="fa-spin ml-4 text-gray-500"
            />
          )}
        </h2>
      </div>
      <div className={`${styles.buttonGroup}`}>
        <button
          className={`${styles.customButton} hover:border-primary`}
          onClick={handleAddNewCrypto}
        >
          <Plus width="22" height="22" />
          <span className="text-xs">Add New Crypto</span>
        </button>

        <button className={`${styles.customButton} hover:border-primary`}>
          <Pen width="22" height="22" />
          <span className="text-xs">Edit Portfolio</span>
        </button>
        <button
          onClick={openFAQModal}
          className={`${styles.customButton} hover:border-primary`}
        >
          <Question width="22" height="22" />
          <span className="text-xs">Help & FAQs</span>
        </button>
        <FAQModal isOpen={isFAQModalOpen} onClose={closeFAQModal} />
      </div>

      {showForm && (
        <div className={`${styles.showForm} z-50`}>
          <div className="bg-white p-8 rounded-lg">
            <h3 className="text-xl font-medium mb-4">Add New Crypto</h3>
            <form onSubmit={handleAssetSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="asset-select"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Asset
                </label>
                <select
                  onChange={handleAssetSelect}
                  id="asset-select"
                  name="asset"
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Asset</option>
                  {assetData.assetData?.map(asset => (
                    <option key={asset.Mcap} value={asset.Mcap}>
                      {asset.Asset} ({asset.Symbol})
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <select
                  onChange={handleStorageTypeSelect}
                  id="storage-select"
                  name="storageType"
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Storage Type</option>
                  {storageData.storageData?.map(storage => (
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
                  className="block text-gray-700 font-medium mb-2"
                >
                  Amount Owned
                </label>
                <input
                  type="number"
                  id="amount-input"
                  name="amount"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="date-picker"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Purchase Date
                </label>
                <input
                  type="date"
                  id="date-picker"
                  name="purchaseDate"
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="flex justify-end">
                <button type="submit" className={`${styles.addButton}`}>
                  Add
                </button>
                <button
                  type="button"
                  className={`${styles.cancelButton} hover:bg-opacity-80`}
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default RiskReviewHeader;
