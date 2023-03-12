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
			<Footer />
		</>
	);
}
