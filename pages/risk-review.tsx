import RiskReview from "../components/risk-review";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { AssetDataProvider } from "../contexts/apiAssetDataContext";
import { StorageDataProvider } from "contexts/apiStorageDataContext";
import { UserAssetsDataProvider } from "contexts/userAssetDataContext";
import { UserTransactionsDataProvider } from "contexts/userTransactionDataContext";

function Risk() {
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
