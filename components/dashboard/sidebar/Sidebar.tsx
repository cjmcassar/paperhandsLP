import React, { useState } from "react";
import Link from "next/link";
import {
	faBars,
	faTimes,
	faBox,
	faChartSimple,
	faClockRotateLeft,
	faGear,
	faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import SidebarItem from "./SidebarItem";

import styles from "./Sidebar.module.css";

function Toggler({ onClick }) {
	return (
		<button className={styles.toggler} type="button" onClick={onClick}>
			<FontAwesomeIcon icon={faBars as IconProp} />
		</button>
	);
}

function Brand() {
	return (
		<Link href="/">
			<a href="#pablo" className={styles.brand}>
				Paperhands
			</a>
		</Link>
	);
}

function CollapseHeader({ onClose }) {
	return (
		<div className={styles.collapseHeader}>
			<div className="flex flex-wrap">
				<div className="w-6/12">
					<Link href="/">
						<a href="#" className={styles.link}></a>
					</Link>
				</div>
				<div className="w-6/12 flex justify-end">
					<button type="button" className={styles.button} onClick={onClose}>
						<FontAwesomeIcon icon={faTimes as IconProp} />
					</button>
				</div>
			</div>
		</div>
	);
}

function NavigationItems() {
	return (
		<ul className="md:flex-col md:min-w-full flex flex-col list-none text-lg">
			<li className="items-center">
				<SidebarItem
					href="/dashboard"
					iconSrc="/img/dashboard/icons/dashboard.svg"
				>
					Dashboard
				</SidebarItem>
			</li>
			<li className="items-center">
				<SidebarItem
					href="/risk-review"
					iconSrc="/img/dashboard/icons/analytics.svg"
				>
					Risk Review
				</SidebarItem>
			</li>
			<li className="items-center">
				<SidebarItem href="/history" iconSrc="/img/dashboard/icons/history.svg">
					History
				</SidebarItem>
			</li>
		</ul>
	);
}

function NavigationFooter() {
	return (
		<ul className="mt-auto md:flex-col md:min-w-full flex flex-col list-none md:mb-4 text-lg ">
			<Divider />
			<li className="items-center mb-5">
				<SidebarItem
					href="/settings"
					iconSrc="/img/dashboard/icons/settings.svg"
				>
					Settings
				</SidebarItem>
			</li>
			<li className="items-center mb-5">
				<SidebarItem href="/contact" iconSrc="/img/dashboard/icons/contact.svg">
					Contact Us
				</SidebarItem>
			</li>
		</ul>
	);
}

function Divider() {
	return <hr className={styles.divider} />;
}

export default function Sidebar() {
	const [collapseShow, setCollapseShow] = useState("hidden");
	return (
		<>
			<nav className={`${styles.sidebar} bg-phDarkGray`}>
				<div className={styles.container}>
					<Toggler onClick={undefined} />
					<Brand />
					{/* Collapse */}
					<div
						className={`${styles.collapse} ${collapseShow} ${styles.collapseShadow}`}
					>
						<CollapseHeader onClose={() => setCollapseShow("hidden")} />
						<NavigationItems />
						<NavigationFooter />
					</div>
				</div>
			</nav>
		</>
	);
}
