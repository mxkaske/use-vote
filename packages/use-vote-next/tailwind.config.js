/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "collabsible-open": {
          from: { height: 0, opacity: 0 },
          to: { height: "var(--radix-collapsible-content-height)", opacity: 1 },
        },
        "collabsible-close": {
          from: {
            height: "var(--radix-collapsible-content-height)",
            opacity: 1,
          },
          to: { height: 0, opacity: 0 },
        },
      },
      animation: {
        "collabsible-open": "collabsible-open 0.5s ease-in-out",
        "collabsible-close": "collabsible-close 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};