import React from "react";

function RiskInfoItem({ color, title, date }) {
	return (
		<li className="flex text-xs justify-between items-center mb-2">
			<span
				className={`rounded-full h-[22.46px] w-[24px]`}
				style={{ backgroundColor: color }}
			></span>
			<span className="ml-3 flex flex-col">
				<h5>{title}</h5>
				<p>{date}</p>
			</span>
		</li>
	);
}

export default function RiskInfo() {
	return (
		<div className="sm:w-full w-[30%] text-white">
			<h1 className="text-2xl font-bold mb-4">Risk Information</h1>
			<ul className="ml-3 flex flex-col items-start">
				<RiskInfoItem
					color="#62FF97"
					title="Low Risk Asset Bought"
					date="July 4, 2023"
				/>
				<RiskInfoItem
					color="#FFF507"
					title="Medium Risk Asset Bought"
					date="July 2, 2023"
				/>
				<RiskInfoItem
					color="#62FF97"
					title="Low Risk Asset Sold"
					date="June 4, 2023"
				/>
				<RiskInfoItem
					color="#FC62FF"
					title="High Risk Asset Bought"
					date="May 4, 2023"
				/>
				<RiskInfoItem
					color="#62FF97"
					title="Low Risk Asset Sold"
					date="April 4, 2023"
				/>
			</ul>
		</div>
	);
}
