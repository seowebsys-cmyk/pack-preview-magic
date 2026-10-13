import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/contact-form";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact RoasterPack — Custom Coffee Packaging" },
      {
        name: "description",
        content:
          "Talk to the RoasterPack team about custom coffee pouches, free samples, and order volumes. Office in Rīga, serving roasters across Europe.",
      },
      { property: "og:title", content: "Contact RoasterPack" },
      {
        property: "og:description",
        content:
          "Our team is here to support you — ask anything about custom coffee packaging.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase">
            Contact us
          </p>
          <h1 className="font-display mt-4 text-4xl text-balance sm:text-6xl">
            Our team is here to support you
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            Feel free to ask us anything that's on your mind — we're here to
            answer your questions and guide you through the entire process.
          </p>

          <dl className="mt-10 space-y-6">
            <div>
              <dt className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                Office hours
              </dt>
              <dd className="mt-1 text-sm font-semibold">
                Monday – Friday, 8:00 – 17:00
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                Address
              </dt>
              <dd className="mt-1 text-sm font-semibold">
                Dzirnavu iela 66 – 31, Rīga, LV-1010
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                Info
              </dt>
              <dd className="mt-1 text-sm font-semibold">
                <a
                  href="mailto:info@roasterpack.com"
                  className="hover:underline"
                >
                  info@roasterpack.com
                </a>
                <br />
                <a href="tel:+37126497846" className="hover:underline">
                  +371 26497846
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <ContactForm kind="contact" />
      </div>
    </section>
  );
}
