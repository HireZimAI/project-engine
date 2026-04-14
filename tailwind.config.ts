import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#B02DD6',
          purpleLight: '#D966E8',
          purpleDark: '#8B1FAE',
          black: '#111111',
          white: '#FFFFFF',
          gray: '#6B7280',
          purpleTint: '#F3E8F9',
        },
        primary: {
          DEFAULT: '#B02DD6',
          light: '#D966E8',
          dark: '#8B1FAE',
          50: '#F3E8F9',
          100: '#EBD4F3',
          200: '#D7A9E7',
          300: '#C37EDB',
          400: '#B02DD6',
          500: '#9B21C4',
          600: '#7A1A9B',
          700: '#5C1275',
          800: '#3F0C51',
          900: '#23062E',
        },
        accent: {
          DEFAULT: '#22C55E',
          light: '#4ADE80',
          dark: '#16A34A',
        },
        dark: {
          DEFAULT: '#111111',
          light: '#333333',
          dark: '#000000',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': 'linear-gradient(135deg, #B02DD6 0%, #6B0F87 40%, #111111 100%)',
      },
    },
  },
  plugins: [],
};

export default config;