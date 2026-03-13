/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Dynamic color classes used across all slides
    { pattern: /text-(emerald|yellow|blue|purple|gray|red|orange|green|cyan)-(300|400|500|600|700)/ },
    { pattern: /bg-(emerald|yellow|blue|purple|gray|red|orange|green|cyan)-(500|900)/ },
    { pattern: /bg-(emerald|yellow|blue|purple|gray|red|orange|green|cyan)-900\/(5|10|20|30)/ },
    { pattern: /bg-(emerald|yellow|blue|purple|gray|red|orange|green|cyan)-500\/(10|20)/ },
    { pattern: /border-(emerald|yellow|blue|purple|gray|red|orange|green|cyan)-(500|600|700|800)/ },
    { pattern: /border-(emerald|yellow|blue|purple|gray|red|orange|green|cyan)-(500|700|800)\/(20|30|40)/ },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
