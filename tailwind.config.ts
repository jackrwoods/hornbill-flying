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
        // Palette (raw)
        palette: {
          "blue-900": "#004E7C",
          "blue-800": "#003A60",
          "cream-50": "#FFF8EC",
          "cream-25": "#FFFDF6",
          "gold-500": "#F8AF12",
          "gold-400": "#F9A90C",
          coral: "#F45115",
          "coral-600": "#C8410D",
          "teal-500": "#007C80",
          "teal-100": "#E6F0F0",
          ink: "#2E2717",
          "ink-light": "#827D74",
          white: "#FFFFFF",
        },
        // Intent
        bg: "var(--color-bg)",
        card: "var(--color-card)",
        input: "var(--color-input)",
        dark: "var(--color-dark)",
        "dark-muted": "var(--color-dark-muted)",
        body: "var(--color-body)",
        muted: "var(--color-muted)",
        heading: "var(--color-heading)",
        "on-dark": "var(--color-on-dark)",
        "on-dark-muted": "var(--color-on-dark-muted)",
        accent: "var(--color-accent)",
        "accent-hover": "var(--color-accent-hover)",
        "on-accent": "var(--color-on-accent)",
        alert: "var(--color-alert)",
        "alert-hover": "var(--color-alert-hover)",
        "on-alert": "var(--color-on-alert)",
        active: "var(--color-active)",
        success: "var(--color-success)",
        "on-success": "var(--color-on-success)",
        callout: "var(--color-callout)",
        "on-callout": "var(--color-on-callout)",
        error: "var(--color-error)",
        "focus-ring": "var(--color-focus-ring)",
        divider: "var(--color-divider)",
        // Header
        "header-bg": "var(--color-header-bg)",
        "header-hover-border": "var(--color-header-hover-border)",
        "header-cheatline": "var(--color-header-cheatline)",
        "header-button-1-bg": "var(--color-header-button-1-bg)",
        "header-button-1-text": "var(--color-header-button-1-text)",
        "header-button-2-bg": "var(--color-header-button-2-bg)",
        "header-button-2-text": "var(--color-header-button-2-text)",
        "header-button-3-bg": "var(--color-header-button-3-bg)",
        "header-button-3-text": "var(--color-header-button-3-text)",
        "header-button-4-bg": "var(--color-header-button-4-bg)",
        "header-button-4-text": "var(--color-header-button-4-text)",
        "header-button-5-bg": "var(--color-header-button-5-bg)",
        "header-button-5-text": "var(--color-header-button-5-text)",
        "header-cta-bg": "var(--color-header-cta-bg)",
        "header-cta-text": "var(--color-header-cta-text)",
        "header-cta-hover": "var(--color-header-cta-hover)",
        // Footer
        "footer-bg": "var(--color-footer-bg)",
        "footer-text": "var(--color-footer-text)",
        "footer-muted": "var(--color-footer-muted)",
        "footer-link": "var(--color-footer-link)",
        "footer-link-hover": "var(--color-footer-link-hover)",
        // Legacy aliases (deprecated)
        navy: {
          900: "var(--color-navy-900)",
          800: "var(--color-navy-800)",
        },
        sand: {
          50: "var(--color-sand-50)",
        },
        gold: {
          500: "var(--color-gold-500)",
          400: "var(--color-gold-400)",
        },
        orange: "var(--color-orange)",
        rust: "var(--color-rust)",
        ink: {
          DEFAULT: "var(--color-ink)",
          light: "var(--color-ink-light)",
        },
        teal: {
          DEFAULT: "var(--color-teal)",
          100: "var(--color-teal-100)",
          700: "var(--palette-teal-700)",
        },
      },
      fontFamily: {
        heading: ["Nunito Sans", "system-ui", "sans-serif"],
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