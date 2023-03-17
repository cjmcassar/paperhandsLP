import React from "react";
import Eth from "../svg/eth.svg";
import KebabMenu from "../svg/kebabMenu.svg";
import NFT from "../svg/nft.svg";
import RedDollar from "../svg/redDollar.svg";
import Bank from "../svg/bank.svg";

export default function AssetSummary() {
	return (
		<div className=" flex justify-around ">
			<div className="relative w-[254px] h-[298px] bg-[#1A1C24] rounded-[35px]">
				<div className="absolute top-[38.4px] right-[38.6px]">
					<KebabMenu width="27.2" height="26.8" />
				</div>
				<div className="absolute  top-[52px] left-[26.5px]">
					<Eth width="31.25" height="51.25" />
				</div>
				<div className="absolute top-[140px] left-[26.5px] font-bold text-2xl text-white">
					32 ETH
				</div>
				<div className="w-[91px] h-[56px] absolute top-[196px] left-[26.5px] text-white font-medium text-xl">
					Total Amount
				</div>
			</div>

			<div className="relative w-[254px] h-[298px] bg-[#1A1C24] rounded-[35px]">
				<div className="absolute top-[38.4px] right-[38.6px]">
					<KebabMenu width="27.2" height="26.8" />
				</div>
				<div className="absolute  top-[52px] left-[26.5px]">
					{/* <svg
						xmlns="http://www.w3.org/2000/svg"
						width="56"
						height="46"
						viewBox="0 0 56 46"
						fill="none"
					>
						<path
							d="M35.502 0.500183C36.165 0.500183 36.8009 0.763575 37.2697 1.23242C37.7386 1.70126 38.002 2.33714 38.002 3.00018V8.00018H48.002C48.665 8.00018 49.3009 8.26358 49.7697 8.73242C50.2386 9.20126 50.502 9.83714 50.502 10.5002V40.5002H55.502V45.5002H0.501953V40.5002H5.50195V10.5002C5.50195 9.83714 5.76535 9.20126 6.23419 8.73242C6.70303 8.26358 7.33891 8.00018 8.00195 8.00018H18.002V3.00018C18.002 2.33714 18.2653 1.70126 18.7342 1.23242C19.203 0.763575 19.8389 0.500183 20.502 0.500183H35.502ZM23.002 13.0002H18.002V40.5002H23.002V13.0002ZM38.002 13.0002H33.002V40.5002H38.002V13.0002ZM33.002 5.50018H23.002V8.00018H33.002V5.50018Z"
							fill="#62FF97"
						/>
					</svg> */}
					<Bank width="56" height="46" />
				</div>
				<div className="absolute top-[140px] left-[26.5px] font-bold text-2xl text-[#62FF97]">
					12 ETH
				</div>
				<div className="w-[138px] h-[56px] absolute top-[196px] left-[26.5px] text-white font-medium text-xl">
					Amount Deposited
				</div>
			</div>

			<div className="relative w-[254px] h-[298px] bg-[#1A1C24] rounded-[35px]">
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

			<div className="relative w-[254px] h-[298px] bg-[#1A1C24] rounded-[35px]">
				<div className="absolute top-[38.4px] right-[38.6px]">
					<KebabMenu width="27.2" height="26.8" />
				</div>
				<div className="absolute  top-[52px] left-[26.5px]">
					<NFT width="53" height="52" />
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
