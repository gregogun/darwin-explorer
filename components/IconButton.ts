import { styled, IconButton as IconButtonBase } from "@aura-ui/react";

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
