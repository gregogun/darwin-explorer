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
import { getAppVersions } from "../../lib/getAppVersions";
import { CaretUpIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { stampAsset } from "../../lib/stamps";
import arweaveGql, { Transaction } from "arweave-graphql";
import { HiArrowUp } from "react-icons/hi";

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
  // py: "$2",
  // px: "$4",
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
  const [info, setInfo] = useState<{
    logo: string | undefined;
    owner: string;
  }>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await arweaveGql(`${"arweave.net"}/graphql`).getTransactions({
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
    <Link href={`/version/${id}`}>
      <Flex
        as="a"
        justify="between"
        align="center"
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
          {info?.logo ? (
            <Avatar
              size="5"
              css={{
                br: "$3",
              }}
              shape="square"
            >
              <AvatarImage
                src={`https://g8way.io/${id}/${info?.logo}`}
                alt={`${title} logo`}
              />
              <AvatarFallback variant="solid" delayMs={300}>
                {title.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Box
              css={{
                size: 48,
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
          <HiArrowUp />
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
        align="center"
        css={{
          mt: "$10",
        }}
        gap="3"
      >
        <Flex
          css={{
            width: "100%",
            maxW: 600,
          }}
          justify="between"
          align="center"
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
            colorScheme="indigo"
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
            maxW: 600,
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
