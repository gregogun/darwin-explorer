// const fs = require("fs");
// const path = require("path");
// const Bundlr = require("@bundlr-network/client");
import fs from 'fs'
import path from 'path'
import Bundlr from '@bundlr-network/client'

async function main() {
  const keyfile = JSON.parse(
    fs.readFileSync("/Users/gregogun/docs/arweave/wallet2.json", "utf-8")
  );

  const bundlr = new Bundlr("https://node2.bundlr.network", "arweave", keyfile);

  const tags = [
    { name: "Title", value: "Darwin-Explorer" },
    { name: "Env", value: "Test" },
    { name: "Type", value: "app" },
    { name: "Published", value: Date.now().toString() },
  ];

  try {
    const res = await bundlr.uploadFolder(path.join(__dirname, "out"), {
      indexFile: "index.html",
      manifestTags: tags,
    });
    console.log(`App successfully deployed - https://arweave.net/${res.id}`);
  } catch (error) {
    console.error(error);
  }
}

main();
