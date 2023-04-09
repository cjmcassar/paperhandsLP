import React, { useState } from "react";
import Plus from "../../../public/img/dashboard/icons/plus.svg";
import Pen from "../../../public/img/dashboard/icons/pen.svg";
import Question from "../../../public/img/dashboard/icons/question.svg";
import styles from "./RiskReviewHeader.module.css";
import useSWR from "swr";
import FAQModal from "../FAQModal";
import { doc, setDoc } from "firebase/firestore";
import { auth, userAssetsRef } from "../../../utils/firebaseClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

type Asset = {
  Asset: string;
  Symbol: string;
  Mcap: string;
  Price: string;
};

const fetcher = (url: string) => fetch(url).then(res => res.json());

function RiskReviewHeader() {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);

  const openFAQModal = () => setIsFAQModalOpen(true);
  const closeFAQModal = () => setIsFAQModalOpen(false);

  const { data: assetData, error } = useSWR("/api/assets", fetcher);

  const handleAddNewCrypto = () => setShowForm(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let amount = (
      e.currentTarget.elements.namedItem("amount") as HTMLInputElement
    ).value;
    let purchaseDate = (
      e.currentTarget.elements.namedItem("purchaseDate") as HTMLInputElement
    ).value;

    let value =
      Number(amount) * Number(selectedAsset?.Price?.replace(/[^0-9.-]+/g, ""));

    if (!selectedAsset) return;

    try {
      setLoading(true);

      const user = auth.currentUser;
      if (!user) {
        console.log("User is not authenticated.");
        return;
      }

      const uid = user.uid;

      await setDoc(doc(userAssetsRef), {
        amount: amount,
        asset_name: selectedAsset.Asset,
        asset_symbol: selectedAsset.Symbol,
        purchase_date: new Date(purchaseDate),
        uid: uid,
        value: value
      });

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
    const asset = (assetData.cache || assetData.data).find(
      (asset: Asset) => asset.Mcap === value
    );
    setSelectedAsset(asset);
  };

  const showLoading = !assetData || error;

  // <-----------ATTENTION------------>
  // <-----------ATTENTION------------>

  // If the data is cached in redis, it will return data.cache, otherwise it will return data.data

  // <-----------ATTENTION------------>
  // <-----------ATTENTION------------>

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
        <div className={`${styles.showForm}`}>
          <div className="bg-white p-8 rounded-lg">
            <h3 className="text-xl font-medium mb-4">Add New Crypto</h3>
            <form onSubmit={handleSubmit}>
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
                  <option value="">Select an asset</option>
                  {(assetData?.cache || assetData?.data)?.map(asset => (
                    <option key={asset.Mcap} value={asset.Mcap}>
                      {asset.Asset} ({asset.Symbol})
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
