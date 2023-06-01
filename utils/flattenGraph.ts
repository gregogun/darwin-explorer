import { AssetGraph, AssetItem } from "../types";

interface TreeNode {
  id: string;
  group: string;
  node: {
    title: string;
    description: string;
    topics: string;
  };
  children?: TreeNode[];
}

export function flattenGraph(tree: AssetGraph) {
  const result: {
    title: string;
    description: string | undefined;
    topics: string | undefined;
    id: string;
  }[] = [];
  function traverse(tree: AssetGraph) {
    console.log("tree", tree);

    const title = tree.node.title;
    const description = tree.node.description;
    const topics = tree.node.topics;
    const id = tree.id;
    result.push({
      title,
      description,
      topics,
      id,
    });
    if (tree.children) {
      tree.children.forEach((child: AssetGraph) => traverse(child));
    }
  }

  traverse(tree);

  return result;
}
