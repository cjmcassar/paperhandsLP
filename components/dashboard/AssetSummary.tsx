import React, { FC, useContext } from "react";
import styles from "./AssetSummary.module.css";
import Eth from "../../public/img/brands/eth.svg";
import NFT from "../../public/img/dashboard/icons/nft.svg";
import RedDollar from "../../public/img/dashboard/icons/redDollar.svg";
import Bank from "../../public/img/dashboard/icons/bank.svg";
import { UserAssetsDataContext } from "contexts/userAssetDataContext";
import { UserTransactionsDataContext } from "contexts/userTransactionDataContext";
import { AssetDataContext } from "contexts/apiAssetDataContext";

const AssetSummary: FC = () => {
  const [userAssetsState] = useContext(UserAssetsDataContext);
  const [userTransactionsState] = useContext(UserTransactionsDataContext);
  const { assetData } = useContext(AssetDataContext);

  function convertPriceToNumber(priceString: string) {
    const withoutDollarSign = priceString?.replace("$", "");
    const withoutComma = withoutDollarSign.replace(/,/g, "");
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

  const transactionsWithParentAssets =
    userTransactionsState.userTransactions.map(transaction => {
      const parentAsset = userAssetsWithPrice.find(
        asset => asset.id === transaction.parent_id
      );
      return { ...transaction, parentAsset };
    });

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const lastMonthTransactions = transactionsWithParentAssets
    .filter(transaction => transaction.parentAsset !== undefined)
    .filter(
      transaction => new Date(transaction.transaction_date) >= oneMonthAgo
    );

  const depositsInUSD = lastMonthTransactions.reduce((acc, transaction) => {
    if (transaction.transaction_type === "buy") {
      return (
        acc + transaction?.transaction_amount * transaction.parentAsset.Price
      );
    }
    return acc;
  }, 0);

  console.log("lastMonthTransactions", lastMonthTransactions);

  const soldInUSD = lastMonthTransactions.reduce((acc, transaction) => {
    if (transaction.transaction_type === "sell") {
      return (
        acc + transaction?.transaction_amount * transaction.parentAsset.Price
      );
    }
    return acc;
  }, 0);

  const totalUSDValue = userAssetsWithPrice.reduce((acc, asset) => {
    return acc + asset.total_amount * asset.Price;
  }, 0);

  console.log("userAssetsWithPrice", userAssetsWithPrice);

  return (
    <div className={styles.container}>
      <div className={styles.assetCard}>
        <div className={styles.symbol}>
          <Eth width="31.25" height="51.25" />
        </div>
        <div className={`${styles.amount} ${styles.textWhite}`}>
          ${totalUSDValue.toFixed(2)}
        </div>
        <div className={styles.description}>Total Value (USD)</div>
      </div>

      <div className={styles.assetCard}>
        <div className={styles.symbol}>
          <Bank width="56" height="46" />
        </div>
        <div className={`${styles.amount} ${styles.textGreen}`}>
          ${depositsInUSD.toFixed(2)}
        </div>
        <div className={styles.description}>Deposits (USD)</div>
      </div>

      <div className={styles.assetCard}>
        <div className={styles.symbol}>
          <RedDollar width="51" height="50" />
        </div>
        <div className={`${styles.amount} ${styles.textRed}`}>
          ${soldInUSD.toFixed(2)}
        </div>
        <div className={styles.description}>Amount Sold (USD)</div>
      </div>
    </div>
  );
};

export default AssetSummary;
