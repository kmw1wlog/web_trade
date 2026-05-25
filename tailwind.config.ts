import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17211c",
        paper: "#f7f2e8",
        moss: "#315646",
        clay: "#b66b4b",
        oat: "#e8dcc8",
        slateblue: "#506178",
        cream: "#FAF8F3",
        charcoal: "#15171A",
        muted: "#666B73",
        navy: "#152238",
        gold: "#C6A15B",
        green: "#2F6F5E",
        line: "#E8E1D5",
        card: "#FFFFFF"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-display)", "ui-serif", "Georgia"]
      },
      boxShadow: {
        soft: "0 24px 70px rgba(23, 33, 28, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
