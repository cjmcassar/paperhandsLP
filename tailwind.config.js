const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#7B62FF",
        secondary: "#D9D9D9",
        success: "#62FF97",
        danger: "#FF6262",
        warning: "#FFF962",
        info: "#D9D9D9",
        light: "#FFFFFF",
        dark: "#0E0F13",
        darkGrey: "#171C1C",
        LightGrey: "#1A1C24",
        trueGrey: colors.trueGray
      }
    },
    fontFamily: {
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
      stock: [defaultTheme.fontFamily.sans]
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require("@tailwindcss/aspect-ratio")]
};
