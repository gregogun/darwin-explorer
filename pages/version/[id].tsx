import {
  Box,
  Button,
  darkTheme,
  Flex,
  Textarea,
  Typography,
} from "@aura-ui/react";
import {
  ArrowRightIcon,
  CheckIcon,
  CopyIcon,
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
  const [isCopied, setIsCopied] = useState(false);
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

  const handleCopy = (tx: string) => {
    navigator.clipboard.writeText(tx).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
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
                  mt: "$1",
                  "& p": {
                    color: "$slate11",
                    fontSize: "$2",
                    lineHeight: "$2",
                  },
                }}
                align="center"
                gap="1"
              >
                <Typography>
                  Created by {abbreviateAddress({ address: x.owner })}
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
                <Button
                  variant="ghost"
                  css={{
                    gap: "$2",
                    p: 0,
                    pointerEvents: isCopied ? "none" : "auto",
                    color: isCopied ? "$green11" : "$slate11",
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "$slate12",
                    },
                    "&:active": { backgroundColor: "transparent" },
                  }}
                  onClick={() => handleCopy(x.txid)}
                >
                  {isCopied ? "Copied!" : "Copy Version ID"}
                  {isCopied ? <CheckIcon /> : <CopyIcon />}
                </Button>
              </Flex>
              <Box
                css={{
                  background:
                    "linear-gradient(89.46deg, #1A1B1E 1.67%, rgba(26, 29, 30, 0) 89.89%)",
                  height: 1,
                  my: "$3",
                }}
              />
              <Flex
                css={{
                  mt: "$5",
                  p: "$3",
                  boxShadow: "0 0 0 1px $colors$slate3",
                  br: "$3",

                  "&:hover": {
                    boxShadow: "0 0 0 1px $colors$slate4",
                  },

                  "&:focus-within": {
                    boxShadow: "0 0 0 2px $colors$blue8",
                  },
                }}
                direction="column"
                gap="5"
              >
                <Textarea
                  css={{
                    boxShadow: "none",
                    minHeight: 80,
                    resize: "none",

                    "&:hover": {
                      boxShadow: "none",
                    },

                    "&:focus": {
                      boxShadow: "none",
                    },
                  }}
                  maxLength={300}
                  variant="outline"
                  placeholder="Share your thoughts..."
                />
                <Button
                  css={{ alignSelf: "end" }}
                  variant="solid"
                  colorScheme="indigo"
                >
                  Comment
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
