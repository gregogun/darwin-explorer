import { arweave, getAccount } from "./arweave";
import arweaveGql from "arweave-graphql";
import { config } from "../config";
import { Comment } from "../types";

export const writeComment = async ({ comment, sourceTx }: Comment) => {
  try {
    const savedTx = await arweave.createTransaction({
      data: comment,
    });
    savedTx.addTag("Content-Type", "text/plain");
    savedTx.addTag("Data-Protocol", "Comment");
    savedTx.addTag("Type", "comment");
    savedTx.addTag("Variant", "0.0.1-alpha");
    savedTx.addTag("Published", Date.now().toString());
    savedTx.addTag("Data-Source", sourceTx);

    const savedTxResult = await window.arweaveWallet.dispatch(savedTx);
    return savedTxResult;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const readComment = async (sourceTx: string) => {
  try {
    const metaRes = await arweaveGql(
      `${config.gatewayUrl}/graphql`
    ).getTransactions({
      first: 10,
      tags: [
        { name: "Content-Type", values: ["text/plain"] },
        { name: "Variant", values: ["0.0.1-alpha"] },
        { name: "Data-Protocol", values: ["Comment"] },
        { name: "Type", values: ["comment"] },
        { name: "Data-Source", values: [sourceTx] },
      ],
    });
    const metadata = metaRes.transactions.edges
      .filter((edge) => Number(edge.node.data.size) < 320)
      .filter(
        (edge) => edge.node.tags.find((x) => x.name === "Published")?.value
      )
      .map(async (edge) => {
        const owner = edge.node.owner.address;
        const txid = edge.node.id;
        const published = edge.node.tags.find(
          (x) => x.name === "Published"
        )?.value;
        const account = await getAccount(owner);
        const comment = await arweave.api
          .get(txid)
          .then((res) => res.data)
          .catch((error) => console.error(error));

        console.log(account);
        console.log(comment);

        return {
          owner,
          txid,
          published,
          account,
          comment,
        };
      });

    return Promise.all(metadata);
  } catch (error) {
    console.error(error);
    throw new Error("Error occured whilst fetching data");
  }
};
