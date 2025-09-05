/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    // Safelist dynamic utility classes used via template strings in components
    {
      pattern: /(bg|text|border)-(emerald|blue|purple|orange|teal|indigo)-(100|200|300|400|500|600|700)/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
