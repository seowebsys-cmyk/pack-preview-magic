import { describe, expect, it } from "vitest";
import { assetUrl } from "@/lib/asset-url";

describe("Portable image URLs", () => {
  it("resolves the logo through the public asset host rather than Netlify", () => {
    expect(assetUrl({ url: "/__l5e/assets-v1/4da13eeb-9faa-4305-91b2-e47fccd00052/logo.png" }))
      .toBe("https://pack-preview-magic.lovable.app/__l5e/assets-v1/4da13eeb-9faa-4305-91b2-e47fccd00052/logo.png");
  });
  it("preserves bundled image paths", () => {
    expect(assetUrl({ url: "/assets/blog-cover.jpg" })).toBe("/assets/blog-cover.jpg");
  });
});