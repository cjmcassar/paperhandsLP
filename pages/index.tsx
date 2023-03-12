import Head from "next/head";
import Hero from "../components/hero";
import Navbar from "../components/navbar";
import SectionTitle from "../components/sectionTitle";

import { benefitOne } from "../components/data";
import Benefits from "../components/benefits";
import Footer from "../components/footer";
import Faq from "../components/faq";

export default function Home() {
	return (
		<>
			<Head>
				<title>Paperhands: Identify risk in your crypto portfolio</title>
				<meta
					name="description"
					content="Paperhands: Identify risk in your crypto portfolio"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Navbar />
			<Hero />
			<SectionTitle
				pretitle="Paperhands Benefits"
				title="We're a portfolio tracker that specialize in risk management"
			>
				We review the risk of crypto assets, blockchains and storage methods to
				give you a FREE RISK AUDIT. We monitor your assets in real-time to track
				the health of your portfolio over time and give you the most up-to-date
				information.
			</SectionTitle>
			<Benefits data={benefitOne} />
			<SectionTitle pretitle="FAQ" title="Frequently Asked Questions">
				Some questions we get asked a lot.
			</SectionTitle>
			<Faq />
			{/* <div className="flex justify-center ">
				<div className="flex items-start sm:space-y-0 sm:items-center sm:flex-row border-4 border-indigo-600 rounded-md">
					<a
						href="https://paperhands.vercel.app/"
						target="_blank"
						rel="noopener"
						className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600"
					>
						Get Early Access
					</a>
					<a
						href="/"
						target="_blank"
						rel="noopener"
						className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-lg font-medium text-center  px-8 py-3"
					>
						<svg
							role="img"
							width="24"
							height="24"
							className="w-5 h-5"
							viewBox="0 0 24 24"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>GitHub</title>
							<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
						</svg>
						<span> View on Github</span>
					</a>
				</div>
			</div> */}
			{/* <div className="flex justify-center"> */}
			<div className="flex justify-center">
				<div className="flex flex-col  sm:items-center">
					<a
						href="https://paperhands.vercel.app/"
						target="_blank"
						rel="noopener"
						className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md "
					>
						Get Early Access
					</a>
					<a
						href="/"
						target="_blank"
						rel="noopener"
						className="flex items-center px-8 py-4 space-x-2 text-gray-500 dark:text-gray-400"
					>
						<svg
							role="img"
							width="24"
							height="24"
							className="w-5 h-5"
							viewBox="0 0 24 24"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>GitHub</title>
							<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
						</svg>
						<span> View on Github</span>
					</a>
				</div>
			</div>

			{/* </div> */}

			<Footer />
		</>
	);
}
