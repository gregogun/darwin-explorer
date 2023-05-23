import arweaveGql, { Tag, Transaction } from "arweave-graphql";
import { log } from "console";
import { SearchFilter, TypeFilter } from "../types";
import { appTagFilter } from "../utils/query";

export const searchData = async (
  type: TypeFilter,
  filter: SearchFilter,
  value: string,
  gateway?: string
) => {
  let res;
  switch (type) {
    case "app":
      res = await validateApp(filter, value);
      break;

    default:
      break;
  }

  return res;
  // try {
  //   const res = await arweaveGql(`${"arweave.net"}/graphql`).getTransactions({
  //     ids: [tx],
  //     tags: [
  //       { name: "App-Name", values: ["SmartWeaveContract"] },
  //       { name: "Type", values: ["app"] },
  //     ],
  //   });
  //   const data = res.transactions.edges.map((edge) =>
  //     filter(edge.node as Transaction)
  //   );
  //   return Promise.all(data);
  // } catch (error) {
  //   console.error(error);
  //   throw new Error("Error occured whilst fetching data");
  // }
};

const validateApp = async (filter: SearchFilter, value: string) => {
  try {
    const res = await arweaveGql(`${"arweave.net"}/graphql`).getTransactions({
      ids: filter === "id" ? [value] : undefined,
      tags: [
        ...appTagFilter,
        filter === "name"
          ? { name: "Title", values: [value] }
          : { name: "Title", values: [] },
      ],
    });
    console.log("res", res);
    const data = res.transactions.edges
      .filter((edge) => edge.node.tags.find((x) => x.name === "Title"))
      .filter((edge) => edge.node.tags.find((x) => x.name === "Wrapper-For"))
      .filter((edge) => edge.node.tags.find((x) => x.name === "Published"))
      .map((edge) => filterResults(edge.node as Transaction));

    return Promise.all(data);
  } catch (error) {
    console.error(error);
    throw new Error(error as any);
  }
};

const filterResults = async (node: Transaction) => {
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
