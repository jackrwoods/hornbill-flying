/**
 * Returns the basePath configured for the static export.
 * Mirrors the value in next.config.ts so asset helpers can prefix
 * absolute public paths consistently.
 */
export function getBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH || "";
}

/**
 * Prefixes an absolute public asset path with the deployed basePath.
 * Leaves external URLs, protocol-relative URLs, and non-absolute paths unchanged.
 */
export function assetPath(path: string): string {
  if (
    !path ||
    path.startsWith("http") ||
    path.startsWith("//") ||
    !path.startsWith("/")
  ) {
    return path;
  }
  const base = getBasePath();
  return base ? `${base}${path}` : path;
}
