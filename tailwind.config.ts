import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05070d",
        panel: "#0c1220",
        line: "#1f2b43",
        gold: "#d6aa3d",
        blue: "#2f81f7",
        bullish: "#20c997",
        neutral: "#e4b93a",
        bearish: "#ef4444"
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans TC", "Arial", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 40px rgba(214,170,61,.14)"
      }
    }
  },
  plugins: []
};

export default config;
