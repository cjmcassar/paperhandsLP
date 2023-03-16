import AssetSummary from "../components/dashboard/AssetSummary";
import DashboardLayout from "../components/layouts/DashboardLayout";
function Dashboard() {
	return (
		<DashboardLayout>
			{/* this is where all of the dashboard components go */}
			<div>
				<AssetSummary />
			</div>
		</DashboardLayout>
	);
}

export default Dashboard;
