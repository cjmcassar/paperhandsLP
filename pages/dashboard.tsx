import DashboardLayout from "../components/layouts/DashboardLayout";

import AssetSummary from "../components/dashboard/AssetSummary";
import LineChart from "../components/dashboard/LineChart";

import { AssetDataProvider } from "../contexts/apiAssetDataContext";
import { UserAssetsDataProvider } from "contexts/userAssetDataContext";
import { UserTransactionsDataProvider } from "contexts/userTransactionDataContext";

import { analytics, logAppEvent } from "utils/firebaseClient";

function Dashboard() {
  if (typeof window !== "undefined") {
    logAppEvent(analytics, "dashboard_page_visited");
  }

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
