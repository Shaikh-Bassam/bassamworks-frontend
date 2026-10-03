# bassamWorks frontend

Single-page portfolio for Shaikh Bassam — React 19, Vite and Tailwind CSS 4.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
npm run lint
```

## Where to edit

| File | Content |
| --- | --- |
| `src/portfolio/Portfolio.jsx` | Hero, about copy, projects, contact section |
| `src/portfolio/Opening.jsx` | Intro counter, name reveal, year, timing |
| `src/portfolio/portfolio.css` | Layout, colours, responsive styles, keyframes |
| `src/portfolio/ui/dialog.jsx` | Radix dialog used for the About and project panels |
| `public/fonts/` | Six Caps + Space Grotesk (OFL licences alongside) |
| `public/images/` | Project images |
| `index.html` | Page title, description, favicon |

Intro timing lives in two places: the CSS animation delays and the `7240` / `8240` ms callbacks in `Opening.jsx`. Change them together.
