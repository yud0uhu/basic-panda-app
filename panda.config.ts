import { defineConfig } from "@pandacss/dev";
import { createStitches, type PropertyValue } from "@stitches/react";
export default defineConfig({
  preflight: true,
  include: ["./example/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  theme: {
    extend: {
      tokens: {
        colors: {
          hiContrast: { value: "hsl(206,10%,5%)" },
          loContrast: { value: "white" },
          gray100: { value: "hsl(206,22%,99%)" },
          gray200: { value: "hsl(206,12%,97%)" },
          gray300: { value: "hsl(206,11%,92%)" },
          gray400: { value: "hsl(206,10%,84%)" },
          gray500: { value: "hsl(206,10%,76%)" },
          gray600: { value: "hsl(206,10%,44%)" },
          purple100: { value: "hsl(252,100%,99%)" },
          purple200: { value: "hsl(252,100%,98%)" },
          purple300: { value: "hsl(252,100%,94%)" },
          purple400: { value: "hsl(252,75%,84%)" },
          purple500: { value: "hsl(252,78%,60%)" },
          purple600: { value: "hsl(252,80%,53%)" },
        },
        spacing: {
          1: { value: "5px" },
          2: { value: "10px" },
          3: { value: "15px" },
          4: { value: "20px" },
          5: { value: "25px" },
          6: { value: "35px" },
        },
        sizes: {
          1: { value: "5px" },
          2: { value: "10px" },
          3: { value: "15px" },
          4: { value: "20px" },
          5: { value: "25px" },
          6: { value: "35px" },
        },
        fontSizes: {
          1: { value: "12px" },
          2: { value: "13px" },
          3: { value: "15px" },
          4: { value: "17px" },
          5: { value: "19px" },
          6: { value: "21px" },
        },
      },
    },
  },
  outdir: "styled-system",
});

export const { styled, css } = createStitches({
  utils: {
    marginX: (value: string) => ({
      marginLeft: value,
      marginRight: value,
    }),
    marginY: (value: string) => ({
      marginTop: value,
      marginBottom: value,
    }),
    paddingX: (value: string) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    paddingY: (value: string) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
  },
  media: {
    bp1: "(min-width: 520px)",
    bp2: "(min-width: 900px)",
  },
});
