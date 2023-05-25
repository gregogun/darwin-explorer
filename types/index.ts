import { Tag } from "arweave-graphql";

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

export interface Asset {
  data: string;
  description: string;
  forks: string | undefined;
  groupId: string;
  id: string;
  metaId: string | undefined;
  owner: string;
  published: string;
  stamps: number;
  title: string;
  topics?: string;
  type: string;
}

export type SearchFilter = "name" | "id";

export type TypeFilter = "app" | "version";

export interface VersionItemProps {
  id: string;
  title: string | undefined;
  description: string | undefined;
  logo?: string;
  topics: Tag[] | undefined;
  stamps: number;
}

export interface AppItemProps {
  title: string | undefined;
  description: string | undefined;
  txid: string;
  baseId: string | undefined;
  logo: string | undefined;
  topics: Tag[] | undefined;
  published: string | undefined;
}
