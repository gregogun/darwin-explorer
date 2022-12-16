import fs from "fs";

async function main() {
  const file = "next.config.js";

  const CONFIG_ASSET_PREFIX = `
  /** @type {import('next').NextConfig} */
  const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  assetPrefix: "./",
  images: {
    domains: ["arweave.net"],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

module.exports = nextConfig;
  `

  fs.writeFileSync(file, CONFIG_ASSET_PREFIX, "utf-8", (err) => {
    if (err) {
      console.log(error);
    } else {
      console.log('write successful');
    }
  });
}

main();
