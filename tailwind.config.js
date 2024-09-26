const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // or 'media'
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        darkColor: {
          700: '#293145',
          800: '#192134',
          900: '#1a2236',
        },
      }
    },
  },
  plugins: [
    flowbite.plugin(),
    require('@tailwindcss/forms'),
  ],
}

