import {
	EmojiHappyIcon,
	ChartSquareBarIcon,
	CursorClickIcon,
	DeviceMobileIcon,
	AdjustmentsIcon,
	SunIcon,
} from "@heroicons/react/outline";

import benefitOneImg from "../public/img/benefit-one.png";
import benefitTwoImg from "../public/img/benefit-two.png";

const benefitOne = {
	title: "Simple interface to get out of your assets",
	desc: "Casual traders want to get out of their assets to ETH / USDT as fast as possible. Paperhands makes it easy to sell your assets at the best rates.",
	image: benefitOneImg,
	bullets: [
		{
			title: "Easy workflow to cash out",
			desc: "Clean out your portfolio with a few clicks then cash out with one asset to a CEX.",
			icon: <EmojiHappyIcon />,
		},
		{
			title: "Improve your profit taking strategy",
			desc: "Exit your assets to a stablecoin when you see the market getting shakey.",
			icon: <ChartSquareBarIcon />,
		},
		{
			title: "Easy to use on desktop and mobile",
			desc: "With a few clicks you can jump into ETH or USDT with your assets.",
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
