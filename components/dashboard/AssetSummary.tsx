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
				<div className="w-[91px] h-[56px] absolute top-[196px] left-[26.5px] text-white font-medium text-xl">
					Total Amount
				</div>
			</div>

			<div className={`${styles.assetCard}`}>
				<div className="absolute top-[38.4px] right-[38.6px]">
					<KebabMenu width="27.2" height="26.8" />
				</div>
				<div className="absolute  top-[52px] left-[26.5px]">
					<Bank width="56" height="46" />
				</div>
				<div className="absolute top-[140px] left-[26.5px] font-bold text-2xl text-[#62FF97]">
					12 ETH
				</div>
				<div className="w-[138px] h-[56px] absolute top-[196px] left-[26.5px] text-white font-medium text-xl">
					Amount Deposited
				</div>
			</div>

			<div className={`${styles.assetCard}`}>
				<div className="absolute top-[38.4px] right-[38.6px]">
					<KebabMenu width="27.2" height="26.8" />
				</div>
				<div className="absolute  top-[52px] left-[26.5px]">
					<RedDollar width="51" height="50" />
				</div>

				<div className="absolute top-[140px] left-[26.5px] font-bold text-2xl text-[#FF6262]">
					0 ETH
				</div>

				<div className="w-[91px] h-[56px] absolute top-[196px] left-[26.5px] text-white font-medium text-xl">
					Amount Sold
				</div>
			</div>

			<div className={`${styles.assetCard}`}>
				<div className="absolute top-[38.4px] right-[38.6px]">
					<KebabMenu width="27.2" height="26.8" />
				</div>
				<div className="absolute  top-[52px] left-[26.5px]">
					<NFT className="text-[#FFF962]" width="53" height="52" />
				</div>
				<div className="absolute top-[140px] left-[26.5px] font-bold text-[32px] leading-[39px] text-[#FFF962]">
					10
				</div>
				<div className="w-[91px] h-[56px] absolute top-[196px] left-[26.5px] text-white font-medium text-xl">
					Total NFTs
				</div>
			</div>
		</div>
	);
}
