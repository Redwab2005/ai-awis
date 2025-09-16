/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern:
        /(text|border)-(purple|green|blue)-(100|200|300|400|500|600|700)/,
    },
  ],
};
