import { useEffect, useState } from "react";
import {
  Flex,
  Typography,
  Avatar,
  AvatarImage,
  AvatarFallback,
  styled,
} from "@aura-ui/react";
import { getApps } from "../lib/getApps";
import { AppHeader } from "../modules/Layout/AppHeader";
import Link from "next/link";
import { Tag } from "arweave-graphql";
import { timeAgo } from "../utils";

interface AppGroup {
  title: string;
  description: string;
  txid: string;
  baseId: string;
  logo: string;
  topics: Tag[];
  published: string;
}

const AppItem = ({
  title,
  description,
  txid,
  baseId,
  logo,
  topics,
  published,
}: AppGroup) => (
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
            {title.slice(0, 2).toUpperCase()}
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
            {topics.map((topic) => (
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

export default function Home() {
  const [data, setData] = useState<AppGroup[] | undefined>([]);
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

    setData(data as AppGroup[]);
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
