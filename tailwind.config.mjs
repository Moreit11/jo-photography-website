export default {
  content: [
    "./src/**/*.{html,js,md}",
    "./_site/**/*.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui')
  ],
};
