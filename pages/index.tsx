import { useState } from "react";
import {
  Grid,
  Flex,
  Typography,
  keyframes,
  styled,
  TextField,
  Button,
} from "@aura-ui/react";
import { TreeGraphDialog } from "../modules/TreeGraph/TreeGraphDialog";

const moveBg = keyframes({
  to: {
    backgroundPosition: "var(--bg-size) 0",
  },
});

const ControlGroup = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$2",
  width: "100%",
});

export default function Home() {
  const [showDialog, setShowDialog] = useState(false);

  const handleShowDialog = () => setShowDialog(true);
  const handleCancelDialog = () => setShowDialog(false);

  return (
    <Grid
      css={{
        placeItems: "center",
        height: "100%",
        background: "url(/img/bg.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      <Flex
        css={{
          mt: "-$20",
          py: "$10",
          px: "$12",
          br: "$3",
          boxShadow: "inset 0 0 0 2px $colors$indigo4",
          backdropFilter: "blur($space$3)",
        }}
        align="center"
        direction="column"
        gap="10"
      >
        <Flex align="center" direction="column" gap="3">
          <Typography
            css={{
              "--bg-size": "400%",

              letterSpacing: "-1px",
              background: `linear-gradient(
              90deg,
              hsla(263, 93%, 69%, 1),
              hsla(282, 57%, 64%, 1),
              hsla(325, 55%, 66%, 1),
              hsla(0, 92%, 75%, 1),
              hsla(16, 65%, 78%, 1),
              hsla(32, 50%, 80%, 1),
              hsla(16, 65%, 78%, 1),
              hsla(0, 92%, 75%, 1),
              hsla(325, 55%, 66%, 1),
              hsla(282, 57%, 64%, 1),
              hsla(263, 93%, 69%, 1)
            ) 0 0 / var(--bg-size) 100%`,

              color: "transparent",
              "-webkit-background-clip": "text",
              backgroundClip: "text",

              "@media (prefers-reduced-motion: no-preference)": {
                animation: `${moveBg} 12s infinite linear`,
              },
            }}
            size="4"
            weight="5"
          >
            A whole new era for web applications
          </Typography>
          <Typography
            contrast="hiContrast"
            css={{ letterSpacing: "-1px" }}
            size="8"
            weight="6"
          >
            Evolutionary App Explorer
          </Typography>
        </Flex>
        <ControlGroup>
          <TextField
            size="2"
            variant="outline"
            css={{
              "&[type]": {
                width: "100%",
                boxShadow: "0 0 0 1px $colors$indigo7",
                color: "$indigo12",

                "&::placeholder": {
                  color: "$indigo9",
                },

                "&::selection": {
                  background: "$indigo9",
                  color: "white",
                },

                "&:hover": {
                  boxShadow: "0 0 0 1px $colors$indigo8",
                },

                "&:focus": {
                  boxShadow: "inset 0 0 0 2px $colors$indigo8",
                },
              },
            }}
            placeholder="Enter your app Asset ID"
          />
          <Button
            onClick={handleShowDialog}
            css={{
              color: "$indigo11",
              backgroundColor: "$indigoA3",

              "&:hover": {
                backgroundColor: "$indigoA4",
              },

              "&:active": {
                backgroundColor: "$indigoA5",
              },

              "&:focus-visible": {
                boxShadow: "inset 0 0 0 2px $colors$indigoA8",
              },
            }}
            size="3"
          >
            View Fork Tree
          </Button>

          <TreeGraphDialog open={showDialog} onClose={handleCancelDialog} />
        </ControlGroup>
      </Flex>
    </Grid>
  );
}
