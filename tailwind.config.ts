import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'trending': "/arcane.png",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        netflixRed: '#e50914',
      },
    },
  },
  plugins: [],
} satisfies Config;
