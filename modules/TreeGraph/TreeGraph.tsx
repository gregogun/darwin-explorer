import { useMemo, useState } from "react";
import { Group } from "@visx/group";
import { Tree, hierarchy } from "@visx/hierarchy";
import { HierarchyPointNode } from "@visx/hierarchy/lib/types";
import {
  WithParentSizeProps,
  WithParentSizeProvidedProps,
} from "@visx/responsive/lib/enhancers/withParentSize";
import { withParentSize } from "@visx/responsive";
import { LinkHorizontal } from "@visx/shape";
import { AppVersionDialog } from "../AppVersionDialog/AppVersionDialog";
import { TreeNode } from "../../types";
import { Box, styled, theme } from "@aura-ui/react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const Rect = styled("rect");

const Text = styled("text");

const StyledLinkHorizontal = styled(LinkHorizontal);

export const background = theme.colors.indigo1;

type HierarchyNode = HierarchyPointNode<TreeNode>;

const author = "QyvsIuytjHV8kDgnnjC66IoeZyWpGzZ0uffb_TxFg7g";
const sourceBaseUrl = "https://github.com/gregogun/fair-forks-test-app/tree/";

const rawTree: TreeNode = {
  version: "v0",
  txid: "gW2GGNGBzeLFMVfIAdOg4L1Akg9fQWq19hsvM5DAG44",
  forkedFrom: null,
  preferred: true,
  author: author,
  sourceCode: `${sourceBaseUrl}/v0`,
  stamps: 20,
  children: [
    {
      version: "v1a",
      txid: "nnEagkfN_4PGsV1NAs8xHGYOxyzZT7lT62W8qj8JCS4",
      forkedFrom: "gW2GGNGBzeLFMVfIAdOg4L1Akg9fQWq19hsvM5DAG44",
      preferred: false,
      author: author,
      sourceCode: `${sourceBaseUrl}/v1a`,
      stamps: 40,
      children: [
        {
          version: "v2a",
          txid: "HcZhyddr0UZNHWCJJL0jgPMKVXcpSOFRwTI3GgylRso",
          forkedFrom: "nnEagkfN_4PGsV1NAs8xHGYOxyzZT7lT62W8qj8JCS4",
          preferred: false,
          author: author,
          sourceCode: `${sourceBaseUrl}/v2a`,
          stamps: 35,
        },
        {
          version: "v2b",
          txid: "wgEneGiXfJKE0khVa8aaHDVac9NJ1nGiDo7-lsK0MRA",
          forkedFrom: "nnEagkfN_4PGsV1NAs8xHGYOxyzZT7lT62W8qj8JCS4",
          preferred: false,
          author: author,
          sourceCode: `${sourceBaseUrl}/v2b`,
          stamps: 28,
        },
      ],
    },
    {
      version: "v1b",
      txid: "LVaFOEKTjGw6bBP959q8c01yhl-jHt6afDIVdTlr4_c",
      forkedFrom: "gW2GGNGBzeLFMVfIAdOg4L1Akg9fQWq19hsvM5DAG44",
      preferred: false,
      author: author,
      sourceCode: `${sourceBaseUrl}/v1b`,
      stamps: 15,
    },
  ],
};

/** Handles rendering Root, Parent, and other Nodes. */
function Node({ node }: { node: HierarchyNode }) {
  const [showDialog, setShowDialog] = useState(false);

  const handleShowDialog = () => setShowDialog(true);
  const handleCancelDialog = () => setShowDialog(false);
  const version = node.data.version;
  const txid = node.data.txid;
  const forkedFrom = node.data.forkedFrom;
  const preferred = node.data.preferred;
  const author = node.data.author;
  const sourceCode = node.data.sourceCode;
  const stamps = node.data.stamps;

  const width = 120;
  const height = 50;
  const centerX = -width / 2;
  const centerY = -height / 2;
  const isRoot = node.depth === 0;
  const isParent = !!node.children;

  if (isRoot) return <RootNode node={node} />;
  if (isParent) return <ParentNode node={node} />;

  return (
    <Group top={node.x} left={node.y}>
      <Rect
        css={{
          fill: theme.colors.indigo2,
          stroke: theme.colors.indigo6,
          transitionDuration: "200ms",

          "&:hover": {
            fill: "$indigo3",
            stroke: "$indigo7",
            transitionDuration: 200,
          },

          "&:focus": {
            fill: "$indigo3",
            stroke: "$indigo8",
            transitionDuration: 200,
          },
        }}
        tabIndex={0}
        height={height}
        width={width}
        y={centerY}
        x={centerX}
        cursor="pointer"
        strokeWidth={2}
        strokeOpacity={1}
        rx={6}
        onClick={handleShowDialog}
      />
      <Text
        css={{
          fill: theme.colors.indigo11,
        }}
        dy=".33em"
        fontSize={13}
        fontFamily="Inter"
        textAnchor="middle"
        style={{ pointerEvents: "none" }}
      >
        {node.data.version}
      </Text>

      <AppVersionDialog
        node={{
          version,
          txid,
          preferred,
          forkedFrom,
          author,
          sourceCode,
          stamps,
        }}
        open={showDialog}
        onClose={handleCancelDialog}
      />
    </Group>
  );
}

function RootNode({ node }: { node: HierarchyNode }) {
  const [showDialog, setShowDialog] = useState(false);

  const handleShowDialog = () => setShowDialog(true);
  const handleCancelDialog = () => setShowDialog(false);
  const version = node.data.version;
  const txid = node.data.txid;
  const forkedFrom = node.data.forkedFrom;
  const preferred = node.data.preferred;
  const author = node.data.author;
  const sourceCode = node.data.sourceCode;
  const stamps = node.data.stamps;

  const width = 120;
  const height = 50;
  const centerX = -width / 2;
  const centerY = -height / 2;
  return (
    <Group top={node.x} left={node.y}>
      <Rect
        css={{
          fill: theme.colors.indigo2,
          stroke: theme.colors.indigo6,
          transitionDuration: "200ms",

          "&:hover": {
            fill: "$indigo3",
            stroke: "$indigo7",
            transitionDuration: 200,
          },

          "&:focus": {
            fill: "$indigo3",
            stroke: "$indigo8",
            transitionDuration: 200,
          },
        }}
        tabIndex={0}
        height={height}
        width={width}
        y={centerY}
        x={centerX}
        cursor="pointer"
        strokeWidth={2}
        strokeOpacity={1}
        rx={6}
        onClick={handleShowDialog}
      />
      <Text
        css={{
          fill: theme.colors.indigo11,
        }}
        dy=".33em"
        fontSize={12}
        fontFamily="Inter"
        textAnchor="middle"
        style={{ pointerEvents: "none" }}
      >
        {node.data.version}
      </Text>

      <AppVersionDialog
        node={{
          version,
          txid,
          preferred,
          forkedFrom,
          author,
          sourceCode,
          stamps,
        }}
        open={showDialog}
        onClose={handleCancelDialog}
      />
    </Group>
  );
}

function ParentNode({ node }: { node: HierarchyNode }) {
  const [showDialog, setShowDialog] = useState(false);

  const handleShowDialog = () => setShowDialog(true);
  const handleCancelDialog = () => setShowDialog(false);
  const version = node.data.version;
  const txid = node.data.txid;
  const forkedFrom = node.data.forkedFrom;
  const preferred = node.data.preferred;
  const author = node.data.author;
  const sourceCode = node.data.sourceCode;
  const stamps = node.data.stamps;

  const width = 120;
  const height = 50;
  const centerX = -width / 2;
  const centerY = -height / 2;

  return (
    <Group top={node.x} left={node.y}>
      <Rect
        css={{
          fill: theme.colors.indigo2,
          stroke: theme.colors.indigo6,
          transitionDuration: "200ms",

          "&:hover": {
            fill: "$indigo3",
            stroke: "$indigo7",
            transitionDuration: 200,
          },

          "&:focus": {
            fill: "$indigo3",
            stroke: "$indigo8",
            transitionDuration: 200,
          },
        }}
        tabIndex={0}
        cursor="pointer"
        height={height}
        width={width}
        y={centerY}
        x={centerX}
        strokeWidth={2}
        strokeOpacity={1}
        rx={6}
        onClick={handleShowDialog}
      />
      <Text
        css={{
          fill: theme.colors.indigo11,
        }}
        dy=".33em"
        fontSize={12}
        fontFamily="Inter"
        textAnchor="middle"
        style={{ pointerEvents: "none" }}
      >
        {node.data.version}
      </Text>

      <AppVersionDialog
        node={{
          version,
          txid,
          preferred,
          forkedFrom,
          author,
          sourceCode,
          stamps,
        }}
        open={showDialog}
        onClose={handleCancelDialog}
      />
    </Group>
  );
}

const defaultMargin = { top: 10, left: 80, right: 80, bottom: 10 };

interface TreeGraphProps extends WithParentSizeProps {
  margin?: { top: number; right: number; bottom: number; left: number };
}

const TreeGraph = ({
  parentWidth: width,
  parentHeight: height,
  margin = defaultMargin,
}: TreeGraphProps & WithParentSizeProvidedProps) => {
  const data = useMemo(() => hierarchy(rawTree), []);
  const yMax = height! - margin.top - margin.bottom;
  const xMax = width! - margin.left - margin.right;

  return width! < 10 ? null : (
    <Box
      css={{
        backgroundColor: "$indigo1",
      }}
    >
      <TransformWrapper minScale={0.5} maxScale={2}>
        {({ zoomIn, zoomOut, resetTransform }) => (
          <TransformComponent>
            <svg
              // style={{ transform: "scale(0.9)" }}
              width={width}
              height={height}
            >
              <Rect
                css={{ fill: background }}
                width={width}
                height={height}
                rx={14}
              />
              <Tree<TreeNode> root={data} size={[yMax, xMax]}>
                {(tree) => (
                  <Group top={margin.top} left={margin.left}>
                    {tree.links().map((link, i) => (
                      <StyledLinkHorizontal
                        css={{
                          stroke: theme.colors.indigo11,
                        }}
                        key={`link-${i}`}
                        data={link}
                        strokeWidth={0.5}
                        strokeOpacity={0.5}
                        fill="none"
                      />
                    ))}
                    {tree.descendants().map((node, i) => (
                      <Node key={`node-${i}`} node={node} />
                    ))}
                  </Group>
                )}
              </Tree>
            </svg>
          </TransformComponent>
        )}
      </TransformWrapper>
    </Box>
  );
};

const enhancedTreeGraph = withParentSize<TreeGraphProps>(TreeGraph);

export { enhancedTreeGraph as TreeGraph };
