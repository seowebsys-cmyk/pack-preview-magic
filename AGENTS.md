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

- RoasterPack marketing site: routes are `/` (landing), `/about`, `/contact`; shared nav/footer live in `src/components/site-nav.tsx` / `site-footer.tsx` mounted in `__root.tsx`. Brand assets are CDN-backed via `.asset.json` pointers in `src/assets/` — never commit the binaries.
- The 3D mockup studio (`src/components/pouch-studio.tsx`, geometry/texture builders in `src/lib/pouch.ts`) uses React Three Fiber v9 + drei v10 on React 19. It is browser-only: always lazy-load it behind a mounted gate, never import it at route module scope (SSR breaks).
- Contact and sample forms write to `public.contact_requests` via the browser Supabase client; RLS allows anonymous INSERT only — no SELECT policy, so submissions are readable only from the Cloud dashboard.
- The online shop is intentionally not built yet (the old Wix store is being replaced later); all CTAs lead to the sample/contact forms.
