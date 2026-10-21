import flatBottom from "@/assets/flatbottom-front.webp";
import gusset from "@/assets/gusset-front.webp";
import doypack from "@/assets/doypack-front.webp";

export type OrderType = "all" | "one-time" | "monthly";

export const SHOP_MATERIALS = [
  { value: "kraft", label: "Roaster kraft" },
  { value: "metallized", label: "Roaster metallized" },
  { value: "sustainable", label: "Roaster sustainable" },
  { value: "transparent", label: "Roaster transparent" },
] as const;

export const SHOP_SIZES = [250, 500, 1000] as const;
export const SHOP_VOLUMES = [500, 1000, 1500, 3000, 6000, 10000, 20000] as const;

export interface ShopProduct {
  slug: string;
  name: string;
  format: string;
  orderType: Exclude<OrderType, "all">;
  image: string;
  description: string;
  materials: string[];
  sizes: number[];
  volumes: number[];
}

export interface ShopFilters {
  materials?: string[];
  sizes?: number[];
  volumes?: number[];
}

// Every pouch is made to order, so each format is available in every
// material, size and volume tier we offer.
const ALL_MATERIALS = SHOP_MATERIALS.map((material) => material.value);
const ALL_SIZES = [...SHOP_SIZES];
const ALL_VOLUMES = [...SHOP_VOLUMES];

const formats = {
  flat: { format: "Flat Bottom Pouch", image: flatBottom, description: "A broad, stable base and a box-like shape for shelf display. Custom print brings your coffee brand to every panel." },
  gusset: { format: "Gusset Pouch", image: gusset, description: "Folded side panels expand as the pouch fills. A flexible format for coffee, powders and dry goods." },
  doy: { format: "Doypack", image: doypack, description: "The classic stand-up pouch. A compact footprint and front-facing display, with material choices to suit your coffee." },
};

export const SHOP_PRODUCTS: ShopProduct[] = [
  { ...formats.flat, slug: "flat-bottom-pouch", name: "Flat Bottom Pouch", orderType: "one-time", materials: ALL_MATERIALS, sizes: ALL_SIZES, volumes: ALL_VOLUMES },
  { ...formats.gusset, slug: "gusset-pouch", name: "Gusset Pouch", orderType: "one-time", materials: ALL_MATERIALS, sizes: ALL_SIZES, volumes: ALL_VOLUMES },
  { ...formats.doy, slug: "doypack", name: "Doypack", orderType: "one-time", materials: ALL_MATERIALS, sizes: ALL_SIZES, volumes: ALL_VOLUMES },
  { ...formats.doy, slug: "doypack-monthly", name: "Doypack | Monthly", orderType: "monthly", materials: ALL_MATERIALS, sizes: ALL_SIZES, volumes: ALL_VOLUMES },
  { ...formats.gusset, slug: "gusset-pouch-monthly", name: "Gusset Pouch | Monthly", orderType: "monthly", materials: ALL_MATERIALS, sizes: ALL_SIZES, volumes: ALL_VOLUMES },
  { ...formats.flat, slug: "flat-bottom-pouch-monthly", name: "Flat Bottom Pouch | Monthly", orderType: "monthly", materials: ALL_MATERIALS, sizes: ALL_SIZES, volumes: ALL_VOLUMES },
];

export function filterShopProducts(orderType: OrderType, filters: ShopFilters = {}) {
  return SHOP_PRODUCTS.filter((product) => {
    if (orderType !== "all" && product.orderType !== orderType) return false;
    if (filters.materials?.length && !filters.materials.some((material) => product.materials.includes(material))) return false;
    if (filters.sizes?.length && !filters.sizes.some((size) => product.sizes.includes(size))) return false;
    if (filters.volumes?.length && !filters.volumes.some((volume) => product.volumes.includes(volume))) return false;
    return true;
  });
}

export function getShopProduct(slug: string) {
  return SHOP_PRODUCTS.find((product) => product.slug === slug);
}
