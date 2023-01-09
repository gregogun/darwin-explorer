// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getAsset } from "../../lib/asset-sdk";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await getAsset().then((data) => {
    res.status(200).json({ asset: data });
  });
}
