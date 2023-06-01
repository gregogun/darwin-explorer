import { Tag } from "arweave-graphql";

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
  title: string;
  description: string | undefined;
  logo?: string;
  topics: string | undefined;
  // stamps: number;
}

export interface AppItemProps {
  title: string | undefined;
  description: string | undefined;
  txid: string;
  baseId: string | undefined;
  logo: string | undefined;
  topics: string | undefined;
  published: string | undefined;
}

export interface Comment {
  sourceTx: string;
  comment: string;
}

export interface Account {
  address: string;
  handle: string | undefined;
  uniqueHandle: string | undefined;
  bio: string | undefined;
  avatar: string | undefined;
  banner: string | undefined;
  vouched: boolean;
}

export interface AssetItem {
  id: string;
  type: string;
  title: string;
  description: string | undefined;
  metaId: string;
  groupId: string;
  forks: string | undefined;
  published: string;
  stamps: number;
  topics: string | undefined;
}

export interface AssetGraph {
  id: string;
  group: string;
  node: AssetItem;
  children: AssetGraph[];
}
