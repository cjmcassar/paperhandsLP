import AssetSummary from "../components/dashboard/AssetSummary";
import LineChart from "../components/dashboard/LineChart";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { AssetDataProvider } from "../contexts/assetDataContext";

function Dashboard() {
  return (
    <DashboardLayout>
      <div>
        <AssetDataProvider>
          <AssetSummary />
          <LineChart />
        </AssetDataProvider>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
