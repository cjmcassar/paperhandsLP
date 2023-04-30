import React, { createContext, useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  getDocs,
  onSnapshot
} from "firebase/firestore";
import { auth, db } from "utils/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";
import { format, fromUnixTime } from "date-fns";

interface UserAsset {
  id: string;
  uid: string;
  asset_name: string;
  asset_symbol: string;
  amount: number;
  storage_type: string;
  transaction_date: string;
  transaction_amount: number;
  transaction_type: "buy" | "sell";
  transaction_id: string;
}

interface UserAssetsContextType {
  userAssets: UserAsset[];
  setUserAssets: React.Dispatch<React.SetStateAction<UserAsset[]>>;
}

export const UserAssetsContext = createContext<UserAssetsContextType>({
  userAssets: [],
  setUserAssets: () => {}
});

export const UserAssetsProvider: React.FC = ({ children }) => {
  const [user] = useAuthState(auth);
  const [userAssets, setUserAssets] = useState<UserAsset[]>([]);

  console.log(userAssets, "userAssets context");

  useEffect(() => {
    if (user) {
      const unsubscribe = fetchUserAssets();
      return () => unsubscribe();
    }
  }, [user]);

  const fetchUserAssets = () => {
    const userAssetsQuery = query(
      collection(db, "user_assets"),
      where("uid", "==", user.uid)
    );

    const unsubscribe = onSnapshot(userAssetsQuery, async querySnapshot => {
      const userAssets: UserAsset[] = [];

      for (const userAssetDoc of querySnapshot.docs) {
        const userAsset = userAssetDoc.data() as UserAsset;
        const transactionsQuery = query(
          collection(userAssetDoc.ref, "transactions")
        );
        const transactionsSnapshots = await getDocs(transactionsQuery);
        transactionsSnapshots.forEach(transactionDoc => {
          const transactionData = transactionDoc.data();
          userAssets.push({
            ...userAsset,
            ...transactionData,
            transaction_date: format(
              fromUnixTime(transactionData.transaction_date.seconds),
              "MMMM do, yyyy"
            ),
            transaction_id: transactionDoc.id
          });
        });
      }

      setUserAssets(userAssets);
    });

    return unsubscribe;
  };

  return (
    <UserAssetsContext.Provider value={{ userAssets, setUserAssets }}>
      {children}
    </UserAssetsContext.Provider>
  );
};
