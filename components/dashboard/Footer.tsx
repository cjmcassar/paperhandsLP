import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function FooterCopyright() {
	return (
		<div className="w-full max-w-full px-3 mt-0 mb-6 shrink-0 lg:mb-0 lg:w-1/2 lg:flex-none">
			<div className="text-sm leading-normal text-center text-slate-500 lg:text-left">
				© {new Date().getFullYear()}, made with{" "}
				<FontAwesomeIcon icon={faHeart} /> by{" "}
				<Link href="/">
					<a className="font-semibold text-slate-700 text-white">
						The Paperhands App Team{" "}
					</a>
				</Link>
				for a better web.
			</div>
		</div>
	);
}

function FooterNav() {
	return (
		<div className="w-full max-w-full px-3 mt-0 shrink-0 lg:w-1/2 lg:flex-none">
			<ul className="flex flex-wrap justify-center pl-0 mb-0 list-none lg:justify-end">
				<FooterNavItem href="/" label="PaperHands" />
				<FooterNavItem href="/about" label="About Us" />
				<FooterNavItem href="/contact" label="Contact" />
				<FooterNavItem href="/terms" label="Terms and conditions" />
			</ul>
		</div>
	);
}

function FooterNavItem({ href, label }) {
	return (
		<li className="nav-item">
			<Link href={href}>
				<a className="block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-in-out text-slate-500">
					{label}
				</a>
			</Link>
		</li>
	);
}

export default function Footer() {
	return (
		<>
			<footer className="py-4 bg-phDarkGray text-white">
				<div className="w-full px-6 mx-auto">
					<div className="flex flex-wrap items-center -mx-3 lg:justify-between">
						<FooterCopyright />
						<FooterNav />
					</div>
				</div>
			</footer>
		</>
	);
}
