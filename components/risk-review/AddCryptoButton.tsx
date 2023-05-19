import React from "react";
import Plus from "../../public/img/dashboard/icons/plus.svg";
import styles from "./RiskReviewHeader.module.css";

function AddCryptoButton({ handleAddNewCrypto, showLoading }) {
  return (
    <button
      className={`${styles.customButton} tour-step-1 hover:border-primary ${
        showLoading ? "opacity-50 cursor-default hover:border-white" : ""
      }`}
      onClick={handleAddNewCrypto}
      disabled={showLoading}
    >
      <Plus width="22" height="22" />
      <span className="tour-step-1 text-xs">Add New Crypto</span>
    </button>
  );
}

export default AddCryptoButton;
