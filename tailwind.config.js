/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./src/**/*.{html,js,svelte,ts}"
  ],
  theme: {
    extend: {
      fontFamily: {
        "jost": ["Jost", "sans-serif"],
        "title": ["ZhanKu", "sans-serif"]
      },
      padding: {
        "sm": "8rem",
        "md": "10rem",
        "lg": "12rem"
      },
      gridTemplateRows: {
        "9": "repeat(9, minmax(0, 1fr))"
      },
      gap: {
        "sm": "3rem",
        "md": "4rem",
        "lg": "5rem"
      },
      colors: {
        "normal": "#242424",
        "light": "#333333",
      },
      borderWidth: {
        "sm": "1.5px"
      },
      spacing: {
        "xs": "2rem",
        "navbar": "80px",
      }
    },
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    base: false,
    themes: ["light"]
  }
}

