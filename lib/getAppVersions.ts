import graph from "@permaweb/asset-graph";
import arweaveGql, { Tag, Transaction } from "arweave-graphql";
import { versionResultsFilter, versionTagFilter } from "../utils/query";

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
  // const versionList = await
  const versionList = flattenTree(graph);

  const res = await arweaveGql(`${"arweave.net"}/graphql`).getTransactions({
    ids: versionList,
    tags: versionTagFilter,
  });
  try {
    const data = res.transactions.edges
      .filter((edge) => edge.node.tags.find((x) => x.name === "Title"))
      .filter((edge) => edge.node.tags.find((x) => x.name === "Source-Code"))
      .filter((edge) => edge.node.tags.find((x) => x.name === "Published"))
      .map((edge) => versionResultsFilter(edge.node as Transaction));

    return Promise.all(data);
  } catch (error) {
    // console.error(error);
    throw new Error(error as any);
  }
};

function flattenTree(node: TreeNode): string[] {
  const result: string[] = [];

  const { id } = node;
  result.push(id);

  if (node.children) {
    node.children.forEach((child: TreeNode) => {
      const childIds = flattenTree(child);
      result.push(...childIds);
    });
  }

  return result;
}
