/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        cosmic: {
          darkest: '#0B0418', // Ultra-dark purple-black base background
          dark: '#140827',    // Deep amethyst-violet section color
          card: '#1F0F37',    // Rich dark violet for cards and blocks
          accent: '#2A1748',  // Highlights and borders
          lavender: '#A580F6', // Blooming lotus purple
          light: '#E6DAFF',   // Extremely soft lavender for sub-headers
          cream: '#FAF7F2',   // Premium off-white/cream text
        },
        gold: {
          light: '#FCE7C2',   // Shimmering star gold
          DEFAULT: '#F5D28E', // Authentic metallic gold
          dark: '#D4AF37',    // Rich deep gold
        },
        tealGlow: {
          dark: '#08171A',    // Dark cyan-teal shadow backdrop
          DEFAULT: '#0E2F33', // Soft green-teal shadow borders
          light: '#1B5B63',   // Subtle emerald highlight
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'glow-slow': 'glow 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
}
