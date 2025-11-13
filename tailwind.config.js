/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#fff5f5',
          100: '#ffe0e0',
          200: '#ffc5c5',
          300: '#ff9e9e',
          400: '#ff6b6b',
          500: '#ff3d3d',
          600: '#e62e2e',
          700: '#c11f1f',
          800: '#9d1c1c',
          900: '#7a1919',
        },
        secondary: {
          50: '#f2f8f9',
          100: '#e6f1f4',
          200: '#c9e2e8',
          300: '#a6cfd8',
          400: '#7db5c3',
          500: '#5a9caf',
          600: '#477d8e',
          700: '#3a6574',
          800: '#325060',
          900: '#2c4451',
        },
        accent: {
          50: '#fefae7',
          100: '#fef4c2',
          200: '#fee989',
          300: '#fdd946',
          400: '#fcc712',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      backgroundImage: {
        'pizza-pattern': "url('https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')",
        'wood-texture': "url('https://images.pexels.com/photos/129733/pexels-photo-129733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')",
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'menu': '0 8px 16px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};