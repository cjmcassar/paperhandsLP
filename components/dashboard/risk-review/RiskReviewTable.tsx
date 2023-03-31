import React, { useEffect, useRef, useState } from "react";
import styles from "./RiskReviewTable.module.css";
import { DataTable } from "simple-datatables";

function RiskReviewTable() {
  const riskReviews = [
    {
      id: 1,
      asset: "Bitcoin",
      symbol: "BTC",
      amount: "0.5",
      value: "$11,443",
      share: "41.6%",
      storage: "Ledger Nano X",
      risk: "Safe",
      riskReview:
        "Your Bitcoin assets are historically safe when using Ledger Nano X as the storage method.",
      riskRecommendations: [
        "No recommendations.",
        "Your crypto is well-preserved & historically safe.",
      ],
    },
    {
      id: 2,
      asset: "Bitcoin",
      symbol: "BTC",
      amount: "0.2",
      value: "$4,577",
      share: "16.6%",
      storage: "Ledger Nano X",
      risk: "Safe",
      riskReview:
        "Your Bitcoin assets are historically safe when using Ledger Nano X as the storage method.",
      riskRecommendations: [
        "No recommendations.",
        "Your crypto is well-preserved & historically safe.",
      ],
    },
    {
      id: 3,
      asset: "Binance Coin",
      symbol: "BNB",
      amount: "8",
      value: "$2,486",
      share: "9%",
      storage: "Trezor",
      risk: "Low Risk",
      color: "#D1D369",
      riskReview:
        "Binance Coin is a low risk asset, while Trezor is a historically safe storage method.",
      riskRecommendations: [
        "No recommendations.",
        "Your crypto is well-preserved & historically safe.",
      ],
    },
    {
      id: 4,
      asset: "Dogecoin",
      symbol: "DOGE",
      amount: "15000",
      value: "$1,320",
      share: "4.8%",
      storage: "Coinbase",
      risk: "Medium Risk",
      riskReview:
        "Dogecoin is a medium risk asset, while Coinbase is a medium risk storage method.",
      riskRecommendations: [
        "Cold wallets are the safest way to store your crypto over time.",
        "Consider purchasing a Ledger or Trezor",
        "Consider investing in less risky assets.",
      ],
    },
    {
      id: 5,
      asset: "Dopex",
      symbol: "DPX",
      amount: "15",
      value: "$4,509",
      share: "16.4%",
      storage: "Kraken",
      risk: "High Risk",
      riskReview:
        "Dopex is a high risk asset, while Kraken is a high risk storage method.",
      riskRecommendations: [
        "Cold wallets are the safest way to store your crypto over time.",
        "Consider purchasing a Ledger or Trezor",
        "Consider investing in less risky assets.",
      ],
    },
    {
      id: 6,
      asset: "TRON",
      symbol: "TRX",
      amount: "3000",
      value: "$180",
      share: "0.7%",
      storage: "Armory",
      risk: "Low Risk",
      riskReview:
        "TRON is a low risk asset, while Armory is a low risk storage method.",
      riskRecommendations: [
        "No recommendations.",
        "Your crypto is well-preserved & historically safe.",
      ],
    },
    {
      id: 7,
      asset: "Dopex",
      symbol: "DPX",
      amount: "10",
      value: "$3,006",
      share: "10.9%",
      storage: "Ledger Nano X",
      risk: "High Risk",
      riskReview:
        "Dopex is a high risk asset, while Ledger Nano X is a historically safe storage method.",
      riskRecommendations: ["Consider investing in less risky assets."],
    },
  ];

  const [tableInitialised, setTableInitialised] = useState(false);
  const [dataTable, setDataTable] = useState(null);

  const tableRef = useRef(null);

  useEffect(() => {
    if (!tableInitialised) {
      intialiseTable();
      setTableInitialised(true);
    } else {
      populateTable();
    }

    return () => {
      if (dataTable) {
        dataTable.destroy();
      }
    };
  }, [riskReviews]);

  function intialiseTable() {
    if (!tableInitialised) {
      const dataTableSearch = new DataTable(tableRef.current, {
        searchable: true,
        fixedHeight: false,
        columns: [
          {
            select: 0,
            render: function (asset) {
              return `<span class="font-bold text-white my-2 text-xs 2xl:text-sm"> ${asset[0].data}</span>`;
            },
          },
          {
            select: 1,
            render: function (symbol) {
              return `<span class=" text-white my-2 text-xs 2xl:text-sm"> ${symbol[0].data}</span>`;
            },
          },
          {
            select: 2,
            render: function (amount) {
              return `<span class=" text-white my-2 text-xs 2xl:text-sm"> ${amount[0].data}</span>`;
            },
          },
          {
            select: 3,
            render: function (value) {
              return `<span class=" text-white my-2 text-xs 2xl:text-sm"> ${value[0].data}</span>`;
            },
          },
          {
            select: 4,
            render: function (share) {
              return `<span class=" text-white my-2 text-xs 2xl:text-sm"> ${share[0].data}</span>`;
            },
          },
          {
            select: 5,
            render: function (storage) {
              return `<span class=" text-white my-2 text-xs 2xl:text-sm"> ${storage[0].data}</span>`;
            },
          },
          {
            select: 6,
            render: function (riskLevel) {
              let color: string;
              switch (riskLevel[0].data) {
                case "Safe":
                  color = "#8DAAF5";
                  break;
                case "Low Risk":
                  color = "#62FF97";
                  break;
                case "Medium Risk":
                  color = "#FFF507";
                  break;
                case "High Risk":
                  color = "#FC62FF";
                  break;
                default:
                  color = "white";
              }
              return `<span style="color:${
                color || "white"
              }" class=" my-2 text-xs 2xl:text-sm"> ${
                riskLevel[0].data
              }</span>`;
            },
          },
          {
            select: 7,
            render: function (riskReview) {
              return `<span class=" text-white my-2 text-xs 2xl:text-sm"> ${riskReview[0].data}</span>`;
            },
          },
          {
            select: 8,
            render: function (riskRecommendations) {
              const recommendations = riskRecommendations[0].data.split(",");

              let output = `<div>`;
              recommendations.forEach(
                (recommendation: string) =>
                  (output += `<p class=" text-white my-2 text-xs 2xl:text-sm"> ${recommendation}</p>`)
              );
              output += `</div>`;

              return output;
            },
          },
        ],
      });
      setDataTable(dataTableSearch);
      setTableInitialised(true);
    }
  }

  function populateTable() {
    dataTable.destroy();
    dataTable.init();
    const data = [];
    riskReviews.forEach((review) => {
      data.push([
        review.asset,
        review.symbol,
        review.amount,
        review.value,
        review.share,
        review.storage,
        review.risk,
        review.riskReview,
        review.riskRecommendations.join(","),
      ]);
    });

    dataTable.insert({ data: data });
  }

  return (
    <>
      <div className="py-5">
        <div className="flex gap-6 md:text-lg sm:text-xs text-white">
          <div className="flex gap-2 items-center">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: "#CA4B4B" }}
            ></div>
            <div>High Risk</div>
          </div>
          <div className="flex gap-2 items-center">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: "#D4955A" }}
            ></div>
            <div>Medium Risk</div>
          </div>
          <div className="flex gap-2 items-center">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: "#D1D369" }}
            ></div>
            <div>Low Risk</div>
          </div>
          <div className="flex gap-2 items-center">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: "#8DAAF5" }}
            ></div>
            <div>Historically Safe</div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table
          ref={tableRef}
          className={`${styles.riskReviewTable} min-w-full divide-y divide-gray-200 sm:text-sm text-white`}
        >
          <thead
            className={`${styles.riskReviewTable} text-sm uppercase font-medium text-white`}
          >
            <tr>
              <th className="px-6 py-3 text-left text-xs 2xl:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Asset
              </th>
              <th>Symbol</th>
              <th>Amount</th>
              <th>Value</th>
              <th>Share</th>
              <th>Storage</th>
              <th>Risk</th>
              <th>Risk Review</th>
              <th>Risk Recommendations</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
}

export default RiskReviewTable;
