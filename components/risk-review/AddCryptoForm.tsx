import React, { useContext, useEffect, useState } from "react";
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
import { AssetDataContext } from "../../contexts/apiAssetDataContext";
import { StorageDataContext } from "../../contexts/apiStorageDataContext";
import { parseISO } from "date-fns";

import styles from "./RiskReviewHeader.module.css";

interface Asset {
  Asset: string;
  Symbol: string;
  Mcap: string;
  Price: string;
}

interface UserAsset {
  total_amount: number;
  asset_name: string;
  asset_symbol: string;
  storage_type: string;
  transaction_date: Date;
  uid: string;
}

interface AddCryptoFormProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddCryptoForm: React.FC<AddCryptoFormProps> = ({ setShowForm }) => {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [selectedStorageType, setSelectedStorageType] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const assetData = useContext(AssetDataContext);
  const storageData = useContext(StorageDataContext);

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted or not

    return () => {
      isMounted = false; // Set the flag to indicate unmounting
    };
  }, []);

  const handleAssetSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const assetInputAmount = parseFloat(
      (e.currentTarget.elements.namedItem("amount") as HTMLInputElement).value
    );
    const dateString = (
      e.currentTarget.elements.namedItem("transactionDate") as HTMLInputElement
    ).value;

    const transactionDate = parseISO(dateString);

    if (!selectedAsset) return;

    try {
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
      let assetDocRef: any;
      if (!querySnapshot.empty) {
        const assetDoc = querySnapshot.docs[0];
        const assetData = assetDoc.data() as UserAsset;

        const updatedAmount = assetInputAmount + assetData.total_amount;
        await updateDoc(doc(db, "user_assets", assetDoc.id), {
          total_amount: updatedAmount
        });

        assetDocRef = doc(db, "user_assets", assetDoc.id);
      } else {
        assetDocRef = await addDoc(collection(db, "user_assets"), {
          total_amount: assetInputAmount,
          asset_name: selectedAsset.Asset,
          asset_symbol: selectedAsset.Symbol,
          storage_type: selectedStorageType,
          uid: uid,
          transaction_date: transactionDate
        });
      }
      await addDoc(collection(assetDocRef, "transactions"), {
        transaction_amount: assetInputAmount,
        transaction_price: selectedAsset.Price,
        transaction_type: "buy",
        transaction_date: transactionDate,
        parent_id: assetDocRef.id,
        uid: uid
      });

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
    const asset = assetData.assetData?.find(asset => asset.Mcap === value);
    setSelectedAsset(asset);
  };

  const handleStorageTypeSelect = ({
    target: { value }
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStorageType(value);
  };

  return (
    <div className={`${styles.showForm} z-50`}>
      <div className="bg-gray-800 p-8 rounded-lg  w-5/12">
        <h3 className="text-xl text-white font-medium mb-4">Add New Crypto</h3>
        <form onSubmit={handleAssetSubmit}>
          <div className="mb-4">
            <label
              htmlFor="asset-select"
              className="block text-white font-medium mb-2"
            >
              Asset
            </label>
            <select
              onChange={handleAssetSelect}
              id="asset-select"
              name="asset"
              className="bg-LightGrey text-white w-full border rounded px-3 py-2"
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
              className="bg-LightGrey text-white w-full border rounded px-3 py-2"
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
              className="block text-white font-medium mb-2"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount-input"
              name="amount"
              defaultValue="0"
              style={{ colorScheme: "dark" }}
              className="bg-LightGrey text-white w-full border rounded px-3 py-2"
              step="any"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="date-picker"
              className="block text-white font-medium mb-2"
            >
              Transaction Date
            </label>
            <input
              type="date"
              id="date-picker"
              style={{ colorScheme: "dark" }}
              name="transactionDate"
              className="bg-LightGrey text-white w-full border rounded px-3 py-2"
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
                "Add"
              )}
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
  );
};

export default AddCryptoForm;
