import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/hornbill-flying",
  assetPrefix: "/hornbill-flying",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
