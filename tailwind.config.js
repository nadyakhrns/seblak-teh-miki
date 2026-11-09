/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#dc2626',
          redHover: '#b91c1c',
          redDark: '#991b1b',
          orange: '#ea580c',
          orangeLight: '#ffedd5',
          cream: '#fffaf5',
          dark: '#0f172a'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};
