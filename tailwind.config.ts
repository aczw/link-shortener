import { type Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    fontFamily: {
      sans: [...defaultTheme.fontFamily.sans],
      mono: [
        ["Commit Mono Variable", ...defaultTheme.fontFamily.mono],
        {
          fontFeatureSettings:
            '"ss01", "ss02", "ss03", "ss04", "ss05", "cv01", "cv02", "cv06", "cv10", "cv11"',
        },
      ],
    },
    extend: {
      colors: {
        light: "#d1f2c8",
        dark: "#176b98",
      },
      screens: {
        xxs: "475px",
        xs: "575px",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
