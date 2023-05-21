import { Flex, styled, Typography } from "@aura-ui/react";
import { ConnectWallet } from "arweave-wallet-ui-test";
import Link from "next/link";
import { account } from "../../lib/arweave";

const Image = styled("img", {
  width: 40,
  height: 40,
});

export const AppHeader = () => (
  <Flex
    justify="between"
    css={{
      p: "$5",
    }}
  >
    <Link href="/">
      <Image css={{ cursor: "pointer" }} src="/app-logo.svg" alt="app logo" />
    </Link>
    <ConnectWallet
      arweaveAccount={account}
      permissions={["ACCESS_ADDRESS", "DISPATCH", "SIGN_TRANSACTION"]}
      appName="Evolutionary App Explorer"
      connectButtonColorScheme="indigo"
      connectButtonVariant="outline"
    />
  </Flex>
);
