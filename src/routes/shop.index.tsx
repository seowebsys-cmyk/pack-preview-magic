import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  filterShopProducts,
  SHOP_MATERIALS,
  SHOP_SIZES,
  SHOP_VOLUMES,
  type OrderType,
} from "@/lib/shop";

interface ShopSearch {
  type: OrderType;
  materials: string[];
  sizes: number[];
  volumes: number[];
}

const toList = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.map(String)
    : typeof value === "string" && value
      ? value.split(",")
      : [];

export const Route = createFileRoute("/shop/")({
  staticData: { sitemap: true },
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    type: search['type'] === "monthly" || search['type'] === "one-time" ? search['type'] : "all",
    materials: toList(search['materials']).filter((material) =>
      SHOP_MATERIALS.some((option) => option.value === material),
    ),
    sizes: toList(search['sizes'])
      .map(Number)
      .filter((size) => (SHOP_SIZES as readonly number[]).includes(size)),
    volumes: toList(search['volumes'])
      .map(Number)
      .filter((volume) => (SHOP_VOLUMES as readonly number[]).includes(volume)),
  }),
  head: () => ({
    meta: [
      { title: "Shop Coffee Pouches — RoasterPack" },
      { name: "description", content: "Explore all six RoasterPack coffee packaging options: doypack, gusset and flat-bottom pouches for one-time orders or monthly supply." },
      { property: "og:title", content: "Shop Coffee Pouches — RoasterPack" },
      { property: "og:description", content: "Custom coffee pouches for one-time orders and the Monthly Roaster Plan." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://pack-preview-magic.lovable.app/shop" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://pack-preview-magic.lovable.app/shop" }],
  }),
  component: ShopPage,
});

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function ShopPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const [draft, setDraft] = useState<ShopSearch>(search);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const products = filterShopProducts(search.type, search);
  const activeCount =
    (search.type === "all" ? 0 : 1) +
    search.materials.length +
    search.sizes.length +
    search.volumes.length;

  const monthlyChecked = draft.type === "monthly" || draft.type === "all";
  const oneTimeChecked = draft.type === "one-time" || draft.type === "all";

  function setType(monthly: boolean, oneTime: boolean) {
    const type: OrderType =
      monthly && oneTime ? "all" : monthly ? "monthly" : oneTime ? "one-time" : "all";
    setDraft((current) => ({ ...current, type }));
  }

  function apply() {
    navigate({ search: { ...draft }, replace: true });
    setFiltersOpen(false);
  }

  function clear() {
    const reset: ShopSearch = { type: "all", materials: [], sizes: [], volumes: [] };
    setDraft(reset);
    navigate({ search: { ...reset }, replace: true });
  }

  const checkboxClass = "size-4 shrink-0 accent-primary";
  const groupLabelClass = "text-sm font-bold";
  const optionClass = "flex items-center gap-2.5 py-1 text-sm font-medium";

  const filterPanel = (
    <div className="grid gap-6">
      <fieldset>
        <legend className={groupLabelClass}>Product type</legend>
        <div className="mt-2">
          <label className={optionClass}>
            <input
              type="checkbox"
              className={checkboxClass}
              checked={monthlyChecked}
              onChange={() => setType(!monthlyChecked, oneTimeChecked)}
            />
            Monthly Roaster Plan
          </label>
          <label className={optionClass}>
            <input
              type="checkbox"
              className={checkboxClass}
              checked={oneTimeChecked}
              onChange={() => setType(monthlyChecked, !oneTimeChecked)}
            />
            One-time purchase
          </label>
        </div>
      </fieldset>
      <fieldset className="border-t border-border pt-5">
        <legend className={groupLabelClass}>Material</legend>
        <div className="mt-2">
          {SHOP_MATERIALS.map((material) => (
            <label key={material.value} className={optionClass}>
              <input
                type="checkbox"
                className={checkboxClass}
                checked={draft.materials.includes(material.value)}
                onChange={() =>
                  setDraft((current) => ({
                    ...current,
                    materials: toggle(current.materials, material.value),
                  }))
                }
              />
              {material.label}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="border-t border-border pt-5">
        <legend className={groupLabelClass}>Size</legend>
        <div className="mt-2">
          {SHOP_SIZES.map((size) => (
            <label key={size} className={optionClass}>
              <input
                type="checkbox"
                className={checkboxClass}
                checked={draft.sizes.includes(size)}
                onChange={() =>
                  setDraft((current) => ({
                    ...current,
                    sizes: toggle(current.sizes.map(String), String(size)).map(Number),
                  }))
                }
              />
              {size}g
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="border-t border-border pt-5">
        <legend className={groupLabelClass}>Volume price</legend>
        <div className="mt-2">
          {SHOP_VOLUMES.map((volume) => (
            <label key={volume} className={optionClass}>
              <input
                type="checkbox"
                className={checkboxClass}
                checked={draft.volumes.includes(volume)}
                onChange={() =>
                  setDraft((current) => ({
                    ...current,
                    volumes: toggle(current.volumes.map(String), String(volume)).map(Number),
                  }))
                }
              />
              {volume}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="flex gap-2 border-t border-border pt-5">
        <Button variant="outline" size="sm" onClick={clear}>
          Clear Filters
        </Button>
        <Button size="sm" onClick={apply}>
          Apply
        </Button>
      </div>
    </div>
  );

  return <section className="py-12 sm:py-16">
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <p className="text-xs font-bold uppercase text-muted-foreground">RoasterPack shop</p>
      <h1 className="font-display mt-3 text-4xl sm:text-6xl">Coffee pouches</h1>

      <div className="mt-8 lg:hidden">
        <Button variant="outline" onClick={() => setFiltersOpen((open) => !open)} aria-expanded={filtersOpen}>
          <SlidersHorizontal />
          Filter{activeCount > 0 ? ` (${activeCount})` : ""}
        </Button>
        {filtersOpen && <div className="mt-4 rounded-lg border border-border bg-card p-5">{filterPanel}</div>}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-12">
        <aside className="hidden lg:block">
          <h2 className="mb-4 text-sm font-bold">
            Filter <span className="font-normal text-muted-foreground">({products.length} products)</span>
          </h2>
          {filterPanel}
        </aside>
        <div>
          <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-sm font-bold">
              {search.type === "monthly" ? "Monthly Roaster Plan" : search.type === "one-time" ? "One-time purchase" : "All Products"}
            </h2>
            <span className="text-sm text-muted-foreground">{products.length} products</span>
          </div>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => <article key={product.slug} className="group">
              <Link to="/shop/$slug" params={{ slug: product.slug }} className="block aspect-[4/5] overflow-hidden rounded-lg bg-card p-6" aria-label={`View ${product.name}`}>
                <img src={product.image} alt={`RoasterPack ${product.format}`} className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none" />
              </Link>
              <p className="mt-4 text-xs font-bold uppercase text-muted-foreground">{product.orderType === "monthly" ? "Monthly Roaster Plan" : "One-time purchase"}</p>
              <h3 className="mt-2 text-lg font-bold"><Link to="/shop/$slug" params={{ slug: product.slug }} className="flex items-center justify-between gap-2 hover:underline">{product.name}<ArrowUpRight aria-hidden className="size-4 shrink-0" /></Link></h3>
            </article>)}
          </div>
        </div>
      </div>
    </div>
  </section>;
}
