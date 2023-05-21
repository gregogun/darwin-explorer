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

export const getAppVersions = async (tx: string, gateway?: string) => {
  try {
    const res = await graph(tx);

    const versionList = flattenTree(res);

    return versionList;
  } catch (error) {
    console.error(error);
    throw new Error("Error occured whilst fetching data");
  }
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
