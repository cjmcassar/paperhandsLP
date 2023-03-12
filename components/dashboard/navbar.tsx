import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
	return (
		<nav
			className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all ease-in shadow-none duration-250 rounded-2xl lg:flex-nowrap lg:justify-start"
			navbar-scroll="false"
		>
			<div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
				<nav>
					<h6 className="mb-0 font-bold text-white capitalize">Dashboard</h6>
					<ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
						<li
							className="text-sm  capitalize leading-normal text-white before:float-left before:pr-2 before:text-white "
							aria-current="page"
						>
							Your Crypto Assets
						</li>
					</ol>
				</nav>

				<div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
					<div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
						<div className="flex items-center md:ml-auto md:pr-4">
							<div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease">
								<span className="text-sm ease leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
									<FontAwesomeIcon
										className="text-gray-500 opacity-100"
										icon={faSearch as IconProp}
									/>
								</span>
								<input
									type="text"
									className="pl-9 text-sm focus:shadow-primary-outline ease w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 dark:bg-slate-850 dark:text-white bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:transition-shadow"
									placeholder="Search Here"
									style={{ color: "black" }}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
