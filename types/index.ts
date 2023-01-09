export interface TreeNode {
  version: string;
  txid: string;
  forkedFrom: string | null;
  preferred: boolean;
  author: string;
  sourceCode: string;
  stamps: number;
  children?: this[];
}

type Balances = {
  [key: string]: number;
};

export interface Data {
  walletPath: string;
  id?: string;
  type: string;
  groupId: string;
  title: string;
  description: string;
  topics: string[];
  balances: Balances;
  content?: string;
  html?: string;
  forks?: string;
  // need to extend data to support Uint8Array when generalizing cli for all assets
  data?: string;
}
