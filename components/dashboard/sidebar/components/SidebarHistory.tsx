import React, { useEffect, useState } from "react";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "utils/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";

interface PurchaseDate {
  seconds: number;
  nanoseconds: number;
}
interface UserAsset {
  uid: string;
  asset_name: string;
  asset_symbol: string;
  amount: number;
  storage_type: string;
  purchase_date: PurchaseDate;
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
      const unsubscribe = fetchUserAssets();

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [user]);

  const fetchUserAssets = () => {
    if (!user) return;

    const userAssetsQuery = query(
      collection(db, "user_assets"),
      where("uid", "==", user.uid)
    );

    const unsubscribe = onSnapshot(userAssetsQuery, querySnapshot => {
      const userAssets: UserAsset[] = [];
      querySnapshot.forEach(doc => {
        userAssets.push(doc.data() as UserAsset);
      });
      setUserAssets(userAssets);
    });

    return unsubscribe;
  };
  return (
    <div className="w-full text-white mb-10">
      <h1 className="font-bold mb-[17px] text-[24px] leading-[29px]">
        History
      </h1>
      <ul className="w-full">
        {userAssets.map(asset => {
          const { purchase_date } = asset;
          const date = new Date(purchase_date.seconds * 1000); // convert seconds to milliseconds
          const formattedDate = date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
          });
          const dayWithSuffix = getDayWithSuffix(date.getDate());
          return (
            <SidebarHistoryItem
              key={asset.asset_symbol}
              icon={asset.asset_symbol}
              title={`Bought ${asset.asset_name}`}
              date={`${formattedDate.replace(/\d+/, dayWithSuffix)}`}
              value={`+${asset.amount}`}
              valueColor="text-green-600"
            />
          );
        })}
      </ul>
    </div>
  );
}
