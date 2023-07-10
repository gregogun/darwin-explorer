import { Flex, styled } from "@aura-ui/react";
import { ConnectWallet, useConnect } from "arweave-wallet-ui-test";
import { Link, useLocation } from "react-router-dom";
import { Search } from "../search";
import { HeaderDropdown } from "./HeaderDropdown";
import { Image } from "../../ui/Image";
import { useEffect, useState } from "react";

export const AppHeader = () => {
  const { profile, walletAddress } = useConnect();
  const [isHome, setIsHome] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (location && location.pathname === "/") {
        setIsHome(true);
      } else {
        setIsHome(false);
      }
    }
  }, [location]);

  if (isHome) return null;

  return (
    <Flex
      as="header"
      css={{
        p: "$5",
        borderBottom: "1px solid $colors$slate2",
        display: "none",
        "@bp2": {
          display: "flex",
        },
      }}
      justify="between"
      align="center"
    >
      <Flex gap="5">
        <Link to="/">
          <Image
            css={{ cursor: "pointer", size: 44 }}
            src="logo.svg"
            alt="Darwin logo"
          />
        </Link>
        <Search />
        <Flex
          as="nav"
          justify="center"
          align="center"
          gap="5"
          css={{
            "& a": { color: "$slate12", "&:hover": { color: "$indigo11" } },
          }}
        >
          <Link to="/">Explore</Link>
          <Link to="https://github.com/gregogun/evolutionary-apps-cli/blob/main/README.md">
            Create
          </Link>
        </Flex>
      </Flex>
      {walletAddress ? (
        <HeaderDropdown profile={profile} />
      ) : (
        <ConnectWallet
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
          }}
        />
      )}
    </Flex>
  );
};
