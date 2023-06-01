import {
  Box,
  Button,
  darkTheme,
  Flex,
  Separator,
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
import { useLocation } from "react-router-dom";
import { getVersionInfo } from "../../lib/getVersionInfo";
import { Skeleton } from "../../ui/Skeleton";
import { abbreviateAddress, timeAgo } from "../../utils";
import { getStampCount, stampAsset } from "../../lib/stamps";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useConnect } from "arweave-wallet-ui-test";
import { Comments } from "./Comments";

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
  const [version, setVersion] = useState<VersionProps>();
  const [isCopied, setIsCopied] = useState(false);
  const location = useLocation();
  const query = location.search;
  const urlParams = new URLSearchParams(query);

  const id = urlParams.get("tx");

  const queryClient = useQueryClient();
  const {
    data: stamps,
    isLoading: stampsLoading,
    isError: stampsError,
  } = useQuery({
    queryKey: [`stamps-${id}`],
    enabled: !!version?.txid,
    queryFn: () => {
      if (!version?.txid) {
        throw new Error("No txid for the asset provided");
      }

      return getStampCount(version.txid);
    },
  });

  useEffect(() => {
    if (id) {
      fetchVersionInfo(id);
    } else {
      return;
    }
  }, []);

  const fetchVersionInfo = async (tx: string) => {
    try {
      const res = await getVersionInfo(tx);
      setVersion(res[0] as VersionProps);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCopy = (tx: string | undefined) => {
    if (!tx) {
      return;
    }
    navigator.clipboard.writeText(tx).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  const mutation = useMutation({
    mutationFn: stampAsset,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["stamps"] });
    },
    onError: (error: any) => {
      console.error(error);
    },
  });

  const handleClick = () => {
    if (!version?.txid) {
      return;
    }

    mutation.mutate(version?.txid);
  };

  return (
    <Flex
      direction="column"
      css={{
        mt: "$10",
        maxW: 600,
        mx: "auto",
      }}
    >
      <Box>
        <Flex justify="between">
          {version ? (
            <Typography
              as="h2"
              css={{
                color: "$slate12",
              }}
              size="8"
              weight="6"
            >
              {version.title}
            </Typography>
          ) : (
            <Skeleton
              css={{
                br: "$1",
                width: 200,
                height: "$7",
              }}
            />
          )}
          <Flex gap="5">
            <Button
              disabled={!version}
              as="a"
              href={`https://g8way.io/${version?.txid}`}
              colorScheme="indigo"
              css={{ gap: "$2" }}
            >
              Visit
              <ArrowRightIcon />
            </Button>
            <Button
              onClick={handleClick}
              disabled={!version}
              colorScheme="indigo"
              variant="solid"
            >
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
                {stampsLoading || stampsError || typeof stamps === "undefined"
                  ? "-"
                  : stamps}
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
          {version ? (
            <>
              <Typography>
                Created by {abbreviateAddress({ address: version.owner })}
              </Typography>
              <Typography>•</Typography>
              <Typography>{timeAgo(Number(version.published))}</Typography>
            </>
          ) : (
            <Skeleton
              css={{
                br: "$1",
                width: 240,
                height: "$5",
              }}
            />
          )}
        </Flex>
        <Flex css={{ mt: "$10" }} direction="column" gap="1">
          <Typography css={{ color: "$slate11" }}>Description</Typography>
          {version ? (
            <Typography>{version.description}</Typography>
          ) : (
            <Skeleton
              css={{
                br: "$1",
                width: "100%",
                height: "$30",
              }}
            />
          )}
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
            disabled={!version}
            href={`https://g8way.io/${version?.metaId}`}
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
            disabled={!version}
            href={`https://g8way.io/${version?.source}`}
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
            disabled={!version}
            onClick={() => handleCopy(version?.txid)}
          >
            {isCopied ? "Copied to clipboard!" : "Copy Version ID"}
            {isCopied ? <CheckIcon /> : <CopyIcon />}
          </Button>
        </Flex>
        <Separator
          css={{
            mt: "$1",
            background:
              "linear-gradient(89.46deg, #1A1B1E 1.67%, rgba(26, 29, 30, 0) 89.89%)",
          }}
        />
        {version?.txid && (
          <Comments versionTx={version.txid} versionOwner={version.owner} />
        )}
      </Box>
    </Flex>
  );
};

export default AppVersion;
