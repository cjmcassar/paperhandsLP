import React, { ReactNode, useContext, useEffect, useState } from "react";
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

interface Transaction {
  parent_id: string;
  transaction_type: string;
  transaction_amount: number;
  transaction_date: string;
}

interface CombinedData extends Transaction {
  id?: string;
  asset_name?: string;
  asset_symbol?: ReactNode;
  risk_rating?: string;
  uid: string;
}

export default function RiskInfo() {
  const [userAssetsState] = useContext(UserAssetsDataContext);
  const [transactionState] = useContext(UserTransactionsDataContext);
  const assetDataState = useContext(AssetDataContext);
  const [combinedData, setCombinedData] = useState<CombinedData[]>([]);
  const [loading, setLoading] = useState(true);

  const { userTransactions } = transactionState;
  const { userAssets } = userAssetsState;

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
          transaction_date: transaction.transaction_date
        };
      })
      .filter(item => item !== null);

    setCombinedData(data);
    setLoading(false);
    console.log("tsx:", transactionState);
    console.log("combined data:", data);
  }, [assetDataState, userAssetsState, transactionState]);

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
        {combinedData
          .sort(
            (a, b) =>
              new Date(b.transaction_date).getTime() -
              new Date(a.transaction_date).getTime()
          )
          .map((data, index) => {
            let color;
            switch (data.risk_rating) {
              case "4 - High Risk":
                color = "#FF6262";
                break;
              case "3 - Medium Risk":
                color = "#FFF962";
                break;
              case "2 - Low Risk":
                color = "#62FF97";
                break;
              case "1 - Historically Safe":
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
                date={data.transaction_date}
              />
            );
          })}
      </ul>
    </div>
  );
}
