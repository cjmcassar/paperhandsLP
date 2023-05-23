import React, { useContext, useEffect, useState, ReactNode } from "react";
import { UserAssetsDataContext } from "contexts/userAssetDataContext";
import { UserTransactionsDataContext } from "contexts/userTransactionDataContext";

interface SidebarHistoryItemProps {
  title: string;
  date: string;
  value: string;
  valueColor: string;
}

function SidebarHistoryItem({
  title,
  date,
  value,
  valueColor
}: SidebarHistoryItemProps) {
  return (
    <li className="flex mb-[23px]">
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
}

export default function SidebarHistory() {
  const [userAssetsState] = useContext(UserAssetsDataContext);
  const [transactionState] = useContext(UserTransactionsDataContext);
  const [combinedData, setCombinedData] = useState<CombinedData[]>([]);

  const { userTransactions } = transactionState;
  const { userAssets } = userAssetsState;

  useEffect(() => {
    const combinedData = userTransactions
      .map(transaction => {
        const asset = userAssets.find(
          asset => asset.id === transaction.parent_id
        );
        return {
          ...transaction,
          asset_name: asset?.asset_name,
          asset_symbol: asset?.asset_symbol
        };
      })
      .filter(data => {
        return userAssets.find(asset => asset.id === data.parent_id);
      });

    setCombinedData(combinedData);
  }, [userAssetsState, transactionState]);

  return (
    <div className="w-full text-white mb-10">
      <h1 className="font-bold mb-[17px] text-[24px] leading-[29px]">
        History
      </h1>
      <ul className="w-full">
        {combinedData
          .sort((a, b) => {
            return (
              new Date(b.transaction_date).getTime() -
              new Date(a.transaction_date).getTime()
            );
          })
          .slice(0, 4)
          .map(asset => {
            const isBuy = asset.transaction_type === "buy";
            const transactionAmount = Number(asset.transaction_amount);
            const value = isBuy
              ? `+${transactionAmount.toFixed(2)}`
              : `-${transactionAmount.toFixed(2)}`;
            const valueColor = isBuy ? "text-green-600" : "text-red-600";

            return (
              <SidebarHistoryItem
                key={asset.id}
                title={`${isBuy ? "Bought" : "Sold"} ${asset.asset_symbol}`}
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
