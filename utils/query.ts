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
  const title = node.tags.find((x) => x.name === "Title")?.value;
  const description = node.tags.find((x) => x.name === "Description")?.value;
  const logo = node.tags.find((x) => x.name === "Logo")?.value;
  const topics = node.tags.filter((x) => x.name.includes("Topic"));
  const id = node.id;
  const stamps = await getStampCount(id);

  return {
    title,
    description,
    id,
    logo,
    topics,
    stamps,
  };
};
