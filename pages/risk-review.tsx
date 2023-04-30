import RiskReview from "../components/risk-review";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { AssetDataProvider } from "../contexts/assetDataContext";
import { StorageDataProvider } from "contexts/storageDataContext";
import { UserAssetsProvider } from "contexts/userAssetsContext";

function Risk() {
  return (
    <UserAssetsProvider>
      <DashboardLayout>
        <AssetDataProvider>
          <StorageDataProvider>
            <RiskReview />
          </StorageDataProvider>
        </AssetDataProvider>
      </DashboardLayout>
    </UserAssetsProvider>
  );
}

export default Risk;
