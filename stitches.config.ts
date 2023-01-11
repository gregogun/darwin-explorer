import {
  blueDark as blue,
  mintDark as mint,
  slateDark as slate,
  violetDark as violet,
  indigoDark as indigo,
} from "@radix-ui/colors";
import type * as Stitches from "@stitches/react";
import { createStitches } from "@stitches/react";

export const { styled, css, theme, globalCss, keyframes, getCssText, config } =
  createStitches({
    theme: {
      colors: {
        ...slate,
        ...blue,
        ...mint,
        ...violet,
        ...indigo,
      },
      fonts: {
        heading: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        body: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      },
      space: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        7: "28px",
        8: "32px",
        9: "36px",
        10: "40px",
        15: "60px",
        20: "80px",
      },
      sizes: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        7: "28px",
        8: "32px",
        9: "36px",
        10: "40px",
        11: "44px",
      },
      fontSizes: {
        1: "13px",
        2: "15px",
        3: "16px",
        4: "21px",
        5: "24px",
        6: "30px",
        7: "36px",
        8: "48px",
        9: "72px",
      },
      radii: {
        1: "4px",
        2: "6px",
        3: "8px",
        4: "12px",
        round: "50%",
      },
    },
    media: {
      sm: "(min-width: 640px)",
      md: "(min-width: 768px)",
      lg: "(min-width: 1024px)",
      xl: "(min-width: 1280px)",
      "2xl": "(min-width: 1536px)",
    },
    utils: {
      p: (value: Stitches.PropertyValue<"padding">) => ({
        paddingTop: value,
        paddingBottom: value,
        paddingLeft: value,
        paddingRight: value,
      }),
      pt: (value: Stitches.PropertyValue<"padding">) => ({
        paddingTop: value,
      }),
      pr: (value: Stitches.PropertyValue<"padding">) => ({
        paddingRight: value,
      }),
      pb: (value: Stitches.PropertyValue<"padding">) => ({
        paddingBottom: value,
      }),
      pl: (value: Stitches.PropertyValue<"padding">) => ({
        paddingLeft: value,
      }),
      px: (value: Stitches.PropertyValue<"padding">) => ({
        paddingLeft: value,
        paddingRight: value,
      }),
      py: (value: Stitches.PropertyValue<"padding">) => ({
        paddingTop: value,
        paddingBottom: value,
      }),

      m: (value: Stitches.PropertyValue<"margin">) => ({
        marginTop: value,
        marginBottom: value,
        marginLeft: value,
        marginRight: value,
      }),
      mt: (value: Stitches.PropertyValue<"margin">) => ({
        marginTop: value,
      }),
      mr: (value: Stitches.PropertyValue<"margin">) => ({
        marginRight: value,
      }),
      mb: (value: Stitches.PropertyValue<"margin">) => ({
        marginBottom: value,
      }),
      ml: (value: Stitches.PropertyValue<"margin">) => ({
        marginLeft: value,
      }),
      mx: (value: Stitches.PropertyValue<"margin">) => ({
        marginLeft: value,
        marginRight: value,
      }),
      my: (value: Stitches.PropertyValue<"margin">) => ({
        marginTop: value,
        marginBottom: value,
      }),

      br: (value: Stitches.PropertyValue<"borderRadius">) => ({
        borderRadius: value,
      }),
    },
  });

export type CSS = Stitches.CSS<typeof config>;
