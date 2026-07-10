# BassamWorks Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the bundled `bassam-portfolio.html` artifact into the existing React app as its new multi-page "BassamWorks" visual identity, reusing the existing data layer and keeping dark mode.

**Architecture:** New design tokens + fonts land in `src/index.css` (Tailwind v4 `@theme`). Focused presentational components under `src/components/bw/` are composed into the five route pages. The existing react-query data layer (`fetchProjects`/`fetchTestimonials`) feeds Work and Testimonials. Motion is delivered through the existing GSAP/Lenis/magnetic hooks plus three new hooks (`useSplitReveal`, `useTilt`, `useParallax`), all reduced-motion aware.

**Tech Stack:** React 19, Vite 7, Tailwind v4 (`@tailwindcss/vite`), react-router-dom v7, @tanstack/react-query v5, GSAP + @gsap/react, `lucide-react`, and two new deps: `lenis`, `split-type`.

## Global Constraints

- **No unit-test framework exists** (no vitest/jest). Each task's verification = `npm run lint` clean + `npm run build` succeeds + visual check of the affected route(s) in `npm run dev`, in **both** light and dark themes. Never fabricate a test runner.
- **Dark mode is authoritative via `data-theme`** on `<html>` (set by `ThemeContext`). Every component must style both themes with `dark:` utilities (which work only after Task 2's `@custom-variant`). Never hardcode a single-theme color where a token exists.
- **Reduced motion:** every animation must no-op or degrade under `@media (prefers-reduced-motion: reduce)` / `matchMedia`. The intro loader must never trap the user; the custom cursor must not replace the native cursor on touch devices.
- **Design source of truth:** exact markup, inline styles, colors, and copy live in `docs/design-reference/bassamworks-markup.html` (extracted from `bassam-portfolio.html`). Translate sections from there; do not invent copy. Section markers: `<!-- NAV -->`, `<!-- HERO -->`, `<!-- MARQUEE strip -->`, `<!-- ABOUT -->`, `<!-- SKILLS -->`, `<!-- WORK -->`, `<!-- EXPERIENCE -->`, `<!-- TESTIMONIALS -->`, `<!-- CONTACT -->`, `<!-- FOOTER -->`. Animation JS is at the bottom `<script type="text/x-dc">` block.
- **Accessibility:** decorative elements (blobs, marquee, cursor) get `aria-hidden="true"`; keep `SkipToContent`; preserve `:focus-visible` outlines.
- **Commit** after each task with a `feat:`/`chore:`/`refactor:` message + the Co-Authored-By trailer used in this repo.
- **Brand palette:** cream `#F1EADD`, ink `#16130D`, blue `#4D7FF0`, yellow `#F4BE2C`, pink `#F49AB0`, green `#2FA86A`. Fonts: Archivo (display), Manrope (body), JetBrains Mono (labels).

---

## Phase 0 — Foundation

### Task 1: Dependencies & repo housekeeping

**Files:**
- Modify: `package.json` (dependencies)
- Modify: `.gitignore`

**Interfaces:**
- Produces: `lenis` and `split-type` importable app-wide.

- [ ] **Step 1: Install the two runtime deps**

```bash
npm install lenis split-type
```

- [ ] **Step 2: Confirm they resolve**

```bash
node -e "require.resolve('lenis'); require.resolve('split-type'); console.log('ok')"
```
Expected: `ok`

- [ ] **Step 3: Ignore the design artifact**

Append to `.gitignore`:
```
# Design source artifact (reference only, not part of the build)
bassam-portfolio.html
```

- [ ] **Step 4: Verify build still works**

Run: `npm run build`
Expected: build completes, no errors.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json .gitignore
git commit -m "chore: add lenis + split-type, ignore design artifact"
```

---

### Task 2: Design tokens, fonts & dark-mode variant

**Files:**
- Modify: `src/index.css` (the `@theme` block + add `@custom-variant` + base body styles)
- Modify: `src/config/branding.js`

**Interfaces:**
- Produces: Tailwind utilities `bg-bw-cream`, `text-bw-ink`, `text-bw-blue`, `bg-bw-yellow`, `text-bw-pink`, `text-bw-green` (and all color variants), `font-display`, `font-body`, `font-mono`; working `dark:` variant keyed to `data-theme="dark"`; page background switching cream↔ink by theme.

- [ ] **Step 1: Add font imports + tokens + dark variant to `src/index.css`**

At the very top of `src/index.css`, before `@import "tailwindcss";`, add the Google Fonts import; then add the custom variant and extend `@theme`:

```css
@import url("https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap");
@import "tailwindcss";

@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));

@theme {
  /* BassamWorks palette */
  --color-bw-cream: #f1eadd;
  --color-bw-ink: #16130d;
  --color-bw-blue: #4d7ff0;
  --color-bw-blue-soft: #6f9bf2;
  --color-bw-blue-deep: #2f5fcc;
  --color-bw-yellow: #f4be2c;
  --color-bw-yellow-soft: #fbd24e;
  --color-bw-yellow-deep: #9a7400;
  --color-bw-pink: #f49ab0;
  --color-bw-green: #2fa86a;
  --color-bw-muted: #4a4538;
  --color-bw-muted-2: #5a5446;
  --color-bw-muted-3: #8a8474;

  --font-display: "Archivo", "Segoe UI", sans-serif;
  --font-body: "Manrope", "Segoe UI", sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

Keep the existing `@theme` keys already in the file (spacing, shadows, radii) — merge, do not delete. If both an old and new `--font-display`/`--font-body` exist, the new BassamWorks values win (replace the old Inter values).

- [ ] **Step 2: Set the themed page background**

Replace the existing `body { background: ... }` and `[data-theme="dark"] body { ... }` rules in `src/index.css` with the BassamWorks equivalents:

```css
body {
  font-family: var(--font-body);
  min-height: 100dvh;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  background: var(--color-bw-cream);
  color: var(--color-bw-ink);
  transition: background 300ms ease, color 300ms ease;
}

[data-theme="dark"] body {
  background: var(--color-bw-ink);
  color: var(--color-bw-cream);
}
```

Leave `::selection`, `.skip-link`, `:focus-visible`, and the reduced-motion block intact (they already work).

- [ ] **Step 3: Bump experience in `src/config/branding.js`**

Change `experience: 2` to `experience: 3`.

- [ ] **Step 4: Smoke-test the tokens**

Temporarily add `<div className="font-display text-bw-blue dark:text-bw-yellow">token check</div>` to `src/pages/Home.jsx`, run `npm run dev`, confirm the text is Archivo + blue in light, yellow in dark (toggle via the navbar button), then remove the temp div.

- [ ] **Step 5: Verify**

Run: `npm run lint && npm run build`
Expected: both pass.

- [ ] **Step 6: Commit**

```bash
git add src/index.css src/config/branding.js
git commit -m "feat: add BassamWorks design tokens, fonts, and data-theme dark variant"
```

---

### Task 3: Shared keyframes & primitive CSS

**Files:**
- Create: `src/styles/bassamworks.css`
- Modify: `src/App.jsx` (import the new stylesheet)

**Interfaces:**
- Produces: CSS classes `bw-blob`, `bw-marquee-track`, `bw-cursor-ring`, `bw-cursor-dot`, `bw-hide-touch`, `bw-loader`, `bw-loader-line`, and keyframes `bw-blob`, `bw-marq`. Consumed by Tasks 4–7.

- [ ] **Step 1: Create `src/styles/bassamworks.css`**

Port the keyframes and non-Tailwind-friendly rules from the design (blob float, marquee scroll, cursor, loader). Use:

```css
@keyframes bw-blob {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(0, 24px, 0) scale(1.04); }
}
@keyframes bw-marq {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.bw-blob { position: absolute; border-radius: 9999px; pointer-events: none; will-change: transform; animation: bw-blob 16s ease-in-out infinite; }
.bw-marquee-track { display: flex; width: max-content; animation: bw-marq 32s linear infinite; will-change: transform; }

.bw-cursor-ring { position: fixed; top: 0; left: 0; width: 40px; height: 40px; border: 1.5px solid rgba(22,19,13,0.55); border-radius: 50%; transform: translate(-50%,-50%); pointer-events: none; z-index: 9998; mix-blend-mode: difference; transition: width .25s ease, height .25s ease, background .25s ease, border-color .25s ease; will-change: transform; }
.bw-cursor-dot { position: fixed; top: 0; left: 0; width: 6px; height: 6px; background: #16130d; border-radius: 50%; transform: translate(-50%,-50%); pointer-events: none; z-index: 9999; will-change: transform; }

.bw-loader { position: fixed; inset: 0; z-index: 10000; background: #16130d; color: #f1eadd; display: flex; align-items: flex-end; justify-content: space-between; padding: 7vw 6vw; overflow: hidden; }
.bw-loader-line { display: block; }

@media (hover: none) { .bw-hide-touch { display: none !important; } }
@media (prefers-reduced-motion: reduce) {
  .bw-blob, .bw-marquee-track { animation: none !important; }
}
```

- [ ] **Step 2: Import it in `src/App.jsx`**

Add `import "./styles/bassamworks.css";` alongside the existing `import "./index.css";` / `import "./styles/index.css";` lines.

- [ ] **Step 3: Verify**

Run: `npm run lint && npm run build`
Expected: both pass.

- [ ] **Step 4: Commit**

```bash
git add src/styles/bassamworks.css src/App.jsx
git commit -m "feat: add BassamWorks keyframes and primitive CSS"
```

---

## Phase 1 — Background, motion primitives & chrome

> Reference markup for every component below: `docs/design-reference/bassamworks-markup.html`. Translate the inline-styled HTML into JSX using the Task-2 tokens (`bg-bw-*`, `font-*`) instead of hardcoded hex where a token exists; keep exact spacing/radii/shadows. Add `dark:` variants per the palette table. Use the `frontend-design:frontend-design` skill for polish decisions.

### Task 4: `AmbientBlobs` + `useParallax`

**Files:**
- Create: `src/hooks/useParallax.js`
- Create: `src/components/bw/AmbientBlobs.jsx`

**Interfaces:**
- Produces:
  - `useParallax(selector = "[data-parallax]")` — GSAP ScrollTrigger scrub that translates matched elements by `yPercent` = `data-speed * 100`; no-op under reduced motion; cleans up on unmount.
  - `<AmbientBlobs />` — fixed/absolute `aria-hidden` layer with 2–3 `.bw-blob` gradient orbs (blue, yellow, blend) matching the design's ambient blobs.

- [ ] **Step 1: Write `useParallax`**

```js
import { useEffect } from "react";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "../utils/gsapConfig";

export default function useParallax(selector = "[data-parallax]") {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    ensureGsapPlugins();
    const els = gsap.utils.toArray(selector);
    const tweens = els.map((el) => {
      const speed = parseFloat(el.getAttribute("data-speed")) || 0.15;
      return gsap.to(el, {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    });
    return () => {
      tweens.forEach((t) => { t.scrollTrigger?.kill(); t.kill(); });
      ScrollTrigger.refresh();
    };
  }, [selector]);
}
```

- [ ] **Step 2: Write `AmbientBlobs.jsx`**

Translate the `<!-- ambient blobs -->` block. Use `.bw-blob` + inline gradient/position styles from the reference, `data-parallax`/`data-speed` attributes, wrap in an `aria-hidden` container. Call `useParallax()` inside it. Blobs use blue (`#6F9BF2→#4D7FF0`) and yellow (`#FBD24E→#F4BE2C`) radial gradients; reduce opacity in dark mode via a `dark:opacity-*` class or a `data-theme` rule.

- [ ] **Step 3: Verify**

Temporarily render `<AmbientBlobs />` at the top of `src/pages/Home.jsx`; `npm run dev`; confirm blobs paint, drift, and parallax on scroll; toggle dark mode; then leave it in place (Home will keep it) or remove if Layout will own it (see Task 10). Run `npm run lint && npm run build`.

- [ ] **Step 4: Commit**

```bash
git add src/hooks/useParallax.js src/components/bw/AmbientBlobs.jsx
git commit -m "feat: add AmbientBlobs background with parallax hook"
```

---

### Task 5: `MarqueeStrip`

**Files:**
- Create: `src/components/bw/MarqueeStrip.jsx`

**Interfaces:**
- Consumes: `.bw-marquee-track` (Task 3).
- Produces: `<MarqueeStrip items={string[]} />` — `aria-hidden` infinite marquee; defaults to `["React","Laravel","TypeScript","Tailwind","GSAP","MySQL","REST APIs","Stripe"]`; duplicates the list twice for a seamless `-50%` loop; blue/yellow bullet separators.

- [ ] **Step 1: Write the component** from the `<!-- MARQUEE strip -->` reference; token colors; top/bottom hairline borders; `font-display` uppercase.
- [ ] **Step 2: Verify** — drop into Home temporarily, confirm seamless loop + reduced-motion stop; `npm run lint && npm run build`.
- [ ] **Step 3: Commit**

```bash
git add src/components/bw/MarqueeStrip.jsx
git commit -m "feat: add MarqueeStrip"
```

---

### Task 6: `CustomCursor`

**Files:**
- Create: `src/components/bw/CustomCursor.jsx`

**Interfaces:**
- Consumes: `.bw-cursor-ring`, `.bw-cursor-dot` (Task 3), GSAP.
- Produces: `<CustomCursor />` — renders nothing on touch (`matchMedia("(hover: none)")`) or reduced motion; otherwise a lerped ring + instant dot following the pointer, ring grows on hover of `a, button, .magnetic, [data-cursor]`. Cleans up all listeners/rAF on unmount.

- [ ] **Step 1: Write the component**, porting `initCursor()` from the reference `<script>` into a React `useEffect`. Guard `window`; early-return the render when disabled; append listeners to `document`; cancel `requestAnimationFrame` and remove listeners in cleanup.
- [ ] **Step 2: Verify** — mount in Layout temporarily (or Home); confirm ring/dot track pointer, grow on buttons, vanish on touch emulation and reduced motion; `npm run lint && npm run build`.
- [ ] **Step 3: Commit**

```bash
git add src/components/bw/CustomCursor.jsx
git commit -m "feat: add custom magnetic cursor"
```

---

### Task 7: `IntroLoader`

**Files:**
- Create: `src/components/bw/IntroLoader.jsx`
- Reference: `src/hooks/useInitialLoader.js` (existing), `src/components/loaders/FullPageLoader.jsx` (existing, to be superseded visually)

**Interfaces:**
- Consumes: `.bw-loader`, `.bw-loader-line` (Task 3), GSAP, `useInitialLoader()`.
- Produces: `<IntroLoader />` — first-load overlay showing `BASSAM` / `WORKS` line reveal + a `0→100` counter, then slides up and unmounts. Under reduced motion, shows briefly and removes immediately. Never blocks interaction beyond a hard 4.2s safety timeout.

- [ ] **Step 1: Write the component**, porting `runLoader()` timeline (line `yPercent` reveal, counter tween, slide-up) into a GSAP timeline inside `useEffect`; hide/unmount on complete; add the 4.2s safety `setTimeout`; honor reduced motion.
- [ ] **Step 2: Verify** — render at Layout root temporarily; reload `npm run dev`; confirm the intro plays once then reveals the page; force reduced motion and confirm no trap; `npm run lint && npm run build`.
- [ ] **Step 3: Commit**

```bash
git add src/components/bw/IntroLoader.jsx
git commit -m "feat: add BassamWorks intro loader"
```

---

### Task 8: `BwNavbar`

**Files:**
- Create: `src/components/bw/BwNavbar.jsx`
- Reference: `src/components/layouts/Navbar.jsx` (existing — for `useTheme` toggle + router `Link` pattern)

**Interfaces:**
- Consumes: `useTheme()` (`isDark`, `toggleTheme`), react-router `Link`.
- Produces: `<BwNavbar />` — fixed glass pill nav: `B` logo mark + `BASSAM` `WORKS` wordmark (blue "WORKS"), center links **Home `/`, About `/about`, Work `/work`, Skills `/skills`, Contact `/contact`**, theme-toggle button (Sun/Moon from `lucide-react`), and a "Let's build →" CTA `Link` to `/contact`. `.magnetic` on the logo + CTA. Dark variants for all surfaces.

- [ ] **Step 1: Write the component** from `<!-- NAV -->`, but replace `<a href="#...">` anchors with router `<Link to="/...">` (multi-page, not anchor scroll), and wire the existing `useTheme` toggle.
- [ ] **Step 2: Verify** — see Task 10 (mounted via Layout). Standalone: `npm run lint && npm run build`.
- [ ] **Step 3: Commit**

```bash
git add src/components/bw/BwNavbar.jsx
git commit -m "feat: add BassamWorks navbar"
```

---

### Task 9: `BwFooter`

**Files:**
- Create: `src/components/bw/BwFooter.jsx`

**Interfaces:**
- Produces: `<BwFooter />` — logo mark + wordmark on the left, `© 2026 · Built with React, Laravel & GSAP` mono line on the right; top hairline border; dark variants.

- [ ] **Step 1: Write the component** from `<!-- FOOTER -->`.
- [ ] **Step 2: Verify** — `npm run lint && npm run build`.
- [ ] **Step 3: Commit**

```bash
git add src/components/bw/BwFooter.jsx
git commit -m "feat: add BassamWorks footer"
```

---

### Task 10: Wire the new layout shell

**Files:**
- Modify: `src/components/layouts/index.jsx`

**Interfaces:**
- Consumes: `BwNavbar`, `BwFooter`, `CustomCursor`, `IntroLoader`, `AmbientBlobs`, `useLenisScroll` (existing).
- Produces: the app shell renders BassamWorks chrome + one app-wide Lenis instance + ambient background behind `{children}`.

- [ ] **Step 1: Rewrite `Layout`** to render `<CustomCursor />`, `<IntroLoader />`, `<AmbientBlobs />` (as the fixed background layer), `<BwNavbar />`, `{children}`, `<BwFooter />`, and keep `ScrollProgress`/`ScrollToTopButton`/`SkipToContent` if desired. Call `useLenisScroll()` once here. Remove imports of the old `Navbar`, `Menu`, `Footer`. Ensure the content sits above the ambient layer (`relative z-…`).

```jsx
import useLenisScroll from "../../hooks/useLenisScroll";
import BwNavbar from "../bw/BwNavbar";
import BwFooter from "../bw/BwFooter";
import CustomCursor from "../bw/CustomCursor";
import IntroLoader from "../bw/IntroLoader";
import AmbientBlobs from "../bw/AmbientBlobs";
import ScrollProgress from "../common/ui/ScrollProgress";
import ScrollToTopButton from "../common/ui/ScrollToTopButton";

export default function Layout({ children }) {
  useLenisScroll();
  return (
    <div className="relative min-h-dvh">
      <IntroLoader />
      <CustomCursor />
      <AmbientBlobs />
      <ScrollProgress />
      <BwNavbar />
      <main className="relative z-[2]">{children}</main>
      <ScrollToTopButton />
      <BwFooter />
    </div>
  );
}
```

- [ ] **Step 2: Remove the temporary `<AmbientBlobs/>`** you left in Home during Task 4 (Layout now owns it).
- [ ] **Step 3: Verify** — `npm run dev`; every existing route still renders inside the new shell (pages still show old design — fine); nav links route correctly; Lenis smooth scroll works; only one intro plays; toggle dark. `npm run lint && npm run build`.
- [ ] **Step 4: Commit**

```bash
git add src/components/layouts/index.jsx src/pages/Home.jsx
git commit -m "feat: wire BassamWorks layout shell (nav, footer, cursor, loader, blobs, lenis)"
```

---

## Phase 2 — Sections

### Task 11: `SectionHeading`, `useSplitReveal`, `useTilt`, `HeroSection`

**Files:**
- Create: `src/hooks/useSplitReveal.js`
- Create: `src/hooks/useTilt.js`
- Create: `src/components/bw/SectionHeading.jsx`
- Create: `src/components/bw/HeroSection.jsx`
- Reference: `src/config/branding.js` (`BRAND`)

**Interfaces:**
- Produces:
  - `useSplitReveal(ref, { immediate = false, delay = 0 })` — splits the element's text into words via `SplitType`, reveals with a staggered opacity/translate transition; `immediate` reveals on mount (hero), otherwise on scroll via `ScrollTrigger`; CSS-only fallback + reduced-motion instant show.
  - `useTilt(ref)` — pointer-driven `rotateX/Y` on the element + depth translate on `[data-tilt-layer]` children; desktop/hover only; resets on leave.
  - `<SectionHeading index="01" label="About" title={…} />` — the mono `( 01 ) — About` eyebrow + `font-display` uppercase heading (accepts a node for colored spans); used by Tasks 12–17.
  - `<HeroSection />` — full hero: availability badge, split-reveal headline (`Hi, I'm / Bassam / Full-Stack / Engineer` with blue+yellow lines), intro paragraph, magnetic CTAs (`View my work` → `/work`, `Contact me →` → `/contact`), three stat pills (`3+ years` from `BRAND.experience`, `React · Laravel`, `12+ shipped`), and the 3D-tilt glass mockup.

- [ ] **Step 1: Write `useSplitReveal.js`** — port `setupSplit()` from the reference `<script>`; guard reduced motion (instant show) and missing `SplitType`.
- [ ] **Step 2: Write `useTilt.js`** — port `initTilt()`; guard `hover: none`.
- [ ] **Step 3: Write `SectionHeading.jsx`** — small presentational component.
- [ ] **Step 4: Write `HeroSection.jsx`** from `<!-- HERO -->`; router `Link`s for CTAs; `.magnetic` class; `data-reveal` on supporting blocks; attach `useSplitReveal` (immediate) to the `<h1>` and `useTilt` to the mockup; pull `experience` from `BRAND`.
- [ ] **Step 5: Verify** — render `<HeroSection/>` in Home; `npm run dev`; confirm headline split-reveal, magnetic buttons, tilt, stat pills; dark mode; reduced motion; `npm run lint && npm run build`.
- [ ] **Step 6: Commit**

```bash
git add src/hooks/useSplitReveal.js src/hooks/useTilt.js src/components/bw/SectionHeading.jsx src/components/bw/HeroSection.jsx
git commit -m "feat: add hero section with split-reveal and tilt hooks"
```

---

### Task 12: `WorkGrid` (data-driven)

**Files:**
- Create: `src/components/bw/WorkGrid.jsx`
- Reference: `src/components/sections/ProjectShowcase.jsx` (existing query wiring), `src/api/portfolio.js` (`fetchProjects`), `src/data/fallbackProjects.js` (shape)

**Interfaces:**
- Consumes: `useQuery({ queryKey: ["projects"], queryFn: fetchProjects })`; project shape `{ id, name, company, description, techStack[], category, completedAt, image, integrations[], liveUrl, githubUrl, featured, span }`.
- Produces: `<WorkGrid limit?={number} showHeading?={boolean} />` — the design's Work grid (featured span-2 card + standard cards) styled per `<!-- WORK -->`, driven by the query; `limit` truncates for the Home preview; loading skeletons; falls back to `fallbackProjects` automatically (already in `fetchProjects`).

- [ ] **Step 1: Write `WorkGrid.jsx`** — map query data to the design's card markup; use `project.featured`/`project.span` to choose the featured/standard layout; keep skeletons from `ProjectShowcase`; token colors + dark variants; tech chips from `techStack`.
- [ ] **Step 2: Verify** — render in Home with `limit={3}`; `npm run dev`; confirm cards render from fallback data (no backend), skeletons flash, dark mode; `npm run lint && npm run build`.
- [ ] **Step 3: Commit**

```bash
git add src/components/bw/WorkGrid.jsx
git commit -m "feat: add data-driven WorkGrid"
```

---

### Task 13: `SkillsGrid` + skills data

**Files:**
- Create: `src/data/skills.js`
- Create: `src/components/bw/SkillsGrid.jsx`
- Reference: `src/pages/Skills.jsx` (existing hardcoded groups)

**Interfaces:**
- Produces:
  - `skillGroups` — array of `{ key, label, tone: "blue"|"yellow"|"ink", title, items: string[] }` (Frontend/React Ecosystem, Backend/Laravel & APIs, Tooling/Integrations — copy from `<!-- SKILLS -->`).
  - `<SkillsGrid />` — 3-card grid with `data-reveal-stagger`, mono `tone`-colored category label, `font-display` title, chip tags tinted by tone; dark variants.

- [ ] **Step 1: Write `src/data/skills.js`** with the three groups + exact chips from the reference.
- [ ] **Step 2: Write `SkillsGrid.jsx`** consuming that data.
- [ ] **Step 3: Verify** — render in Skills page; `npm run dev`; dark mode; `npm run lint && npm run build`.
- [ ] **Step 4: Commit**

```bash
git add src/data/skills.js src/components/bw/SkillsGrid.jsx
git commit -m "feat: add SkillsGrid with skills data"
```

---

### Task 14: `ExperienceTimeline` + experience data

**Files:**
- Create: `src/data/experience.js`
- Create: `src/components/bw/ExperienceTimeline.jsx`

**Interfaces:**
- Consumes: GSAP ScrollTrigger (for the fill line).
- Produces:
  - `experienceEntries` — `[{ period, title, description, tone }]` (2024–Present Zaap; 2022–2024 97 Solutions; 2021–2022 Frontend) from `<!-- EXPERIENCE -->`.
  - `<ExperienceTimeline />` — vertical rail with a scroll-scrubbed gradient fill (`data-timeline` / `data-timeline-fill` per `setupTimeline()`), dotted milestones, `data-reveal` entries; reduced-motion safe; dark variants.

- [ ] **Step 1: Write `src/data/experience.js`**.
- [ ] **Step 2: Write `ExperienceTimeline.jsx`**; port `setupTimeline()` fill into a small `useEffect` (or reuse `useScrollReveal` for entries + a dedicated tween for the fill).
- [ ] **Step 3: Verify** — render in About; `npm run dev`; confirm the fill line grows with scroll; dark mode; `npm run lint && npm run build`.
- [ ] **Step 4: Commit**

```bash
git add src/data/experience.js src/components/bw/ExperienceTimeline.jsx
git commit -m "feat: add ExperienceTimeline with scroll-fill"
```

---

### Task 15: `TestimonialsGrid` (data-driven)

**Files:**
- Create: `src/components/bw/TestimonialsGrid.jsx`
- Reference: `src/components/sections/TestimonialsSection.jsx`, `src/api/portfolio.js` (`fetchTestimonials`), `src/data/fallbackTestimonials.js`

**Interfaces:**
- Consumes: `useQuery({ queryKey: ["testimonials"], queryFn: fetchTestimonials })`; shape `{ id, name, role, company, text, avatar }`.
- Produces: `<TestimonialsGrid />` — 2-col quote cards per `<!-- TESTIMONIALS -->` (big quote glyph, blockquote, name + `role · company` mono caption), `data-reveal-stagger`, dark variants.

- [ ] **Step 1: Write `TestimonialsGrid.jsx`** from the query data.
- [ ] **Step 2: Verify** — render in About; confirm 4 fallback quotes render; dark mode; `npm run lint && npm run build`.
- [ ] **Step 3: Commit**

```bash
git add src/components/bw/TestimonialsGrid.jsx
git commit -m "feat: add data-driven TestimonialsGrid"
```

---

### Task 16: `AboutIntro`

**Files:**
- Create: `src/components/bw/AboutIntro.jsx`

**Interfaces:**
- Consumes: `useSplitReveal` (Task 11).
- Produces: `<AboutIntro />` — `SectionHeading` `( 01 ) — About`, a split-words `<h2>` ("I'm Bassam — a full-stack developer with **3+ years** …" with blue/yellow spans) + two paragraphs + "Let's work together →" CTA `Link` to `/contact`, per `<!-- ABOUT -->`.

- [ ] **Step 1: Write `AboutIntro.jsx`**; attach `useSplitReveal` (scroll) to the heading.
- [ ] **Step 2: Verify** — render in About; dark mode; `npm run lint && npm run build`.
- [ ] **Step 3: Commit**

```bash
git add src/components/bw/AboutIntro.jsx
git commit -m "feat: add AboutIntro section"
```

---

### Task 17: `ContactCTA`

**Files:**
- Create: `src/components/bw/ContactCTA.jsx`

**Interfaces:**
- Consumes: `useSplitReveal` (Task 11).
- Produces: `<ContactCTA />` — the dark rounded panel from `<!-- CONTACT -->`: `SectionHeading` `( 06 ) — Contact`, split-lines `Let's build / something.` headline, subcopy, `Email me →` (`mailto:`) + `GitHub` magnetic buttons, mono meta row. It is dark by default in both themes (design intent) but must remain legible; parallax accent blobs inside are `aria-hidden`.

- [ ] **Step 1: Write `ContactCTA.jsx`**.
- [ ] **Step 2: Verify** — render in Home + Contact; dark mode; `npm run lint && npm run build`.
- [ ] **Step 3: Commit**

```bash
git add src/components/bw/ContactCTA.jsx
git commit -m "feat: add ContactCTA panel"
```

---

## Phase 3 — Pages & routing

### Task 18: Home page

**Files:**
- Modify: `src/pages/Home.jsx`

**Interfaces:**
- Consumes: `HeroSection`, `MarqueeStrip`, `WorkGrid`, `ContactCTA`, `SeoManager`.
- Produces: `/` = `<SeoManager .../>` + `HeroSection` + `MarqueeStrip` + `WorkGrid limit={3}` (with a "View all work →" `Link` to `/work`) + `ContactCTA`.

- [ ] **Step 1: Rewrite `Home.jsx`** — remove all old `hsmkrt-*` markup and the temp components from earlier tasks; compose the four sections; keep the existing `SeoManager` block (update copy if needed). Remove unused imports.
- [ ] **Step 2: Verify** — `npm run dev` at `/`; full hero→marquee→work→CTA renders; links route; dark mode; reduced motion; `npm run lint && npm run build`.
- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: rebuild Home page with BassamWorks sections"
```

---

### Task 19: About page

**Files:**
- Modify: `src/pages/About.jsx`

**Interfaces:**
- Consumes: `AboutIntro`, `ExperienceTimeline`, `TestimonialsGrid`, `SeoManager`.
- Produces: `/about` = SEO + `AboutIntro` + `ExperienceTimeline` + `TestimonialsGrid`.

- [ ] **Step 1: Rewrite `About.jsx`** — remove old `hsmkrt` markup + old `useScrollReveal` selectors; compose the three sections; keep `SeoManager`.
- [ ] **Step 2: Verify** — `/about` renders all three; timeline fill; testimonials from data; dark mode; `npm run lint && npm run build`.
- [ ] **Step 3: Commit**

```bash
git add src/pages/About.jsx
git commit -m "feat: rebuild About page"
```

---

### Task 20: Skills page

**Files:**
- Modify: `src/pages/Skills.jsx`

**Interfaces:**
- Consumes: `SkillsGrid`, `SectionHeading`, `SeoManager`.
- Produces: `/skills` = SEO + `SectionHeading` `( 02 ) — Skills & Stack` + heading "The tools I build with." + `SkillsGrid` + an experience-snapshot block.

- [ ] **Step 1: Rewrite `Skills.jsx`** — remove old markup; compose heading + `SkillsGrid`; the previous "experience snapshot" cards can be reworked in BassamWorks style or dropped (keep it minimal, token-styled).
- [ ] **Step 2: Verify** — `/skills` renders; dark mode; `npm run lint && npm run build`.
- [ ] **Step 3: Commit**

```bash
git add src/pages/Skills.jsx
git commit -m "feat: rebuild Skills page"
```

---

### Task 21: Work page + route

**Files:**
- Create: `src/pages/Work.jsx`
- Modify: `src/routes/appRoutes.jsx`

**Interfaces:**
- Consumes: `WorkGrid`, `MarqueeStrip`, `SectionHeading`, `SeoManager`.
- Produces: `/work` route rendering the full `WorkGrid` (no `limit`) + heading `( 03 ) — Selected Work` + `MarqueeStrip`.

- [ ] **Step 1: Create `Work.jsx`**.
- [ ] **Step 2: Register the route** — import `Work` and add `{ path: "/work", element: <Work /> }` to `publicRoutes` in `src/routes/appRoutes.jsx`.
- [ ] **Step 3: Verify** — navigate to `/work` via the navbar; full grid renders; dark mode; `npm run lint && npm run build`.
- [ ] **Step 4: Commit**

```bash
git add src/pages/Work.jsx src/routes/appRoutes.jsx
git commit -m "feat: add /work page and route"
```

---

### Task 22: Contact page (re-skin, keep form)

**Files:**
- Modify: `src/pages/Contact.jsx`

**Interfaces:**
- Consumes: `ContactCTA`, existing form state/`submitContact`/`useToast` logic (unchanged), `SeoManager`.
- Produces: `/contact` = SEO + `ContactCTA` hero + the existing functional form, re-skinned with BassamWorks tokens (cream/ink surfaces, `bw-blue` focus ring, `bw-yellow` submit button), dark variants intact.

- [ ] **Step 1: Re-skin the JSX** — keep all handlers (`onChange`, `onSubmit`, validation, toast, 15s throttle) exactly; swap wrapper/hero markup for `ContactCTA` + a token-styled form card; update input/button classes to tokens.
- [ ] **Step 2: Verify** — `/contact`; submit empty → validation errors; submit valid → toast (API will 404 → error toast is acceptable, confirms wiring); dark mode; `npm run lint && npm run build`.
- [ ] **Step 3: Commit**

```bash
git add src/pages/Contact.jsx
git commit -m "feat: re-skin Contact page in BassamWorks style"
```

---

## Phase 4 — Cleanup & full verification

### Task 23: Retire old design imports & final verification

**Files:**
- Modify: any remaining importer of the old design (`src/App.jsx` if it references `FullPageLoader` no longer needed; verify no page imports old `hsmkrt` components).
- Reference (leave on disk, just unimported): `src/components/layouts/Navbar.jsx`, `Footer.jsx`, `HeroSection.jsx`, `ProjectsSection.jsx`, `HeroScene3D.jsx`, `HeroSceneController.js`, `menu/`, `components/layouts/about/*`, `components/sections/*` (superseded by `bw/`).

**Interfaces:**
- Produces: a build with no dead imports and no reference to uninstalled `three`.

- [ ] **Step 1: Grep for stragglers**

```bash
grep -rn "hsmkrt" src/ ; grep -rn "HeroScene3D\|from \"three\"\|from 'three'" src/
```
Expected: no matches in rendered pages/layout (old files may still contain them but must not be imported by the live tree).

- [ ] **Step 2: Confirm `three` is not imported by anything reachable** from `main.jsx` → `App.jsx` → routes/layout. If `HeroScene3D` (which imports `three`) is unimported, the build won't touch it. Verify with `npm run build` (Vite only bundles reachable modules).

- [ ] **Step 3: Full-site verification**

Run `npm run dev` and walk every route in **both** themes:
- `/` — intro loader once, hero split+tilt, marquee, work preview (3), CTA
- `/about` — about intro, timeline fill, testimonials
- `/skills` — skills grid
- `/work` — full work grid
- `/contact` — CTA + working form validation
Check: no console errors, Lenis smooth scroll, custom cursor on desktop, reduced-motion degrades cleanly, nav links + CTA route correctly, dark toggle persists across routes (localStorage).

- [ ] **Step 4: Final gates**

Run: `npm run lint && npm run build`
Expected: both clean.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: retire old hsmkrt design from the live tree"
```

---

## Self-Review (author checklist — completed)

**Spec coverage:** design system → Task 2/3; components → Tasks 4–17; routes → Tasks 18–22 (+`/work` Task 21); data reuse → Tasks 12/15; new data → Tasks 13/14; dark mode → Task 2 variant + per-component; animations (lenis/split/tilt/parallax/magnetic/loader/cursor) → Tasks 1,4,6,7,10,11; cleanup → Task 23; branding bump → Task 2; contact form kept → Task 22; gitignore artifact → Task 1. ✅ All spec sections mapped.

**Placeholder scan:** no TBD/TODO; visual components intentionally reference `docs/design-reference/bassamworks-markup.html` for exact markup (the design is a known artifact, not net-new logic) while every task states its explicit interface, tokens, data shape, dark-mode and reduced-motion requirements, and verification. Full code is given for all net-new logic (hooks, CSS, tokens, data, layout, routing).

**Type/name consistency:** component/hook names are stable across tasks — `useParallax`, `useSplitReveal`, `useTilt`, `AmbientBlobs`, `MarqueeStrip`, `CustomCursor`, `IntroLoader`, `BwNavbar`, `BwFooter`, `SectionHeading`, `HeroSection`, `WorkGrid`, `SkillsGrid`, `ExperienceTimeline`, `TestimonialsGrid`, `AboutIntro`, `ContactCTA`. Data shapes match the existing fallback files. ✅
