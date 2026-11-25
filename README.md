# M. Harish — Portfolio

An animated single-page portfolio built with **React 19**, **Vite** and **GSAP**, with smooth scrolling (Lenis) and a dedicated **Embedded Lab** section.

**Live:** https://magesharish002.github.io/portfolio/

The original static site is preserved untouched in [`legacy/`](./legacy) for reference.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

Node 18+ recommended.

---

## Edit your content (one file)

Almost everything lives in **`src/data/portfolio.js`**:

| Export | Controls |
| --- | --- |
| `profile` | Name, initials, roles, tagline, email, résumé URL, social links |
| `heroMeta` | Location, focus line, graduation year |
| `about` | About statement, status card, stat counters, education card |
| `skills` | Skill bars, "currently learning" chips, toolbox groups, marquee |
| `embedded` | Embedded intro, signal chain, stack chips, board cards, serial terminal log |
| `projectFilters` / `projects` | Filter pills and project cards |
| `experience` | Journey timeline entries |
| `contact` | Contact heading, copy, availability |
| `navLinks` | Navigation + mobile menu links |

Text wrapped in `**double asterisks**` inside `about.statement` is rendered in the accent colour.

---

## Replace the placeholders

Search `src/data/portfolio.js` for `your-` and `Your`:

- [x] `profile.email` — `magesharish002@gmail.com`
- [x] `profile.phone` / `profile.phoneHref` — `+91 90251 74963`
- [x] `profile.socials` GitHub — `@magesharish002`
- [ ] `profile.socials` LinkedIn — still a placeholder (`your-username`)
- [ ] `about.education.org` — your college name
- [ ] `projects[*].link` — real repository / live links (currently all point to the profile)
- [ ] Review the two embedded projects (`Smart Room Monitor`, `RFID Attendance Desk`) — keep, edit, or remove them
- [ ] `public/resume.pdf` — **placeholder PDF**; replace it with your real résumé (keep the filename) or update `profile.resumeUrl`
- [ ] `src/assets/photo1.jpeg` — replace with your photo (portrait crop works best; adjust `object-position` in `src/styles/hero.css` if needed)

Optional polish: update the page title and meta description in `index.html`.

---

## Project structure

```
index.html                 Vite entry + fonts + meta
public/
  favicon.svg
  resume.pdf               placeholder résumé
src/
  main.jsx                 React entry, imports styles
  App.jsx                  section composition, Lenis setup
  data/portfolio.js        ← all editable content
  lib/gsap.js              GSAP + ScrollTrigger setup, helpers
  assets/photo1.jpeg
  components/
    Preloader, Cursor, ScrollProgress, Navbar, Hero,
    About, Skills, EmbeddedLab, Projects, Experience,
    Contact, Footer
    + small helpers (Reveal, SplitLines, AnimatedText,
      SectionHead, Marquee, Magnetic, Icons, CircuitSvg,
      Terminal)
  styles/
    base.css               tokens, reset, shared UI, nav, footer
    hero.css               hero + portrait
    content.css            about + skills
    lab.css                embedded lab, circuit, terminal, boards
    work.css               projects, journey, contact
    responsive.css         breakpoints + reduced motion
legacy/index.html          original static site (preserved)
scripts/make-resume.cjs    regenerates the placeholder PDF
```

### Regenerate the placeholder résumé

```bash
node scripts/make-resume.cjs
```

---

## Interaction notes

- The **Embedded Lab** CTA ("See embedded builds") dispatches a `portfolio:filter` event with `"Embedded"` and scrolls to `#work`; the Projects grid listens and applies the filter.
- The contact section has no fake backend: it uses `mailto:` plus a copy-email button with a toast.
- Custom cursor, mouse-parallax and tilt effects are desktop-only and automatically disabled for `prefers-reduced-motion`.
- Preloader runs once per page load; scroll is locked until it finishes.

---

## Deploy

This repo deploys automatically to **GitHub Pages** via
[`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) on every push to `main`.

- Pages source must be **GitHub Actions** (Settings → Pages → Build and deployment).
- `vite.config.js` uses `base: "./"`, so the build works both at a domain root and at
  `/<repo>/` without changes.
- The workflow runs `npm ci`, `npm run build`, uploads `dist`, and deploys it.

Manual build: `npm run build` → publish the `dist/` folder to any static host
(Vercel, Netlify, Cloudflare Pages).

---

## Accessibility

- Skip link to `#main`
- Focus-visible outlines
- `aria-label`s on icon-only controls
- Mobile menu is `inert` when closed and closes on `Escape`
- Motion is reduced automatically for `prefers-reduced-motion: reduce`
