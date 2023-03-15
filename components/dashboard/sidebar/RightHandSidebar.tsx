import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
	faUser,
	faBars,
	faCog,
	faBell,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import History from "../history";
import RiskInfo from "../riskInfo";

import styles from "../sidebar/RightHandSidebar.module.css";

function UserSignIn() {
	return (
		<li className={styles.listItem}>
			<Link href="">
				<a className="cursor-pointer">
					<div className={styles.userIcon}>
						<FontAwesomeIcon icon={faUser} size="1x" />
					</div>
				</a>
			</Link>
		</li>
	);
}

function Settings() {
	return (
		<li className={`${styles.listItem} px-4`}>
			<a className="cursor-pointer p-0 text-sm text-white transition-all ease-nav-brand">
				<div className={styles.iconBorder}>
					<FontAwesomeIcon
						className={styles.iconSize}
						icon={faCog as IconProp}
					/>
				</div>
			</a>
		</li>
	);
}

function Notifications() {
	return (
		<li className={`${styles.listItem} pr-4`}>
			<a className="cursor-pointer p-0 text-sm text-white transition-all ease-nav-brand">
				<div className={styles.iconBorder}>
					<FontAwesomeIcon
						className={styles.iconSize}
						icon={faBell as IconProp}
					/>
				</div>
			</a>
		</li>
	);
}

export default function RightHandSidebar(): JSX.Element {
	return (
		<>
			<nav className={styles.nav}>
				<div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
					<ul className="flex flex-row justify-center pl-0 mb-0 list-none md-max:w-full pt-4">
						<UserSignIn />
						<Settings />
						<Notifications />
					</ul>
					<History />
					<RiskInfo />
				</div>
			</nav>
		</>
	);
}
