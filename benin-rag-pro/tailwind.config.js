/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        benin: {
          50: "#f5f7fa",
          100: "#e8ecf1",
          200: "#d0d9e3",
          300: "#b8c2d5",
          400: "#a0aac7",
          500: "#6b5b95",
          600: "#5c4e84",
          700: "#4d4173",
          800: "#3e3462",
          900: "#2f2751",
          950: "#1a1429",
        },
        gold: {
          50: "#fffbf0",
          100: "#fff8e1",
          200: "#fff1c2",
          300: "#ffea9b",
          400: "#ffe374",
          500: "#ffd700",
          600: "#e6b000",
          700: "#cc9900",
          800: "#b28600",
          900: "#997300",
        },
      },
      spacing: {
        'safe-mobile': 'max(1rem, env(safe-area-inset-bottom))',
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "wave": "wave 1.5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        wave: {
          "0%, 100%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(0.8)" },
        },
      },
      backgroundImage: {
        "gradient-benin": "linear-gradient(135deg, #2f2751 0%, #5c4e84 100%)",
        "gradient-gold": "linear-gradient(135deg, #ffd700 0%, #ffea9b 100%)",
      },
    },
  },
  plugins: [],
};
