import React, { useContext, useEffect, useRef, useState } from "react";
import { UserAssetsDataContext } from "contexts/userAssetDataContext";
import { UserTransactionsDataContext } from "contexts/userTransactionDataContext";

import { auth } from "utils/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";

import { DataTable } from "simple-datatables";

import styles from "./CryptoHistoryTable.module.css";
import { AssetDataContext } from "contexts/apiAssetDataContext";

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
  const [userAssetsState] = useContext(UserAssetsDataContext);
  const [userTransactionsState] = useContext(UserTransactionsDataContext);
  const { assetData } = useContext(AssetDataContext);

  const tableRef = useRef<HTMLTableElement>(null);
  const [dataTable, setDataTable] = useState<DataTable>();
  const [tableInitialised, setTableInitialised] = useState(false);
  const [
    transactionsWithParentAssetsState,
    setTransactionsWithParentAssetsState
  ] = useState([]);

  const [user] = useAuthState(auth);

  function convertPriceToNumber(priceString: string) {
    const withoutDollarSign = priceString?.replace("$", "");
    const withoutComma = withoutDollarSign?.replace(/,/g, "");
    const priceNumber = parseFloat(withoutComma);
    return priceNumber;
  }

  const userAssetsWithPrice = userAssetsState.userAssets.map(userAsset => {
    const assetPriceData = assetData?.find(
      asset => asset.Symbol === userAsset.asset_symbol
    );
    return {
      ...userAsset,
      Price: convertPriceToNumber(assetPriceData?.Price)
    };
  });

  useEffect(() => {
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
              sort: "desc",
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
      } else {
        console.log("table already initialised");
      }
    }

    function populateTable(transactions: CryptoTransaction[]) {
      if (dataTable) {
        console.log("table exists");
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
      } else {
        console.log("table does not exist");
      }
    }

    if (
      user &&
      !userAssetsState.isLoading &&
      !userTransactionsState.isLoading
    ) {
      const transactionsWithParentAssets =
        userTransactionsState.userTransactions.map(transaction => {
          const parentAsset = userAssetsWithPrice.find(
            asset => asset.id === transaction.parent_id
          );
          const transactionPrice = parseFloat(
            transaction.transaction_price.replace("$", "").replace(/,/g, "")
          );
          const totalValueOfEachTransaction =
            transaction.transaction_amount * transactionPrice;
          const formattedTotalValue = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
          }).format(totalValueOfEachTransaction);
          return {
            ...transaction,
            parentAsset,
            totalValueOfEachTransaction: formattedTotalValue
          };
        });

      const transactions = transactionsWithParentAssets.map(transaction => {
        return {
          id: transaction.id,
          date: transaction.transaction_date,
          crypto: transaction.parentAsset?.asset_name,
          symbol: transaction.parentAsset?.asset_symbol,
          amount: transaction.transaction_amount,
          value: transaction.totalValueOfEachTransaction,
          type: transaction.transaction_type
        } as CryptoTransaction;
      });

      setTransactionsWithParentAssetsState(transactions);

      if (!tableInitialised) {
        initialiseTable(transactions);
      } else {
        populateTable(transactions);
      }
    }
  }, [
    user,
    userAssetsState,
    userTransactionsState,
    dataTable,
    tableInitialised
  ]);

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
