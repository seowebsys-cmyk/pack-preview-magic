import blogValve from "@/assets/blog-valve.jpg";
import blogTypes from "@/assets/blog-types.jpg";
import blogSustainable from "@/assets/blog-sustainable.jpg";
import blogGussetExpand from "@/assets/blog-gusset-expand.jpg";
import blogDecisions from "@/assets/blog-decisions.jpg";
import blogChoosePackaging from "@/assets/blog-choose-packaging.jpg";

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
    slug: "side-gusset-coffee-bags-explained",
    title: "Side Gusset Coffee Bags: How the Folded Sides Expand",
    date: "2026-10-14",
    readingTime: "4 min read",
    excerpt:
      "Those folded side panels aren't just for looks — they unfold as the pouch fills, turning a flat bag into a high-volume pack. Here's how the format works before you choose it.",
    cover: blogGussetExpand,
    coverAlt:
      "A kraft side gusset coffee pouch being filled, its folded side panels expanding",
    body: [
      "A side gusset pouch leaves the production line looking almost flat — two wide panels joined by folded-in sides. Those folds are the gussets, and they're the whole point of the format. As coffee fills the bag, the gussets unfold outward, and the pouch gains depth and volume without gaining width on the shelf.",
      "This is why side gusset bags are the workhorse of larger retail and wholesale coffee. A format that ships and stores flat can hold 500 g, 1 kg, or more once filled. The front and back panels stay smooth and uninterrupted — a large, clean canvas for your printed design — while the folded sides carry the expansion.",
      "Filled and sealed, a side gusset pouch has a classic, squared silhouette that roasters have used for generations. It pairs naturally with a tin tie or a resealable zipper at the top, and a degassing valve on the front or back panel handles the CO₂ your fresh roast releases in the first days after sealing.",
      "When should you choose it? If you're packing larger volumes, supplying cafés and wholesale accounts, or want a traditional coffee-bag look with maximum print area, the side gusset is hard to beat. If shelf-standing stability for small retail bags matters more, a doypack or flat bottom may serve you better — order a sample of each and compare them side by side.",
    ],
  },
  {
    slug: "coffee-packaging-decisions",
    title: "Coffee Packaging Decisions: Freshness, Materials and Ordering",
    date: "2026-10-10",
    readingTime: "5 min read",
    excerpt:
      "Freshness protection, material claims, samples, and order planning — the decisions that shape your packaging long before the first pouch is printed.",
    cover: blogDecisions,
    coverAlt:
      "Flat lay of pouch material swatches, a sample pouch, a degassing valve, and a planning checklist",
    body: [
      "Choosing coffee packaging is really a chain of smaller decisions, and the order you make them in matters. Start with freshness: roasted coffee needs protection from oxygen, moisture, and light, plus a way for CO₂ to escape. That means a high-barrier film structure and a one-way degassing valve — non-negotiable for any format you choose.",
      "Next come materials, and this is where brand values meet physics. Recyclable mono-material pouches now reach barrier levels that keep beans fresh for months, while kraft-look finishes signal sustainability on the shelf. Whatever you choose, make sure the claims you print on the bag match the material actually inside it — your customers increasingly check.",
      "Then there's ordering itself. Custom-printed pouches have minimum order quantities and lead times, so plan around your roast calendar: a one-time launch run behaves differently from a recurring order for a flagship blend. Ordering slightly ahead of need beats an emergency reorder every time, and keeping your artwork print-ready removes the most common delay.",
      "Finally, never skip samples. A physical sample tells you what no mockup can — how the material feels, how the zipper closes, how your bag stands next to competitors. It's the cheapest decision in the whole process and the one that prevents the most expensive mistakes.",
    ],
  },
  {
    slug: "choose-custom-coffee-bag-packaging",
    title: "How to Choose Custom Coffee Bag Packaging for Your Roast",
    date: "2026-10-02",
    readingTime: "5 min read",
    excerpt:
      "Format, barrier, zipper, valve, print — a practical checklist for matching your pouch to your roast, your volumes, and your brand.",
    cover: blogChoosePackaging,
    coverAlt:
      "Three blank coffee pouches — doypack, flat bottom, and side gusset — side by side",
    body: [
      "Start with the format. Doypacks are the economical all-rounder for 250 g to 1 kg retail bags. Flat bottom pouches give you five printable panels and rock-solid shelf presence for flagship coffees. Side gusset bags scale to larger volumes with a classic look. Match the format to where the bag will live: retail shelf, café back bar, or wholesale crate.",
      "Then check the barrier. Light roasts with delicate aromatics and anything shipping far from the roastery need high-barrier films; fast-turnover local sales have more room to compromise. Every format can take a degassing valve — fit one as standard if you seal within days of roasting — and a resealable zipper if the bag will be opened more than once, which for retail coffee is nearly always.",
      "Now the practical checks. Volume: does the pouch size match your fill weights with headroom to seal? Filling: will your process work with the bag's opening, whether you hand-fill or run a machine? Design: does the printable area fit your artwork without fighting seams and folds? And brand: does the finish — matte, gloss, soft-touch, kraft — look like your coffee tastes?",
      "The shortcut through all of this is physical comparison. Get samples of the formats you're considering, fill them with your own beans, and live with them for a week. The right pouch usually makes itself obvious once it's sitting on your own shelf next to your own coffee.",
    ],
  },
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
