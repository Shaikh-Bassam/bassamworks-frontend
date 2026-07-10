# BassamWorks Portfolio Redesign — Design Spec

**Date:** 2026-07-10
**Branch:** `feature/bassamworks-redesign` (based off `copilot-1`)
**Status:** Approved design → ready for implementation plan

## 1. Problem & Goal

A new design was delivered as a self-contained **bundled HTML artifact** (`bassam-portfolio.html`, ~480 KB). Its real markup lives inside a `script[type="__bundler/template"]` tag — a single-page "BassamWorks" scrolling portfolio built with GSAP + Lenis + SplitType and a distinct cream/ink visual identity.

The existing React app is already a multi-page portfolio (Home / About / Skills / Contact) with its own older "hsmkrt" design, a data layer (react-query + axios + fallback data), theming, SEO, and a layout shell.

**Goal:** Convert the new BassamWorks design into the existing React app as its new visual identity, split across multiple routes ("multi-page"), reusing the existing data layer, and keeping dark-mode support.

## 2. Decisions (locked)

| Decision | Choice |
|---|---|
| Site model | **Multi-page** — new design becomes the app's look, split into routes |
| Content source | **Reuse existing data layer** (react-query + API + fallback); fallback content already matches the design |
| Dark mode | **Keep** — build dark variants (design's Contact section supplies the dark palette) |
| Route mapping | Home rich + 5 routes (see §5) |
| Branch | `feature/bassamworks-redesign` off `copilot-1` (local `main` is stale/missing files) |
| `BRAND.experience` | `2` → `3` (design says "3+ years") |
| Contact form | Keep existing functional form; re-skin in BassamWorks style |

## 3. Design System

New design tokens added to `src/index.css` `@theme` block:

| Token | Light | Dark |
|---|---|---|
| `--color-bw-cream` (page bg) | `#F1EADD` | `#16130D` |
| `--color-bw-ink` (text) | `#16130D` | `#F1EADD` |
| `--color-bw-blue` | `#4D7FF0` | `#4D7FF0` |
| `--color-bw-yellow` | `#F4BE2C` | `#F4BE2C` |
| `--color-bw-pink` | `#F49AB0` | `#F49AB0` |
| `--color-bw-green` | `#2FA86A` | `#2FA86A` |

Supporting tints from the design: `#6F9BF2`, `#2F5FCC`, `#FBD24E`, `#9A7400`, `#C99400`, muted text `#4A4538 / #5A5446 / #8A8474`, glass surface `rgba(255,255,255,0.5)` (light) / `rgba(255,255,255,0.06)` (dark).

**Fonts** (via Google Fonts `@import` in `src/index.css`):
- `Archivo` — display headings (weights 800, 900)
- `Manrope` — body text
- `JetBrains Mono` — eyebrows / labels / mono accents

Registered as `--font-display`, `--font-body`, `--font-mono` in `@theme`.

**Dark-mode wiring fix:** `ThemeContext` sets `data-theme="dark"` on `<html>`, but `tailwind.config.js` uses `darkMode: "class"`, so existing `dark:` utilities never trigger. Fix by adding a Tailwind v4 custom variant to `src/index.css`:

```css
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));
```

This makes every `dark:` utility (existing and new) respond to the `data-theme` attribute. `tailwind.config.js darkMode` is left as-is or aligned; the CSS variant is authoritative in v4.

## 4. Component Architecture

New components live under `src/components/bw/` (grouped, focused units). Each: single purpose, styled with the new tokens, dark-aware, animation via shared hooks.

**Layout-level:**
- `BwNavbar` — fixed glass pill nav; logo `BASSAM WORKS`; router `Link`s (Home/About/Work/Skills/Contact); theme toggle (`useTheme`); "Let's build →" CTA → `/contact`. Replaces existing `Navbar`.
- `BwFooter` — logo mark + copyright line. Replaces existing `Footer`.
- `IntroLoader` — one-time intro (`BASSAM`/`WORKS` reveal + `0→100` counter), first load only, wired through existing `useInitialLoader`. Respects reduced motion (skip/instant).
- `CustomCursor` — ring + dot follower, magnetic grow on interactive elements. Desktop + `hover: hover` only; disabled on touch and reduced motion.
- `AmbientBlobs` — reusable radial-gradient background blobs with parallax; `aria-hidden`.
- `MarqueeStrip` — infinite horizontal marquee of tech keywords; `aria-hidden`.

**Sections:**
- `HeroSection` — split-text headline, availability badge, CTAs (magnetic), stat pills, 3D-tilt glass mockup card. Reads `BRAND`.
- `AboutIntro` — split-words heading + two paragraphs + CTA.
- `SkillsGrid` — 3 cards (Frontend / Backend / Tooling) with tag chips; data from `src/data/skills.js`.
- `WorkGrid` — projects grid (featured + standard, `span` layout) consuming `fetchProjects` via react-query; loading skeletons + error/fallback handled by the query. Re-skins the existing `ProjectShowcase`.
- `ExperienceTimeline` — vertical timeline with scroll-driven fill line; data from `src/data/experience.js`.
- `TestimonialsGrid` — 2-col quote cards consuming `fetchTestimonials` via react-query.
- `ContactCTA` — dark rounded panel: big "Let's build something.", email/GitHub buttons, meta row.

**Reuse as-is (logic) / re-skin (style):** `ProjectShowcase` & `TestimonialsSection` data wiring, `SeoManager`, `ToastProvider`, `SkipToContent`, `useInitialLoader`, `FullPageLoader` (replaced by `IntroLoader` visually).

## 5. Pages / Routes

`src/routes/appRoutes.jsx` gains a `/work` route:

| Route | Composition |
|---|---|
| `/` (Home) | `HeroSection` + `MarqueeStrip` + featured `WorkGrid` preview + `ContactCTA` banner |
| `/about` | `AboutIntro` + `ExperienceTimeline` + `TestimonialsGrid` |
| `/skills` | `SkillsGrid` + experience snapshot |
| `/work` | full `WorkGrid` (all projects) + `MarqueeStrip` |
| `/contact` | `ContactCTA` hero + existing functional contact form (re-skinned) |

Shared `AmbientBlobs` background rendered at layout or per-page shell.

## 6. Data

- Reuse `fetchProjects` / `fetchTestimonials` (`src/api/portfolio.js`) — fallback data already matches design content.
- Add `src/data/skills.js` — the three skill groups + chips (currently hardcoded inside `Skills.jsx`).
- Add `src/data/experience.js` — timeline entries (2024–Present Zaap, 2022–2024 97 Solutions, 2021–2022 Frontend).
- `src/config/branding.js`: `experience: 2 → 3`.

## 7. Animations

**New dependencies:** `lenis`, `split-type` (both currently imported by dead code / required by design; not yet installed).

- `useLenisScroll` (existing) — smooth scroll mounted once at app/layout level; anchor-link + reduced-motion aware.
- `useScrollReveal` (existing GSAP) — `[data-reveal]` fade-up reveals.
- `useMagneticHover` (existing) — `.magnetic` / `[data-magnetic]` buttons.
- `gsapConfig` (existing) — centralized plugin registration.
- **New** `useSplitReveal` — wraps `SplitType` for word/line reveal on headings, with CSS-transition fallback.
- **New** `useTilt` — pointer-driven 3D tilt for the hero mockup (desktop only).
- **New** `useParallax` — GSAP ScrollTrigger scrub parallax for blobs/decor.

All motion gated on `prefers-reduced-motion` and touch/hover detection where relevant.

## 8. Cleanup

Old "hsmkrt" design components stop being rendered (old `HeroSection`, `ProjectsSection`, `about/*` sub-components, `HeroScene3D`/`HeroSceneController`). They are **not deleted** in this pass — only unimported — to keep the diff reviewable. `three` stays uninstalled (its only importers become dead). A follow-up cleanup can remove them once the redesign is verified.

## 9. Git & Housekeeping

- Work on `feature/bassamworks-redesign`.
- `bassam-portfolio.html` stays as the design reference but is added to `.gitignore` so it does not clutter the repo or get bundled.
- Commit the design content data + tokens incrementally per implementation plan phase.

## 10. Risks / Notes

- **Lenis + GSAP ScrollTrigger** must share a ticker/update loop (existing `useLenisScroll` already wires `gsap.ticker`); ensure only one Lenis instance app-wide.
- **SSR/`window` guards** — `ThemeContext` already guards; new hooks must too (Vite CSR only, but keep guards for safety).
- **Reduced motion** — `IntroLoader` and `CustomCursor` must degrade gracefully (no trap behind loader; native cursor).
- **Contact section** — design shows only a CTA; we keep the richer functional form, so `/contact` combines the CTA hero + form.
- **Accessibility** — decorative blobs/marquee/cursor `aria-hidden`; keep `SkipToContent`; maintain focus-visible styling.
