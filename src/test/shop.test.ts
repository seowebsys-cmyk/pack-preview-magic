import { describe, expect, it } from "vitest";
import { SHOP_PRODUCTS, filterShopProducts, getShopProduct } from "@/lib/shop";
import { getPost } from "@/lib/blog";

describe("Shop catalog", () => {
  it("contains exactly the six products from the existing shop", () => {
    expect(SHOP_PRODUCTS.map((product) => product.slug)).toEqual([
      "flat-bottom-pouch", "gusset-pouch", "doypack", "doypack-monthly", "gusset-pouch-monthly", "flat-bottom-pouch-monthly",
    ]);
  });
  it("separates the three one-time products from the three monthly products", () => {
    expect(filterShopProducts("one-time").map((product) => product.slug)).toEqual(["flat-bottom-pouch", "gusset-pouch", "doypack"]);
    expect(filterShopProducts("monthly").map((product) => product.slug)).toEqual(["doypack-monthly", "gusset-pouch-monthly", "flat-bottom-pouch-monthly"]);
    expect(filterShopProducts("all")).toHaveLength(6);
  });
  it("returns no product for an unknown slug", () => {
    expect(getShopProduct("not-a-product")).toBeUndefined();
  });
});

describe("Removed placeholder articles", () => {
  it.each(["why-degassing-valves-matter", "doypack-vs-flat-bottom", "sustainable-packaging-mono-materials"])("does not expose %s", (slug) => {
    expect(getPost(slug)).toBeUndefined();
  });
});