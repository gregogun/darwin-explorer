import arweaveGql, { Transaction } from "arweave-graphql";
import { versionTagFilter } from "../utils/query";

export const getVersionInfo = async (tx: string, gateway?: string) => {
  try {
    const res = await arweaveGql(`${"arweave.net"}/graphql`).getTransactions({
      ids: [tx],
      tags: versionTagFilter,
    });
    const data = res.transactions.edges.map((edge) =>
      filter(edge.node as Transaction)
    );
    return Promise.all(data);
  } catch (error) {
    console.error(error);
    throw new Error("Error occured whilst fetching data");
  }
};

const filter = async (node: Transaction) => {
  const title = node.tags.find((x) => x.name === "Title")?.value;
  const description = node.tags.find((x) => x.name === "Description")?.value;
  const metaId = node.tags.find((x) => x.name === "META")?.value;
  const published = node.tags.find((x) => x.name === "Published")?.value;
  const logo = node.tags.find((x) => x.name === "Logo")?.value;
  const source = node.tags.find((x) => x.name === "Source-Code")?.value;
  const topics = node.tags.filter((x) => x.name.includes("Topic"));
  const txid = node.id;
  const owner = node.owner.address;

  if (!title || !metaId || !published || !source) {
    return;
  }

  return {
    title,
    description,
    txid,
    metaId,
    logo,
    topics,
    published,
    owner,
    source,
  };
};
