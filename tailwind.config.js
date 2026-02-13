/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          900: '#0a0e1a',
          800: '#111827',
          700: '#1f2937',
          glow: {
            cyan: 'rgba(34, 197, 94, 0.5)',
            purple: 'rgba(168, 85, 247, 0.4)',
            pink: 'rgba(244, 114, 182, 0.4)'
          }
        }
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(34, 197, 94, 0.5)',
        'neon-purple': '0 0 25px rgba(168, 85, 247, 0.6)',
        'cyber-glow': '0 0 50px rgba(59, 130, 246, 0.3)'
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'matrix-fall': 'matrix-fall 20s linear infinite'
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(34, 197, 94, 0.8)' }
        },
        'matrix-fall': {
          '0%': { transform: 'translateY(-100vh) translateX(0%)' },
          '100%': { transform: 'translateY(100vh) translateX(10%)' }
        }
      }
    }
  },
  plugins: [],
  darkMode: 'class'
}
