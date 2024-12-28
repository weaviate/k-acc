import type { Config } from "tailwindcss";

const goldenRatio = 1.518;
const baseFontSize = 1; // 1rem (16px)
const fontSizes: { [key: string]: string } = {};

for (let i = -3; i <= 6; i++) {
  const size = baseFontSize * Math.pow(goldenRatio, i);
  const roundedSize = size.toFixed(3);
  let name;
  if (i < 0) {
    name = `${-i}xs`; // '1xs', '2xs', '3xs'
  } else if (i === 0) {
    name = "base";
  } else {
    name = i === 1 ? "xl" : `${i}xl`; // 'xl', '2xl', etc.
  }
  fontSizes[name] = `${roundedSize}rem`;
}

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      lg: "640px",
    },
    extend: {
      fontFamily: {
        outfit: ["var(--font-outfit)"],
        merriweather: ["var(--font-merriweather)"],
      },
      colors: {
        background: "#F4F1FD",
        background_alt: "#FBFAFF",
        primary: "#181620",
        secondary: "#ffffff",
        accent: "#7D69F0",
        warning: "#DE774B",
        background_blue: "#DDEFFF",
        background_purple: "#DED8FF",
      },
      fontSize: fontSizes,
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#181620",

          secondary: "#ffffff",

          accent: "#7d69f0",

          neutral: "#f4f1fd",

          "base-100": "#f4f1fd",

          info: "#5dacf5",

          success: "#34d399",

          warning: "#fde047",

          error: "#fb7185",
        },
      },
    ],
  },
};

export default config;
