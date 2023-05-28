import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Box,
  Flex,
  Typography,
} from "@aura-ui/react";
import { abbreviateAddress, timeAgo } from "../../utils";
import { BsPatchCheckFill } from "react-icons/bs";
import { Account } from "../../types";

interface CommentItemProps {
  owner: string | undefined;
  txid: string | undefined;
  isOwner: boolean;
  published: string | undefined;
  account: Account | undefined;
  comment: string;
}

export const CommentItem = ({
  owner,
  isOwner,
  published,
  account,
  comment,
}: CommentItemProps) => {
  const name =
    account && account.handle
      ? account.handle
      : abbreviateAddress({ address: owner });

  return (
    <Flex css={{ my: "$3", position: "relative" }} gap="3">
      <Flex direction="column" gap="2" align="center">
        <Avatar size="4">
          <AvatarImage
            css={{
              border: "1px solid $colors$slate1",
            }}
            src={
              account?.avatar
                ? account?.avatar
                : `https://source.boringavatars.com/marble/40/${owner}`
            }
          />
          <AvatarFallback>{name?.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </Flex>
      <Flex css={{ width: "100%" }} direction="column" gap="2">
        <Flex align="center" justify="between">
          <Flex gap="1">
            <Typography weight="6">{name}</Typography>
            {account?.vouched && (
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
            )}
            {account?.uniqueHandle && (
              <Typography css={{ color: "$slate11" }}>
                {account.uniqueHandle}
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
