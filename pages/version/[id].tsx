import { Box, Button, darkTheme, Flex, Typography } from "@aura-ui/react";
import {
  ArrowRightIcon,
  DownloadIcon,
  FileTextIcon,
} from "@radix-ui/react-icons";
import { Tag } from "arweave-graphql";
import { useEffect, useState } from "react";
import { HiThumbUp } from "react-icons/hi";
import { getVersionInfo } from "../../lib/getVersionInfo";
import { AppHeader } from "../../modules/Layout/AppHeader";
import { abbreviateAddress, timeAgo } from "../../utils";

interface VersionProps {
  title: string;
  description: string;
  txid: string;
  metaId: string;
  logo: string;
  topics: Tag[];
  published: string;
  owner: string;
  source: string;
}

const AppVersion = () => {
  const [version, setVersion] = useState<VersionProps[]>();
  useEffect(() => {
    // invoke function on mount
    const tx = window.location.pathname.split("/")[2];
    if (!tx) {
      return;
    }
    if (tx.length !== 43) {
      return;
    }
    fetchVersionInfo(tx);
  }, []);

  const fetchVersionInfo = async (tx: string) => {
    console.log(tx);

    const res = await getVersionInfo(tx);
    setVersion(res as VersionProps[]);
  };

  return (
    <>
      <AppHeader />
      <Flex
        direction="column"
        css={{
          mt: "$10",
          maxW: 680,
          mx: "auto",
        }}
      >
        {version && version.length > 0 ? (
          version.map((x) => (
            <Box key={x.txid}>
              <Flex justify="between">
                <Typography
                  as="h2"
                  css={{
                    color: "$slate12",
                  }}
                  size="8"
                  weight="6"
                >
                  {x.title}
                </Typography>
                <Flex gap="5">
                  <Button
                    as="a"
                    href={`https://g8way.io/${x.txid}`}
                    colorScheme="indigo"
                    css={{ gap: "$2" }}
                  >
                    Visit
                    <ArrowRightIcon />
                  </Button>
                  <Button colorScheme="indigo" variant="solid">
                    <HiThumbUp />
                    Stamp
                    <Flex
                      css={{
                        backgroundColor: "$indigo11",
                        [`.${darkTheme} &`]: {
                          backgroundColor: "$indigo8",
                        },
                        pt: 2,
                        px: "$1",
                        placeItems: "center",
                        minWidth: 20,
                        maxHeight: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        br: "$pill",
                        fontSize: 10,
                        color: "white",
                      }}
                    >
                      1
                    </Flex>
                  </Button>
                </Flex>
              </Flex>
              <Flex
                css={{
                  "& p": {
                    color: "$slate11",
                  },
                }}
                align="center"
                gap="1"
              >
                <Typography>
                  {abbreviateAddress({ address: x.owner })}
                </Typography>
                <Typography>•</Typography>
                <Typography>{timeAgo(Number(x.published))}</Typography>
              </Flex>
              <Flex css={{ mt: "$10" }} direction="column" gap="1">
                <Typography css={{ color: "$slate11" }}>Description</Typography>
                <Typography>{x.description}</Typography>
              </Flex>
              <Flex css={{ mt: "$10" }} gap="5">
                <Button
                  variant="ghost"
                  css={{
                    gap: "$2",
                    p: 0,
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "$slate12",
                    },
                    "&:active": { backgroundColor: "transparent" },
                  }}
                  href={`https://g8way.io/${x.metaId}`}
                  as="a"
                >
                  Release Notes
                  <FileTextIcon />
                </Button>
                <Button
                  variant="ghost"
                  css={{
                    gap: "$2",
                    p: 0,
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "$slate12",
                    },
                    "&:active": { backgroundColor: "transparent" },
                  }}
                  href={`https://g8way.io/${x.source}`}
                  as="a"
                >
                  Download source
                  <DownloadIcon />
                </Button>
              </Flex>
            </Box>
          ))
        ) : (
          <Typography>Loading version info...</Typography>
        )}
      </Flex>
    </>
  );
};

export default AppVersion;
