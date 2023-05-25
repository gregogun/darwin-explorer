import arweaveGql, { Tag, Transaction } from "arweave-graphql";
import { log } from "console";
import {
  AppItemProps,
  SearchFilter,
  TypeFilter,
  VersionItemProps,
} from "../types";
import {
  appTagFilter,
  versionResultsFilter,
  versionTagFilter,
} from "../utils/query";

export const searchData = async (
  type: TypeFilter,
  filter: SearchFilter,
  value: string,
  gateway?: string
) => {
  let res: AppItemProps[] | VersionItemProps[] = [];
  switch (type) {
    case "app":
      res = await validateApp(filter, value);
      break;
    case "version":
      res = await validateVersion(filter, value);
      break;
    default:
      break;
  }

  return res;
};

const validateApp = async (filter: SearchFilter, value: string) => {
  try {
    const res = await arweaveGql(
      `${"https://arweave-search.goldsky.com"}/graphql`
    ).getTransactions({
      ids: filter === "id" ? [value] : undefined,
      tags: [
        ...appTagFilter,
        filter === "name"
          ? { name: "Title", values: [value] }
          : { name: "Title", values: [] },
      ],
    });
    const data = res.transactions.edges
      .filter((edge) => edge.node.tags.find((x) => x.name === "Title"))
      .filter((edge) => edge.node.tags.find((x) => x.name === "Wrapper-For"))
      .filter((edge) => edge.node.tags.find((x) => x.name === "Published"))
      .map((edge) => appFilter(edge.node as Transaction));

    return Promise.all(data);
  } catch (error) {
    console.error(error);
    throw new Error(error as any);
  }
};

const appFilter = async (node: Transaction): Promise<AppItemProps> => {
  const title = node.tags.find((x) => x.name === "Title")?.value;
  const description = node.tags.find((x) => x.name === "Description")?.value;
  const baseId = node.tags.find((x) => x.name === "Wrapper-For")?.value;
  const published = node.tags.find((x) => x.name === "Published")?.value;
  const logo = node.tags.find((x) => x.name === "Logo")?.value;
  const topics = node.tags.filter((x) => x.name.includes("Topic"));
  const txid = node.id;

  return {
    title,
    description,
    txid,
    baseId,
    logo,
    topics,
    published,
  };
};

const validateVersion = async (filter: SearchFilter, value: string) => {
  console.log("filter", filter);
  console.log("value", value);

  try {
    const res = await arweaveGql(
      `${"https://arweave-search.goldsky.com"}/graphql`
    ).getTransactions({
      ids: filter === "id" ? [value] : undefined,
      tags: [
        ...versionTagFilter,
        filter === "name"
          ? { name: "Title", values: [value] }
          : { name: "", values: [] },
      ],
    });
    console.log("res", res);
    const data = res.transactions.edges
      .filter((edge) => edge.node.tags.find((x) => x.name === "Title"))
      .filter((edge) => edge.node.tags.find((x) => x.name === "Published"))
      .map((edge) => versionResultsFilter(edge.node as Transaction));

    return Promise.all(data);
  } catch (error) {
    console.error(error);
    throw new Error(error as any);
  }
};
