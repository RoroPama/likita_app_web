/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1e3a8a",
        secondary: "#3b82f6",
        "custom-blue1": "#1d4ed8",
      },

      backgroundImage: {
        "gradient-custom":
          "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)",
        "gradient-custom-reversed":
          "linear-gradient(135deg, #06b6d4  0% , #3b82f6 50%,#1e3a8a  100%)",
        "gradient-blue": "linear-gradient(to right, #1e3a8a, #3b82f6)",

        "gradient-blue-135":
          "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",

        "gradient-blue-90":
          "linear-gradient(90deg, #3b82f6 0%,#3b82f6 30%, #1d4ed8 100%)",
      },

      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        // Ou créer une police personnalisée
        custom: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
