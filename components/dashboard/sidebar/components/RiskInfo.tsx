import React, { useContext, useEffect, useState } from "react";
import { AssetDataContext } from "contexts/apiAssetDataContext";
import { UserAssetsDataContext } from "contexts/userAssetDataContext";
import { UserTransactionsDataContext } from "contexts/userTransactionDataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function RiskInfoItem({ color, title, date }) {
  return (
    <li className="flex text-xs justify-between items-center mb-6">
      <span
        className={`rounded-full w-5 h-5`}
        style={{ backgroundColor: color }}
      ></span>
      <span className="ml-3 flex flex-col text-sm">
        <h5 className="font-bold">{title}</h5>
        <p className="text-gray-200 text-xs">{date}</p>
      </span>
    </li>
  );
}

export default function RiskInfo() {
  const [userAssetsState] = useContext(UserAssetsDataContext);
  const [transactionState] = useContext(UserTransactionsDataContext);
  const assetDataState = useContext(AssetDataContext);
  const [combinedData, setCombinedData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { userTransactions } = transactionState;
  const { userAssets } = userAssetsState;

  // There is a bug with mapping the risk rating to the transactions.

  useEffect(() => {
    setLoading(true);
    if (!assetDataState || !assetDataState.assetData || !userAssets) return;

    const data = userTransactions
      .map(transaction => {
        const asset = userAssets.find(a => a.id === transaction.parent_id);
        if (!asset) {
          console.log("Asset not found for transaction:", transaction);
          return null;
        }

        const assetData = assetDataState.assetData.find(
          a => a.Symbol === asset.asset_symbol
        );

        if (!assetData) {
          console.log("Asset data not found for asset:", asset);
          return null;
        }

        return {
          ...transaction,
          asset_name: asset.asset_name,
          asset_symbol: asset.asset_symbol,
          risk_rating: assetData.Rating,
          transaction_date: new Date(transaction.transaction_date)
        };
      })
      .filter(item => item !== null)
      .sort(
        (a, b) => b.transaction_date.getTime() - a.transaction_date.getTime()
      );

    setCombinedData(data);
    setLoading(false);
    console.log("tsx:", transactionState);
    console.log("combined data:", data);
  }, [assetDataState, userAssets, userTransactions]);

  if (loading) {
    return (
      <div className="sm:w-full w-[30%] text-white">
        <h1 className="text-2xl font-bold mb-4">Risk Information</h1>
        <FontAwesomeIcon icon={faSpinner} spin />
      </div>
    );
  }

  return (
    <div className="sm:w-full w-[30%] text-white">
      <h1 className="text-2xl font-bold mb-4">Risk Information</h1>
      <ul className="ml-3 flex flex-col items-start">
        {combinedData.map((data, index) => {
          let color;
          switch (data.risk_rating) {
            case "High":
              color = "#FF6262";
              break;
            case "Medium":
              color = "#FFF962";
              break;
            case "Low":
              color = "#62FF97";
              break;
            case "Historically Safe":
              color = "#7B62FF";
              break;
          }
          return (
            <RiskInfoItem
              key={index}
              color={color}
              title={
                <>
                  {data.risk_rating}
                  <br />
                  {data.asset_name}
                </>
              }
              date={new Date(data.transaction_date).toLocaleDateString()}
            />
          );
        })}
      </ul>
    </div>
  );
}
