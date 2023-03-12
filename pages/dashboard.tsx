import History from "../components/dashboard/history";
import DashboardLayout from "../components/layouts/dashboardLayout";
function Dashboard() {
	return (
		<DashboardLayout>
			<div>
				Components inside dashboard layout
				<History />
			</div>
		</DashboardLayout>
	);
}

export default Dashboard;
