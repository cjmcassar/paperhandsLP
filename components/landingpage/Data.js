import {
	EmojiHappyIcon,
	ChartSquareBarIcon,
	CursorClickIcon,
	DeviceMobileIcon,
	AdjustmentsIcon,
	SunIcon,
} from "@heroicons/react/outline";

import benefitOneImg from "../../public/img/benefit-one.png";
import benefitTwoImg from "../../public/img/benefit-two.png";

const benefitOne = {
	title: "More than a dashboard. We keep you informed.",
	desc: "Paper Hands doesn't end after your initial risk audit. The market changes everyday. That's why our specialist team and bot sidekicks track new developments that impact risk daily. We go out of our way to keep you informed!",
	image: benefitOneImg,
	bullets: [
		{
			title: "Best Practices & Benchmarks",
			desc: "If we notice risk in your portfolio, we'll explain why it's risky and share our top recommendations to keep your crypto safe. We'll even benchmark your risk level against our recommended risk distribution.",
			icon: <EmojiHappyIcon />,
		},
		{
			title: "An ever-growing risk database",
			desc: "Our database includes over 2100 assets and 37 storage methods, and this is growing everyday.",
			icon: <ChartSquareBarIcon />,
		},
		{
			title: "Keeping you informed",
			desc: "Don't worry about logging into the app everyday. We'll reach out by email whenever one of your assets has increased its risk level. We'll share some context around the change and recommendations to improve your portfolio health.",
			icon: <CursorClickIcon />,
		},
	],
};

const benefitTwo = {
	title: "Offer more benefits here",
	desc: "You can use this same layout with a flip image to highlight your rest of the benefits of your product. It can also contain an image or Illustration as above section along with some bullet points.",
	image: benefitTwoImg,
	bullets: [
		{
			title: "Mobile Responsive Template",
			desc: "Nextly is designed as a mobile first responsive template.",
			icon: <DeviceMobileIcon />,
		},
		{
			title: "Powered by Next.js & TailwindCSS",
			desc: "This template is powered by latest technologies and tools.",
			icon: <AdjustmentsIcon />,
		},
		{
			title: "Dark & Light Mode",
			desc: "Nextly comes with a zero-config light & dark mode. ",
			icon: <SunIcon />,
		},
	],
};

export { benefitOne, benefitTwo };
