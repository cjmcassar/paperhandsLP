import React from "react";

import AddCryptoButton from "./AddCryptoButton";
import FAQButton from "./FAQButton";

import styles from "./RiskReviewHeader.module.css";

interface ButtonGroupProps {
  handleAddNewCrypto: () => void;
  openFAQModal: () => void;
  showLoading: boolean;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  handleAddNewCrypto,
  openFAQModal,
  showLoading
}) => {
  return (
    <div className={`${styles.buttonGroup}`}>
      <AddCryptoButton
        handleAddNewCrypto={handleAddNewCrypto}
        showLoading={showLoading}
      />
      <FAQButton openFAQModal={openFAQModal} />
    </div>
  );
};

export default ButtonGroup;
