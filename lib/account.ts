import arweaveGql, { Transaction } from "arweave-graphql";
import { isVouched } from "vouchdao";
import { config } from "../config";
import { Account } from "../types";

export const getAccount = async (address: string, gateway?: string) => {
  try {
    const res = await arweaveGql(
      `${gateway || config.gatewayUrl}/graphql`
    ).getTransactions({
      tags: [
        { name: "Content-Type", values: ["application/json"] },
        { name: "Protocol", values: ["PermaProfile-v0.1"] },
      ],
    });
    const data = res.transactions.edges
      .filter((edge) => edge.node.owner.address === address)
      .map((edge) => transform(edge.node as Transaction));

    // if (data.length === 0) {
    //   return;
    // }

    return Promise.all(data);
  } catch (error) {
    console.error(error);
    throw new Error("Error occured whilst fetching data");
  }
};

const transform = async (node: Transaction): Promise<Account> => {
  const address = node.owner.address;
  const handle = node.tags.find((x) => x.name === "Profile-Name")?.value;
  const uniqueHandle =
    handle && handle + `#${address.slice(0, 3)}` + address.slice(39, 42);
  const bio = node.tags.find((x) => x.name === "Profile-Bio")?.value;
  const avatar = node.tags.find((x) => x.name === "Profile-Avatar")?.value;
  const banner = node.tags.find((x) => x.name === "Profile-Background")?.value;
  const vouched = await isVouched(address);

  return {
    address,
    handle,
    uniqueHandle,
    bio,
    avatar,
    banner,
    vouched,
  };
};
