import CryptoHistory from "../components/crypto-history";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { AssetDataProvider } from "../contexts/apiAssetDataContext";
import { UserAssetsDataProvider } from "contexts/userAssetDataContext";
import { UserTransactionsDataProvider } from "contexts/userTransactionDataContext";

function History() {
  return (
    <DashboardLayout>
      <AssetDataProvider>
        <UserAssetsDataProvider>
          <UserTransactionsDataProvider>
            <CryptoHistory />
          </UserTransactionsDataProvider>
        </UserAssetsDataProvider>
      </AssetDataProvider>
    </DashboardLayout>
  );
}

export default History;
