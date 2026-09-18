/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#4ADE80',
          hover: '#3ecf75',
          muted: '#22C55E',
          dim: '#166534',
          glow: 'rgba(74, 222, 128, 0.25)',
        },
        surface: {
          base: '#0A0A0C',
          raised: '#0F0F12',
          overlay: '#141418',
          card: 'rgba(255, 255, 255, 0.035)',
          'card-hover': 'rgba(255, 255, 255, 0.06)',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-hover': 'rgba(255, 255, 255, 0.16)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.025em',
        widest: '0.2em',
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(74, 222, 128, 0.15)',
        'glow-md': '0 0 30px rgba(74, 222, 128, 0.2)',
        'glow-lg': '0 0 50px rgba(74, 222, 128, 0.25)',
        'card-elevated': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
