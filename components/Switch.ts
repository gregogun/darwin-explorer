import * as SwitchPrimitive from "@radix-ui/react-switch";
import { styled } from "../stitches.config";

const StyledSwitch = styled(SwitchPrimitive.Root, {
  all: "unset",
  width: 24,
  height: 14.4,
  p: 1,
  backgroundColor: "$slate7",
  borderRadius: "9999px",
  position: "relative",
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
  "&:focus-visible": { boxShadow: `0 0 0 2px $colors$slate8` },
  '&[data-state="checked"]': { backgroundColor: "$violet9" },
});

const StyledThumb = styled(SwitchPrimitive.Thumb, {
  display: "block",
  width: 14.4,
  height: 14.4,
  backgroundColor: "white",
  borderRadius: "9999px",
  boxShadow: `0 0 0 1px $colors$slate7`,
  transition: "transform 100ms",
  willChange: "transform",
  '&[data-state="checked"]': {
    transform: "translateX(10px)",
    boxShadow: `0 0 0 1px $colors$violet9`,
  },
});

export const Switch = StyledSwitch;
export const SwitchThumb = StyledThumb;
