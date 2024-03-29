import arweaveGql, { Transaction } from "arweave-graphql";

export const getApps = async (gateway?: string) => {
  try {
    const res = await arweaveGql(`${gateway}/graphql`).getTransactions({
      // update to support pagination/load more
      first: 8,
      tags: [
        { name: "Data-Protocol", values: ["EvolutionaryApps"] },
        {
          name: "Content-Type",
          values: ["application/x.arweave-manifest+json"],
        },
      ],
    });
    const data = res.transactions.edges
      .filter((edge) => Number(edge.node.data.size) < 400)
      .filter((edge) => edge.node.tags.find((x) => x.name === "Title"))
      .filter((edge) => edge.node.tags.find((x) => x.name === "Wrapper-For"))
      .filter((edge) => edge.node.tags.find((x) => x.name === "Published"))
      .map((edge) => filter(edge.node as Transaction));
    return Promise.all(data);
  } catch (error) {
    console.error(error);
    throw new Error("Error occured whilst fetching data");
  }
};

const filter = async (node: Transaction) => {
  const title = node.tags.find((x) => x.name === "Title")?.value;
  const description = node.tags.find((x) => x.name === "Description")?.value;
  const baseId = node.tags.find((x) => x.name === "Wrapper-For")?.value;
  const published = node.tags.find((x) => x.name === "Published")?.value;
  const logo = node.tags.find((x) => x.name === "Logo")?.value;
  const topicTags = node.tags.filter((x) => x.name.includes("Topic:"));
  const topics = topicTags.map((topic) => topic.value).join(",");
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
