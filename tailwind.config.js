/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0a0a0f',
          800: '#121218',
          700: '#1a1a23',
          600: '#22222d',
          500: '#2a2a37',
          400: '#3d3d4d',
          300: '#505064',
          200: '#63637b',
          100: '#767692',
        },
        neon: {
          blue: '#00f3ff',
          purple: '#bf00ff',
          pink: '#ff00c8',
          green: '#00ff9d',
          yellow: '#ffee00',
        }
      },
      boxShadow: {
        'neon-blue': '0 0 5px theme(colors.neon.blue), 0 0 20px theme(colors.neon.blue)',
        'neon-purple': '0 0 5px theme(colors.neon.purple), 0 0 20px theme(colors.neon.purple)',
        'neon-pink': '0 0 5px theme(colors.neon.pink), 0 0 20px theme(colors.neon.pink)',
        'neon-green': '0 0 5px theme(colors.neon.green), 0 0 20px theme(colors.neon.green)',
        'neon-yellow': '0 0 5px theme(colors.neon.yellow), 0 0 20px theme(colors.neon.yellow)',
      },
      animation: {
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'neon-glow': 'neon-glow 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        'neon-pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        'neon-glow': {
          '0%': {
            textShadow: '0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #00f3ff, 0 0 82px #00f3ff, 0 0 92px #00f3ff, 0 0 102px #00f3ff, 0 0 151px #00f3ff'
          },
          '100%': {
            textShadow: '0 0 4px #fff, 0 0 7px #fff, 0 0 13px #fff, 0 0 26px #00f3ff, 0 0 51px #00f3ff, 0 0 57px #00f3ff, 0 0 64px #00f3ff, 0 0 94px #00f3ff'
          }
        }
      }
    },
  },
  plugins: [],
};