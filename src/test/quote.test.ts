import { describe, expect, it } from "vitest";
import { quoteSchema } from "@/lib/quote";

const valid = {
  company: "Bean Co",
  contact_person: "Anna",
  email: "anna@bean.co",
  phone: "",
  delivery_country: "Latvia",
  product_form: "Whole beans",
  fill_weights: ["250 g"],
  fill_weight_other: "",
  bag_type: "Side-gusset bag",
  design_file: "Not yet / design in progress",
  design_link: "",
  bag_size: "",
  material: "Advise me",
  features: ["Degassing valve"],
  sku_count: "2–3",
  quantity_per_design: "1,000 pcs",
  finish: "Matt",
  effects: [],
  deadline: "",
  notes: "",
};

describe("Quote request rules", () => {
  it("accepts a complete request", () => {
    expect(quoteSchema.safeParse(valid).success).toBe(true);
  });
  it("requires a delivery country", () => {
    expect(quoteSchema.safeParse({ ...valid, delivery_country: " " }).success).toBe(false);
  });
  it("requires at least one fill weight", () => {
    expect(quoteSchema.safeParse({ ...valid, fill_weights: [] }).success).toBe(false);
  });
  it("accepts a custom fill weight instead of a preset", () => {
    expect(
      quoteSchema.safeParse({ ...valid, fill_weights: [], fill_weight_other: "2 kg" }).success,
    ).toBe(true);
  });
  it("requires a quantity per design", () => {
    expect(quoteSchema.safeParse({ ...valid, quantity_per_design: "" }).success).toBe(false);
  });
});
