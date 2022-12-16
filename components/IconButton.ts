import { styled } from "../stitches.config";

export const IconButton = styled("button", {
  // resets
  border: 0,
  padding: 0,
  margin: 0,
  outline: "none",
  textDecoration: "none",
  appearance: "none",
  boxSizing: "border-box",
  display: "inline-flex",
  userSelect: "none",
  WebkitTapHighlightColor: "rgba(0,0,0,0)",
  fontFamily: "inherit",
  lineHeight: 1,
  br: "$2",

  // custom
  justifyContent: "center",
  alignItems: "center",
  fontSize: 16,
  color: "$slate12",
  width: 28,
  height: 28,
  backgroundColor: "transparent",

  "&:hover": {
    backgroundColor: "$slate4",
  },

  "&:active": {
    backgroundColor: "$slate5",
  },

  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});
