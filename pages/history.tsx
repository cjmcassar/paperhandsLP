import CryptoHistory from "../components/dashboard/crypto-history";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { AssetDataProvider } from "../contexts/assetDataContext";

function History() {
  return (
    <DashboardLayout>
      <AssetDataProvider>
        <CryptoHistory />
      </AssetDataProvider>
    </DashboardLayout>
  );
}

export default History;
