import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
	faUser,
	faBars,
	faCog,
	faBell,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";
import SidebarHistory from "./SidebarHistory";
import RiskInfo from "../RiskInfo";

import styles from "../sidebar/RightHandSidebar.module.css";
import LoginFormModal from "../LoginFormModal";

function UserSignIn() {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	};

	const openModal = () => {
		setDropdownOpen(false);
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	const [modalOpen, setModalOpen] = useState(false);

	return (
		<li className={styles.listItem}>
			<div className="relative">
				<button className="cursor-pointer" onClick={toggleDropdown}>
					<div className={`${styles.userIcon} bg-phLightGray`}>
						<FontAwesomeIcon icon={faUser} size="1x" />
					</div>
				</button>

				{dropdownOpen && (
					<div className={`${styles.dropdownMenu} bg-phLightGray`}>
						<button className={styles.dropdownItem} onClick={openModal}>
							🪵 Login
						</button>
					</div>
				)}
				{modalOpen && <LoginFormModal onClose={closeModal} />}
			</div>
		</li>
	);
}

function Settings() {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	};

	return (
		<li className={`${styles.listItem} px-4 `}>
			<div className="relative">
				<button
					className="cursor-pointer p-0 text-sm text-white transition-all ease-nav-brand"
					onClick={toggleDropdown}
				>
					<div className={`${styles.iconBorder} bg-phLightGray`}>
						<FontAwesomeIcon
							className={styles.iconSize}
							icon={faCog as IconProp}
						/>
					</div>
				</button>
				{dropdownOpen && (
					<div className={`${styles.dropdownMenu} bg-phLightGray`}>
						<Link href="/login">
							<a className={styles.dropdownItem}>👨🏽‍💼 Account</a>
						</Link>
						<Link href="/login">
							<a className={styles.dropdownItem}>📋 Give us feedback!</a>
						</Link>
						<Link href="/register">
							<a className={styles.dropdownItem}>🙏🏼 Invite a friend</a>
						</Link>
					</div>
				)}
			</div>
		</li>
	);
}

function Notifications() {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	};

	return (
		<li className={`${styles.listItem}`}>
			<div className="relative">
				<button
					className="cursor-pointer p-0 text-sm text-white transition-all ease-nav-brand"
					onClick={toggleDropdown}
				>
					<div className={`${styles.iconBorder} bg-phLightGray`}>
						<FontAwesomeIcon
							className={styles.iconSize}
							icon={faBell as IconProp}
						/>
					</div>
				</button>
				{dropdownOpen && (
					<div className={`${styles.dropdownMenu} bg-phLightGray`}>
						<Link href="#">
							<a className={styles.dropdownItem}>
								Your risk values have changed!
							</a>
						</Link>
					</div>
				)}
			</div>
		</li>
	);
}

export default function RightHandSidebar(): JSX.Element {
	return (
		<>
			<nav className={styles.nav}>
				<div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
					<ul className="flex flex-row justify-start pl-7 mb-0 list-none md-max:w-full pt-4">
						<UserSignIn />
						<Settings />
						<Notifications />
					</ul>
					<div className="pl-7 pb-5">
						<SidebarHistory />
						<RiskInfo />
					</div>
				</div>
			</nav>
		</>
	);
}
