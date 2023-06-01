import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Box,
  Flex,
  styled,
  Typography,
} from "@aura-ui/react";
import arweaveGql from "arweave-graphql";
import { AssetItem, VersionItemProps } from "../../types";
import { getStampCount, stampAsset } from "../../lib/stamps";
import { Link } from "react-router-dom";
import { HiArrowUp } from "react-icons/hi";
import { config } from "../../config";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

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
  topics,
  id,
}: Pick<AssetItem, "description" | "id" | "title" | "topics">) => {
  const queryClient = useQueryClient();
  const {
    data: info,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`versionItemInfo-${id}`],
    queryFn: () => getInfo(),
  });
  const {
    data: stamps,
    isLoading: stampsLoading,
    isError: stampsError,
  } = useQuery({
    queryKey: [`stamp-${id}`],
    enabled: !!id,
    queryFn: () => getStampCount(id),
  });

  const getInfo = async () => {
    try {
      const res = await arweaveGql(
        `${config.gatewayUrl}/graphql`
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
      return data[0];
    } catch (error) {
      console.error(error);
      throw new Error(error as any);
    }
  };

  const mutation = useMutation({
    mutationFn: stampAsset,
    onSuccess: (data) => {
      console.log(data);
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["stamps"] });
      }, 500);
    },
    onError: (error: any) => {
      console.error(error);
    },
  });

  const handleClick = () => {
    mutation.mutate(id);
  };

  return (
    <Flex
      justify="between"
      align="center"
      css={{
        width: "100%",
        p: "$5",
        br: "$3",
        "&:hover": {
          background:
            "linear-gradient(89.46deg, #1A1B1E 1.67%, rgba(26, 29, 30, 0) 89.89%)",
        },
      }}
    >
      <Link
        to={{
          pathname: "/version",
          search: `?tx=${id}`,
        }}
      >
        <Flex gap="3">
          {!isLoading && info?.logo && (
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
          )}
          {isLoading && (
            <Box
              css={{
                backgroundColor: "$slate1",
                br: "$3",
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
      </Link>
      <StampButton onClick={handleClick}>
        <HiArrowUp />
        <Typography>{stampsLoading || stampsError ? "-" : stamps}</Typography>
      </StampButton>
    </Flex>
  );
};
