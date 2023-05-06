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
        <UserAssetsDataProvider>
          <UserTransactionsDataProvider>
            <AssetDataProvider>
              <AssetSummary />
              <LineChart />
            </AssetDataProvider>
          </UserTransactionsDataProvider>
        </UserAssetsDataProvider>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
