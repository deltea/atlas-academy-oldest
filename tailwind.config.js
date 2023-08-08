/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,svelte,ts}"
  ],
  theme: {
    extend: {
      transitionDuration: {
        "fast": "300ms"
      },
      scale: {
        "sm": "103%",
      },
      gridTemplateRows: {
        "9": "repeat(9, minmax(0, 1fr))",
      },
      fontFamily: {
        "accent": ["ZhanKu", "sans"],
        "small": ["WangFont", "sans"]
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

