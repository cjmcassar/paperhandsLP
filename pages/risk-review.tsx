import RiskReview from "../components/risk-review";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { AssetDataProvider } from "../contexts/assetDataContext";

function Risk() {
  return (
    <DashboardLayout>
      <AssetDataProvider>
        <RiskReview />
      </AssetDataProvider>
    </DashboardLayout>
  );
}

export default Risk;
