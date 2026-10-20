import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense, lazy, useEffect, useState } from "react";
import heroPouch from "@/assets/hero-pouch.png";
import doypackFront from "@/assets/doypack-front.webp";
import gussetFront from "@/assets/gusset-front.webp";
import flatbottomFront from "@/assets/flatbottom-front.webp";
import { ContactForm } from "@/components/contact-form";
import { StudioBoundary } from "@/components/studio-boundary";
import { BLOG_POSTS, formatPostDate } from "@/lib/blog";
import showcase1 from "@/assets/roasterpack-gallery-64.jpg";
import showcase2 from "@/assets/roasterpack-gallery-61.jpg";
import showcase3 from "@/assets/roasterpack-gallery-65.jpg";
import showcase4 from "@/assets/roasterpack-gallery-66.jpg";
import showcase5 from "@/assets/roasterpack-gallery-62.jpg";
import showcase6 from "@/assets/roasterpack-gallery-63.jpg";

const PouchStudio = lazy(() => import("@/components/pouch-studio"));

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    links: [{ rel: "canonical", href: "https://pack-preview-magic.lovable.app/" }],
    meta: [
      { property: "og:url", content: "https://pack-preview-magic.lovable.app/" },
      { title: "RoasterPack — Custom Coffee Packaging for Roasters" },
      {
        name: "description",
        content:
          "Premium custom coffee pouches for roasters: doypack, flat bottom and gusset pouches with your design. Sustainable, certified, free samples.",
      },
      { property: "og:title", content: "RoasterPack — Packed for the planet" },
      {
        property: "og:description",
        content:
          "Custom coffee packaging that keeps beans fresh and makes your brand stand out. Try our 3D mockup studio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const TRUSTED_BY = [
  "Danish Coffee",
  "Beaver Rock",
  "Lot61",
  "Assembly",
  "19grams",
  "Coffeecompany",
  "Bonanza",
  "FJORD",
  "Horsham",
  "Machina",
  "MOK",
  "Volcano Coffee Works",
];

const PRODUCTS = [
  {
    name: "Doypack",
    image: doypackFront,
    alt: "Custom printed doypack stand-up coffee pouch",
    tag: "The classic stand-up",
    copy: "The go-to stand-up pouch for specialty coffee. Great shelf presence, lightweight, and loved by roasters worldwide.",
    features: ["250 g – 1 kg sizes", "Degassing valve", "Resealable zipper"],
  },
  {
    name: "Flat Bottom Pouch",
    image: flatbottomFront,
    alt: "Custom printed flat bottom coffee pouch",
    tag: "Premium shelf-ready",
    copy: "A boxy, stable pouch that stands tall and looks premium. Maximum print area for bold brand statements.",
    features: ["5 printable panels", "Degassing valve", "Pocket or front zipper"],
  },
  {
    name: "Gusset Pouch",
    image: gussetFront,
    alt: "Custom printed side gusset coffee pouch",
    tag: "Efficient & flexible",
    copy: "Side-fold gussets give you generous capacity at great value — ideal for larger volumes and wholesale beans.",
    features: ["Up to 5 kg sizes", "Degassing valve", "Heat-sealable"],
  },
];

const SHOWCASE = [
  {
    image: showcase1,
    alt: "Five colorful Chamberlain Coffee pouches with custom printed artwork",
    label: "Chamberlain Coffee — blend collection",
  },
  {
    image: showcase2,
    alt: "Front and back of orange MOTO Coffee custom printed pouches",
    label: "MOTO Coffee — front & back",
  },
  {
    image: showcase3,
    alt: "White café baskets LOT61 coffee pouches with valve and resealable zipper",
    label: "LOT61 — minimal white print",
  },
  {
    image: showcase4,
    alt: "Side view of colorful Chamberlain Coffee pouches showing folded gussets",
    label: "Chamberlain Coffee — side details",
  },
  {
    image: showcase5,
    alt: "Coffeekult Rwanda and Colombia white coffee pouches with colorful origin labels",
    label: "Coffeekult — origin series",
  },
  {
    image: showcase6,
    alt: "Orange MOTO Coffee pouches viewed from the side to show expanding gussets",
    label: "MOTO Coffee — gusset details",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Select your packaging",
    copy: "Choose the right pouch to keep your product fresh and secure.",
  },
  {
    n: "2",
    title: "Choose your quantity",
    copy: "Pick the amount that fits your needs — no waste, just efficiency.",
  },
  {
    n: "3",
    title: "Start packing",
    copy: "Seal it up securely for freshness and spill-free transport.",
  },
];

function Index() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-14 pb-20 sm:px-6 lg:grid-cols-2 lg:pt-20">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase">
              Revolutionizing custom coffee packaging for roasters
            </p>
            <h1 className="font-display mt-4 text-6xl leading-[0.95] text-balance sm:text-7xl lg:text-8xl">
              Packed for the planet.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Your coffee tells a story — our packaging helps you share it.
              Sleek, modern, and sustainable coffee packaging that keeps your
              beans fresh while making your brand stand out.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/quote"
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-bold tracking-wide text-primary-foreground uppercase transition-opacity hover:opacity-90"
              >
                Request a Quote
              </Link>
              <a
                href="#sample"
                className="inline-flex items-center justify-center rounded-full border border-foreground/25 px-7 py-3.5 text-sm font-bold tracking-wide uppercase transition-colors hover:bg-secondary"
              >
                Get a Sample
              </a>
              <a
                href="#studio"
                className="inline-flex items-center px-2 py-3.5 text-sm font-bold tracking-wide uppercase underline-offset-4 hover:underline"
              >
                Try the 3D studio →
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute inset-0 -z-10 scale-125 rounded-full bg-secondary" />
            <img
              src={heroPouch}
              alt="RoasterPack custom coffee pouch"
              className="animate-float-slow mx-auto w-full max-w-xs drop-shadow-2xl lg:max-w-sm"
            />
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="border-y border-border bg-card py-8">
        <p className="text-center text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase">
          Trusted by roasters across Europe
        </p>
        <div className="mt-5 overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-12 pr-12">
            {[...TRUSTED_BY, ...TRUSTED_BY].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="font-display text-xl whitespace-nowrap text-foreground/50"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="scroll-mt-24 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase">
            Choose your packaging
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-4xl text-balance sm:text-5xl">
            Three pouches. Endless possibilities.
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Customize colors, logos, and finishes with premium materials and
            precision craftsmanship. Every pouch is food-safe, freshness-rated,
            and made to order.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PRODUCTS.map((p) => (
              <article
                key={p.name}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-shadow hover:shadow-xl"
              >
                <div className="flex h-64 items-center justify-center bg-secondary p-8">
                  <img
                    src={p.image}
                    alt={p.alt}
                    className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-bold tracking-[0.2em] text-coffee uppercase">
                    {p.tag}
                  </p>
                  <h3 className="font-display mt-2 text-2xl">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {p.copy}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm font-medium"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-coffee" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#studio"
                    className="mt-6 inline-flex items-center justify-center rounded-full border border-foreground/25 px-5 py-2.5 text-xs font-bold tracking-wide uppercase transition-colors hover:bg-secondary"
                  >
                    See it in 3D
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Studio */}
      <section id="studio" className="scroll-mt-24 border-y border-border bg-secondary/50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase">
            Our packages — your design
          </p>
          <h2 className="font-display mt-3 max-w-3xl text-4xl text-balance sm:text-5xl">
            See your brand on our packaging — instantly
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Upload your logo and watch it wrap around a RoasterPack pouch in
            3D. Pick your style, material color, and finish — no signup, no
            waiting.
          </p>
          <div className="mt-12">
            {mounted ? (
              <StudioBoundary>
                <Suspense
                  fallback={
                    <div className="flex h-[560px] items-center justify-center rounded-3xl border border-border bg-card text-sm text-muted-foreground">
                      Loading 3D studio…
                    </div>
                  }
                >
                  <PouchStudio />
                </Suspense>
              </StudioBoundary>
            ) : (
              <div className="flex h-[560px] items-center justify-center rounded-3xl border border-border bg-card text-sm text-muted-foreground">
                Loading 3D studio…
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase">
            Simple steps
          </p>
          <h2 className="font-display mt-3 text-4xl text-balance sm:text-5xl">
            We are the changemakers
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            From packaging selection to sealing freshness, we've made the
            process effortless — because great coffee deserves great packaging.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="rounded-3xl border border-border bg-card p-8"
              >
                <span className="font-display text-5xl text-coffee">{s.n}</span>
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.copy}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-2">
            {["Simple", "Fast", "Customize", "Best value", "Recycle"].map(
              (chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-border bg-card px-4 py-1.5 text-xs font-bold tracking-wide uppercase"
                >
                  {chip}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Showcase / recent work */}
      <section id="work" className="scroll-mt-24 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase">
            Fresh off the press
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-4xl text-balance sm:text-5xl">
            Pouches we've printed for roasters like you
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            A look at recent runs — custom colors, full-print artwork, kraft
            finishes, and every format we produce.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SHOWCASE.map((item) => (
              <figure
                key={item.label}
                className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card"
              >
                <a href={item.image} target="_blank" rel="noreferrer" aria-label={`View full photo: ${item.label}`} className="block aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="block h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </a>
                <figcaption className="min-h-20 px-5 py-4 text-sm font-bold">
                  {item.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Latest from the blog */}
      <section className="border-t border-border bg-secondary/50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase">
                From the blog
              </p>
              <h2 className="font-display mt-3 max-w-xl text-4xl text-balance sm:text-5xl">
                Packaging know-how, fresh brewed
              </h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center justify-center rounded-full border border-foreground/25 px-6 py-3 text-xs font-bold tracking-wide uppercase transition-colors hover:bg-secondary"
            >
              View all articles
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-shadow hover:shadow-xl"
              >
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="block overflow-hidden"
                >
                  <img
                    src={post.cover}
                    alt={post.coverAlt}
                    width={1280}
                    height={720}
                    loading="lazy"
                    className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-bold tracking-[0.2em] text-coffee uppercase">
                    {formatPostDate(post.date)} · {post.readingTime}
                  </p>
                  <h3 className="font-display mt-2 text-xl">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="transition-colors hover:text-coffee"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Free sample / lead form */}
      <section id="sample" className="scroll-mt-24 border-t border-border bg-card py-20">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase">
              See the quality for yourself
            </p>
            <h2 className="font-display mt-3 text-4xl text-balance sm:text-5xl">
              Try before you commit — get a free sample
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Experience the quality of RoasterPack's premium coffee packaging
              before you buy. Send us a short message with what you'd like to
              sample — a member of our sales team will reply personally and
              sort out the details.
            </p>
            <ul className="mt-8 space-y-3 text-sm font-medium">
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-coffee" />
                Food-safe certified materials (BRC, FSSC 22000, ISO 22000)
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-coffee" />
                Degassing valve keeps beans at peak freshness
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-coffee" />
                Recyclable and mono-material options available
              </li>
            </ul>
            <p className="mt-8 text-sm text-muted-foreground">
              Ready for pricing?{" "}
              <Link to="/quote" className="font-bold text-foreground underline underline-offset-4">
                Request a Quote
              </Link>
            </p>
          </div>
          <ContactForm kind="sample" />
        </div>
      </section>
    </>
  );
}
