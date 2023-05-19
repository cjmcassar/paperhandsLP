import CryptoHistory from "../components/crypto-history";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { AssetDataProvider } from "../contexts/apiAssetDataContext";
import { StorageDataProvider } from "contexts/apiStorageDataContext";
import { UserAssetsDataProvider } from "contexts/userAssetDataContext";
import { UserTransactionsDataProvider } from "contexts/userTransactionDataContext";

function History() {
  return (
    <DashboardLayout>
      <AssetDataProvider>
        <StorageDataProvider>
          <UserAssetsDataProvider>
            <UserTransactionsDataProvider>
              <CryptoHistory />
            </UserTransactionsDataProvider>
          </UserAssetsDataProvider>
        </StorageDataProvider>
      </AssetDataProvider>
    </DashboardLayout>
  );
}

export default History;
