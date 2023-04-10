import React, { useState } from "react";
import Plus from "../../../public/img/dashboard/icons/plus.svg";
import Pen from "../../../public/img/dashboard/icons/pen.svg";
import Question from "../../../public/img/dashboard/icons/question.svg";
import styles from "./RiskReviewHeader.module.css";
import useSWR from "swr";
import FAQModal from "../FAQModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const fetcher = url => fetch(url).then(res => res.json());

function RiskReviewHeader() {
  const [showForm, setShowForm] = useState(false);

  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);

  const openFAQModal = () => setIsFAQModalOpen(true);
  const closeFAQModal = () => setIsFAQModalOpen(false);

  const { data: assetData, error } = useSWR("/api/assets", fetcher);

  const handleAddNewCrypto = () => {
    setShowForm(true);
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
            <form>
              <div className="mb-4">
                <label
                  htmlFor="asset-select"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Asset
                </label>
                <select
                  id="asset-select"
                  name="asset"
                  className="w-full border rounded px-3 py-2"
                >
                  {/*
								<-----------ATTENTION------------>
								<-----------ATTENTION------------>

								If the data is cached in redis, it will return data.cache, otherwise it will return data.data

								<-----------ATTENTION------------>
								<-----------ATTENTION------------> 
									*/}
                  {(assetData && assetData.cache) ||
                  (assetData && assetData.data)
                    ? (assetData.cache || assetData.data).map(asset => (
                        <option key={asset.Mcap} value={asset.Mcap}>
                          {asset.Asset} ({asset.Symbol})
                        </option>
                      ))
                    : null}
                </select>
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
