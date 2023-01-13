export interface NodeProps {
  description: string;
  forks?: string;
  groupId: string;
  id: string;
  metaId: string;
  published: number;
  stamps: number;
  title: string;
  topics?: string;
  type: string;
}

export interface TreeNode {
  children?: this[];
  group: string;
  id: string;
  node: NodeProps;
  version: string;
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
