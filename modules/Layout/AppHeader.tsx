import { Flex, styled } from "@aura-ui/react";
import { ConnectWallet } from "arweave-wallet-ui-test";
import { Link } from "react-router-dom";
import { account } from "../../lib/arweave";
import { Search } from "../Search";

const Image = styled("img", {
  width: 40,
  height: 40,
});

export const AppHeader = () => (
  <Flex
    as="header"
    css={{
      p: "$5",
      borderBottom: "1px solid $colors$slate2",
    }}
    justify="between"
    align="center"
  >
    <Flex gap="5">
      <Link to="/">
        <Image css={{ cursor: "pointer" }} src="app-logo.svg" alt="app logo" />
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
    <ConnectWallet
      arweaveAccount={account}
      permissions={["ACCESS_ADDRESS", "DISPATCH", "SIGN_TRANSACTION"]}
      appName="Evolutionary App Explorer"
      connectButtonColorScheme="indigo"
      connectButtonVariant="ghost"
      connectButtonSize="3"
      connectButtonStyles={{
        justifySelf: "end",
      }}
    />
  </Flex>
);
