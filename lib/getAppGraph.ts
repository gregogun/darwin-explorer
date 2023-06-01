import arweaveGql, { Transaction } from "arweave-graphql";
import { config } from "../config";
import { AssetGraph, AssetItem } from "../types";
import { getStampCount } from "./stamps";

export const getAppGraph = async (id: string) => {
  // getGroupId function which gets groupId of id passed in
  const groupId = await getGroupId(id);

  // get assets by group id
  const assets = await getAssetsByGroupId(groupId);

  // take array and construct graph from it
  const assetGraph = buildGraph(assets);

  return assetGraph;
};

const getGroupId = async (id: string) => {
  try {
    const res = await arweaveGql(
      `${config.gatewayUrl}/graphql`
    ).getTransactions({
      ids: [id],
    });
    const groupIds = res.transactions.edges.map((edge) => {
      const id = edge.node.tags.find((x) => x.name === "Group-Id")?.value;
      if (!id) {
        throw new Error(`No groupId found at transaction ID: ${id}`);
      }
      return id;
    });
    return groupIds[0];
  } catch (error) {
    throw new Error(`Error: ${error as any}`);
  }
};

const getAssetsByGroupId = async (groupId: string) => {
  try {
    const res = await arweaveGql(
      `${config.gatewayUrl}/graphql`
    ).getTransactions({
      tags: [{ name: "Group-Id", values: [groupId] }],
    });
    const assetItems = res.transactions.edges.map((edge) =>
      toAssetItem(edge.node as Transaction)
    );
    return Promise.all(assetItems);
  } catch (error) {
    throw new Error(`Error: ${error as any}`);
  }
};

const toAssetItem = async (node: Transaction): Promise<AssetItem> => {
  const id = node.id;
  const type = node.tags.find((x) => x.name === "Type")?.value;
  const title = node.tags.find((x) => x.name === "Title")?.value;
  const description = node.tags.find((x) => x.name === "Description")?.value;
  const metaId = node.tags.find((x) => x.name === "META")?.value;
  const groupId = node.tags.find((x) => x.name === "Group-Id")?.value;
  // here we check for the abscence of tag name, not value as it is valid to have Forks tag with value of '' (base version)
  const forkTag = node.tags.find((x) => x.name === "Forks");
  const published = node.tags.find((x) => x.name === "Published")?.value;
  const topicTags = node.tags.filter((x) => x.name.includes("Topic:"));
  const topics = topicTags.map((topic) => topic.value).join(",");

  if (!type || type !== "app") {
    throw new Error(`Asset must be of type 'app' for Asset: ${id}`);
  }

  if (!title) {
    throw new Error(`No title found for Asset: ${id}`);
  }

  if (!metaId) {
    throw new Error(`No META ID found for Asset: ${id}`);
  }

  if (!groupId) {
    throw new Error(`No Group ID found for Asset: ${id}`);
  }

  if (!forkTag) {
    throw new Error(`No Forks tag found for Asset: ${id}`);
  }

  if (!published) {
    throw new Error(`No timestamp found for Asset: ${id}`);
  }

  const forks = forkTag?.value;
  const stamps = await getStampCount(id);

  return {
    id,
    type,
    title,
    description,
    metaId,
    groupId,
    forks,
    published,
    topics,
    stamps,
  };
};

const buildGraph = (assets: AssetItem[]) => {
  // sort array by published date
  const sortedAssets = assets.sort((a, b) => {
    return (
      new Date(Number(a.published)).getTime() -
      new Date(Number(b.published)).getTime()
    );
  });

  // reduce over array with createEdge function to return graph
  return sortedAssets.reduce(createEdge, {} as AssetGraph);
};

const traverseGraph = (children: AssetGraph[], node: AssetItem) => {
  if (children && children.length > 0) {
    children.forEach((child) => {
      if (child.id === node.forks) {
        child.children.push({
          id: node.id,
          group: node.groupId,
          node,
          children: [],
        });
      } else {
        child.children = traverseGraph(child.children, node);
      }
    });
    return children;
  } else {
    return [];
  }
};

const createEdge = (graph: AssetGraph, node: AssetItem) => {
  if (node.forks === "") {
    graph.id = node.id;
    graph.group = node.groupId;
    graph.node = node;
    graph.children = [];
  } else {
    if (graph.id === node.forks) {
      graph.children.push({
        id: node.id,
        group: node.groupId,
        node,
        children: [],
      });
    } else {
      graph.children = traverseGraph(graph.children, node);
    }
  }

  return graph;
};
