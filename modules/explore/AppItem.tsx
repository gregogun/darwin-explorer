import {
  Flex,
  Typography,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@aura-ui/react";
import { timeAgo } from "../../utils";
import { AppItemProps } from "../../types";
import { config } from "../../config";
import { Link } from "react-router-dom";

export const AppItem = ({
  title,
  description,
  txid,
  baseId,
  logo,
  topics,
  published,
}: AppItemProps) => (
  <Link
    to={{
      pathname: "/app",
      search: `?tx=${txid}&baseId=${baseId}`,
    }}
  >
    <Flex
      gap="3"
      justify="between"
      css={{
        width: "100%",
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
          size={{
            "@initial": "4",
            "@bp2": "5",
          }}
          css={{
            br: "$3",
          }}
          shape="square"
        >
          <AvatarImage
            src={`${config.gatewayUrl}/${baseId}/${logo}`}
            alt={`${title} logo`}
          />
          <AvatarFallback variant="solid" delayMs={300}>
            {title?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <Flex justify="center" direction="column" gap="1">
          <Flex direction="column">
            <Typography
              as="h3"
              size="2"
              weight="6"
              css={{
                display: "-webkit-box",
                "-webkit-line-clamp": 1,
                "-webkit-box-orient": "vertical",
                typographyOverflow: "ellipsis",
                overflow: "hidden",
                maxW: "16ch",
                color: "$slate12",

                "@bp1": {
                  maxW: "32ch",
                },

                "@bp2": {
                  maxW: "60ch",
                },
              }}
            >
              {title}
            </Typography>
            <Typography size="2" css={{ color: "$slate11" }}>
              {description}
            </Typography>
          </Flex>
          <Flex gap="2">
            {topics?.split(",").map((topic) => (
              <Typography
                key={topic}
                css={{ color: "$slate11", opacity: 0.7 }}
                size="1"
                as="span"
              >
                {topic}
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
