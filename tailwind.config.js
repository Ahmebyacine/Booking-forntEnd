module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors:{
        'firstColor': '#db2777',
        'secondColor': '#fce7f3',

        'firstGray': '#1f2937',
        'firstGray': '#1f2937',
        'thirdGray': '#f3f4f6',
      }, 
      backgroundImage: {
        'firstGradient': 'linear-gradient(to bottom, #fdf2f8, #ffffff)',
      }
    },
  },
  plugins: [],
};