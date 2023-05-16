import DashboardLayout from "../components/layouts/DashboardLayout";

import RiskReview from "../components/risk-review";

import { AssetDataProvider } from "../contexts/apiAssetDataContext";
import { StorageDataProvider } from "contexts/apiStorageDataContext";
import { UserAssetsDataProvider } from "contexts/userAssetDataContext";
import { UserTransactionsDataProvider } from "contexts/userTransactionDataContext";

import { analytics, logAppEvent } from "utils/firebaseClient";

function Risk() {
  if (typeof window !== "undefined") {
    logAppEvent(analytics, "risk_review_page_visited");
  }

  return (
    <DashboardLayout>
      <UserAssetsDataProvider>
        <UserTransactionsDataProvider>
          <AssetDataProvider>
            <StorageDataProvider>
              <RiskReview />
            </StorageDataProvider>
          </AssetDataProvider>
        </UserTransactionsDataProvider>
      </UserAssetsDataProvider>
    </DashboardLayout>
  );
}

export default Risk;
