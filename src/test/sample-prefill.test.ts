import { describe, expect, it } from "vitest";
import { matchSampleProduct } from "@/components/contact-form";
import { SHOP_PRODUCTS } from "@/lib/shop";

describe("Sample form prefill from product pages", () => {
  it("maps every shop product format to one of the three sample checkboxes", () => {
    const valid = [
      "Custom Roaster's Doypacks",
      "Custom Roaster's Flat bottom pouch",
      "Custom Roaster's Gusset Pouch",
    ];
    for (const product of SHOP_PRODUCTS) {
      expect(valid).toContain(matchSampleProduct(product.format));
    }
  });
  it("maps each format to its matching checkbox", () => {
    expect(matchSampleProduct("Doypack")).toBe("Custom Roaster's Doypacks");
    expect(matchSampleProduct("Flat Bottom Pouch")).toBe("Custom Roaster's Flat bottom pouch");
    expect(matchSampleProduct("Gusset Pouch")).toBe("Custom Roaster's Gusset Pouch");
  });
  it("leaves the checkboxes untouched without a product", () => {
    expect(matchSampleProduct(undefined)).toBeUndefined();
    expect(matchSampleProduct("Something else")).toBeUndefined();
  });
});
