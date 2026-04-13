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
        // HireZim AI Brand Colors
        primary: {
          DEFAULT: '#0F4C81',  // HireZim Blue
          light: '#1A6BA0',
          dark: '#0A3558',
          50: '#e6f0f7',
          100: '#cce1ef',
          200: '#99c3df',
          300: '#66a5cf',
          400: '#3387bf',
          500: '#0F4C81',
          600: '#0d3f6c',
          700: '#0a3257',
          800: '#082542',
          900: '#05182d',
        },
        accent: {
          DEFAULT: '#22C55E',  // Green accent
          light: '#4ADE80',
          dark: '#16A34A',
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803d',
        },
        dark: {
          DEFAULT: '#1E293B',
          light: '#334155',
          dark: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;