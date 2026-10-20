import { createFileRoute } from "@tanstack/react-router";
import { QuoteForm } from "@/components/quote-form";

export const Route = createFileRoute("/quote")({
  staticData: { sitemap: true },
  head: () => ({
    links: [{ rel: "canonical", href: "https://pack-preview-magic.lovable.app/quote" }],
    meta: [
      { property: "og:url", content: "https://pack-preview-magic.lovable.app/quote" },
      { title: "Request a Quote — RoasterPack Custom Coffee Pouches" },
      {
        name: "description",
        content:
          "Tell us your bag type, fill weight, material, features and quantities — RoasterPack will send you a price quote for your custom coffee packaging.",
      },
      { property: "og:title", content: "Request a Quote — RoasterPack" },
      {
        property: "og:description",
        content:
          "Get a price for custom printed doypacks, flat-bottom pouches and side-gusset bags.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Quote,
});

function Quote() {
  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
        <div className="lg:sticky lg:top-28">
          <p className="text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase">
            Request a quote
          </p>
          <h1 className="font-display mt-4 text-4xl text-balance sm:text-6xl">
            Get a price for your pouches
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            Fill in what you know — if you're unsure about size or material,
            pick "standard" or "advise me" and our team will recommend the best
            option for your roast.
          </p>
          <p className="mt-8 text-sm text-muted-foreground">
            Prefer email?{" "}
            <a
              href="mailto:info@roasterpack.com"
              className="font-semibold text-foreground hover:underline"
            >
              info@roasterpack.com
            </a>
          </p>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}
