import { styled } from "../stitches.config";

export const Typography = styled("p", {
  //resets
  margin: 0,
  fontFamily: "$body",

  variants: {
    size: {
      display1: {
        fontWeight: 600,
        color: "$slate12",
        fontSize: "48px",
        lineHeight: "62px",
        letterSpacing: "-2px",

        "@lg": {
          fontSize: "72px",
          lineHeight: "84px",
          letterSpacing: "-3px",
        },
      },
      display2: {
        fontWeight: 600,
        color: "$slate12",
        fontSize: "38px",
        lineHeight: "48px",
        letterSpacing: "-2px",

        "@lg": {
          fontSize: "48px",
          lineHeight: "62px",
          letterSpacing: "-3px",
        },
      },
      h1: {
        fontWeight: 600,
        color: "$slate12",
        fontSize: "32px",
        lineHeight: "40px",
        letterSpacing: "-0.3px",

        "@lg": {
          fontSize: "36px",
          lineHeight: "42px",
          letterSpacing: "-2px",
        },
      },
      h2: {
        fontWeight: 600,
        color: "$slate12",
        fontSize: "24px",
        lineHeight: "28px",
        letterSpacing: "-0.3px",

        "@lg": {
          fontSize: "30px",
          lineHeight: "40px",
          letterSpacing: "-1px",
        },
      },
      h3: {
        fontWeight: 600,
        color: "$slate12",
        fontSize: "20px",
        lineHeight: "24px",

        "@lg": {
          fontSize: "22px",
          lineHeight: "28px",
        },
      },
      h4: {
        color: "$slate12",
        fontSize: "15px",
        lineHeight: "normal",

        "@lg": {
          fontSize: "18px",
          lineHeight: "24px",
        },
      },
      subheading: {
        color: "$slate11",
        fontSize: "13px",
        lineHeight: "16px",

        "@lg": {
          fontSize: "15px",
          lineHeight: "20px",
        },
      },
      paragraph: {
        color: "$slate11",
        fontSize: "16px",
        lineHeight: "26px",
        letterSpacing: "0.2px",

        "@lg": {
          fontSize: "18px",
          lineHeight: "28.8px",
        },
      },
      subparagraph: {
        color: "$slate11",
        fontSize: "13px",
        lineHeight: "16px",
        letterSpacing: "0.2px",
      },
    },
  },
  defaultVariants: {
    size: "subheading",
  },
});
