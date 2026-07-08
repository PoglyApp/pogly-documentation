/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        geist: ["Geist", "sans-serif"],
      },
      fontSize: {
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["20px", "28px"],
        xl: ["24px", "32px"],
      },
      colors: {
        base: "var(--color-base)",
        body: "var(--color-body)",
        surface: "var(--color-surface)",

        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",

        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
          border: "var(--color-accent-border)",
        },

        border: "var(--color-border)",
        "border-subtle": "var(--color-border-subtle)",

        "surface-hover": "var(--color-surface-hover)",
        "selected-bg": "var(--color-selected-bg)",

        warning: "var(--color-warning)",
      },
      boxShadow: {
        panel: "var(--shadow-panel)",
      },
    },
  },
  plugins: [],
};
