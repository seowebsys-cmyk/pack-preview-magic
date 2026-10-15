import { createFileRoute, Link } from "@tanstack/react-router";
import { BLOG_POSTS, formatPostDate } from "@/lib/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — RoasterPack" },
      {
        name: "description",
        content:
          "Packaging know-how for coffee roasters: freshness, formats, sustainability, and design — from the RoasterPack team.",
      },
      { property: "og:title", content: "RoasterPack Blog" },
      {
        property: "og:description",
        content:
          "Packaging know-how for coffee roasters: freshness, formats, sustainability, and design.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase">
          The RoasterPack blog
        </p>
        <h1 className="font-display mt-3 max-w-2xl text-5xl text-balance sm:text-6xl">
          Packaging know-how for roasters
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Freshness, formats, sustainability, and design — practical reads from
          the people who make your pouches.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {BLOG_POSTS.map((post) => (
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
                <h2 className="font-display mt-2 text-2xl">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="transition-colors hover:text-coffee"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="mt-6 inline-flex items-center justify-center rounded-full border border-foreground/25 px-5 py-2.5 text-xs font-bold tracking-wide uppercase transition-colors hover:bg-secondary"
                >
                  Read article
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
