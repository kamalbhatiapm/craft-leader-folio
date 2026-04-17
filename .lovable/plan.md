
### Phase 1 — Plan (5 bullets)

1. **Foundation & design tokens.** Set up Inter (UI) + Fraunces (editorial/quotes) via `font-display: swap`, define a zinc neutral base with electric indigo `#6366F1` accent in `index.css` as HSL tokens, extend Tailwind, default to dark mode (truly dark, not gray) with a persisted `useTheme` hook honoring user toggle. Add CSP meta, skip-to-content link, and `prefers-reduced-motion` guards.

2. **Architecture & content layer.** Create `/src/content/{profile,projects,articles,songs,quotes}.ts` with the typed shapes from your prompt (`Project`, `Article`, `Song`, `Quote`). Sections read only from these files — no hardcoded copy in components. Until your content arrives, every field renders as a clearly-labeled `[TODO: ...]` placeholder.

3. **Scroll-anchored single page with sticky nav.** One `<main>` with five `<section id="...">` blocks in order: About, Projects, Articles, Hype Songs, Quotes. Sticky top bar = brand mark + 5 anchor links (smooth-scroll, active-section highlight via `IntersectionObserver`) + light/dark toggle. Keyboard reachable, visible `:focus-visible` rings, ARIA current on active link.

4. **Section MVPs (seed = 3–5 placeholder items each).**
   - **About:** hero (name, role, tagline, bio, photo slot with gradient fallback), "What I care about" pill row, contact icons (Email, LinkedIn, GitHub, X — all `rel="noopener noreferrer"`), Download Resume CTA pointing to `/resume.pdf`.
   - **Projects:** responsive 1/2/3-col grid; card = gradient cover, title, pitch, tags, status badge (Live/Building/Concept), Demo/GitHub/Case Study links. Modal deferred to Phase 2 — card links go straight to URLs.
   - **Articles:** chronological list grouped by source, source badge + title + 2-line excerpt + date + read-time + external link. Filter bar deferred to Phase 2.
   - **Hype Songs:** playful card grid (slightly looser type, accent flourishes) — album art slot, title, artist, "why this song" note, Spotify/YouTube/Apple Music icon links.
   - **Quotes:** editorial layout with Fraunces pull-quotes, attribution, optional context, and a "Copy quote" button (uses `navigator.clipboard` + toast confirmation). Theme filter chips deferred to Phase 2.

5. **Global polish + acceptance gates.** Footer (© + last-updated + stack credit), custom 404 with personality, OG + Twitter meta in `index.html`. Verify: renders cleanly at 375 / 768 / 1280; keyboard-only nav works; theme persists; zero `console.error`; all external links use `target="_blank" rel="noopener noreferrer"`. JSON-LD Person schema, dynamic OG image, case-study modals, article filters, and Spotify hover-preview are explicitly **Phase 2** and not included here.

**Waiting on you:** paste the filled-in NAME / ROLE / TAGLINE / BIO / SOCIALS / PROJECTS / ARTICLE SOURCES / HYPE SONGS / QUOTES block, then approve and I'll implement.
