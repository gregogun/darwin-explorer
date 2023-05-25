import { KeyboardEvent, useMemo, useState } from "react";
import { Group } from "@visx/group";
import { Tree, hierarchy } from "@visx/hierarchy";
import { HierarchyPointNode } from "@visx/hierarchy/lib/types";
import {
  WithParentSizeProps,
  WithParentSizeProvidedProps,
} from "@visx/responsive/lib/enhancers/withParentSize";
import { withParentSize } from "@visx/responsive";
import { LinkHorizontal } from "@visx/shape";
import { NodeDialog } from "../nodeDialog/NodeDialog";
import { TreeNode } from "../../types";
import { Box, darkTheme, styled, theme } from "@aura-ui/react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const Rect = styled("rect");

const Text = styled("text");

const StyledLinkHorizontal = styled(LinkHorizontal);

export const background = "#08090A";

type HierarchyNode = HierarchyPointNode<TreeNode>;

const author = "QyvsIuytjHV8kDgnnjC66IoeZyWpGzZ0uffb_TxFg7g";
const sourceBaseUrl = "https://github.com/gregogun/fair-forks-test-app/tree/";

/** Handles rendering Root, Parent, and other Nodes. */
function Node({ node: baseNode }: { node: HierarchyNode }) {
  const [showDialog, setShowDialog] = useState(false);

  const node = baseNode.data.node;

  const handleShowDialog = () => setShowDialog(true);
  const handleCancelDialog = () => setShowDialog(false);
  const handleKeyDown = (e: KeyboardEvent<SVGElement>) => {
    if (e.key === "Enter" || e.code === "Space") {
      setShowDialog(true);
    }
  };

  // const version = node.data.version;
  const id = node.id;
  const forks = node.forks;
  const title = node.title;
  const description = node.description;
  const metaId = node.metaId;
  const groupId = node.groupId;
  const published = node.published;
  const stamps = node.stamps;
  const topics = node.topics;

  const width = 120;
  const height = 50;
  const centerX = -width / 2;
  const centerY = -height / 2;
  const isRoot = baseNode.depth === 0;
  const isParent = !!baseNode.children;

  if (isRoot) return <RootNode node={baseNode} />;
  if (isParent) return <ParentNode node={baseNode} />;

  return (
    <Group top={baseNode.x} left={baseNode.y}>
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
        onKeyDown={handleKeyDown}
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
        {node.title}
      </Text>

      <NodeDialog
        node={{
          // version,
          id,
          title,
          description,
          metaId,
          groupId,
          published,
          forks,
          topics,
          // author,
          // sourceCode,
          stamps,
        }}
        open={showDialog}
        onClose={handleCancelDialog}
      />
    </Group>
  );
}

function RootNode({ node: baseNode }: { node: HierarchyNode }) {
  const [showDialog, setShowDialog] = useState(false);

  const node = baseNode.data.node;

  const handleShowDialog = () => setShowDialog(true);
  const handleCancelDialog = () => setShowDialog(false);

  const handleKeyDown = (e: KeyboardEvent<SVGElement>) => {
    if (e.key === "Enter" || e.code === "Space") {
      setShowDialog(true);
    }
  };

  // const version = node.data.version;
  const id = node.id;
  const forks = node.forks;
  const title = node.title;
  const description = node.description;
  const metaId = node.metaId;
  const groupId = node.groupId;
  const published = node.published;
  const stamps = node.stamps;
  const topics = node.topics;

  const width = 120;
  const height = 50;
  const centerX = -width / 2;
  const centerY = -height / 2;
  return (
    <Group top={baseNode.x} left={baseNode.y}>
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
        onKeyDown={handleKeyDown}
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
        {node.title}
      </Text>

      <NodeDialog
        node={{
          // version,
          id,
          title,
          description,
          metaId,
          groupId,
          published,
          forks,
          topics,
          // author,
          // sourceCode,
          stamps,
        }}
        open={showDialog}
        onClose={handleCancelDialog}
      />
    </Group>
  );
}

function ParentNode({ node: baseNode }: { node: HierarchyNode }) {
  const [showDialog, setShowDialog] = useState(false);

  const node = baseNode.data.node;

  const handleShowDialog = () => setShowDialog(true);
  const handleCancelDialog = () => setShowDialog(false);

  const handleKeyDown = (e: KeyboardEvent<SVGElement>) => {
    if (e.code === "Space") {
      setShowDialog(true);
    }
  };

  // const version = node.data.version;
  const id = node.id;
  const forks = node.forks;
  const title = node.title;
  const description = node.description;
  const metaId = node.metaId;
  const groupId = node.groupId;
  const published = node.published;
  const stamps = node.stamps;
  const topics = node.topics;

  const width = 120;
  const height = 50;
  const centerX = -width / 2;
  const centerY = -height / 2;

  return (
    <Group top={baseNode.x} left={baseNode.y}>
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
        onKeyDown={handleKeyDown}
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
        {node.title}
      </Text>

      <NodeDialog
        node={{
          // version,
          id,
          title,
          description,
          metaId,
          groupId,
          published,
          forks,
          topics,
          // author,
          // sourceCode,
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
  rawTree: TreeNode;
}

const TreeGraph = ({
  parentWidth: width,
  parentHeight: height,
  margin = defaultMargin,
  rawTree,
}: TreeGraphProps & WithParentSizeProvidedProps) => {
  const data = useMemo(() => hierarchy(rawTree), []);
  const yMax = height! - margin.top - margin.bottom;
  const xMax = width! - margin.left - margin.right;

  return width! < 10 ? null : (
    <Box
      css={{
        backgroundColor: "$indigo1",

        [`.${darkTheme} &`]: {
          backgroundColor: "#08090A",
        },
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
