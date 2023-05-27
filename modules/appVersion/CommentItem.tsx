import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Box,
  Flex,
  Grid,
  Separator,
  Typography,
} from "@aura-ui/react";
import { config } from "../../config";
import { useQuery } from "@tanstack/react-query";
import { arweave, getAccount } from "../../lib/arweave";
import { abbreviateAddress, timeAgo } from "../../utils";
import { BsPatchCheckFill } from "react-icons/bs";

interface CommentItemProps {
  owner: string | undefined;
  txid: string | undefined;
  isOwner: boolean;
  published: string | undefined;
}

export const CommentItem = ({
  txid,
  owner,
  isOwner,
  published,
}: CommentItemProps) => {
  const {
    data: comment,
    isLoading: commentLoading,
    isError: commentError,
  } = useQuery({
    queryKey: ["comment"],
    enabled: !!txid,
    queryFn: () => {
      if (!txid) {
        throw new Error("No transaction ID found for the comment");
      }

      return arweave.api
        .get(txid)
        .then((res) => res.data)
        .catch((error) => console.error(error));
    },
  });
  const {
    data: account,
    isLoading: accountLoading,
    isError: accountError,
  } = useQuery({
    queryKey: ["account"],
    enabled: !!owner,
    queryFn: () => {
      if (!owner) {
        throw new Error("No owner address found for the comment");
      }

      return getAccount(owner);
    },
  });

  const name =
    account && account.profile.handleName
      ? account.profile.handleName
      : abbreviateAddress({ address: owner });

  return (
    <Flex css={{ my: "$3", position: "relative" }} gap="3">
      <Flex direction="column" gap="2" align="center">
        <Avatar size="4">
          <AvatarImage
            css={{
              border: "1px solid $colors$slate1",
            }}
            src={account?.profile.avatarURL}
          />
          <AvatarFallback>{name?.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        {/* only show separator if there is a reply */}
        {/* <Separator
          orientation="vertical"
          css={{
            br: "$1",
            height: "100%",

            '&[data-orientation="vertical"]': {
              width: 4,
            },
          }}
        /> */}
      </Flex>
      <Flex css={{ width: "100%" }} direction="column" gap="2">
        <Flex align="center" justify="between">
          <Flex gap="1">
            <Typography weight="6">{name}</Typography>
            <Box
              css={{
                "& svg": {
                  fill: "$indigo11",
                  size: "$4",
                  verticalAlign: "middle",
                },
              }}
              as="span"
            >
              <BsPatchCheckFill />
            </Box>
            {account?.handle && (
              <Typography css={{ color: "$slate11" }}>
                {account.handle}
              </Typography>
            )}
            {isOwner && (
              <Typography
                css={{
                  backgroundColor: "$indigo2",
                  color: "$indigo11",
                  py: "$1",
                  px: "$2",
                  br: "$pill",
                }}
                size="1"
              >
                Creator
              </Typography>
            )}
          </Flex>
          <Typography size="2" css={{ color: "$slate11" }}>
            {timeAgo(Number(published))}
          </Typography>
        </Flex>
        {comment && (
          <Typography
            css={{
              opacity: 0.8,
            }}
          >
            {comment}
          </Typography>
        )}
      </Flex>
    </Flex>
  );
};
