import graph from "@permaweb/asset-graph";
import AssetSDK from "@permaweb/asset-web-sdk";
import { WarpFactory } from "warp-contracts";
import { arweave } from "./arweave";

export const getAsset = async (id) => {
  const warp = WarpFactory.forMainnet();

  const SDK = AssetSDK.init({ arweave, warp });

  const result = await SDK.get(id, "app");
  console.log(result);

  return result;
};

export const getGraph = async (id) => {
  const res = await graph(id);

  console.log(res);
};
