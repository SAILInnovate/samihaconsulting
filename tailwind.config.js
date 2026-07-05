/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#000000', // True Black
          dark: '#000000',
          light: '#1A1A1A', // Graphite
        },
        beige: {
          DEFAULT: '#FFFFFF', // Stark White
          dark: '#F4F5F6', // Engineered Slate
        },
        sage: {
          DEFAULT: '#E2E8F0', // Slate Gridline
          dark: '#CBD5E1',
        },
        green: {
          DEFAULT: '#0A66C2', // Blueprint Blue / technical accent
          dark: '#08539C',
        },
        charcoal: {
          DEFAULT: '#050505', // Almost Black
          dark: '#000000',
          light: '#64748B', // Slate grey for secondary text
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Inter', 'system-ui', '-apple-system', 'sans-serif'], // Replaced serif with sans for strict geometric look
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'soft': 'none', // Removed for brutalist look
        'card': 'none',
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L0 0 0 20' fill='none' stroke='%23e2e8f0' stroke-width='1' /%3E%3C/svg%3E\")",
      },
      keyframes: {
        'pan-grid': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '20px 20px' },
        }
      },
      animation: {
        'pan-grid': 'pan-grid 3s linear infinite',
      }
    },
  },
  plugins: [],
}
