import AssetSummary from "../components/dashboard/AssetSummary";
import LineChart from "../components/dashboard/LineChart";
import DashboardLayout from "../components/layouts/DashboardLayout";
function Dashboard() {
  return (
    <DashboardLayout>
      {/* this is where all of the dashboard components go */}
      <div>
        <AssetSummary />
        <LineChart />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
