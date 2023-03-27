const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
	mode: "jit",
	purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class", // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				trueGray: colors.trueGray,
				phBlack: "#0E0F13",
				phDarkGray: "#17181C",
				phPurple: "#7B62FF",
				phPink: "#FC62FF",
				phYellow: "#FFF507",
				phGreen: "#62FF97",
				phLightGray: "#1A1C24",
			},
		},
		fontFamily: {
			sans: ["Inter", ...defaultTheme.fontFamily.sans],
			stock: [defaultTheme.fontFamily.sans],
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/aspect-ratio")],
};
