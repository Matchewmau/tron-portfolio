import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'grid-void': '#07101B',
        'grid-surface': '#0D1928',
        'grid-cyan': '#38D9F5',
        'grid-orange': '#FB923C',
        'grid-text': '#F1F6FA',
        'grid-muted': '#A3BACB',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Orbitron"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 8px 28px rgba(56, 217, 245, 0.14)',
        'neon-cyan-strong': '0 14px 38px rgba(56, 217, 245, 0.22)',
        'neon-orange': '0 8px 28px rgba(251, 146, 60, 0.16)',
        'neon-orange-strong': '0 14px 38px rgba(251, 146, 60, 0.26)',
      },
      transitionTimingFunction: {
        snappy: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
