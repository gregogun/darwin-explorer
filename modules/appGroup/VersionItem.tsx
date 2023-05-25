import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Box,
  Flex,
  styled,
  Typography,
} from "@aura-ui/react";
import { MouseEvent, useEffect, useState } from "react";
import arweaveGql from "arweave-graphql";
import { VersionItemProps } from "../../types";
import { stampAsset } from "../../lib/stamps";
import { Link } from "react-router-dom";
import { HiArrowUp } from "react-icons/hi";
import { config } from "../../config";

const StampButton = styled("button", {
  all: "unset",
  cursor: "pointer",
  boxSizing: "border-box",
  userSelect: "none",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "$2",
  lineHeight: "$2",
  color: "$slate11",
  br: "$1",
  width: 48,
  height: 56,
  boxShadow: "0 0 0 1px $colors$slate6",
  zindex: 999,

  "& svg": {
    size: 12,
  },

  "&:hover": {
    boxShadow: "0 0 0 1px $colors$slate8",
    color: "$slate12",
  },
});

export const VersionItem = ({
  title,
  description,
  id,
  topics,
  stamps,
}: VersionItemProps) => {
  const [info, setInfo] = useState<{
    logo: string | undefined;
    owner: string;
  }>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await arweaveGql(
        `${"https://arweave.net"}/graphql`
      ).getTransactions({
        ids: [id],
      });
      const data = res.transactions.edges.map((edge) => {
        const logo = edge.node.tags.find((x) => x.name === "Logo")?.value;
        const owner = edge.node.owner.address;
        return {
          logo,
          owner,
        };
      });
      setInfo(data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();

    stampAsset(id)
      .then(() => console.log("Asset stamped!"))
      .catch((error) => console.error(error));
  };
  return (
    <Link
      to={{
        pathname: "/version",
        search: `?tx=${id}`,
      }}
    >
      <Flex
        justify="between"
        align="center"
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
          {info?.logo ? (
            <Avatar
              size="5"
              css={{
                br: "$3",
              }}
              shape="square"
            >
              <AvatarImage
                src={`${config.gatewayUrl}/${id}/${info?.logo}`}
                alt={`${title} logo`}
              />
              <AvatarFallback variant="solid" delayMs={300}>
                {title?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Box
              css={{
                size: 64,
              }}
            />
          )}
          <Flex justify="center" direction="column" gap="1">
            <Flex direction="column">
              <Typography size="2" css={{ color: "$slate12" }}>
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
        <StampButton onClick={handleClick}>
          <HiArrowUp />
          <Typography>{stamps}</Typography>
        </StampButton>
      </Flex>
    </Link>
  );
};
