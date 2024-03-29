import SidebarHistory from "./components/SidebarHistory";
import RiskInfo from "./components/RiskInfo";

import styles from "../sidebar/RightHandSidebar.module.css";

import { UserTransactionsDataProvider } from "contexts/userTransactionDataContext";
import { UserAssetsDataProvider } from "contexts/userAssetDataContext";
import { AssetDataProvider } from "contexts/apiAssetDataContext";

export default function RightHandSidebar(): JSX.Element {
  return (
    <>
      <nav className={`${styles.nav} bg-darkGrey`}>
        <div className="md:flex-col md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center gap-10 w-full mx-auto">
          <div className="px-3 pb-5">
            <UserTransactionsDataProvider>
              <UserAssetsDataProvider>
                <AssetDataProvider>
                  <SidebarHistory />
                  <RiskInfo />
                </AssetDataProvider>
              </UserAssetsDataProvider>
            </UserTransactionsDataProvider>
          </div>
        </div>
      </nav>
    </>
  );
}
