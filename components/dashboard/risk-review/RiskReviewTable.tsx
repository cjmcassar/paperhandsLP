import React from "react";
import styles from "./RiskReviewTable.module.css";

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
      color: "#8DAAF5",
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
      color: "#8DAAF5",
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
      color: "#D4955A",
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
      color: "#CA4B4B",
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
      color: "#8DAAF5",
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
      color: "#CA4B4B",
      riskReview:
        "Dopex is a high risk asset, while Ledger Nano X is a historically safe storage method.",
      riskRecommendations: ["Consider investing in less risky assets."],
    },
  ];
  return (
    <>
      <div className="py-5">
        <div className="flex gap-6 md:text-lg sm:text-xs">
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
      <div className="overflow-x-auto rounded-lg">
        <table
          className={`${styles.riskReviewTable} w-full sm:text-sm text-gray-400  border-collapse`}
        >
          <thead
            className={`${styles.riskReviewTable} text-xs uppercase font-medium`}
          >
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                Asset
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Symbol
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Value
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Share
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Storage
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Risk
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Risk Review
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Risk Recommendations
              </th>
            </tr>
          </thead>
          <tbody className={`${styles.riskReviewTable}`}>
            {riskReviews.map((riskReview) => (
              <tr
                key={riskReview.id}
                className="bg-black bg-opacity-20 border-b-2 border-gray-600 hover:bg-opacity-30"
              >
                <td className="font-bold px-6 py-4 text-xs">
                  {riskReview.asset}
                </td>
                <td className="px-6 py-4 text-xs">{riskReview.symbol}</td>
                <td className="px-6 py-4 text-xs">{riskReview.amount}</td>
                <td className="px-6 py-4 text-xs">{riskReview.value}</td>
                <td className="px-6 py-4 text-xs">{riskReview.share}</td>
                <td className="px-6 py-4 text-xs">{riskReview.storage}</td>
                <td
                  className="px-6 py-4 text-xs"
                  style={{ color: riskReview.color }}
                >
                  {riskReview.risk}
                </td>
                <td
                  className="px-6 py-4 text-xs"
                  style={{ color: riskReview.color }}
                >
                  {riskReview.riskReview}
                </td>
                <td
                  className="px-6 py-4 text-xs"
                  style={{ color: riskReview.color }}
                >
                  {riskReview.riskRecommendations.map(
                    (riskRecommendation, idx) => (
                      <div key={idx}> &gt; {riskRecommendation}</div>
                    )
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default RiskReviewTable;
