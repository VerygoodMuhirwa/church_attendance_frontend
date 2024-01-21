/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,tsx,jsx}",".src/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens:{
        ss:"100px"
      }
    },
  },
  plugins: [],
}

