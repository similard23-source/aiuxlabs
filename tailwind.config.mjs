/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f3f8f6',
          100: '#e1efe9',
          500: '#0f766e',
          600: '#0b5e58',
          700: '#0a4f4b'
        }
      }
    }
  },
  plugins: []
};
