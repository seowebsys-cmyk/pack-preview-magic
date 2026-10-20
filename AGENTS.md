<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules

- RoasterPack marketing site: routes are `/` (landing), `/about`, `/contact`, `/quote`, `/blog`, `/blog/$slug`; shared nav/footer live in `src/components/site-nav.tsx` / `site-footer.tsx` mounted in `__root.tsx`. All site images (logo, product, about, gallery, blog) are bundled ES6 imports from `src/assets/` — not `.asset.json` CDN pointers — because the site is also deployed to external hosts (Netlify) where the Lovable asset endpoint is unavailable.
- Blog posts are a static array in `src/lib/blog.ts` (no DB table) — move to a CMS/table only if the user asks for editing without code changes.
- Supplied blog documents use typed paragraph, heading and table blocks in `src/lib/blog-articles.ts`, rendered as semantic HTML so the original structure remains readable to visitors and crawlers.
- Search discovery uses required route `staticData.sitemap` decisions and a router-derived `/sitemap.xml` handler; dynamic blog URLs come from the complete static post collection, with no generated-date lastmod fallback.
- The 3D mockup studio (`src/components/pouch-studio.tsx`, geometry/texture builders in `src/lib/pouch.ts`) uses React Three Fiber v9 + drei v10 on React 19. It is browser-only: always lazy-load it behind a mounted gate, never import it at route module scope (SSR breaks).
- Quote form (`src/components/quote-form.tsx`, rules in `src/lib/quote.ts`) writes to `public.quote_requests`; contact and sample forms write to `public.contact_requests`; all via the browser Supabase client; RLS allows anonymous INSERT only — no SELECT policy, so submissions are readable only from the Cloud dashboard.
- The shop is a six-product quote-based catalog at `/shop` and `/shop/$slug`, sourced from `src/lib/shop.ts`; one-time/monthly categories use validated search parameters. No invented prices or checkout; "Request a Quote" stays primary and "Get a Sample" secondary.
- Original uploaded blog HTML is preserved in `content/blog` for the deferred image/link restoration; do not inject unsanitized HTML or link to unbuilt destinations.
