import { Box, Flex, Typography } from "@aura-ui/react";
import { AppItem } from "./AppItem";
import { Skeleton } from "../../ui/Skeleton";
import { useEffect, useState } from "react";
import { getApps } from "../../lib/getApps";
import { AppItemProps } from "../../types";
import { AppHeader } from "../layout/AppHeader";

export const Explore = () => {
  const [data, setData] = useState<AppItemProps[] | undefined>([]);
  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    const data = await getApps("https://arweave.net");

    if (data.length === 1 && typeof data[0] === "undefined") {
      setData(undefined);
      return;
    }

    setData(data as AppItemProps[]);
  };
  return (
    <Flex
      direction="column"
      align="center"
      css={{ mt: "$10", mx: "auto", maxW: 600 }}
    >
      <Typography css={{ mb: "$5" }} size="6" weight="6">
        Explore Apps
      </Typography>
      {data && data.length > 0 ? (
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
        ))
      ) : (
        <Flex
          css={{
            width: "100%",
            // maxW: 600,
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
    </Flex>
  );
};
