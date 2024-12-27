import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blue: {
          50: "#DFDFF0",
          75: "#dfdff2",
          100: "#F0F2FA",
          200: "#010101",
          300: "#4FB7DD",
        },
        violet: {
          300: "#5724ff",
        },
        yellow: {
          100: "#8e983f",
          300: "#edff66",
        },
      },
      fontFamily: {
        'circular-web': ['var(--font-circular-web)', 'sans-serif'],
        'general': ['var(--font-general)', 'sans-serif'],
        'robert-medium': ['var(--font-robert-medium)', 'sans-serif'],
        'robert-regular': ['var(--font-robert-regular)', 'sans-serif'],
        'zentry': ['var(--font-zentry-regular)', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;
