module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      colors: {
        primary: "#fea928",
        secondary: "#ed8900",
      },
    },
  },
  plugins: [],
}
