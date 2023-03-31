import RiskReview from "../components/dashboard/risk-review";

import DashboardLayout from "../components/layouts/DashboardLayout";

function Risk({ assetData }) {
	return (
		<DashboardLayout>
			<RiskReview assetData={assetData} />
		</DashboardLayout>
	);
}
export async function getStaticProps() {
	const response1 = await fetch("http://localhost:3000/api/assets");
	const assetData = await response1.json();

	const response2 = await fetch("http://localhost:3000/api/storage");
	const storageData = await response2.json();

	return {
		props: {
			assetData: assetData.data,
			storageData: storageData.data,
		},
		revalidate: 60,
	};
}
export default Risk;
