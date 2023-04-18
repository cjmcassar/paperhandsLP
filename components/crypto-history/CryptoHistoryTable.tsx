import React, { useEffect, useRef, useState } from "react";
import styles from "./CryptoHistoryTable.module.css";
import { DataTable } from "simple-datatables";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "utils/firebaseClient";
import { collection, onSnapshot, query, where } from "firebase/firestore";

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

interface CryptoTransaction {
  id: number;
  date: string;
  crypto: string;
  symbol: string;
  amount: number;
  value: number;
  type: "buy" | "sell";
}

const CryptoHistory: React.FC = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [dataTable, setDataTable] = useState<DataTable>();
  const [tableInitialised, setTableInitialised] = useState(false);

  const [user] = useAuthState(auth);
  const [userAssets, setUserAssets] = useState<UserAsset[]>([]);

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

  function initialiseTable(transactions: CryptoTransaction[]) {
    if (!tableInitialised) {
      const dataTableSearch = new DataTable(tableRef.current, {
        searchable: true,
        fixedHeight: false,
        columns: [
          {
            select: 0,
            render: function (type) {
              let color: string;
              switch (type[0].data) {
                case "buy":
                  color = "#62FF97";
                  break;
                case "sell":
                  color = "#FF6262";
                  break;
                default:
                  color = "white";
              }
              return `<span style="color:${
                color || "white"
              }" class="font-bold my-2 text-xs 2xl:text-sm"> ${
                type[0].data
              }</span>`;
            }
          },
          {
            select: 1,
            render: function (date) {
              return `<span class="text-white my-2 text-xs 2xl:text-sm"> ${date[0].data}</span>`;
            }
          },
          {
            select: 2,
            render: function (symbol) {
              return `<span class="text-white my-2 text-xs 2xl:text-sm"> ${symbol[0].data}</span>`;
            }
          },
          {
            select: 3,
            render: function (crypto) {
              return `<span class="text-white my-2 text-xs 2xl:text-sm"> ${crypto[0].data}</span>`;
            }
          },
          {
            select: 4,
            render: function (amount) {
              return `<span class="text-white my-2 text-xs 2xl:text-sm"> ${amount[0].data}</span>`;
            }
          },
          {
            select: 5,
            render: function (value) {
              return `<span class="text-white my-2 text-xs 2xl:text-sm"> ${value[0].data}</span>`;
            }
          }
        ]
      });
      setDataTable(dataTableSearch);
      setTableInitialised(true);
      populateTable(transactions);
    }
  }

  function populateTable(transactions: CryptoTransaction[]) {
    if (dataTable) {
      dataTable.destroy();
      dataTable.init();
      const data = [];
      transactions.forEach(transaction => {
        data.push([
          transaction.type,
          transaction.date,
          transaction.symbol,
          transaction.crypto,
          transaction.amount,
          transaction.value
        ]);
      });
      dataTable.insert({ data: data });
    }
  }

  // TODO: 1. add buy/sell transaction into firebase.
  // 2. add the value of the asset at point of sale to firebase

  useEffect(() => {
    const transactions = userAssets.map((asset, index) => {
      const date = new Date(asset.purchase_date.seconds * 1000);
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      });
      console.log("userAssets: ", userAssets);
      return {
        id: index,
        date: formattedDate,
        crypto: asset.asset_name,
        symbol: asset.asset_symbol,
        amount: asset.amount
        // value: asset.value,
        // sale_type: asset.sale
      } as CryptoTransaction;
    });

    if (!tableInitialised) {
      initialiseTable(transactions);
    } else {
      populateTable(transactions);
    }
  }, [userAssets]);

  return (
    <>
      <div className="overflow-x-auto rounded-lg">
        <table
          ref={tableRef}
          className={`${styles.CryptoHistoryTable} w-full sm:text-sm text-white  border-collapse`}
        >
          <thead
            className={`${styles.CryptoHistoryTable} text-xs uppercase font-medium`}
          >
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Symbol
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Value
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
};

export default CryptoHistory;
