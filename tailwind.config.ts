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
          900: "#0D3B66",
          800: "#0A2C4D",
        },
        sand: {
          50: "#F5F3EF",
        },
        gold: {
          500: "#F1B21D",
          400: "#F5C961",
        },
        orange: "#F26A21",
        rust: "#D64A1A",
        ink: {
          DEFAULT: "#2E2717",
          light: "#827D74",
        },
        teal: {
          DEFAULT: "#006A6D",
          100: "#E6F0F0",
        },
        success: "#006A6D",
        error: "#D64A1A",
      },
      fontFamily: {
        heading: ["Nunito Sans", "Inter", "system-ui", "sans-serif"],
        body: ["Poppins", "system-ui", "sans-serif"],
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
