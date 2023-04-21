import React, { useEffect, useRef, useState } from "react";

import { auth, db } from "utils/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

import { DataTable } from "simple-datatables";

import styles from "./CryptoHistoryTable.module.css";
import { format, fromUnixTime } from "date-fns";

interface UserAsset {
  uid: string;
  asset_name: string;
  asset_symbol: string;
  amount: number;
  storage_type: string;
  transaction_amount: number;
  transaction_price: string;
  transaction_type: "buy" | "sell";
  transaction_date: string;
  transaction_id: string;
}

interface CryptoTransaction {
  id: string;
  date: string;
  crypto: string;
  symbol: string;
  amount: number;
  value: string;
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
              "yyyy-MM-dd"
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

  useEffect(() => {
    const transactions = userAssets.map((asset, index) => {
      return {
        id: asset.transaction_id,
        date: asset.transaction_date,
        crypto: asset.asset_name,
        symbol: asset.asset_symbol,
        amount: asset.transaction_amount,
        value: asset.transaction_price,
        type: asset.transaction_type
      } as CryptoTransaction;
    });

    console.log(
      "transaction ids: ",
      transactions.map(t => t.id)
    );
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
