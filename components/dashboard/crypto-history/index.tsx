import React from "react";
import CryptoHistoryHeader from "./CryptoHistoryHeader";
import CryptoHistoryTable from "./CryptoHistoryTable";

import { CryptoTransaction } from "./CryptoHistoryTable";

const exampleTransactions: CryptoTransaction[] = [
	{
		id: 1,
		date: "2023-03-01",
		crypto: "Bitcoin",
		symbol: "BTC",
		amount: 0.5,
		value: 25000,

		type: "buy",
	},
	{
		id: 2,
		date: "2023-03-10",
		crypto: "Ethereum",
		symbol: "ETH",
		amount: 2,
		value: 5000,
		type: "buy",
	},
	{
		id: 3,
		date: "2023-03-15",
		crypto: "Bitcoin",
		symbol: "BTC",
		amount: 0.3,
		value: 15000,
		type: "sell",
	},
	{
		id: 4,
		date: "2023-03-20",
		crypto: "Ethereum",
		symbol: "ETH",
		amount: 1,
		value: 2500,
		type: "sell",
	},
];

function CryptoHistory() {
	return (
		<>
			<CryptoHistoryHeader />
			<CryptoHistoryTable transactions={exampleTransactions} />
		</>
	);
}

export default CryptoHistory;
