module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      body: ["Helvetica Neue"],
    },
    boxShadow: {
      focused: "0px 20px 40px 0px rgba(18, 127, 191, 0.2)",
      inactive:
        "0px 3px 6px rgba(0, 0, 0, 0.1), 0px 10px 20px rgba(0, 0, 0, 0.15)",
    },
    extend: {},
  },
  variants: {
    extend: {
      borderStyle: ["focus", "hover"],
      borderWidth: ["focus", "hover"],
    },
  },
  plugins: [],
};
