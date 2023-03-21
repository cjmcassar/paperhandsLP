import React from "react";
import styles from "./AssetSummary.module.css";
import Eth from "../svg/eth.svg";
import KebabMenu from "../svg/kebabMenu.svg";
import NFT from "../svg/nft.svg";
import RedDollar from "../svg/redDollar.svg";
import Bank from "../svg/bank.svg";

export default function AssetSummary() {
	return (
		<div className={styles.container}>
			<div className={`${styles.assetCard}`}>
				<div className={`${styles.icon}`}>
					<KebabMenu width="27.2" height="26.8" />
				</div>
				<div className={`${styles.symbol}`}>
					<Eth width="31.25" height="51.25" />
				</div>
				<div className={`${styles.amount} ${styles.textWhite}`}>32 ETH</div>
				<div className={`${styles.description}`}>Total Amount</div>
			</div>

			<div className={`${styles.assetCard}`}>
				<div className={`${styles.icon}`}>
					<KebabMenu width="27.2" height="26.8" />
				</div>
				<div className={`${styles.symbol}`}>
					<Bank width="56" height="46" />
				</div>
				<div className={`${styles.amount} ${styles.textGreen}`}>12 ETH</div>
				<div className={`${styles.description}`}>Amount Deposited</div>
			</div>

			<div className={`${styles.assetCard}`}>
				<div className={`${styles.icon}`}>
					<KebabMenu width="27.2" height="26.8" />
				</div>
				<div className={`${styles.symbol}`}>
					<RedDollar width="51" height="50" />
				</div>

				<div className={`${styles.amount} ${styles.textRed}`}>0 ETH</div>

				<div className={`${styles.description}`}>Amount Sold</div>
			</div>

			<div className={`${styles.assetCard}`}>
				<div className={`${styles.icon}`}>
					<KebabMenu width="27.2" height="26.8" />
				</div>
				<div className={`${styles.symbol}`}>
					<NFT className="text-[#FFF962]" width="53" height="52" />
				</div>
				<div className={`${styles.amount} ${styles.textYellow}`}>10</div>
				<div className={`${styles.description}`}>Total NFTs</div>
			</div>
		</div>
	);
}
