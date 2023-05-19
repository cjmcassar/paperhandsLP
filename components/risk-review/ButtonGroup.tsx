import React from "react";

import AddCryptoButton from "./AddCryptoButton";
import FAQButton from "./FAQButton";

import styles from "./RiskReviewHeader.module.css";

function ButtonGroup({ handleAddNewCrypto, openFAQModal, showLoading }) {
  return (
    <div className={`${styles.buttonGroup}`}>
      <AddCryptoButton
        handleAddNewCrypto={handleAddNewCrypto}
        showLoading={showLoading}
      />
      <FAQButton openFAQModal={openFAQModal} />
    </div>
  );
}

export default ButtonGroup;
