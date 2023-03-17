import React from "react";
import Eth from "../svg/eth.svg";
import Matic from "../svg/matic.svg";
import NFT from "../svg/nft.svg";

export const History = () => {
	return (
		<div className=" w-full text-white">
			<h1 className=" font-bold mb-[17px] text-[24px] leading-[29px]">
				History
			</h1>
			<ul className="w-full">
				<li className="flex mb-[23px]">
					<div className="relative bg-[#393c4b] w-[51px] h-[51px] rounded-[20px]">
						<div className="absolute left-[19.75px]  top-[14.75px] bottom-[15.75px]">
							<Eth width="12.5px" height="20.5px" />
						</div>
					</div>

					<div className="ml-[15px] flex justify-between items-center  w-[200px]">
						<div className="flex flex-col ">
							<h5 className="font-bold">Bought Eth</h5>
							<p className="text-sm">July 4, 2023</p>
						</div>
						<p className="text-green-600 ">+1.55</p>
					</div>
				</li>
				<li className="flex mb-[23px]">
					<div className="relative  bg-[#393c4b] w-[51px] h-[51px] rounded-[20px]">
						<div className="absolute left-[10px]  top-[9px] bottom-[10px] right-[9px]">
							<Matic width="32px" height="32px" />
						</div>
					</div>

					<div className="ml-[15px] flex justify-between items-center w-[200px]">
						<div className="flex flex-col ">
							<h5 className="font-bold">Bought Matic</h5>
							<p className="text-sm">July 2, 2023</p>
						</div>
						<p className="text-green-600 ">+10.55</p>
					</div>
				</li>
				<li className="flex mb-[23px] ">
					<div className="relative  bg-[#393c4b] w-[51px] h-[51px] rounded-[20px]">
						<div className="absolute left-[19.75px]  top-[14.75px] bottom-[15.75px]">
							<Eth width="12.5px" height="20.5px" />
						</div>
					</div>
					<div className="ml-[15px] flex justify-between items-center w-[200px]">
						<div className="flex flex-col">
							<h5 className="font-bold">Sold Eth</h5>
							<p className="text-sm">June 4, 2023</p>
						</div>
						<p className="text-red-600 ">+1.55</p>
					</div>
				</li>
				<li className="flex mb-[23px] ">
					<div className="relative  bg-[#393c4b] w-[51px] h-[51px] rounded-[20px]">
						<div className="absolute left-[14px]  top-[13px] bottom-[14.45px] right-[13.45px]">
							<NFT fill="white" width="23.55px" height="23.54px" />
						</div>
					</div>
					<div className="ml-[15px] flex justify-between items-center w-[200px]">
						<div className="flex flex-col">
							<h5 className="font-bold">Bought NFT</h5>
							<p className="text-sm">May 4, 2023</p>
						</div>
						<p className="text-green-600 ">+1.55</p>
					</div>
				</li>
				<li className="flex mb-[23px] ">
					<div className="relative bg-[#393c4b] w-[51px] h-[51px] rounded-[20px]">
						<div className="absolute left-[19.75px]  top-[14.75px] bottom-[15.75px]">
							<Eth width="12.5px" height="20.5px" />
						</div>
					</div>
					<div className="ml-[15px] flex justify-between items-center w-[200px]">
						<div className="flex flex-col">
							<h5 className="font-bold">Sold Eth</h5>
							<p className="text-sm">June 4, 2023</p>
						</div>
						<p className="text-red-600 ">+1.55</p>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default History;
