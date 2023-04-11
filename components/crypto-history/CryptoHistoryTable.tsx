import React, { useEffect, useRef, useState } from "react";
import styles from "./CryptoHistoryTable.module.css";
import { DataTable } from "simple-datatables";

export interface CryptoTransaction {
  id: number;
  date: string;
  crypto: string;
  symbol: string;
  amount: number;
  value: number;
  type: "buy" | "sell";
}

interface CryptoHistoryProps {
  transactions: CryptoTransaction[];
}

const CryptoHistory: React.FC<CryptoHistoryProps> = ({ transactions }) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [dataTable, setDataTable] = useState<DataTable>();
  const [tableInitialised, setTableInitialised] = useState(false);

  console.log("objectf", transactions);

  function initialiseTable() {
    if (!tableInitialised) {
      const dataTableSearch = new DataTable(tableRef.current, {
        searchable: true,
        fixedHeight: false,
        columns: [
          {
            select: 0,
            render: function (type) {
              return `<span class="font-bold text-white my-2 text-xs 2xl:text-sm"> ${type[0].data}</span>`;
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
      populateTable();
    }
  }

  function populateTable() {
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
    if (!tableInitialised) {
      initialiseTable();
      setTableInitialised(true);
    } else {
      populateTable();
    }

    return () => {
      if (dataTable) {
        dataTable.destroy();
      }
    };
  }, [dataTable]);

  return (
    <>
      <div className="overflow-x-auto rounded-lg">
        <h2>Crypto History</h2>
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
