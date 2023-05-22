import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Box,
  Button,
  Flex,
  styled,
  Typography,
} from "@aura-ui/react";
import { MouseEvent, useEffect, useState } from "react";
import { AppHeader } from "../../modules/Layout/AppHeader";
import arweaveGql, { Transaction } from "arweave-graphql";
import { getAppVersions } from "../../lib/getAppVersions";
import { CaretUpIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { stampAsset } from "../../lib/stamps";

const StampButton = styled("button", {
  all: "unset",
  cursor: "pointer",
  boxSizing: "border-box",
  userSelect: "none",
  display: "grid",
  placeItems: "center",
  fontSize: "$2",
  lineHeight: "$2",
  px: "$4",
  pt: "$1",
  pb: "$2",
  br: "$2",
  maxW: 48,
  maxH: 48,
  boxShadow: "0 0 0 1px $colors$slate6",
  zindex: 999,

  "&:hover": {
    boxShadow: "0 0 0 1px $colors$slate7",
  },
});

interface VersionItemProps {
  id: string;
  title: string;
  description: string;
  topics: string;
  stamps: number;
}

const VersionItem = ({
  title,
  description,
  id,
  topics,
  stamps,
}: VersionItemProps) => {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();

    stampAsset(id)
      .then(() => console.log("Asset stamped!"))
      .catch((error) => console.error(error));
  };
  return (
    <Link href="/version">
      <Flex
        as="a"
        justify="between"
        align="center"
        css={{
          "@bp2": { width: "100%" },
          "@bp3": { maxW: 500 },
          "@bp4": { maxW: 734 },
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
              src={`https://g8way.io/${id}/favicon.ico`}
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
              {topics.split(",").map((topic) => (
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
        <StampButton onClick={handleClick}>
          <CaretUpIcon />
          <Typography>{stamps}</Typography>
        </StampButton>
      </Flex>
    </Link>
  );
};

const AppGroup = () => {
  const [versions, setVersions] = useState<VersionItemProps[]>();
  const [appInfo, setAppInfo] = useState<{
    title: string;
    description: string | undefined;
    id: string;
  }>();
  useEffect(() => {
    // invoke function on mount
    const tx = window.location.pathname.split("/")[2];
    if (!tx) {
      return;
    }
    if (tx.length !== 43) {
      return;
    }
    fetchVersions(tx);
  }, []);

  // run graph function and flatten into array to present in list
  const fetchVersions = async (tx: string) => {
    const res = await getBaseTx(tx);
    const baseTx = res.tags.find((x) => x.name === "Wrapper-For")?.value;
    const title = res.tags.find((x) => x.name === "Title")?.value;
    const description = res.tags.find((x) => x.name === "Description")?.value;
    const id = res.id;
    if (!baseTx || !title) {
      return;
    }
    const data = await getAppVersions(baseTx);
    setAppInfo({ title, description, id });

    setVersions(data);
  };

  const getBaseTx = async (tx: string) => {
    try {
      const res = await arweaveGql(`${"arweave.net"}/graphql`).getTransactions({
        ids: [tx],
      });
      const data = res.transactions.edges.map((edge) => edge.node);
      return data[0];
    } catch (error) {
      console.error(error);
      throw new Error("Error occured whilst fetching data");
    }
  };

  return (
    <>
      <AppHeader />
      <Flex
        direction="column"
        css={{
          "@bp2": { width: "100%" },
          "@bp3": { maxW: 500 },
          "@bp4": { maxW: 734 },
          mx: "auto",
          mt: "$10",
        }}
        gap="3"
      >
        <Flex
          css={{
            "@bp2": { width: "100%" },
            "@bp3": { maxW: 500 },
            "@bp4": { maxW: 734 },
            px: "$5",
          }}
          justify="between"
        >
          <Box>
            <Typography size="5" weight="6">
              {appInfo?.title}
            </Typography>
            <Typography size="2" css={{ color: "$slate11" }}>
              {appInfo?.description}
            </Typography>
          </Box>
          <Button
            variant="outline"
            as="a"
            href={`https://g8way.io/${appInfo?.id}`}
            css={{
              br: "$pill",
            }}
          >
            Visit app
          </Button>
        </Flex>
        <Box
          css={{
            background:
              "linear-gradient(89.46deg, #1A1B1E 1.67%, rgba(26, 29, 30, 0) 89.89%)",
            height: 2,
            width: "100%",
          }}
        />
        {versions && versions.length > 0 ? (
          versions.map((version) => (
            <VersionItem
              title={version.title}
              description={version.description}
              topics={version.topics}
              stamps={version.stamps}
              id={version.id}
            />
          ))
        ) : (
          <Typography>Loading versions...</Typography>
        )}
      </Flex>
    </>
  );
};

export default AppGroup;
