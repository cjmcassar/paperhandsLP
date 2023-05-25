import React from "react";
import Question from "../../public/img/dashboard/icons/question.svg";
import styles from "./RiskReviewHeader.module.css";

interface FAQButtonProps {
  openFAQModal: () => void;
}

const FAQButton: React.FC<FAQButtonProps> = ({ openFAQModal }) => {
  return (
    <button
      onClick={openFAQModal}
      className={`${styles.customButton} hover:border-primary`}
    >
      <Question width="22" height="22" />
      <span className="text-xs">Help & FAQs</span>
    </button>
  );
};

export default FAQButton;
