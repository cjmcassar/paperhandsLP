import RiskReview from "../components/risk-review";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { AssetDataProvider } from "../contexts/apiAssetDataContext";
import { StorageDataProvider } from "contexts/apiStorageDataContext";

function Risk() {
  return (
    <DashboardLayout>
      <AssetDataProvider>
        <StorageDataProvider>
          <RiskReview />
        </StorageDataProvider>
      </AssetDataProvider>
    </DashboardLayout>
  );
}

export default Risk;
