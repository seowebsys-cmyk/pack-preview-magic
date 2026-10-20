import { z } from "zod";

export const PRODUCT_FORMS = ["Whole beans", "Ground"] as const;
export const FILL_WEIGHTS = ["100 g", "250 g", "500 g", "1 kg"] as const;
export const BAG_TYPES = [
  "Stand-up pouch (doypack)",
  "Flat-bottom (box) pouch",
  "Side-gusset bag",
] as const;
export const DESIGN_FILE_OPTIONS = [
  "Yes, I can share a design file",
  "Not yet / design in progress",
  "I need help with the design",
] as const;
export const MATERIALS = [
  "Kraft/ALU/PE",
  "PET/ALU/PE",
  "Transparent",
  "Recyclable mono-PE",
  "Paper-based",
  "Advise me",
] as const;
export const FEATURES = [
  "Degassing valve",
  "Zipper",
  "Tear notch",
  "Euro hole",
  "Window",
  "Rounded corners",
] as const;
export const SKU_COUNTS = ["1", "2–3", "4+"] as const;
export const QUANTITIES = ["500", "1,000", "3,000", "10,000"] as const;
export const FINISHES = ["Matt", "Gloss", "Soft-touch"] as const;
export const EFFECTS = ["Metallic", "Hot-foil"] as const;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((v) => (v === "" ? null : v));

const req = (label: string, max: number) =>
  z
    .string()
    .trim()
    .min(1, { message: `${label} is required` })
    .max(max, { message: `${label} must be under ${max} characters` });

export const quoteSchema = z
  .object({
    company: req("Company", 200),
    contact_person: req("Contact person", 200),
    email: z
      .string()
      .trim()
      .email({ message: "Enter a valid email" })
      .max(255),
    phone: optionalText(50),
    delivery_country: req("Delivery country", 100),
    product_form: z.enum(PRODUCT_FORMS, {
      errorMap: () => ({ message: "Choose whole beans or ground" }),
    }),
    fill_weights: z.array(z.enum(FILL_WEIGHTS)).max(4),
    fill_weight_other: optionalText(100),
    bag_type: z.enum(BAG_TYPES, {
      errorMap: () => ({ message: "Choose a bag type" }),
    }),
    design_file: z.enum(DESIGN_FILE_OPTIONS, {
      errorMap: () => ({ message: "Tell us about your design file" }),
    }),
    design_link: optionalText(500),
    bag_size: optionalText(200),
    material: z.enum(MATERIALS, {
      errorMap: () => ({ message: "Choose a material" }),
    }),
    features: z.array(z.enum(FEATURES)).max(6),
    sku_count: z.enum(SKU_COUNTS, {
      errorMap: () => ({ message: "Choose the number of designs" }),
    }),
    quantity_per_design: req("Quantity per design", 100),
    finish: z.enum(FINISHES, {
      errorMap: () => ({ message: "Choose a finish" }),
    }),
    effects: z.array(z.enum(EFFECTS)).max(2),
    deadline: optionalText(10),
    notes: optionalText(2000),
  })
  .refine((d) => d.fill_weights.length > 0 || d.fill_weight_other !== null, {
    message: "Choose at least one fill weight",
    path: ["fill_weights"],
  });

export type QuoteInput = z.infer<typeof quoteSchema>;
