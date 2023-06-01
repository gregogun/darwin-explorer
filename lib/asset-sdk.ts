import AssetSDK from "@permaweb/asset-web-sdk";
import { WarpFactory } from "warp-contracts";
import { arweave } from "./arweave";
import { Asset } from "../types";

export const getAsset = async (id: string): Promise<Asset> => {
  const warp = WarpFactory.forMainnet();

  const SDK = AssetSDK.init({ arweave, warp });

  const result = await SDK.getAsset(id, "app");
  console.log(result);

  return result;
};
