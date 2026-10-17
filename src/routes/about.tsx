import { createFileRoute } from "@tanstack/react-router";
import aboutCoffee from "@/assets/about-coffee.jpg.asset.json";
import aboutShop from "@/assets/about-shop.jpg.asset.json";
import aboutBreak from "@/assets/about-break.jpg.asset.json";
import { assetUrl } from "@/lib/asset-url";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About RoasterPack — Premium Custom Coffee Packaging" },
      {
        name: "description",
        content:
          "RoasterPack supports coffee roasters with premium, custom packaging that keeps coffee fresh and tells each brand's unique story. BRC, FSSC 22000, ISO 22000 and HACCP certified.",
      },
      { property: "og:title", content: "About RoasterPack" },
      {
        property: "og:description",
        content:
          "Great coffee deserves great packaging. Meet the team behind premium custom coffee pouches.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const REASONS = [
  {
    title: "Years of expertise in flexible packaging",
    copy: "With deep industry knowledge and experience, we know exactly what it takes to deliver packaging that performs and impresses.",
  },
  {
    title: "Custom solutions tailored for coffee roasters",
    copy: "From pouch sizes to material finishes, everything is designed to meet the unique needs of coffee professionals like you.",
  },
  {
    title: "High-quality, freshness-preserving materials",
    copy: "We use only top-grade materials that lock in aroma and protect your product — so your coffee reaches customers at its best.",
  },
  {
    title: "Easy process from concept to delivery",
    copy: "No stress, no guesswork. We guide you through every step — from file upload to printing and shipping — keeping it smooth and simple.",
  },
  {
    title: "Friendly team that's here to help",
    copy: "Got a question or a custom request? Our team is always happy to jump in and support you — real people, real answers.",
  },
];

const CERTS = [
  {
    name: "BRC Global Standard",
    copy: "Certified under the BRC Global Standard for Packaging and Packaging Materials, ensuring safety and quality.",
  },
  {
    name: "FSSC 22000",
    copy: "Superior food safety management systems across our production.",
  },
  {
    name: "ISO 22000",
    copy: "International food safety standards across the production chain.",
  },
  {
    name: "HACCP",
    copy: "Hazard analysis and critical control points — safety at every step.",
  },
];

function About() {
  return (
    <>
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase">
            About us
          </p>
          <h1 className="font-display mt-4 max-w-4xl text-4xl leading-tight text-balance sm:text-6xl">
            Great coffee deserves great packaging.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            At RoasterPack, we believe great coffee deserves great packaging.
            With years of experience in flexible packaging, our mission is to
            support coffee roasters with premium, custom packaging solutions
            that keep coffee fresh, look amazing, and tell a brand's unique
            story.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <img
              src={assetUrl(aboutCoffee)}
              alt="Freshly roasted coffee beans"
              className="h-56 w-full rounded-3xl object-cover"
            />
            <img
              src={assetUrl(aboutShop)}
              alt="Specialty coffee shop"
              className="h-56 w-full rounded-3xl object-cover"
            />
            <img
              src={assetUrl(aboutBreak)}
              alt="Coffee break at the roastery"
              className="h-56 w-full rounded-3xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase">
            Team
          </p>
          <h2 className="font-display mt-3 max-w-3xl text-4xl text-balance sm:text-5xl">
            Packaging people who love coffee
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            We're a team of packaging professionals who love coffee as much as
            you do. From your first conversation with us to the moment your
            coffee bags are sealed and shipped, we make the entire process
            simple, efficient, and even fun. Whether you need a small batch of
            bags or large-scale production, we've got your back.
          </p>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {REASONS.map((r) => (
              <div
                key={r.title}
                className="rounded-3xl border border-border bg-background p-7"
              >
                <h3 className="text-base font-bold">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {r.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase">
            Certification
          </p>
          <h2 className="font-display mt-3 max-w-3xl text-4xl text-balance sm:text-5xl">
            Food-safe, certified, audited
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            We pride ourselves on maintaining the highest certification
            standards for food-safe packaging. These certifications affirm our
            dedication to meeting stringent industry requirements and
            delivering top-quality packaging solutions to our clients.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CERTS.map((c) => (
              <div
                key={c.name}
                className="rounded-3xl border border-border bg-card p-7"
              >
                <p className="font-display text-lg">{c.name}</p>
                <p className="mt-2 text-sm text-muted-foreground">{c.copy}</p>
              </div>
            ))}
          </div>
          <p className="font-display mt-14 text-3xl tracking-wide text-foreground/40 sm:text-4xl">
            Packed for the planet
          </p>
        </div>
      </section>
    </>
  );
}
