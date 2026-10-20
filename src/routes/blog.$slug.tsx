import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { formatPostDate, getPost } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Article"} — RoasterPack Blog` },
      {
        name: "description",
        content: loaderData?.excerpt ?? "RoasterPack blog article",
      },
      {
        property: "og:title",
        content: loaderData?.title ?? "RoasterPack Blog",
      },
      {
        property: "og:description",
        content: loaderData?.excerpt ?? "RoasterPack blog article",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogPostPage,
});

function BlogPostPage() {
  const post = Route.useLoaderData();

  return (
    <article className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link
          to="/blog"
          className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-foreground"
        >
          ← Back to blog
        </Link>
        <p className="mt-8 text-xs font-bold tracking-[0.2em] text-coffee uppercase">
          {formatPostDate(post.date)} · {post.readingTime}
        </p>
        <h1 className="font-display mt-3 text-4xl text-balance sm:text-5xl">
          {post.title}
        </h1>
        <img
          src={post.cover}
          alt={post.coverAlt}
          width={1280}
          height={720}
          className="mt-10 aspect-video w-full rounded-3xl border border-border object-cover"
        />
        <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/90">
          {post.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-14 rounded-3xl border border-border bg-card p-8 text-center">
          <h2 className="font-display text-2xl">
            Want to see your brand on our pouches?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Tell us what you need and we'll send a price quote — or ask for a
            sample to feel the quality first.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/quote"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Request a Quote
            </Link>
            <Link
              to="/"
              hash="sample"
              className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-bold transition-colors hover:bg-secondary"
            >
              Get a Sample
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
