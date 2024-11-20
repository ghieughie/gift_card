/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "16px",
    },
    // fontFamily: {
    //   roboto: ["Roboto Mono"],
    // },
    extend: {
      colors: {
        primary: "#0ea5e9",
        secondary: "#64748b",
        dark: "#0f172a",
      },
      screens: {
        "sm": "375px",
        "2xl": "1320px",
      },
    },
  },
  plugins: [],
  // purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  // mode: 'jit',
};
