/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        extraLightBlack: "#262629",
        lightBlack: "#1e1e21",
        mediumBlack: "#1a1a1e",
        darkBlack: "#0f0f10",
      },
      borderColor: {
        lightGray: "#444",
      },
      textColor: {
        lightGray: "#c1c1c2",
        darkGray: "#666",
      },
    },
  },
  plugins: [],
};
