import blogValve from "@/assets/blog-valve.jpg";
import blogTypes from "@/assets/blog-types.jpg";
import blogSustainable from "@/assets/blog-sustainable.jpg";

export interface BlogPost {
  slug: string;
  title: string;
  date: string; // ISO date
  readingTime: string;
  excerpt: string;
  cover: string;
  coverAlt: string;
  body: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-degassing-valves-matter",
    title: "Why every coffee pouch needs a degassing valve",
    date: "2026-10-06",
    readingTime: "4 min read",
    excerpt:
      "Freshly roasted coffee releases CO₂ for days. Here's how a one-way valve keeps your beans fresh without bursting the bag — and why we fit one as standard.",
    cover: blogValve,
    coverAlt: "Macro shot of a one-way degassing valve on a kraft coffee pouch",
    body: [
      "If you've ever sealed freshly roasted coffee into an airtight bag, you've seen the problem: within hours the bag inflates like a balloon. Roasted beans release carbon dioxide for days after roasting — a natural process called degassing — and that gas has to go somewhere.",
      "A one-way degassing valve solves this elegantly. It lets CO₂ escape from inside the pouch while preventing oxygen, moisture, and aromas from getting in. Oxygen is the enemy of fresh coffee: it oxidizes the oils in the bean and flattens the flavor within days.",
      "That's why every RoasterPack pouch — doypack, flat bottom, or gusset — can be fitted with a valve as standard. The valve is applied during production, positioned on the front or back panel so it never interferes with your design.",
      "The result: your customers open a bag that smells like the day the coffee was roasted. Whether you ship within a week of roasting or stock shelves for months, the valve quietly does its job — no vacuum sealing, no compromise on packaging design.",
    ],
  },
  {
    slug: "doypack-vs-flat-bottom",
    title: "Doypack vs flat bottom: which pouch fits your roast?",
    date: "2026-09-22",
    readingTime: "5 min read",
    excerpt:
      "Both stand tall on the shelf, but they tell different stories. A quick guide to choosing between the classic stand-up pouch and the premium box-style bag.",
    cover: blogTypes,
    coverAlt: "A doypack and a flat bottom coffee pouch side by side",
    body: [
      "The doypack is the classic stand-up pouch for a reason. It's lightweight, uses less material, and its curved bottom gusset lets it stand upright once filled. For 250 g to 1 kg retail bags, it's the format most specialty roasters start with — efficient to fill, easy to ship, and instantly recognizable.",
      "The flat bottom pouch is the premium option. Its box-like construction gives you five printable panels — front, back, two sides, and even the bottom — so your brand has room to breathe. It stands rock-solid on the shelf and reads as a higher-end product, which is why it's popular for flagship single origins and gift-worthy packaging.",
      "Cost-wise, doypacks are generally more economical per unit, while flat bottom pouches command a small premium for their structure and print area. Both accept degassing valves, resealable zippers, and the full range of finishes — matte, gloss, or soft-touch.",
      "Our advice: if you're launching a new roast or moving volume, start with the doypack. If shelf presence and brand impact matter most — a competition lot, a subscription flagship — go flat bottom. And if you're unsure, order a free sample of each and see them side by side.",
    ],
  },
  {
    slug: "sustainable-packaging-mono-materials",
    title: "Sustainable packaging, explained: mono-material pouches",
    date: "2026-09-08",
    readingTime: "4 min read",
    excerpt:
      "Recyclable coffee packaging used to be a contradiction. Mono-material pouches changed that — here's what they are and why roasters are switching.",
    cover: blogSustainable,
    coverAlt: "A kraft coffee pouch surrounded by green coffee leaves",
    body: [
      "Traditional coffee pouches are made of laminated layers — plastic, aluminum, more plastic — each layer doing a job, but together making the pack nearly impossible to recycle. The layers can't be separated, so the whole pouch ends up in general waste.",
      "Mono-material pouches take a different approach: the entire structure is made from a single polymer family, usually polyethylene (PE) or polypropylene (PP). Because there's nothing to separate, the pouch can go into existing plastic recycling streams where those are available.",
      "The obvious question is barrier performance. Coffee needs protection from oxygen, moisture, and light — jobs the aluminum layer used to do. Modern mono-material films use advanced coatings and metallization alternatives to reach barrier levels that keep beans fresh for months, not weeks.",
      "We offer recyclable mono-material options across our pouch range, alongside kraft-look finishes that signal sustainability on the shelf. If your brand talks about origin, traceability, and care for the environment, your packaging should say the same thing.",
    ],
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
