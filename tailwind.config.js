/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Hanken Grotesk"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        // Warm newsprint paper
        paper: {
          DEFAULT: "#F3ECDD",
          50: "#FBF8F1",
          100: "#F7F2E8",
          200: "#EFE7D5",
          300: "#E4D8C0",
          400: "#D6C6A6",
        },
        // Warm ink
        ink: {
          DEFAULT: "#17130E",
          900: "#17130E",
          800: "#241D15",
          700: "#3A3025",
          600: "#5A4E40",
          500: "#7B6E5D",
          400: "#9C8F7C",
        },
        // The single electric accent
        vermillion: {
          DEFAULT: "#E0341E",
          700: "#B42410",
          600: "#C82A14",
          500: "#E0341E",
          400: "#EC5840",
        },
        // Muted support pair
        teal: {
          DEFAULT: "#1F6F5C",
          600: "#1A5E4E",
          400: "#2F8A72",
        },
        ochre: {
          DEFAULT: "#B5832A",
          400: "#C99A3F",
        },
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter: "-0.025em",
      },
      boxShadow: {
        paper: "0 1px 0 rgba(23,19,14,0.05), 0 24px 50px -34px rgba(23,19,14,0.45)",
        "paper-sm": "0 1px 0 rgba(23,19,14,0.05), 0 12px 26px -22px rgba(23,19,14,0.4)",
        stamp: "0 0 0 2px currentColor",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.32, 0.72, 0, 1)",
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
        ink: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.2" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        blink: "blink 1.4s steps(1) infinite",
      },
    },
  },
  plugins: [],
};
