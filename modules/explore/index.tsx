import { Flex, Typography } from "@aura-ui/react";
import { AppItem } from "./AppItem";
import { Skeleton } from "../../ui/Skeleton";
import { getApps } from "../../lib/getApps";
import { config } from "../../config";
import { useQuery } from "@tanstack/react-query";

export const Explore = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["apps"],
    queryFn: () => getApps(config.gatewayUrl),
  });

  return (
    <Flex
      direction="column"
      align="center"
      css={{ mt: "$10", mx: "auto", maxW: 600 }}
    >
      <Typography css={{ mb: "$5" }} size="6" weight="6">
        Explore
      </Typography>
      {!isLoading &&
        data &&
        data.length > 0 &&
        data.map((app) => (
          <AppItem
            key={app.txid}
            title={app.title}
            description={app.description}
            txid={app.txid}
            baseId={app.baseId}
            logo={app.logo}
            topics={app.topics}
            published={app.published}
          />
        ))}
      {isLoading && (
        <Flex
          css={{
            width: "100%",
          }}
          direction="column"
          gap="3"
        >
          <Skeleton
            css={{
              width: "100%",
              height: 96,
            }}
          />
          <Skeleton
            css={{
              width: "100%",
              height: 96,
            }}
          />
          <Skeleton
            css={{
              width: "100%",
              height: 96,
            }}
          />
        </Flex>
      )}
      {isError && (
        <Typography>
          Error occured while fetching data. Please try again.
        </Typography>
      )}
    </Flex>
  );
};
