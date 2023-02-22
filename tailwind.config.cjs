/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        input: "0 0 0 3px",
        cum: "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
      colors: {
        base: "#070B30",
        "yellow-primary": "#FAA41A",
        "blue-primary": "#464A83",
      },
      backgroundColor: {
        base: "#070B30",
        yellowPrimary: "#FAA41A",
      },
      textColor: {},
    },
  },
  plugins: [],
};
