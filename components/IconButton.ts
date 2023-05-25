import {
  styled,
  IconButton as IconButtonBase,
  css,
  darkTheme,
} from "@aura-ui/react";

export const iconButton = css({
  // Reset
  alignItems: "center",
  justifyContent: "center",
  appearance: "none",
  borderWidth: 0,
  boxSizing: "border-box",
  flexShrink: 0,
  outline: "none",
  padding: 0,
  textDecoration: "none",
  userSelect: "none",

  // custom reset
  display: "inline-flex",
  WebkitTapHighlightColor: "transparent",
  lineHeight: 1,

  //custom
  fontFamily: "inherit",
  br: "$2",

  '&[aria-disabled="true"]': {
    pointerEvents: "none",
    opacity: "50%",
  },

  // --------------------------------------------

  // locally-scoped color tokens for easy theme-switching

  // default styles
  $$bg: "$colors$slate3",
  $$border: "$colors$slate7",
  $$color: "$colors$slate11",

  // hover styles
  $$bgHover: "$colors$slate4",
  $$borderHover: "$colors$slate8",

  // active styles
  $$bgActive: "$colors$slate5",
  $$borderActive: "$colors$slate8",

  $$focus: "$colors$focus",

  // solid default styles
  $$bgSolid: "$colors$slate9",
  $$colorSolid: "white",
  // solid hover styles
  $$bgSolidHover: "$colors$slate10",
  // solid active styles
  $$bgSolidActive: "$colors$slate10",

  // --------------------------------------------

  variants: {
    size: {
      1: {
        width: "$7",
        height: "$7",
        fontSize: "$1",
        "& svg": {
          size: "$3",
        },
      },
      2: {
        width: "$9",
        height: "$9",
        fontSize: "$3",
        "& svg": {
          size: "$4",
        },
      },
      3: {
        width: "$11",
        height: "$11",
        fontSize: "$5",
        "& svg": {
          size: "$4",
        },
      },
    },
    variant: {
      subtle: {
        color: "$$color",
        backgroundColor: "$$bg",

        "&:hover": {
          backgroundColor: "$$bgHover",
        },

        "&:active": {
          backgroundColor: "$$bgActive",
        },

        "&:focus-visible": {
          boxShadow: "0 0 0 2px $$focus",
        },
      },
      outline: {
        color: "$$color",
        backgroundColor: "transparent",
        boxShadow: "inset 0 0 0 1px $$border",

        "&:hover": {
          boxShadow: "inset 0 0 0 1px $$borderHover",
        },

        "&:active": {
          backgroundColor: "$$bgActive",
          boxShadow: "inset 0 0 0 1px $$borderActive",
        },

        "&:focus-visible": {
          boxShadow: "0 0 0 2px $$focus",
        },
      },
      solid: {
        backgroundColor: "$$bgSolid",
        color: "$$colorSolid",

        "&:hover": {
          backgroundColor: "$$bgSolidHover",
        },

        "&:active": {
          backgroundColor: "$$bgSolidActive",
        },

        "&:focus-visible": {
          boxShadow: "0 0 0 2px $colors$blue8",
          [`.${darkTheme} &`]: {
            boxShadow: "0 0 0 2px $colors$blue10",
          },
        },
      },
      ghost: {
        color: "$$color",
        backgroundColor: "transparent",

        "&:hover": {
          backgroundColor: "$$bgHover",
        },

        "&:active": {
          backgroundColor: "$$bgActive",
        },

        "&:focus-visible": {
          boxShadow: "0 0 0 2px $$focus",
        },
      },
    },
    border: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variant: "subtle",
      border: true,
      css: {
        backgroundColor: "$$bg",
        boxShadow: "inset 0 0 0 1px $$border",
        "&:hover": {
          backgroundColor: "$$bgHover",
          boxShadow: "inset 0 0 0 1px $$borderHover",
        },
        "&:active": {
          backgroundColor: "$$bgActive",
          boxShadow: "inset 0 0 0 1px $$borderActive",
        },
      },
    },
  ],

  defaultVariants: {
    size: "2",
    variant: "subtle",
  },
});

export const IconButton = styled(IconButtonBase, {
  br: "$round",
  backgroundColor: "$indigo2",
  boxShadow: "inset 0 0 0 1px $colors$indigo5",
  color: "$indigo11",

  "&:hover": {
    backgroundColor: "$indigo3",
  },

  "&:active": {
    backgroundColor: "$indigo4",
  },

  "&:focus": {
    boxShadow: "inset 0 0 0 1px $colors$indigo8",
  },
});
