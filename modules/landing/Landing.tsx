import { Box, Flex, styled, keyframes, Button } from "@aura-ui/react";
import { Image } from "../../ui/Image";
import { Link } from "react-router-dom";

const moveBg = keyframes({
  to: {
    backgroundPosition: "var(--bg-size) 0",
  },
});

const Display = styled("h1", {
  "--bg-size": "400%",
  fontSize: "clamp(1.rem, 2em, 3rem)",
  letterSpacing: "-1.4px",
  textAlign: "center",

  "@bp3": {
    textAlign: "start",
    fontSize: "clamp(2rem, 4em, 4rem)",
    letterSpacing: "-3px",
  },

  "@bp4": {
    fontSize: "clamp(2rem, 5em, 6rem)",
    letterSpacing: "-4px",
  },

  my: 0,
  maxWidth: "20ch",
  lineHeight: 1,
  background: `linear-gradient(
      90deg,
      #3E63DD,
      #E1E8FF,
      #3E63DD
    ) 0 0 / var(--bg-size) 100%`,

  color: "transparent",
  "-webkit-background-clip": "text",
  backgroundClip: "text",

  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${moveBg} 12s infinite linear`,
  },
});

export const Landing = () => {
  return (
    <Box
      css={{
        display: "flex",
        minHeight: "100dvh",
        flexDirection: "column",
        padding: "$5",
      }}
    >
      <Image
        src="logo-with-text.svg"
        css={{
          width: 172 / 1.5,
          height: 44 / 1.5,
          "@bp3": {
            width: 172,
            height: 44,
          },
        }}
      />
      <Flex
        css={{
          width: "100%",
          // maxW: 1600,
          justifyContent: "center",
          alignItems: "center",
          my: 80,

          "@bp2": {
            my: "auto",
          },
        }}
        direction={{
          "@initial": "columnReverse",
          "@bp2": "row",
        }}
      >
        <Flex
          css={{
            flexDirection: "column",
            gap: "$5",

            "@bp2": {
              ml: "$8",
            },
          }}
        >
          <Display>The framework for evolving decentralized web apps</Display>
          <Flex
            css={{
              gap: 12,
              alignItems: "center",
              justifyContent: "center",

              "@bp2": {
                justifyContent: "start",
              },

              "& a": {
                width: "max-content",
              },
            }}
          >
            <Link
              to={{
                pathname: "/explore",
              }}
            >
              <Button
                size={{
                  "@initial": "2",
                  "@bp2": "3",
                }}
                css={{
                  userSelect: "none",
                  cursor: "pointer",
                  br: "$pill",
                }}
                as="a"
                href="https://evolutionary.arweave.dev"
                variant="solid"
                colorScheme="indigo"
              >
                Explore Apps
              </Button>
            </Link>
            <Button
              as="a"
              href="https://amused-boron-f0a.notion.site/Introducing-Evolutionary-Apps-b7ab4b5f5d8548fdbd22db1944c204ba?pvs=4"
              size={{
                "@initial": "2",
                "@bp2": "3",
              }}
              css={{
                userSelect: "none",
                cursor: "pointer",
                br: "$pill",
              }}
              variant="outline"
            >
              Learn more
            </Button>
          </Flex>
        </Flex>
        <Image
          src="hero-image.png"
          css={{
            width: 300,
            height: 300,

            "@bp1": {
              display: "block",
              width: 300,
              height: 300,
            },

            "@bp3": {
              flexDirection: "row",
              width: 400,
              height: 400,
            },
          }}
        />
      </Flex>
    </Box>
  );
};
