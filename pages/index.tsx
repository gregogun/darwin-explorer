import { useEffect, useState } from "react";
import { Flex, Typography } from "@aura-ui/react";
import { getApps } from "../lib/getApps";
import { AppHeader } from "../modules/Layout/AppHeader";
import { AppItemProps } from "../types";
import { AppItem } from "../modules/Cards/AppItem";

export default function Home() {
  const [data, setData] = useState<AppItemProps[] | undefined>([]);
  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    const data = await getApps("g8way.io");
    console.log(data);

    if (data.length === 1 && typeof data[0] === "undefined") {
      setData(undefined);
      return;
    }

    console.log(`https://g8way.io/${data[0]?.baseId}/${data[0]?.logo}`);

    setData(data as AppItemProps[]);
  };

  return (
    <>
      <AppHeader />
      <Flex direction="column" align="center" css={{ mt: "$10" }}>
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
          <Typography>Loading apps...</Typography>
        )}
      </Flex>
    </>
  );
}
