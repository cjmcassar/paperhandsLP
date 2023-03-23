import AssetSummary from "../components/dashboard/AssetSummary";
import LineChart from "../components/dashboard/LineChart";
import DashboardLayout from "../components/layouts/DashboardLayout";
function Dashboard() {
	return (
		<DashboardLayout>
			<div>
				<AssetSummary />
				<LineChart />
			</div>
		</DashboardLayout>
	);
}

export default Dashboard;
