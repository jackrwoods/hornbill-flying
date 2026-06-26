import type { NextConfig } from "next";

const BASE_PATH = "/hornbill-flying";
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? BASE_PATH : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
