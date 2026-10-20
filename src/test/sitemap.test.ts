import { describe, expect, it } from "vitest";
import { getRouter } from "@/router";
import { BLOG_POSTS } from "@/lib/blog";
import { isSitemapRouteIncluded, sitemapPathForLocation, sitemapStaticPaths, sitemapXML } from "@/lib/sitemap";

describe("Public search discovery", () => {
  it("includes all five public website pages and excludes the sitemap endpoint", () => {
    const router = getRouter();
    expect(sitemapStaticPaths(router)).toEqual(["/", "/about", "/blog", "/contact", "/quote"]);
  });

  it("includes every blog post, not just the homepage previews", () => {
    const router = getRouter();
    expect(isSitemapRouteIncluded(router.routesById["/blog/$slug"])).toBe(true);
    for (const post of BLOG_POSTS) {
      const location = router.buildLocation({ to: "/blog/$slug", params: { slug: post.slug }, search: () => ({}), hash: "" });
      expect(sitemapPathForLocation(router, location, "/blog/$slug")).toBe(`/blog/${post.slug}`);
    }
    expect(BLOG_POSTS).toHaveLength(6);
  });

  it("does not invent content-change timestamps", () => {
    const xml = sitemapXML("https://pack-preview-magic.lovable.app", [{ path: "/" }, { path: "/blog" }]);
    expect(xml).not.toContain("<lastmod>");
    expect(xml).toContain("https://pack-preview-magic.lovable.app/blog");
  });
});