/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        NBold: ["NBold"],
        pregular: ["Preg"],
        NBook: ["NBook"],
        NDemi: ["NDemi"],
        NRegular: ["NRegular"],
      },
      colors: {
        primary: "#5c4500",
        secondary: "#ffbc00",
        bgcolor:"#ebebec",
        third: "#938d82",
        fourth: "#eae3d9",
        customeBlack: "#373b41",
        blackDark: "#2c3036",
        gray: "#686f78",
      },
    },
    screens: {
      "2xl": { max: "1540px" },
      xl: { max: "1280px" },
      lg: { max: "1092px" },
      md: { max: "1024px" },
      sm: { max: "850px" },
      xs: { max: "480px" },
    },
  },
  plugins: [],
};
