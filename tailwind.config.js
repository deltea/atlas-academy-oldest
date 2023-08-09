/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,svelte,ts}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "landing": "url(/images/landing.jpg)",
      },
      fontFamily: {
        "accent": ["ZhanKu", "sans"],
        "small": ["WangFont", "sans"]
      },
      padding: {
        "sm": "3rem",
        "md": "4rem",
        "lg": "5rem"
      },
      gap: {
        "sm": "3rem",
        "md": "4rem",
        "lg": "5rem"
      },
      colors: {
        "normal": "#242424"
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

