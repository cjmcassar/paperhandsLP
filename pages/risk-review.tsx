import RiskReview from "../components/dashboard/risk-review";
import { getServerSideProps } from "./test";


import DashboardLayout from "../components/layouts/DashboardLayout";
function Risk() {
	return (
		<DashboardLayout>
			<RiskReview />
		</DashboardLayout>
	);
}

export default Risk;
