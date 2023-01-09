import AssetSDK from "@permaweb/asset-sdk";
import Bundlr, { WebBundlr } from "@bundlr-network/client";
import { WarpFactory, Warp } from "warp-contracts";
import fs from "fs";
import { Data } from "../types";
import { arweave } from "./arweave";
import { webWallet } from "./wallet";

export const getAsset = async () => {
  const jwk = JSON.parse(fs.readFileSync("./wallet.json", "utf-8"));
  const bundlr = new Bundlr("https://node2.bundlr.network", "arweave", jwk);
  const warp = WarpFactory.forMainnet();

  const SDK = AssetSDK.init({ arweave, bundlr, warp, wallet: jwk });

  const result = await SDK.get(
    "A35w9qHv2gIr9ktRRaewhock9_1RxuvI-HHnMRp0UyE",
    "app"
  );

  return result;
};
