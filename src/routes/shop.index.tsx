import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { filterShopProducts, type OrderType } from "@/lib/shop";

export const Route = createFileRoute("/shop/")({
  staticData: { sitemap: true },
  validateSearch: (search: Record<string, unknown>): { type: OrderType } => ({
    type: search['type'] === "monthly" || search['type'] === "one-time" ? search['type'] : "all",
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

function ShopPage() {
  const { type } = Route.useSearch();
  const products = filterShopProducts(type);
  const categories: { value: OrderType; label: string }[] = [
    { value: "all", label: "All Products" },
    { value: "one-time", label: "One-time purchase" },
    { value: "monthly", label: "Monthly Roaster Plan" },
  ];

  return <section className="py-12 sm:py-16">
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <p className="text-xs font-bold uppercase text-muted-foreground">RoasterPack shop</p>
      <h1 className="font-display mt-3 text-4xl sm:text-6xl">Coffee pouches</h1>
      <div className="mt-10 grid gap-8 lg:grid-cols-[180px_1fr] lg:gap-12">
        <aside>
          <h2 className="mb-4 text-sm font-bold">Browse by</h2>
          <nav aria-label="Shop categories" className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
            {categories.map((category) => <Button key={category.value} asChild variant={type === category.value ? "default" : "ghost"} className="h-auto justify-start whitespace-normal text-left">
              <Link to="/shop" search={{ type: category.value }} aria-current={type === category.value ? "page" : undefined}>{category.label}</Link>
            </Button>)}
          </nav>
        </aside>
        <div>
          <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-sm font-bold">{categories.find((category) => category.value === type)?.label}</h2>
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