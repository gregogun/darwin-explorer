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
import graph from "@permaweb/asset-graph";
import { TreeGraphDialog } from "../treeGraph/TreeGraphDialog";
import { VersionItem } from "./VersionItem";
import { Skeleton } from "../../ui/Skeleton";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAppInfo } from "../../lib/getAppInfo";
import { flattenGraph } from "../../utils/flattenGraph";
import { getAppGraph } from "../../lib/getAppGraph";

const AppGroup = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [optionKeyPressed, setOptionKeyPressed] = useState(false);
  const [appTree, setAppTree] = useState<any>();
  const [appInfo, setAppInfo] = useState<{
    title: string | undefined;
    description: string | undefined;
    txid: string;
    baseId: string | undefined;
  }>();
  const location = useLocation();

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    const query = location.search;
    const urlParams = new URLSearchParams(query);
    const id = urlParams.get("tx");

    if (!id) {
      console.error("No transaction ID was found");
      return;
    }

    const res = await getAppInfo(id);
    setAppInfo(res);
  };

  useEffect(() => {
    getAppTree();
  }, []);

  const getAppTree = async () => {
    const query = location.search;
    const urlParams = new URLSearchParams(query);
    const id = urlParams.get("baseId");

    if (!id) {
      console.error("No transaction ID was found");
      return;
    }

    const res = await getVersions(id);

    setAppTree(res);
  };

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

  const getVersions = async (tx: string) => {
    try {
      // const graphRes = await graph(tx);
      const graphRes = await getAppGraph(tx);
      console.log(graphRes);

      return graphRes;
    } catch (error) {
      console.error(error);
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
      <Flex css={{ width: "100%" }} justify="between">
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
            href={`https://g8way.io/${appInfo?.txid}`}
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
          maxW: 600,
        }}
      />
      {appTree ? (
        flattenGraph(appTree).map((version) => (
          <VersionItem
            key={version.id}
            title={version.title}
            description={version.description}
            topics={version.topics}
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
        rawTree={appTree}
        open={showDialog}
        onClose={handleCancelDialog}
      />
    </Flex>
  );
};

export default AppGroup;
