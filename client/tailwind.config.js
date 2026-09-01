/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        cinzel: ['"Cinzel"', 'serif'],
        royal: ['"Cinzel Decorative"', '"Cinzel"', 'serif']
      },
      colors: {
        raja: '#f59e0b',
        mantri: '#8b5cf6',
        sipahi: '#0284c7',
        chor: '#e11d48',
        'royal-bg': '#090611',
        'royal-card': '#140e24',
        'royal-border': '#392856',
        'royal-gold': '#eab308',
        'royal-crimson': '#881337',
        'gold-shine': '#ffd700',
        'parchment': '#fef3c7'
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(234, 179, 8, 0.4)',
        'mantri-glow': '0 0 25px -5px rgba(139, 92, 246, 0.4)',
        'royal-card': '0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 15px 0 rgba(234, 179, 8, 0.15)',
        'regal': '0 20px 40px -15px rgba(0, 0, 0, 0.9), 0 0 20px 2px rgba(245, 158, 11, 0.2)'
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #fef08a 0%, #eab308 50%, #854d0e 100%)',
        'royal-banner': 'linear-gradient(135deg, #1e1233 0%, #11091f 100%)',
        'regal-glow': 'radial-gradient(ellipse at top, rgba(234, 179, 8, 0.15), transparent 70%)'
      }
    }
  },
  plugins: []
};
