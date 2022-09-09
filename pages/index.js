import Head from "next/head";
import Hero from "../components/hero";
import Navbar from "../components/navbar";
import SectionTitle from "../components/sectionTitle";

import { benefitOne, benefitTwo } from "../components/data";
import Video from "../components/video";
import Benefits from "../components/benefits";
import Footer from "../components/footer";
import Testimonials from "../components/testimonials";
import Cta from "../components/cta";
import Faq from "../components/faq";
import PopupWidget from "../components/popupWidget";

//import dynamic from "next/dynamic";

// const Video = dynamic(() => import("../components/video"));

// const Benefits = dynamic(() => import("../components/benefits"));
// const Footer = dynamic(() => import("../components/footer"));
// const Testimonials = dynamic(() => import("../components/testimonials"));
// const Cta = dynamic(() => import("../components/cta"));
// const Faq = dynamic(() => import("../components/faq"));

// const PopupWidget = dynamic(() => import("../components/popupWidget"));

export default function Home() {
	return (
		<>
			<Head>
				<title>Nextly - Free Nextjs & TailwindCSS Landing Page Template</title>
				<meta
					name="description"
					content="Nextly is a free landing page template built with next.js & Tailwind CSS"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Navbar />
			<Hero />
			<SectionTitle
				pretitle="Paperhands Benefits"
				title=" Why exit your assets one by one with a DEX or CEX when you can use Paperhands?"
			>
				We help you clean up your crypto portfolio by using our protocol to scan
				your wallet and find the best rates to sell. You don't have to waste
				time selling assets one by one or finding a cheap workflow to convert
				your assets into ETH / USDT.
			</SectionTitle>
			<Benefits data={benefitOne} />
			{/* <Benefits imgPos="right" data={benefitTwo} /> */}
			{/* <SectionTitle
				pretitle="Watch a video"
				title="Learn how to fullfil your needs"
			>
				This section is to highlight a promo or demo video of your product.
				Analysts says a landing page with video has 3% more conversion rate. So,
				don't forget to add one. Just like this.
			</SectionTitle> */}
			{/* <Video /> */}
			{/* <SectionTitle
				pretitle="Testimonials"
				title="Here's what our customers said"
			>
				Testimonails is a great way to increase the brand trust and awareness.
				Use this section to highlight your popular customers.
			</SectionTitle> */}
			{/* <Testimonials /> */}
			<SectionTitle pretitle="FAQ" title="Frequently Asked Questions">
				Some questions we get asked a lot.
			</SectionTitle>
			<Faq />
			{/* <Cta /> */}
			<Footer />
			{/* <PopupWidget /> */}
		</>
	);
}
