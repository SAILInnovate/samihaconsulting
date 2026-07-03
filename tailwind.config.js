/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1F3A5F',
          dark: '#152943',
          light: '#2A4E7D',
        },
        beige: {
          DEFAULT: '#F5F1E6',
          dark: '#E8E2D0',
        },
        sage: {
          DEFAULT: '#A8C3A0',
          dark: '#8EAA85',
        },
        green: {
          DEFAULT: '#6B8E23',
          dark: '#556B2F',
        },
        charcoal: {
          DEFAULT: '#3B3B3B',
          dark: '#222222',
          light: '#555555',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card': '0 8px 30px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}
