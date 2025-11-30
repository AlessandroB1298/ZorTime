import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  // ... other configs
  theme: {
    extend: {
      colors: {
        // Your custom color palette
        "deep-earth": "#582f0e",
        "warm-ochre": "#7f4f24",
        "amber-stone": "#936639",
        "golden-taupe": "#a68a64",
        "soft-sage": "#b6ad90",
        "muted-green": "#c2c5aa",
        "olive-green": "#a4ac86",
        "forest-moss": "#656d4a",
        "deep-olive": "#414833",
        "charcoal-green": "#333d29",

        // Shadcn UI colors (ensure these are set up if you use custom variables)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
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
      },
      // ... other extensions
    },
  },
  // ... other configs
};

export default config;
