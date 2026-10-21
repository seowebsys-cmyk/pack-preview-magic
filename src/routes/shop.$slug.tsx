import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getShopProduct } from "@/lib/shop";

export const Route = createFileRoute("/shop/$slug")({
  staticData: { sitemap: true },
  loader: ({ params }) => {
    const product = getShopProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData, params }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Product unavailable"} — RoasterPack Shop` },
      { name: "description", content: loaderData?.description ?? "Explore custom coffee packaging from RoasterPack." },
      { property: "og:title", content: `${loaderData?.name ?? "Product unavailable"} — RoasterPack` },
      { property: "og:description", content: loaderData?.description ?? "RoasterPack coffee pouches." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `https://pack-preview-magic.lovable.app/shop/${params.slug}` },
      { name: "twitter:card", content: "summary_large_image" },
      ...(!loaderData ? [{ name: "robots", content: "noindex" }] : []),
    ],
    links: [{ rel: "canonical", href: `https://pack-preview-magic.lovable.app/shop/${params.slug}` }],
  }),
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData();
  return <section className="py-12 sm:py-16">
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <Button asChild variant="link" className="px-0"><Link to="/shop" search={{ type: "all" }}><ArrowLeft />All Products</Link></Button>
      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex aspect-square items-center justify-center rounded-lg bg-card p-10 sm:p-16">
          <img src={product.image} alt={`RoasterPack ${product.format}`} className="h-full w-full object-contain" />
        </div>
        <div className="py-4">
          <p className="text-xs font-bold uppercase text-muted-foreground">{product.orderType === "monthly" ? "Monthly Roaster Plan" : "One-time purchase"}</p>
          <h1 className="font-display mt-4 text-4xl sm:text-5xl">{product.name}</h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">{product.description}</p>
          <dl className="mt-8 divide-y divide-border border-y border-border text-sm">
            <div className="grid grid-cols-[100px_1fr] gap-4 py-4"><dt className="font-bold">Sizes</dt><dd>250 g · 500 g · 1000 g</dd></div>
            <div className="grid grid-cols-[100px_1fr] gap-4 py-4"><dt className="font-bold">Materials</dt><dd>Material options tailored to your coffee and packing needs</dd></div>
            <div className="grid grid-cols-[100px_1fr] gap-4 py-4"><dt className="font-bold">Custom print</dt><dd>Your branding and artwork</dd></div>
            <div className="grid grid-cols-[100px_1fr] gap-4 py-4"><dt className="font-bold">Pricing</dt><dd>Quoted for your size, material and order volume</dd></div>
          </dl>
          {product.orderType === "monthly" && <p className="mt-6 text-sm leading-relaxed text-muted-foreground">For recurring pouch supply, tell us your monthly requirements. Our team will confirm the delivery and invoicing arrangements with you.</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link to="/" hash="sample">Get a Sample<ArrowRight /></Link></Button>
            <Button asChild size="lg" variant="outline"><Link to="/quote">Request a Quote</Link></Button>
          </div>
        </div>
      </div>
    </div>
  </section>;
}