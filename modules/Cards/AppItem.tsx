import {
  Flex,
  Typography,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@aura-ui/react";
import Link from "next/link";
import { timeAgo } from "../../utils";
import { AppItemProps } from "../../types";

export const AppItem = ({
  title,
  description,
  txid,
  baseId,
  logo,
  topics,
  published,
}: AppItemProps) => (
  <Link href={`/app/${txid}`} passHref>
    <Flex
      as="a"
      gap="3"
      justify="between"
      css={{
        width: "100%",
        maxW: 600,
        cursor: "pointer",
        p: "$5",
        br: "$3",
        "&:hover": {
          background:
            "linear-gradient(89.46deg, #1A1B1E 1.67%, rgba(26, 29, 30, 0) 89.89%)",
        },
      }}
    >
      <Flex gap="3">
        <Avatar
          size="5"
          css={{
            br: "$3",
          }}
          shape="square"
        >
          <AvatarImage
            src={`https://g8way.io/${baseId}/${logo}`}
            alt={`${title} logo`}
          />
          <AvatarFallback variant="solid" delayMs={300}>
            {title?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <Flex justify="center" direction="column" gap="1">
          <Flex direction="column">
            <Typography as="h3" size="2" weight="6" css={{ color: "$slate12" }}>
              {title}
            </Typography>
            <Typography size="2" css={{ color: "$slate11" }}>
              {description}
            </Typography>
          </Flex>
          <Flex gap="2">
            {topics?.map((topic) => (
              <Typography
                key={topic.value}
                css={{ color: "$slate11", opacity: 0.7 }}
                size="1"
                as="span"
              >
                {topic.value}
              </Typography>
            ))}
          </Flex>
        </Flex>
      </Flex>
      <Typography
        size="1"
        css={{
          color: "$slate11",
        }}
      >
        {timeAgo(Number(published))}
      </Typography>
    </Flex>
  </Link>
);
