import {
  Box,
  Button,
  Flex,
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
  Typography,
} from "@aura-ui/react";
import { useEffect, useState } from "react";
import { getAppVersions } from "../../lib/getAppVersions";
import arweaveGql from "arweave-graphql";
import graph from "@permaweb/asset-graph";
import { TreeNode, VersionItemProps } from "../../types";
import { TreeGraphDialog } from "../treeGraph/TreeGraphDialog";
import { VersionItem } from "./VersionItem";
import { Skeleton } from "../../ui/Skeleton";
import { useLocation } from "react-router-dom";

const AppGroup = () => {
  const [versions, setVersions] = useState<VersionItemProps[]>();
  const [rawTree, setRawTree] = useState<TreeNode>();
  const [showDialog, setShowDialog] = useState(false);
  const [optionKeyPressed, setOptionKeyPressed] = useState(false);
  const location = useLocation();
  const [appInfo, setAppInfo] = useState<{
    title: string;
    description: string | undefined;
    id: string;
  }>();
  useEffect(() => {
    const query = location.search;
    const urlParams = new URLSearchParams(query);

    const id = urlParams.get("tx");

    if (id) {
      fetchVersions(id);
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Alt") {
        setOptionKeyPressed(true);
      } else if (event.key === "Tab" && optionKeyPressed) {
        handleShowDialog();
      }
    };

    const handleKeyUp = (event: any) => {
      if (event.key === "Alt") {
        setOptionKeyPressed(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [optionKeyPressed]);

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
    const graphRes = await graph(baseTx);

    // prob not most perf approach, need to think of better design at some point
    setRawTree(graphRes);
    const data = await getAppVersions(graphRes);
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

  const handleShowDialog = () => setShowDialog(true);
  const handleCancelDialog = () => setShowDialog(false);

  return (
    <Flex
      direction="column"
      align="center"
      css={{
        mt: "$10",
        mx: "auto",
        maxW: 600,
      }}
      gap="3"
    >
      <Flex gap="20" justify="between" align="center">
        <Flex direction="column" gap="1">
          {appInfo ? (
            <Typography size="5" weight="6">
              {appInfo.title}
            </Typography>
          ) : (
            <Skeleton
              css={{
                br: "$1",
                width: 140,
                height: "$7",
              }}
            />
          )}
          {appInfo ? (
            <Typography size="2" css={{ color: "$slate11" }}>
              {appInfo.description}
            </Typography>
          ) : (
            <Skeleton
              css={{
                br: "$1",
                width: 200,
                height: "$5",
              }}
            />
          )}
        </Flex>
        <Flex gap="3">
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Button
                onClick={handleShowDialog}
                variant="subtle"
                colorScheme="indigo"
                as="a"
              >
                View Fork Tree
              </Button>
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent>⌥ + Tab</TooltipContent>
            </TooltipPortal>
          </Tooltip>
          <Button
            variant="outline"
            colorScheme="indigo"
            as="a"
            href={`https://g8way.io/${appInfo?.id}`}
          >
            Visit app
          </Button>
        </Flex>
      </Flex>
      <Box
        css={{
          background:
            "linear-gradient(89.46deg, #1A1B1E 1.67%, rgba(26, 29, 30, 0) 89.89%)",
          height: 2,
          // width: "100%",
          maxW: 600,
        }}
      />
      {versions && versions.length > 0 ? (
        versions.map((version) => (
          <VersionItem
            key={version.id}
            title={version.title}
            description={version.description}
            topics={version.topics}
            stamps={version.stamps}
            id={version.id}
          />
        ))
      ) : (
        <>
          <Skeleton
            css={{
              width: "100%",
              maxW: 600,
              height: 96,
            }}
          />
          <Skeleton
            css={{
              width: "100%",
              maxW: 600,
              height: 96,
            }}
          />
          <Skeleton
            css={{
              width: "100%",
              maxW: 600,
              height: 96,
            }}
          />
        </>
      )}

      <TreeGraphDialog
        rawTree={rawTree}
        open={showDialog}
        onClose={handleCancelDialog}
      />
    </Flex>
  );
};

export default AppGroup;
