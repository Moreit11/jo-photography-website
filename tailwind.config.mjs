import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,njk,md}"
  ],
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {
      colors: {
        base: {
          100: "var(--col-base-100)",
          200: "var(--col-base-200)",
          300: "var(--col-base-300)",
          400: "var(--col-base-400)",
          500: "var(--col-base-500)",
          600: "var(--col-base-600)",
          700: "var(--col-base-700)",
          800: "var(--col-base-800)",
          900: "var(--col-base-900)",
        },
        primary: "var(--col-primary)",
        accent: "var(--col-accent)",
        neutral: "var(--col-neutral)",
      },
      spacing: {
        '4xs': 'var(--space-4xs)',
        '3xs': 'var(--space-3xs)',
        '2xs': 'var(--space-2xs)',
        'xs': 'var(--space-xs)',
        's': 'var(--space-s)',
        'm': 'var(--space-m)',
        'l': 'var(--space-l)',
        'xl': 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        '3xl': 'var(--space-3xl)',
      },
      fontSize: {
        '-1': 'var(--fs--1)',
        '0': 'var(--fs-0)',
        '1': 'var(--fs-1)',
        '2': 'var(--fs-2)',
        '3': 'var(--fs-3)',
        '4': 'var(--fs-4)',
        '5': 'var(--fs-5)',
        '6': 'var(--fs-6)',
      },
    },
  },
  plugins: [typography],
};
