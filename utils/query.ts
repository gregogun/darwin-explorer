import { TagFilter } from "arweave-graphql";

export const appTagFilter: TagFilter[] = [
  { name: "Data-Protocol", values: ["Evoapps"] },
  { name: "Type", values: ["app-wrapper"] },
  { name: "Content-Type", values: ["application/x.arweave-manifest+json"] },
];
