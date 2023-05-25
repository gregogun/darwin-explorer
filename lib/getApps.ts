import arweaveGql, { Transaction } from "arweave-graphql";

export const getApps = async (gateway?: string) => {
  try {
    const res = await arweaveGql(`${gateway}/graphql`).getTransactions({
      tags: [
        { name: "Data-Protocol", values: ["Evoapps"] },
        {
          name: "Content-Type",
          values: ["application/x.arweave-manifest+json"],
        },
      ],
    });
    const data = res.transactions.edges
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
  const topics = node.tags.filter((x) => x.name.includes("Topic"));
  const txid = node.id;

  // if (!title || !baseId || !published) {
  //   return;
  // }

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
