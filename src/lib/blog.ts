import { SUPPLIED_ARTICLES } from "./blog-articles";
import blogGussetExpand from "@/assets/blog-gusset-expand.jpg";
import blogDecisions from "@/assets/blog-decisions.jpg";
import blogChoosePackaging from "@/assets/blog-choose-packaging.jpg";

export type BlogBlock =
  | { type: "paragraph" | "h2" | "h3"; text: string }
  | { type: "table"; rows: string[][] };

export interface BlogPost {
  slug: string;
  title: string;
  date: string; // ISO date
  readingTime: string;
  excerpt: string;
  cover: string;
  coverAlt: string;
  body: string[];
  blocks?: BlogBlock[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "side-gusset-coffee-bags-explained",
    title: "Side Gusset Coffee Bags: How the Folded Sides Expand",
    date: "2026-10-14",
    readingTime: "7 min read",
    excerpt:
      "Those folded side panels aren't just for looks — they unfold as the pouch fills, turning a flat bag into a high-volume pack. Here's how the format works before you choose it.",
    cover: blogGussetExpand,
    coverAlt:
      "A kraft side gusset coffee pouch being filled, its folded side panels expanding",
    blocks: SUPPLIED_ARTICLES["side-gusset-coffee-bags-explained"]?.blocks ?? [],
    body: [],
  },
  {
    slug: "coffee-packaging-decisions",
    title: "Coffee Packaging Decisions: How to Choose for Freshness, Materials and Ordering",
    date: "2026-10-10",
    readingTime: "7 min read",
    excerpt:
      "Freshness protection, material claims, samples, and order planning — the decisions that shape your packaging long before the first pouch is printed.",
    cover: blogDecisions,
    coverAlt:
      "Flat lay of pouch material swatches, a sample pouch, a degassing valve, and a planning checklist",
    blocks: SUPPLIED_ARTICLES["coffee-packaging-decisions"]?.blocks ?? [],
    body: [],
  },
  {
    slug: "choose-custom-coffee-bag-packaging",
    title: "How to Choose Custom Coffee Bag Packaging for Your Roast",
    date: "2026-10-02",
    readingTime: "10 min read",
    excerpt:
      "Format, barrier, zipper, valve, print — a practical checklist for matching your pouch to your roast, your volumes, and your brand.",
    cover: blogChoosePackaging,
    coverAlt:
      "Three blank coffee pouches — doypack, flat bottom, and side gusset — side by side",
    blocks: SUPPLIED_ARTICLES["choose-custom-coffee-bag-packaging"]?.blocks ?? [],
    body: [],
  },

];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function formatPostDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
