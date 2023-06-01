import arweaveGql, { Transaction } from "arweave-graphql";
import { config } from "../config";

export const getAppInfo = async (tx: string) => {
  try {
    const res = await arweaveGql(
      `${config.gatewayUrl}/graphql`
    ).getTransactions({
      ids: [tx],
    });
    const data = res.transactions.edges
      .filter((edge) => edge.node.tags.find((x) => x.name === "Title"))
      .filter((edge) => edge.node.tags.find((x) => x.name === "Description"))
      .filter((edge) => edge.node.tags.find((x) => x.name === "Wrapper-For"))
      .map((edge) => {
        const title = edge.node.tags.find((x) => x.name === "Title")?.value;
        const description = edge.node.tags.find(
          (x) => x.name === "Description"
        )?.value;
        const baseId = edge.node.tags.find(
          (x) => x.name === "Wrapper-For"
        )?.value;
        const txid = edge.node.id;

        return {
          title,
          description,
          txid,
          baseId,
        };
      });
    return data[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error occured whilst fetching data");
  }
};
