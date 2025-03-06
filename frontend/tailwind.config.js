/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        'primary': 'var(--color-primary)',
        'secondary': 'var(--color-secondary)',
        'tertiary': 'var(--color-tertiary)',
        'quaternary': 'var(--color-quaternary)',
        'text-color': 'var(--text-color)',
        'input-color': 'var(--input-color)',
      },
    },
  },
  plugins: [],
}

