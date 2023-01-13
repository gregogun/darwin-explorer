import graph from "@permaweb/asset-graph";
import AssetSDK from "@permaweb/asset-sdk";
import Bundlr from "@bundlr-network/client";
import { WarpFactory } from "warp-contracts";
import fs from "fs";
import { Data } from "../types";
import { arweave } from "./arweave";

export const getAsset = async ({
  id,
  walletPath,
}: Pick<Data, "id" | "walletPath">) => {
  const jwk = JSON.parse(fs.readFileSync(walletPath, "utf-8"));
  const bundlr = new Bundlr("https://node2.bundlr.network", "arweave", jwk);
  const warp = WarpFactory.forMainnet();

  const SDK = AssetSDK.init({ arweave, bundlr, warp, wallet: jwk });

  const result = await SDK.get(id, "app");
  console.log("result");

  return result;
};

export const getGraph = async (id: string) => {
  const res = await graph(id);

  console.log(res);
};
