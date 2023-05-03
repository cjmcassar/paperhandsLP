import React from "react";
import RiskLevelCharts from "./RiskLevelCharts";
import RiskReviewHeader from "./RiskReviewHeader";
import RiskReviewTable from "./RiskReviewTable";

function RiskReview() {
  return (
    <>
      <RiskReviewHeader />
      <RiskReviewTable />
      <RiskLevelCharts />
    </>
  );
}

export default RiskReview;
