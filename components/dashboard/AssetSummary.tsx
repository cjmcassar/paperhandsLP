import React from "react";
import Eth from "../svg/eth.svg";
import KebabMenu from "../svg/kebabMenu.svg";
import NFT from "../svg/nft.svg";

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
					<svg
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
					</svg>
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
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="51"
						height="50"
						viewBox="0 0 51 50"
						fill="none"
					>
						<path
							d="M30.0027 2.28011e-06C34.5776 -0.00218138 39.015 1.56417 42.5748 4.43781C46.1346 7.31146 48.6016 11.3187 49.5644 15.7912C50.5271 20.2637 49.9275 24.931 47.8653 29.0149C45.8032 33.0987 42.4033 36.3521 38.2327 38.2325C36.8996 41.1798 34.8715 43.7597 32.3224 45.7511C29.7732 47.7424 26.7791 49.0858 23.5968 49.6659C20.4145 50.2459 17.139 50.0455 14.0511 49.0817C10.9633 48.1179 8.15531 46.4195 5.868 44.1322C3.58068 41.8449 1.8823 39.0369 0.918505 35.9491C-0.0452895 32.8613 -0.245732 29.5857 0.334367 26.4034C0.914466 23.2211 2.25779 20.227 4.24915 17.6778C6.2405 15.1287 8.82044 13.1006 11.7677 11.7675C13.3531 8.25973 15.9167 5.28376 19.1511 3.19652C22.3855 1.10929 26.1533 -0.000592662 30.0027 2.28011e-06ZM22.5027 17.5H17.5027V20C15.878 19.996 14.3156 20.6249 13.1467 21.7534C11.9778 22.8818 11.2942 24.421 11.2409 26.0449C11.1876 27.6687 11.7687 29.2495 12.8611 30.4522C13.9535 31.6549 15.4712 32.3849 17.0927 32.4875L17.5027 32.5H22.5027L22.7277 32.52C23.0159 32.5722 23.2767 32.7239 23.4644 32.9487C23.6522 33.1735 23.755 33.4571 23.755 33.75C23.755 34.0429 23.6522 34.3265 23.4644 34.5513C23.2767 34.7761 23.0159 34.9278 22.7277 34.98L22.5027 35H12.5027V40H17.5027V42.5H22.5027V40C24.1274 40.004 25.6898 39.3751 26.8588 38.2466C28.0277 37.1182 28.7112 35.579 28.7646 33.9551C28.8179 32.3313 28.2367 30.7505 27.1444 29.5478C26.052 28.3451 24.5342 27.6151 22.9127 27.5125L22.5027 27.5H17.5027L17.2777 27.48C16.9895 27.4278 16.7288 27.2761 16.541 27.0513C16.3533 26.8265 16.2504 26.5429 16.2504 26.25C16.2504 25.9571 16.3533 25.6735 16.541 25.4487C16.7288 25.2239 16.9895 25.0722 17.2777 25.02L17.5027 25H27.5027V20H22.5027V17.5ZM30.0027 5C27.8844 4.99752 25.7898 5.44485 23.8573 6.3124C21.9248 7.17995 20.1985 8.44795 18.7927 10.0325C21.6184 9.86097 24.4483 10.2912 27.0952 11.2949C29.7422 12.2985 32.146 13.8526 34.1476 15.8545C36.1492 17.8563 37.703 20.2602 38.7063 22.9073C39.7096 25.5544 40.1396 28.3844 39.9677 31.21C42.2408 29.1891 43.8457 26.5249 44.5698 23.5708C45.2938 20.6167 45.1027 17.5123 44.0218 14.6693C42.9409 11.8263 41.0213 9.3791 38.5175 7.65221C36.0138 5.92532 33.0442 5.00036 30.0027 5Z"
							fill="#FF6262"
						/>
					</svg>
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
