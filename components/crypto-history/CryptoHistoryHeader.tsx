import React, { useContext, useState } from "react";

import Plus from "../../public/img/dashboard/icons/plus.svg";
import Question from "../../public/img/dashboard/icons/question.svg";

import styles from "./CryptoHistoryHeader.module.css";
import FAQModal from "../dashboard/FAQModal";
import { AssetDataContext } from "../../contexts/assetDataContext";

function CryptoHistoryHeader() {
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);

  const openFAQModal = () => setIsFAQModalOpen(true);
  const closeFAQModal = () => setIsFAQModalOpen(false);

  const assetData = useContext(AssetDataContext);

  return (
    <div className="flex items-center py-5 gap-8">
      <div>
        <h2 className={`${styles.latestOperationsTitle}`}>Latest Operations</h2>
      </div>
      <div className={`${styles.buttonGroup}`}>
        <button className={`${styles.customButton} hover:border-primary`}>
          <Plus width="22" height="22" />
          <span className="text-xs">Add New Crypto</span>
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
    </div>
  );
}

export default CryptoHistoryHeader;