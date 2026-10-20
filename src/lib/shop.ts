import flatBottom from "@/assets/flatbottom-front.webp";
import gusset from "@/assets/gusset-front.webp";
import doypack from "@/assets/doypack-front.webp";

export type OrderType = "all" | "one-time" | "monthly";
export interface ShopProduct {
  slug: string;
  name: string;
  format: string;
  orderType: Exclude<OrderType, "all">;
  image: string;
  description: string;
}

const formats = {
  flat: { format: "Flat Bottom Pouch", image: flatBottom, description: "A broad, stable base and a box-like shape for shelf display. Custom print brings your coffee brand to every panel." },
  gusset: { format: "Gusset Pouch", image: gusset, description: "Folded side panels expand as the pouch fills. A flexible format for coffee, powders and dry goods." },
  doy: { format: "Doypack", image: doypack, description: "The classic stand-up pouch. A compact footprint and front-facing display, with material choices to suit your coffee." },
};

export const SHOP_PRODUCTS: ShopProduct[] = [
  { ...formats.flat, slug: "flat-bottom-pouch", name: "Flat Bottom Pouch", orderType: "one-time" },
  { ...formats.gusset, slug: "gusset-pouch", name: "Gusset Pouch", orderType: "one-time" },
  { ...formats.doy, slug: "doypack", name: "Doypack", orderType: "one-time" },
  { ...formats.doy, slug: "doypack-monthly", name: "Doypack | Monthly", orderType: "monthly" },
  { ...formats.gusset, slug: "gusset-pouch-monthly", name: "Gusset Pouch | Monthly", orderType: "monthly" },
  { ...formats.flat, slug: "flat-bottom-pouch-monthly", name: "Flat Bottom Pouch | Monthly", orderType: "monthly" },
];

export function filterShopProducts(orderType: OrderType) {
  return SHOP_PRODUCTS.filter((product) => orderType === "all" || product.orderType === orderType);
}

export function getShopProduct(slug: string) {
  return SHOP_PRODUCTS.find((product) => product.slug === slug);
}