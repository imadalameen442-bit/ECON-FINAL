/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Clash Display"', "system-ui", "sans-serif"],
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        serif: ['"Fraunces"', "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        // Deep midnight base (OLED-leaning)
        ink: {
          950: "#050608",
          900: "#0a0c10",
          850: "#0f1218",
          800: "#141821",
          700: "#1c212c",
          600: "#2a3140",
        },
        // Money emerald
        emerald: {
          glow: "#34f5c5",
          400: "#2ee6a8",
          500: "#13c892",
          600: "#0a9d73",
        },
        // Warm gold
        gold: {
          glow: "#ffd98a",
          400: "#f5c45e",
          500: "#e0a73b",
          600: "#bd8527",
        },
        // Cool secondary
        sky: {
          glow: "#8fd0ff",
          400: "#5bb0f0",
        },
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        "inner-hi": "inset 0 1px 1px rgba(255,255,255,0.10)",
        "inner-hi-strong": "inset 0 1px 1px rgba(255,255,255,0.18)",
        glow: "0 0 60px -12px rgba(46,230,168,0.45)",
        "glow-gold": "0 0 60px -12px rgba(245,196,94,0.45)",
        float: "0 30px 80px -40px rgba(0,0,0,0.9)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.32, 0.72, 0, 1)",
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "gradient-pan": "gradient-pan 8s ease-in-out infinite",
        "spin-slow": "spin-slow 24s linear infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
