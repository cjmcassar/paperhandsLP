import RiskReview from "../components/risk-review";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { AssetDataProvider } from "../contexts/apiAssetDataContext";
import { StorageDataProvider } from "contexts/apiStorageDataContext";
import { UserAssetsDataProvider } from "contexts/userAssetDataContext";
import { UserTransactionsDataProvider } from "contexts/userTransactionDataContext";

function Risk() {
  return (
    <DashboardLayout>
      <AssetDataProvider>
        <StorageDataProvider>
          <UserAssetsDataProvider>
            <UserTransactionsDataProvider>
              <RiskReview />
            </UserTransactionsDataProvider>
          </UserAssetsDataProvider>
        </StorageDataProvider>
      </AssetDataProvider>
    </DashboardLayout>
  );
}

export default Risk;
