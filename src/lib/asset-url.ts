// External hosts do not serve Lovable's /__l5e asset endpoint.
// Resolve pointers against the verified public asset origin, not the page origin.
const ASSET_ORIGIN = "https://pack-preview-magic.lovable.app";

export function assetUrl(asset: { url: string }): string {
  return asset.url.startsWith("/__l5e/assets-v1/")
    ? new URL(asset.url, ASSET_ORIGIN).href
    : asset.url;
}