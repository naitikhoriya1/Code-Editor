/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "editor-bg": "#1E1E1E",
        "editor-border": "#333333",
        "primary-dark": "#1A202C",
        "secondary-dark": "#2D3748",
        "accent-blue": "#63B3ED",
        "accent-green": "#48BB78",
        "text-light": "#E2E8F0",
        "text-muted": "#A0AEC0",
        "border-dark": "#4A5568",
        "input-bg": "#2D3748",
        "hover-dark": "#4A5568",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Fira Code", "monospace"],
        heading: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
