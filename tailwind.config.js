/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,js,tsx,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        epilogue: ["Epilogue", "sans-serif"],
      },
      boxShadow: {
        secondary: "10px 10px 20px rgba(2, 2, 2, 0.25)",
      },
    },
  },
  plugins: [],
};
