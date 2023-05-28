import { Account } from "../../types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  Flex,
} from "@aura-ui/react";
import { abbreviateAddress } from "../../utils";
import { ChevronDownIcon, GlobeIcon } from "@radix-ui/react-icons";
import { BsPlug } from "react-icons/bs";
import { useConnect } from "arweave-wallet-ui-test";

interface HeaderDropdownProps {
  profile: Omit<Account, "vouched"> | undefined;
}

export const HeaderDropdown = ({ profile }: HeaderDropdownProps) => {
  const { setState } = useConnect();
  const name = profile?.handle
    ? profile.handle
    : abbreviateAddress({ address: profile?.address });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button colorScheme="indigo" size="3">
          <Avatar size="1">
            <AvatarImage
              src={
                profile?.avatar
                  ? profile.avatar
                  : `https://source.boringavatars.com/marble/40/${profile?.address}`
              }
            />
            <AvatarFallback>
              {profile?.address.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {name}
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          variant="compact"
          css={{
            minWidth: 200,
            backgroundColor: "$indigo3",
            boxShadow: "0 0 0 1px $colors$indigo7",

            '[role="menuitem"]': {
              py: "$3",
              "&[data-highlighted]": {
                backgroundColor: "$indigo5",
              },
            },
          }}
          sideOffset={8}
          collisionPadding={8}
        >
          <DropdownMenuItem disabled>
            <Flex align="center" gap="2">
              <GlobeIcon />
              Switch gateway
            </Flex>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              window.arweaveWallet.disconnect().then(() => {
                setState({ walletAddress: "" });
              });
            }}
          >
            <Flex align="center" gap="2">
              <BsPlug />
              Disconnect
            </Flex>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};
