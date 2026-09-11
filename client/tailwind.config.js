/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        cinzel: ['"Cinzel"', 'serif'],
        royal: ['"Cinzel Decorative"', '"Cinzel"', 'serif']
      },
      colors: {
        raja: '#b45309',
        mantri: '#7e22ce',
        sipahi: '#0284c7',
        chor: '#be123c',
        'castle-bg': '#f5eedc',
        'castle-stone': '#e8dcc4',
        'castle-mortar': '#d5c29f',
        'castle-cream': '#fffdfa',
        'castle-parchment': '#faf3e0',
        'castle-vellum': '#f3e8cf',
        'castle-ink': '#2c1a0e',
        'castle-ink-muted': '#6b513c',
        'royal-bg': '#f5eedc',
        'royal-card': '#fffdfa',
        'royal-border': '#d4af37',
        'royal-gold': '#b45309',
        'royal-crimson': '#991b1b',
        'gold-shine': '#f59e0b',
        'parchment': '#fbf5e6'
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(217, 119, 6, 0.4)',
        'mantri-glow': '0 0 25px -5px rgba(126, 34, 206, 0.35)',
        'castle-card': '0 12px 32px -8px rgba(74, 48, 24, 0.12), 0 2px 6px 0 rgba(74, 48, 24, 0.08)',
        'castle-inner': 'inset 0 2px 4px 0 rgba(74, 48, 24, 0.06)',
        'regal': '0 16px 36px -10px rgba(74, 48, 24, 0.25), 0 0 20px 2px rgba(217, 119, 6, 0.15)'
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #fef08a 0%, #f59e0b 50%, #b45309 100%)',
        'parchment-gradient': 'linear-gradient(180deg, #fffdf8 0%, #f7efe1 100%)',
        'stone-gradient': 'linear-gradient(135deg, #f3e9d7 0%, #e5d5be 100%)',
        'castle-banner': 'linear-gradient(135deg, #faf2e3 0%, #ede0c7 100%)'
      }
    }
  },
  plugins: []
};
