import graph from "@permaweb/asset-graph";

interface TreeNode {
  id: string;
  group: string;
  node: {
    title: string;
    description: string;
    topics: string;
    stamps: number;
  };
  children?: TreeNode[];
}

export const getAppVersions = async (graph: any, gateway?: string) => {
  const versionList = flattenTree(graph);

  return versionList;
};

function flattenTree(tree: TreeNode) {
  const result: {
    id: string;
    title: string;
    description: string;
    topics: string;
    stamps: number;
  }[] = [];

  function traverse(node: TreeNode) {
    console.log("node", node);

    const {
      id,
      node: { title, description, topics, stamps },
    } = node;
    result.push({
      id,
      title,
      description,
      topics,
      stamps,
    });
    if (node.children) {
      node.children.forEach((child: TreeNode) => traverse(child));
    }
  }

  traverse(tree);

  return result;
}
