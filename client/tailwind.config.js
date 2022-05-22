module.exports = {
  content: ['./src/**/*.tsx'],

  theme: {
    extend: {
      animation: {
        bounce100: 'bounce 1s infinite 100ms',
        bounce200: 'bounce 1s infinite 200ms',
      },
    },
  },
  daisyui: {
    themes: ['halloween'],
  },
  plugins: [require('daisyui')],
};
