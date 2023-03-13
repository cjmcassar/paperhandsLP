import React from "react";

const RiskInfo = () => {
	return (
		<div className="sm:w-full w-[30%]">
			<h1 className="text-2xl font-bold mb-4">Risk Information</h1>
			<ul className="ml-3 flex flex-col items-start">
				<li className="flex text-xs justify-between items-center mb-2">
					<span className="bg-[#62FF97]  rounded-full h-[22.46px] w-[24px]"></span>
					<span className="ml-3 flex flex-col ">
						<h5>Low Risk Asset Bought</h5>
						<p>July 4, 2023</p>
					</span>
				</li>
				<li className="mb-2 flex text-xs justify-between items-center">
					<span className="bg-[#FFF507] rounded-full h-[22.46px] w-[24px]"></span>
					<span className="ml-3 flex flex-col ">
						<h5>Medium Risk Asset Bought</h5>
						<p>July 2, 2023</p>
					</span>
				</li>
				<li className="mb-2 flex text-xs justify-between items-center">
					<span className="bg-[#62FF97] rounded-full h-[22.46px] w-[24px]"></span>
					<span className="ml-3 flex flex-col">
						<h5>Low Risk Asset Sold</h5>
						<p>June 4, 2023</p>
					</span>
				</li>
				<li className="mb-2 flex text-xs justify-between items-center">
					<span className="bg-[#FC62FF] rounded-full h-[22.46px] w-[24px]"></span>
					<span className="ml-3 flex flex-col">
						<h5>High Risk Asset Bought</h5>
						<p>May 4, 2023</p>
					</span>
				</li>
				<li className="mb-2 flex text-xs justify-between items-center">
					<span className="bg-[#62FF97] rounded-full h-[22.46px] w-[24px]"></span>
					<span className="ml-3 flex flex-col">
						<h5>Low Risk Asset Sold</h5>
						<p>April 4, 2023</p>
					</span>
				</li>
			</ul>
		</div>
	);
};
export default RiskInfo;
