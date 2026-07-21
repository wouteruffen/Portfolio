import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        // Short, wide phone screens (e.g. iPhone Pro Max in landscape) —
        // deliberately NOT width-based like md/lg, since those devices are
        // 800-1024px wide (well into the md/lg range) but only 390-500px
        // tall. max-width: 1024px specifically covers the iPhone 17 Pro Max's
        // 956px-wide landscape viewport while still excluding real tablet
        // landscape (e.g. 1024x768, 960x600 — both taller than 500px so the
        // max-height guard rules them out regardless). The max-height guard
        // is what keeps this from firing on a short desktop browser window.
        // Defined last so its rules win over md:/lg: at equal specificity
        // when a landscape phone also matches those.
        "landscape-mobile": { raw: "(orientation: landscape) and (max-height: 500px) and (max-width: 1024px)" },
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["Inter", "sans-serif"],
        logo: ["Anton", "sans-serif"],
        thunder: ['"ThunderHC"', "sans-serif"],
        antonio: ['"Antonio"', "sans-serif"],
        outfit: ['"Outfit"', "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        cream: "hsl(var(--cream))",
        nearBlack: "hsl(var(--near-black))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        retro: {
          purple: "hsl(var(--retro-purple))",
          teal: "hsl(var(--retro-teal))",
        },
        brand: {
          red: "hsl(var(--brand-red))",
          orange: "hsl(var(--brand-orange))",
          yellow: "hsl(var(--brand-yellow))",
          green: "hsl(var(--brand-green))",
          blue: "hsl(var(--brand-blue))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
