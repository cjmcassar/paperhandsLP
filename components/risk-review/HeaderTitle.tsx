import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import styles from "./RiskReviewHeader.module.css";

function HeaderTitle({ showLoading }) {
  return (
    <div>
      <h2
        className={`${styles.latestOperationsTitle} ${
          showLoading ? "opacity-50" : ""
        }`}
      >
        Risk Review
        {showLoading && (
          <>
            <FontAwesomeIcon
              icon={faSpinner}
              className="fa-spin ml-4 text-gray-500"
            />
            <span className="text-gray-500 ml-2 text-sm">Loading Assets</span>
          </>
        )}
      </h2>
    </div>
  );
}

export default HeaderTitle;
