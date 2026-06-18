import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#0B1C2C",
          800: "#142A3D",
        },
        cream: {
          50: "#F7F4EC",
        },
        gold: {
          500: "#C89F4F",
          400: "#DDB970",
        },
        orange: {
          500: "#E87A2A",
          400: "#F2954F",
        },
        ink: {
          DEFAULT: "#1A1A1A",
          light: "#5A6573",
        },
        sky: {
          100: "#E3EFF7",
        },
        success: "#2D7A46",
        error: "#B52B2B",
      },
      fontFamily: {
        heading: ["Instrument Serif", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "Courier New", "monospace"],
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [],
};

export default config;
