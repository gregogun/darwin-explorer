import Stamps from "@permaweb/stampjs";
import { WarpFactory } from "warp-contracts";
import Arweave from "arweave";

const stamps = Stamps.init({
  warp: WarpFactory.forMainnet(),
  arweave: Arweave.init({}),
});

export const stampAsset = async (assetId: string) => {
  try {
    const res: any = await stamps.stamp(assetId);
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Something went wrong while trying to stamp. Please try again."
    );
  }
};

export const getStampCount = async (assetId: string) => {
  try {
    const res: any = await stamps.count(assetId);
    return res.total;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong getting the stamp count");
  }
};

export const userHasStamped = async (assetId: string) => {
  try {
    const res: any = await stamps.hasStamped(assetId);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong getting the stamp count");
  }
};
