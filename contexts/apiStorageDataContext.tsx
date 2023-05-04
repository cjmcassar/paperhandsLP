import { createContext, useState, useEffect } from "react";
import useSWR from "swr";

type StorageData = {
  Storage_Method: string;
  Storage_Type: string;
  Rating: string;
  Storage_Review: string;
  Storage_Recommendation: string;
};

type StorageDataContextType = {
  storageData: StorageData[];
};

export const StorageDataContext = createContext<StorageDataContextType>({
  storageData: []
});

export const StorageDataProvider: React.FC = ({ children }) => {
  const [storageData, setStorageData] = useState<StorageData[]>([]);

  const fetcher = (url: string) =>
    fetch(url)
      .then(res => res.json())
      .catch(err => console.log(err));

  const { data: fetchedStorageData } = useSWR("/api/storage", fetcher);

  useEffect(() => {
    setStorageData(fetchedStorageData?.cache ?? fetchedStorageData?.data);
  }, [fetchedStorageData]);

  return (
    <StorageDataContext.Provider value={{ storageData }}>
      {children}
    </StorageDataContext.Provider>
  );
};
