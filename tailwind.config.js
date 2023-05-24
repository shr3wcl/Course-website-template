/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'search-logo': "url('https://fullstack.edu.vn/static/media/search.9bd3926522ea0937310c.svg')"
      },
      transformOrigin: {
        'form': "translate3d(-27.6364px, 57.4545px, 0px)"
      }
    },
  },
  plugins: [],
}

