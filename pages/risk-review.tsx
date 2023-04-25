import RiskReview from "../components/risk-review";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { AssetDataProvider } from "../contexts/assetDataContext";
import { StorageDataProvider } from "contexts/storageDataContext";

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
