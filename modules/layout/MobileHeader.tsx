import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
  Flex,
  IconButton,
  darkTheme,
} from "@aura-ui/react";
import { Link } from "react-router-dom";
import { Image } from "../../ui/Image";
import { Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Search } from "../search";
import { ConnectWallet } from "arweave-wallet-ui-test";

export const MobileHeader = () => {
  return (
    <Flex
      as="header"
      css={{
        p: "$5",
        borderBottom: "1px solid $colors$slate2",
        display: "flex",

        "& a": {
          flex: 1,
        },

        "@bp2": {
          display: "none",
        },
      }}
      justify="between"
      align="center"
      gap="5"
    >
      <Link to="/">
        <Image
          css={{ cursor: "pointer", width: 28, height: 28 }}
          src="logo.svg"
          alt="Darwin logo"
        />
      </Link>
      <Search />
      {/* <ConnectWallet
        permissions={[
          "ACCESS_ADDRESS",
          "DISPATCH",
          "SIGN_TRANSACTION",
          "ACCESS_ARWEAVE_CONFIG",
        ]}
        appName="Evolutionary App Explorer"
        options={{
          connectButtonColorScheme: "indigo",
          connectButtonVariant: "ghost",
          connectButtonSize: "3",
          connectButtonStyles: {
            justifySelf: "end",
          },
          connectButtonLabel: "Connect",
        }}
      /> */}
      <Dialog>
        <DialogTrigger asChild>
          <IconButton size="1" variant="ghost">
            <HamburgerMenuIcon />
          </IconButton>
        </DialogTrigger>
        <DialogOverlay />
        <DialogPortal>
          <DialogContent
            css={{
              br: 0,
              height: "100%",
              width: "100%",
              maxH: "100dvh",

              [`.${darkTheme} &`]: {
                backgroundColor: "#08090A",
              },
            }}
          >
            <Flex
              as="nav"
              align="center"
              direction="column"
              gap="7"
              css={{
                "& a": {
                  color: "$slate12",
                  fontSize: "$4",
                  pl: "$5",
                  "&:hover": { color: "$indigo11" },
                },
                height: "100%",
                textAlign: "center",
              }}
              justify="center"
            >
              <DialogClose
                asChild
                css={{
                  position: "relative",
                }}
              >
                <Link to="/">Explore</Link>
              </DialogClose>
              <DialogClose
                asChild
                css={{
                  position: "relative",
                }}
              >
                <Link to="https://github.com/gregogun/evolutionary-apps-cli/blob/main/README.md">
                  Create
                </Link>
              </DialogClose>
              <DialogClose
                asChild
                css={{
                  position: "relative",
                }}
              >
                <ConnectWallet
                  permissions={[
                    "ACCESS_ADDRESS",
                    "DISPATCH",
                    "SIGN_TRANSACTION",
                    "ACCESS_ARWEAVE_CONFIG",
                  ]}
                  appName="Evolutionary App Explorer"
                  options={{
                    // connectButtonColorScheme: "indigo",
                    // connectButtonVariant: "ghost",
                    connectButtonSize: "3",
                    connectButtonStyles: {
                      justifySelf: "end",
                    },
                    connectButtonLabel: "Connect",
                  }}
                />
              </DialogClose>
            </Flex>
            <DialogClose asChild>
              <IconButton
                size="1"
                variant="outline"
                css={{
                  br: "$round",
                }}
              >
                <Cross2Icon />
              </IconButton>
            </DialogClose>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </Flex>
  );
};
