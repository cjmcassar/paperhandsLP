import React from "react";
import styles from "./RiskReviewTable.module.css";

function TableHeader() {
  return (
    <thead
      className={`${styles.riskReviewTable} text-sm uppercase font-medium text-white`}
    >
      <tr>
        <th className="px-6 py-3 text-left text-xs 2xl:text-sm font-medium text-gray-500 uppercase tracking-wider">
          Asset
        </th>
        <th>Symbol</th>
        <th>Amount</th>
        <th>Value</th>
        <th>Storage</th>
        <th>Risk</th>
        <th>Risk Review</th>
        <th>Actions</th>
      </tr>
    </thead>
  );
}

export default TableHeader;
