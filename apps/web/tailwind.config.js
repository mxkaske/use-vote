/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts}", "./contentlayer.config.js"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
