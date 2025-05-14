import aspectRatio from '@tailwindcss/aspect-ratio'

export default {
  theme: {
     extend: {
      fontFamily: {
        playfair: ['Playfair Display', 'serif'], // Font Playfair Display
        rubik: ['Rubik', 'serif'], // Font Rubik
      },
    },
    screens: {
      '2xl': '1920px',
      'xl': '1440px',
      'lg': '1152px',
      'md': '768px',
      'sm': '320px',
    },
  },
  plugins: [aspectRatio],
}
