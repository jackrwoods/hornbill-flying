import type { NextConfig } from "next";

const BASE_PATH = "/hornbill-flying";

const nextConfig: NextConfig = {
  output: "export",
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
