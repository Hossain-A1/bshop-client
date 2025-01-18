/** @type {import('tailwindcss').Config} */
export default {
  safelist: [
    'border-black',
    'bg-bg_color',
    'bg-bg_org',
    'border-org',
  ],
  
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg_color: "#FFFFFF",
        bg_org: "#FB8114",
        org:"#FB8114"
      },
    },
  },
  plugins: [],
};
