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

describe("Shop filters", () => {
  it("offers every product in all four materials, three sizes and seven volume tiers", () => {
    for (const product of SHOP_PRODUCTS) {
      expect(product.materials).toEqual(["kraft", "metallized", "sustainable", "transparent"]);
      expect(product.sizes).toEqual([250, 500, 1000]);
      expect(product.volumes).toEqual([500, 1000, 1500, 3000, 6000, 10000, 20000]);
    }
  });
  it("keeps all six products when filtering by a single material, size or volume", () => {
    expect(filterShopProducts("all", { materials: ["kraft"] })).toHaveLength(6);
    expect(filterShopProducts("all", { sizes: [500] })).toHaveLength(6);
    expect(filterShopProducts("all", { volumes: [3000] })).toHaveLength(6);
  });
  it("combines product type with attribute filters", () => {
    const result = filterShopProducts("monthly", { materials: ["sustainable"], sizes: [1000] });
    expect(result).toHaveLength(3);
    expect(result.every((product) => product.orderType === "monthly")).toBe(true);
  });
  it("returns nothing for an unknown material", () => {
    expect(filterShopProducts("all", { materials: ["unobtainium"] })).toHaveLength(0);
  });
});

describe("Removed placeholder articles", () => {
  it.each(["why-degassing-valves-matter", "doypack-vs-flat-bottom", "sustainable-packaging-mono-materials"])("does not expose %s", (slug) => {
    expect(getPost(slug)).toBeUndefined();
  });
});