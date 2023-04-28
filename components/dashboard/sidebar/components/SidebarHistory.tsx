import React, { useEffect, useState } from "react";
import { query, collection, where, getDocs } from "firebase/firestore";
import { auth, db } from "utils/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";
import { format, fromUnixTime } from "date-fns";

interface UserAsset {
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

function SidebarHistoryItem({ icon, title, date, value, valueColor }) {
  return (
    <li className="flex mb-[23px]">
      <div className="relative bg-lightGrey w-10 rounded-5">
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {icon}
        </div>
      </div>
      <div className="ml-3.5 flex justify-between items-center w-40">
        <div className="flex flex-col">
          <h5 className="font-bold">{title}</h5>
          <p className="text-sm">{date}</p>
        </div>
        <p className={valueColor}>{value}</p>
      </div>
    </li>
  );
}

export default function SidebarHistory() {
  const [user] = useAuthState(auth);
  const [userAssets, setUserAssets] = useState<UserAsset[]>([]);

  function getDayWithSuffix(day: number) {
    if (day > 3 && day < 21) {
      return `${day}th`;
    } else {
      switch (day % 10) {
        case 1:
          return `${day}st`;
        case 2:
          return `${day}nd`;
        case 3:
          return `${day}rd`;
        default:
          return `${day}th`;
      }
    }
  }

  useEffect(() => {
    if (user) {
      fetchUserTransactions();
    }
  }, [user]);

  const fetchUserTransactions = async () => {
    if (!user) return;

    const userAssetsQuery = query(
      collection(db, "user_assets"),
      where("uid", "==", user.uid)
    );

    const userAssetsSnapshots = await getDocs(userAssetsQuery);
    const userAssets: UserAsset[] = [];
    const transactionsPromises: Promise<void>[] = [];

    userAssetsSnapshots.forEach(userAssetDoc => {
      const userAsset = userAssetDoc.data() as UserAsset;
      const transactionsPromise = getDocs(
        collection(userAssetDoc.ref, "transactions")
      ).then(transactionsSnapshots => {
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
      });
      transactionsPromises.push(transactionsPromise);
    });

    await Promise.all(transactionsPromises);
    setUserAssets(userAssets);
  };
  return (
    <div className="w-full text-white mb-10">
      <h1 className="font-bold mb-[17px] text-[24px] leading-[29px]">
        History
      </h1>
      <ul className="w-full">
        {userAssets
          .sort((a, b) => {
            return (
              new Date(b.transaction_date).getTime() -
              new Date(a.transaction_date).getTime()
            );
          })
          .slice(0, 5)
          .map(asset => {
            const date = new Date(asset.transaction_date);
            const formattedDate = date.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric"
            });
            const dayWithSuffix = getDayWithSuffix(date.getDate());

            const isBuy = asset.transaction_type === "buy";
            const transactionAmount = Number(asset.transaction_amount);
            const value = isBuy
              ? `+${transactionAmount.toFixed(2)}`
              : `-${transactionAmount.toFixed(2)}`;
            const valueColor = isBuy ? "text-green-600" : "text-red-600";

            return (
              <SidebarHistoryItem
                key={asset.transaction_id}
                icon={asset.asset_symbol}
                title={`${isBuy ? "Bought" : "Sold"} ${asset.asset_name}`}
                date={asset.transaction_date}
                value={value}
                valueColor={valueColor}
              />
            );
          })}
      </ul>
    </div>
  );
}
