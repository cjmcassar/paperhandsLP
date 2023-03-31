import React from "react";
import RiskLevelCharts from "./RiskLevelCharts";
import RiskReviewHeader from "./RiskReviewHeader";
import RiskReviewTable from "./RiskReviewTable";

function RiskReview({ assetData}) {
	return (
		<>
			<RiskReviewHeader assetData={assetData}  />
			<RiskReviewTable />
			<RiskLevelCharts />
		</>
	);
}

export default RiskReview;
