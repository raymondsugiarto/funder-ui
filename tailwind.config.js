/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: ['./src/**/*.{html,vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        app: '0 2px 6px #4359711f',
      },
      screens: {},
      colors: {},
    },
  },
  plugins: [],
};
