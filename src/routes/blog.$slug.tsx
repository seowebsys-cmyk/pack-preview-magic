import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { formatPostDate, getPost } from "@/lib/blog";
import { BlogContent } from "@/components/blog-content";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  staticData: { sitemap: true },
  head: ({ loaderData, params }) => ({
    scripts: loaderData ? [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: loaderData.title,
        description: loaderData.excerpt,
        datePublished: loaderData.date,
        author: { "@type": "Organization", name: "RoasterPack" },
        publisher: { "@type": "Organization", name: "RoasterPack" },
        mainEntityOfPage: `https://pack-preview-magic.lovable.app/blog/${params.slug}`,
      }).replace(/</g, "\\u003c"),
    }, {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "RoasterPack", item: "https://pack-preview-magic.lovable.app/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://pack-preview-magic.lovable.app/blog" },
          { "@type": "ListItem", position: 3, name: loaderData.title, item: `https://pack-preview-magic.lovable.app/blog/${params.slug}` },
        ],
      }).replace(/</g, "\\u003c"),
    }] : [],
    links: [{ rel: "canonical", href: `https://pack-preview-magic.lovable.app/blog/${params.slug}` }],
    meta: [
      { property: "og:url", content: `https://pack-preview-magic.lovable.app/blog/${params.slug}` },
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
        <BlogContent blocks={post.blocks ?? post.body.map((text) => ({ type: "paragraph", text }))} />

        <div className="mt-14 rounded-3xl border border-border bg-card p-8 text-center">
          <h2 className="font-display text-2xl">
            Want to see your brand on our pouches?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Ask for a sample to feel the quality first — or head to the shop
            when you're ready to order.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              hash="sample"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Get a Sample
            </Link>
            <Link
              to="/shop"
              search={{ type: "all" }}
              className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-bold transition-colors hover:bg-secondary"
            >
              Order now
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
