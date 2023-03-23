import React from "react";
import styles from "./CryptoHistoryTable.module.css";

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
	return (
		<>
			<div className="overflow-x-auto rounded-lg">
				<h2>Crypto History</h2>
				<table
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
					<tbody className={`${styles.CryptoHistoryTable}`}>
						{transactions.map((transaction) => (
							<tr
								key={transaction.id}
								className="bg-black bg-opacity-20 border-b-2 border-gray-600 hover:bg-opacity-30"
							>
								<td className="font-bold px-6 py-4 text-xs">
									{transaction.type}
								</td>
								<td className="px-6 py-4 text-xs">{transaction.date}</td>
								<td className="px-6 py-4 text-xs">{transaction.symbol}</td>
								<td className="px-6 py-4 text-xs">{transaction.crypto}</td>
								<td className="px-6 py-4 text-xs">{transaction.amount}</td>
								<td className="px-6 py-4 text-xs">{transaction.value}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default CryptoHistory;
