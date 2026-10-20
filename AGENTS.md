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
- The 3D mockup studio (`src/components/pouch-studio.tsx`, geometry/texture builders in `src/lib/pouch.ts`) uses React Three Fiber v9 + drei v10 on React 19. It is browser-only: always lazy-load it behind a mounted gate, never import it at route module scope (SSR breaks).
- Quote form (`src/components/quote-form.tsx`, rules in `src/lib/quote.ts`) writes to `public.quote_requests`; contact and sample forms write to `public.contact_requests`; all via the browser Supabase client; RLS allows anonymous INSERT only — no SELECT policy, so submissions are readable only from the Cloud dashboard.
- The online shop is intentionally not built yet (the old Wix store is being replaced later); "Request a Quote" (/quote) is the primary CTA, "Get a Sample" (homepage #sample, simple message form answered manually by sales) is secondary.
