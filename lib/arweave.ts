import Arweave from "arweave";

// you may want to use a getHost Method to detect which gateway your on
// see https://g8way.io/2qgKTC8miqhF0mEPB24d3cnUOQN5_QU_V4H4Sb0GYVM

export const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});
