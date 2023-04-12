import { createContext, useState, useEffect } from "react";
import useSWR from "swr";

// Define the AssetData type
type AssetData = {
  Asset: string;
  Symbol: string;
  Mcap: string;
  Price: string;
  Asset_Recommendation: string;
  Asset_Review: string;
  Rating: string;
};

// Define the context type
type AssetDataContextType = {
  assetData: AssetData[];
  // setAssetData: (data: AssetData[]) => void;
};

export const AssetDataContext = createContext<AssetDataContextType>({
  assetData: []
  // setAssetData: () => {}
});

export const AssetDataProvider: React.FC = ({ children }) => {
  const [assetData, setAssetData] = useState<AssetData[]>([]);

  const fetcher = (url: string) =>
    fetch(url)
      .then(res => res.json())
      .catch(err => console.log(err));

  const { data: fetchedAssetData } = useSWR("/api/assets", fetcher);

  // Set asset data whenever fetchedAssetData changes
  useEffect(() => {
    setAssetData(fetchedAssetData?.cache ?? fetchedAssetData?.data);
  }, [fetchedAssetData]);

  return (
    <AssetDataContext.Provider value={{ assetData }}>
      {children}
    </AssetDataContext.Provider>
  );
};
