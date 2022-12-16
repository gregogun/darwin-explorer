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
