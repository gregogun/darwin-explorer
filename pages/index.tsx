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

interface AppGroup {
  title: string;
  description: string;
  txid: string;
}

const AppItem = ({ title, description, txid }: AppGroup) => (
  <Link href={`/app/${txid}`} passHref>
    <Flex
      as="a"
      gap="3"
      css={{
        "@bp1": { width: "100%" },
        "@bp2": { maxW: 500 },
        "@bp4": { maxW: 734 },
        cursor: "pointer",
        p: "$5",
        br: "$3",
        "&:hover": {
          background:
            "linear-gradient(89.46deg, #1A1B1E 1.67%, rgba(26, 29, 30, 0) 89.89%)",
        },
      }}
    >
      <Avatar
        size="5"
        css={{
          br: "$3",
        }}
        shape="square"
      >
        <AvatarImage
          src={`https://g8way.io/${txid}/favicon.ico`}
          alt={`${title} logo`}
        />
        <AvatarFallback variant="solid" delayMs={300}>
          {title.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
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
          <Typography css={{ color: "$slate11" }} size="1" as="span">
            renderer
          </Typography>
          <Typography css={{ color: "$slate11" }} size="1" as="span">
            audio
          </Typography>
        </Flex>
      </Flex>
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
            />
          ))
        ) : (
          <Typography>Loading apps...</Typography>
        )}
      </Flex>
    </>
  );
}
