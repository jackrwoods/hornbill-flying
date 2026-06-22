import Image, { ImageProps } from "next/image";
import { assetPath } from "@/lib/assets";

/**
 * Drop-in replacement for next/image that prefixes absolute public asset
 * paths with the configured basePath. External and relative paths are passed
 * through unchanged.
 */
export function AssetImage(props: ImageProps) {
  const src = typeof props.src === "string" ? assetPath(props.src) : props.src;
  return <Image {...props} src={src} />;
}
