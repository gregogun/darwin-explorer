import { Flex, Grid, styled, Typography } from "@aura-ui/react";
import { ConnectWallet } from "arweave-wallet-ui-test";
import Link from "next/link";
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
    <Flex
      css={{
        // border: "1px solid red",
        flex: 1,
      }}
      gap="5"
    >
      <Link href="/">
        <Image css={{ cursor: "pointer" }} src="/app-logo.svg" alt="app logo" />
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
        <Link href="/">Explore</Link>
        <Link href="/">Create</Link>
        <Link href="/search">Learn more</Link>
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
