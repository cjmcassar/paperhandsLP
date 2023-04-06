import React from "react";
import styles from "./FAQModal.module.css";

const FAQModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>FAQs</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div>
          {/* Add FAQ items here */}
          <div className={styles.faqItem}>
            <div className={styles.question}>Question 1</div>
            <div className={styles.answer}>Answer 1</div>
          </div>
          {/* Add more FAQ items */}
        </div>
      </div>
    </div>
  );
};

export default FAQModal;
