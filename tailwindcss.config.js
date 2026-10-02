// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  // ⭐️ 1. Agregamos las rutas de escaneo
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}