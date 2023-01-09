import { ArweaveWebWallet } from "arweave-wallet-connector";

export const webWallet = new ArweaveWebWallet({
  name: "wavehub",
});

export const connect = () => {
  webWallet.setUrl("https://arweave.app");
  return webWallet.connect();
};
