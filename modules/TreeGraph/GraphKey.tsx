import { Box } from "../../components/Box";
import { Typography } from "../../components/Typography";
import { styled } from "../../stitches.config";

interface KeyItem {
  color: "white" | "blue" | "green";
  name: string;
}

const keyItems: KeyItem[] = [
  {
    color: "white",
    name: "Original",
  },
  {
    color: "blue",
    name: "Fork (Parent)",
  },
  {
    color: "green",
    name: "Fork (Child)",
  },
];

const Indicator = styled("div", {
  width: 10,
  height: 10,
  br: 9999,

  variants: {
    color: {
      white: {
        backgroundColor: "$slate12",
      },
      blue: {
        backgroundColor: "$blue11",
      },
      green: {
        backgroundColor: "$mint11",
      },
    },
  },
});

const KeyItem = styled("li", {
  display: "flex",
  alignItems: "center",
  gap: "$3",
});

export const GraphKey = () => {
  return (
    <Box
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "$2",
        padding: 20,
        boxShadow: "0 0 0 1px $colors$indigo6",
        br: "$3",
        position: "absolute",
        margin: "$5",
        zIndex: 999,
        backgroundColor: "$indigo1",
      }}
    >
      {keyItems.map((item) => (
        <KeyItem key={item.name}>
          <Indicator color={item.color} />
          <Typography
            css={{
              color: "$indigo12",
            }}
          >
            {item.name}
          </Typography>
        </KeyItem>
      ))}
    </Box>
  );
};
