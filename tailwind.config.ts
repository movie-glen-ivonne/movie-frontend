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
      zIndex: {
        '100': '100',
        '999': '999',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        netflixRed: '#e50914',
        selfMessage: '#2B2B40',
        otherMessage: '#292929'
      },
      animation: {
        blink: 'blink 1s steps(2, start) infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
