import AssetSummary from "../components/dashboard/AssetSummary";
import LineChart from "../components/dashboard/LineChart";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { AssetDataProvider } from "../contexts/apiAssetDataContext";
import { UserAssetsDataProvider } from "contexts/userAssetDataContext";
import { UserTransactionsDataProvider } from "contexts/userTransactionDataContext"; // Import UserTransactionsDataProvider

function Dashboard() {
  return (
    <DashboardLayout>
      <div>
        <AssetDataProvider>
          <UserAssetsDataProvider>
            <UserTransactionsDataProvider>
              <AssetSummary />
              <LineChart />
            </UserTransactionsDataProvider>
          </UserAssetsDataProvider>
        </AssetDataProvider>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
