import React from "react";

export const History = () => {
	return (
		<div className="w-full">
			<h1 className="font-bold mb-2 text-2xl">History</h1>
			<ul className="w-full">
				<li className="flex space-x-2 mb-3">
					<svg width="50" height="50">
						<circle
							cx="25"
							cy="25"
							r="20"
							stroke="black"
							strokeWidth="1"
							fill="transparent"
						/>
						<svg x="14" y="14" width="22" height="22" viewBox="0 0 340 512">
							<path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
						</svg>
					</svg>
					<div className="flex justify-between items-center  w-[200px]">
						<div className="flex flex-col ">
							<h5 className="font-bold">Bought Eth</h5>
							<p className="text-sm">July 4, 2023</p>
						</div>
						<p className="text-green-600 ">+1.55</p>
					</div>
				</li>
				<li className="flex space-x-2 mb-3">
					<div>
						<svg width="50" height="50">
							<circle
								cx="25"
								cy="25"
								r="20"
								stroke="black"
								strokeWidth="1"
								fill="transparent"
							/>
							<svg
								x="14"
								y="14"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
							>
								<path
									d="M12 12.1L7.5 14.7L3 12.1V6.90005L7.5 4.30005L12 6.90005V8.50005"
									stroke="#17191C"
									strokeWidth="1.5"
									strokeMiterlimit="10"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M12 12.1L16.5 9.5L21 12.1V17.3L16.5 19.9L12 17.3V15.6"
									stroke="#17191C"
									strokeWidth="1.5"
									strokeMiterlimit="10"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</svg>
					</div>

					<div className="flex justify-between items-center w-[200px]">
						<div className="flex flex-col ">
							<h5 className="font-bold">Bought Matic</h5>
							<p className="text-sm">July 2, 2023</p>
						</div>
						<p className="text-green-600 ">+10.55</p>
					</div>
				</li>
				<li className="flex space-x-2 mb-3 ">
					<svg width="50" height="50">
						<circle
							cx="25"
							cy="25"
							r="20"
							stroke="black"
							strokeWidth="1"
							fill="transparent"
						/>
						<svg x="14" y="14" width="22" height="22" viewBox="0 0 340 512">
							<path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
						</svg>
					</svg>
					<div className="flex justify-between items-center w-[200px]">
						<div className="flex flex-col">
							<h5 className="font-bold">Sold Eth</h5>
							<p className="text-sm">June 4, 2023</p>
						</div>
						<p className="text-red-600 ">+1.55</p>
					</div>
				</li>
				<li className="flex space-x-2 mb-3 ">
					<svg width="50" height="50">
						<circle
							cx="25"
							cy="25"
							r="20"
							stroke="black"
							strokeWidth="1"
							fill="transparent"
						/>
						<svg
							x="14"
							y="14"
							width="22"
							height="22"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
						>
							<path d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
						</svg>
					</svg>
					<div className="flex justify-between items-center w-[200px]">
						<div className="flex flex-col">
							<h5 className="font-bold">Bought NFT</h5>
							<p className="text-sm">May 4, 2023</p>
						</div>
						<p className="text-green-600 ">+1.55</p>
					</div>
				</li>
				<li className="flex space-x-2 mb-3 ">
					<svg width="50" height="50">
						<circle
							cx="25"
							cy="25"
							r="20"
							stroke="black"
							strokeWidth="1"
							fill="transparent"
						/>
						<svg x="14" y="14" width="22" height="22" viewBox="0 0 340 512">
							<path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
						</svg>
					</svg>
					<div className="flex justify-between items-center w-[200px]">
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
