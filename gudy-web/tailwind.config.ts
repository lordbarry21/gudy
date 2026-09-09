import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        surface: {
          DEFAULT: 'var(--surface)',
          elevated: 'var(--surface-elevated)',
          sidebar: 'var(--surface-sidebar)',
        },
        border: {
          DEFAULT: 'var(--border)',
          hover: 'var(--border-hover)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        // Claude Terracotta / Warm Orange Accent
        accent: {
          DEFAULT: 'var(--accent)',
          light: 'var(--accent-light)',
          dark: 'var(--accent-dark)',
          subtle: 'var(--accent-subtle)',
        },
        // Refined warm palette
        orange: {
          DEFAULT: 'var(--accent)',
          light: 'var(--accent-light)',
          dark: 'var(--accent-dark)',
          subtle: 'var(--accent-subtle)',
        },
        clay: {
          DEFAULT: '#D97757',
          light: '#E48D70',
          dark: '#C15F3C',
        },
        success: '#4E9A70',
        warning: '#D99B26',
        danger: '#D9534F',
        error: '#D9534F',
        subject: {
          math: '#3A92A6',
          tka: '#D97757',
          indo: '#D9943B',
          eng: '#B86877',
          serkom: '#459A72',
        },
      },
      fontFamily: {
        sans: ['var(--font-ui)', 'var(--font-sans)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        'accent-subtle': '0 0 20px var(--accent-subtle)',
        'glow-orange': '0 0 20px var(--accent-subtle)',
        'glow-purple': '0 0 20px var(--accent-subtle)',
        'glow-pink': '0 0 20px var(--accent-subtle)',
        'glow-cyan': '0 0 20px rgba(58, 146, 166, 0.2)',
        'glow-emerald': '0 0 20px rgba(78, 154, 112, 0.2)',
        'glow-sm': '0 0 10px var(--accent-subtle)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'bounce-subtle': 'bounce-subtle 0.5s ease-out',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'bounce-subtle': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.96)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      borderRadius: {
        'xl': '14px',
        '2xl': '18px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}

export default config
