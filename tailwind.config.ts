import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'grid-void': '#02060B',
        'grid-surface': '#07131D',
        'grid-cyan': '#00F0FF',
        'grid-orange': '#FF6B00',
        'grid-text': '#E2F1F8',
        'grid-muted': '#8BAEC4',
      },
      fontFamily: {
        display: ['"Orbitron"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(0, 240, 255, 0.4)',
        'neon-cyan-strong': '0 0 24px rgba(0, 240, 255, 0.65)',
        'neon-orange': '0 0 15px rgba(255, 107, 0, 0.45)',
        'neon-orange-strong': '0 0 24px rgba(255, 107, 0, 0.7)',
      },
      dropShadow: {
        'neon-cyan': '0 0 12px rgba(0, 240, 255, 0.45)',
        'neon-orange': '0 0 12px rgba(255, 107, 0, 0.5)',
      },
      transitionTimingFunction: {
        snappy: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      animation: {
        'spin-slow': 'spin 24s linear infinite',
        'spin-reverse': 'spin-reverse 18s linear infinite',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
