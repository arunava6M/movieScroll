module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'navbar': "url('nav_bar.png')"
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
