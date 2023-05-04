import CryptoHistory from "../components/crypto-history";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { AssetDataProvider } from "../contexts/apiAssetDataContext";

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
