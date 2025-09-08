// export the Tailwind config object so Tailwind can see it ESM
export default {
  content: [
    "./src/**/*.{html,md,js}", //Tailwind files in src
    "./_site/**/*.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
};
