/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        button: "#00ffde",
        blueSale: "#2d75ff",
        blueTag: "#0075ff",
      },
      gap: {
        tiny: "0.5rem",
      },
      space: {
        tiny: "0.5rem",
      },
      borderRadius: {
        modular: "0.25rem",
        tiny: "0.5rem",
      },
    },
  },
  plugins: [],
};
