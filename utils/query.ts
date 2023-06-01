import { TagFilter, Transaction } from "arweave-graphql";
import { getStampCount } from "../lib/stamps";
import { VersionItemProps } from "../types";

export const appTagFilter: TagFilter[] = [
  { name: "Data-Protocol", values: ["Evoapps"] },
  { name: "Type", values: ["app-wrapper"] },
  { name: "Content-Type", values: ["application/x.arweave-manifest+json"] },
];

export const versionTagFilter: TagFilter[] = [
  { name: "App-Name", values: ["SmartWeaveContract"] },
  { name: "App-Version", values: ["0.3.0"] },
  { name: "Type", values: ["app"] },
  { name: "Content-Type", values: ["application/x.arweave-manifest+json"] },
];

export const versionResultsFilter = async (
  node: Transaction
): Promise<VersionItemProps> => {
  const title = node.tags.find((x) => x.name === "Title")?.value as string;
  const description = node.tags.find((x) => x.name === "Description")?.value;
  const logo = node.tags.find((x) => x.name === "Logo")?.value;
  const topicTags = node.tags.filter((x) => x.name.includes("Topic:"));
  const topics = topicTags.map((topic) => topic.value).join(",");
  const id = node.id;

  return {
    title,
    description,
    id,
    logo,
    topics,
  };
};
