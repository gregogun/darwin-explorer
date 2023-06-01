import {
  Box,
  Button,
  Flex,
  Grid,
  styled,
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
  Typography,
} from "@aura-ui/react";
import { useEffect, useState } from "react";
import { TreeGraphDialog } from "../treeGraph/TreeGraphDialog";
import { VersionItem } from "./VersionItem";
import { Skeleton } from "../../ui/Skeleton";
import { useLocation } from "react-router-dom";
import { getAppInfo } from "../../lib/getAppInfo";
import { flattenGraph } from "../../utils/flattenGraph";
import { getAppGraph } from "../../lib/getAppGraph";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const ErrorIllustration = styled("img", {
  width: 300,
  height: 200,
});

const ErrorStateView = () => (
  <Grid>
    <Flex direction="column" gap="5" align="center">
      <ErrorIllustration src="error.svg" />
      <Typography weight="5">
        Oops! Something went wrong. <br /> Please try and refresh the page.
      </Typography>
    </Flex>
  </Grid>
);

const AppGroup = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [optionKeyPressed, setOptionKeyPressed] = useState(false);
  const location = useLocation();
  const query = location.search;
  const urlParams = new URLSearchParams(query);
  const id = urlParams.get("tx");
  const {
    data: appInfo,
    isLoading: appInfoLoading,
    isError: appInfoError,
  } = useQuery({
    queryKey: [`appInfo-${id}`],
    queryFn: () => getInfo(),
  });
  const {
    data: appTree,
    isLoading: appTreeLoading,
    isError: appTreeError,
  } = useQuery({
    queryKey: [`appTree-${id}`],
    queryFn: () => getAppTree(),
  });

  const getInfo = async () => {
    if (!id) {
      console.error("No transaction ID was found");
      return;
    }

    const info = await getAppInfo(id);
    return info;
  };

  const getAppTree = async () => {
    const query = location.search;
    const urlParams = new URLSearchParams(query);
    const id = urlParams.get("baseId");

    if (!id) {
      console.error("No transaction ID was found");
      return;
    }

    const graphRes = await getAppGraph(id);

    return graphRes;
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
          {appInfo && (
            <Typography size="5" weight="6">
              {appInfo.title}
            </Typography>
          )}
          {appInfoLoading && (
            <Skeleton
              css={{
                br: "$1",
                width: 140,
                height: "$7",
              }}
            />
          )}
          {appInfo && (
            <Typography size="2" css={{ color: "$slate11" }}>
              {appInfo.description}
            </Typography>
          )}
          {appInfoLoading && (
            <Skeleton
              css={{
                br: "$1",
                width: 200,
                height: "$5",
              }}
            />
          )}
        </Flex>
        {!appInfoError && (
          <Flex gap="3">
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <Button
                  disabled={!appTree}
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
              disabled={!appInfo}
              variant="outline"
              colorScheme="indigo"
              as="a"
              href={`https://g8way.io/${appInfo?.txid}`}
            >
              Visit app
            </Button>
          </Flex>
        )}
      </Flex>
      <Box
        css={{
          background:
            "linear-gradient(89.46deg, #1A1B1E 1.67%, rgba(26, 29, 30, 0) 89.89%)",
          height: 2,
          maxW: 600,
        }}
      />
      {appTree &&
        flattenGraph(appTree).map((version) => (
          <VersionItem
            key={version.id}
            title={version.title}
            description={version.description}
            topics={version.topics}
            id={version.id}
          />
        ))}
      {appTreeLoading && (
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
      {appTreeError && <ErrorStateView />}

      {appTree && (
        <TreeGraphDialog
          rawTree={appTree}
          open={showDialog}
          onClose={handleCancelDialog}
        />
      )}
    </Flex>
  );
};

export default AppGroup;
