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

export function flattenGraph(tree: TreeNode) {
  const result: {
    title: string;
    description: string;
    topics: string;
    id: string;
  }[] = [];
  function traverse(tree: TreeNode) {
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
      tree.children.forEach((child: TreeNode) => traverse(child));
    }
  }

  traverse(tree);

  return result;
}
