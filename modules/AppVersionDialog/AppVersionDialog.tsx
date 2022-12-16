import { ExternalLinkIcon, QuestionMarkIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Box } from "../../components/Box";
import { Button } from "../../components/Button";
import { Dialog, DialogContent, DialogTitle } from "../../components/Dialog";
import { IconButton } from "../../components/IconButton";
import { Switch, SwitchThumb } from "../../components/Switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/Tooltip";
import { Typography } from "../../components/Typography";
import { styled } from "../../stitches.config";
import { TreeNode } from "../../types";

const VersionData = styled("div", {
  backgroundColor: "$slate2",
  borderRadius: 8,
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: "$3",
});

const VersionDataItem = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  columnGap: 8,
  padding: 8,
  borderRadius: 8,

  "&:hover": {
    backgroundColor: "$slate4",
  },
});

const Txid = styled("a", Typography, {
  cursor: "pointer",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",

  "&:hover": {
    color: "$slate12",
  },
});

const LinkWrapper = styled("a", {
  display: "grid",
  alignItems: "center",
  gap: "$2",
  gridTemplateColumns: "auto 1fr",
  color: "$slate12",

  "&:hover": {
    boxShadow: "0 1px 0 0 $colors$slate12",
  },
});

interface AppVersionDialogProps {
  open: boolean;
  onClose: () => void;
  node: TreeNode;
}

export const AppVersionDialog = ({
  onClose,
  open,
  node,
}: AppVersionDialogProps) => {
  const [stampCount, setStampCount] = useState(node.stamps);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const updateStampCount = () => {
    if (stampCount !== node.stamps) {
      return;
    }

    setStampCount(stampCount + 1);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle asChild>
          <Typography size="h2">Fair Forks {node.version}</Typography>
        </DialogTitle>
        <Box
          css={{
            marginTop: 20,
          }}
        >
          <Typography
            css={{ color: "$slate12", marginBottom: 8 }}
            size="subparagraph"
          >
            Version data
          </Typography>
          <VersionData>
            <VersionDataItem>
              <Typography>Version</Typography>
              <Typography css={{ color: "$slate12" }}>
                {node.version}
              </Typography>
            </VersionDataItem>
            <VersionDataItem>
              <Typography>Author(s)</Typography>
              <LinkWrapper
                href={`https://viewblock.io/arweave/address/${node.author}`}
                target="_blank"
                rel="noreferrer"
              >
                <Txid title={node.author} css={{ color: "$slate12" }}>
                  {node.author}
                </Txid>
                <span>
                  <ExternalLinkIcon />
                </span>
              </LinkWrapper>
            </VersionDataItem>
            <VersionDataItem>
              <Typography>Transaction ID</Typography>
              <LinkWrapper>
                <Txid
                  title={node.txid}
                  href={`https://viewblock.io/arweave/tx/${node.txid}`}
                  target="_blank"
                  rel="noreferrer"
                  css={{
                    color: "$slate12",
                  }}
                >
                  {node.txid}
                </Txid>
                <Box as="span">
                  <ExternalLinkIcon />
                </Box>
              </LinkWrapper>
            </VersionDataItem>
            <VersionDataItem>
              <Typography>Parent Fork</Typography>
              <LinkWrapper>
                <Txid
                  title={node.forkedFrom ? node.forkedFrom : node.txid}
                  href={`https://viewblock.io/arweave/tx/${node.forkedFrom}`}
                  target="_blank"
                  rel="noreferrer"
                  css={{
                    color: "$slate12",
                  }}
                >
                  {node.forkedFrom ? node.forkedFrom : "N/A (Original)"}
                </Txid>
                <span>
                  <ExternalLinkIcon />
                </span>
              </LinkWrapper>
            </VersionDataItem>
            <VersionDataItem>
              <Typography>Set As Preferred Version</Typography>
              <Switch defaultChecked={node.preferred}>
                <SwitchThumb />
              </Switch>
            </VersionDataItem>
            <VersionDataItem>
              <Typography>Stamps</Typography>
              <Typography css={{ color: "$slate12" }}>{stampCount}</Typography>
            </VersionDataItem>
            <Box
              css={{
                mt: "$3",
                display: "flex",
                justifyContent: "space-between",
                userSelect: "none",
              }}
            >
              <Button
                as="a"
                href={node.sourceCode}
                target="_blank"
                rel="noreferrer"
                css={{
                  br: 9999,
                  cursor: "pointer",
                  gap: "$2",
                }}
                size="1"
              >
                Source Code
                <ExternalLinkIcon />
              </Button>
              <Box
                css={{
                  display: "flex",
                  alignItems: "center",
                  gap: "$2",
                }}
              >
                <Button
                  onClick={updateStampCount}
                  disabled={stampCount !== node.stamps}
                  size="1"
                  css={{
                    br: 9999,
                    $$bg: "$colors$violet4",
                    $$border: "$colors$violet7",
                    $$color: "$colors$violet11",

                    $$bgHover: "$colors$violet5",
                    $$borderHover: "$colors$violet8",

                    $$bgActive: "$colors$violet3",
                    $$borderActive: "$colors$violet8",
                  }}
                >
                  {stampCount !== node.stamps
                    ? "You stamped this version"
                    : "Stamp this version"}
                </Button>
                <Tooltip open={tooltipOpen}>
                  <TooltipTrigger asChild>
                    <IconButton
                      onClick={() => setTooltipOpen(!tooltipOpen)}
                      css={{
                        br: 9999,
                      }}
                    >
                      <QuestionMarkIcon width={13} height={13} />
                    </IconButton>
                  </TooltipTrigger>
                  <TooltipContent>
                    This action is not connected to a smart contract. It uses
                    local state to increment stamps.
                  </TooltipContent>
                </Tooltip>
              </Box>
            </Box>
          </VersionData>
        </Box>
        <Box
          css={{
            display: "flex",
            mt: "$5",
            justifyContent: "end",
            gap: "$2",
          }}
        >
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="solid"
            css={{
              $$bgSolid: "$colors$violet9",
              $$bgSolidHover: "$colors$violet10",
              $$bgSolidActive: "$colors$violet8",
              cursor: "pointer",
            }}
            as="a"
            href={`https://arweave.net/${node.txid}`}
            target="_blank"
            rel="noreferrer"
          >
            Visit Site
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
