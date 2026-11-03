import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        curvd: {
          dark: "#2A3743",
          text: "#252220",
          muted: "#756E6E",
          brown: "#704F30",
          brownHover: "#5a3e25",
          sand: "#BAA694",
          cream: "#F3EEEA",
          lightCream: "#F8F6F5",
          border: "#E1D7CD",
          greenBadgeBg: "#D2E1D7",
          greenBadgeText: "#244317",
          greenCheck: "#2C8349",
          redPulse: "#C20000",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        fustat: ["Fustat", "sans-serif"],
        cerebri: ["Cerebri Sans Pro", "sans-serif"],
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        pulseFast: "pulse 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

