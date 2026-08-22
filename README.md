# Md Alamgir Hossen — Portfolio

> **Senior WordPress & Next.js Developer** · 9+ years · Dhaka, Bangladesh 🇧🇩
> From pixel-perfect WordPress themes to headless Next.js platforms — fast, scalable websites that grow businesses.

![Next.js](https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP%203.13-88CE02?style=for-the-badge&logo=greensock&logoColor=black)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)

A single-page portfolio built with the modern stack I use for client work: **Next.js 16 (App Router + Turbopack)**, **Tailwind CSS v4** (CSS-first design tokens), **GSAP** and a fully custom animation system. The whole page prerenders as static HTML — 90+ PageSpeed out of the box.

---

## ✨ Highlights

| Section | What's inside |
|---|---|
| **Hero** | Full-bleed **Sphere Wall** — a 96-tile concave 3D wall carrying live project screenshots, worldwide clients & locations — with my photo at the center of an **orbiting ring of brand-colored tech icons**, a CSS-driven rotating role line, and animated stat counters |
| **About** | Career story with a year-by-year journey timeline and a terminal-style card |
| **Services** | 8 service cards — custom themes (ACF/FSE), plugins & Gutenberg blocks, Elementor widgets, WooCommerce/Shopify, headless WordPress, full-stack apps, SEO, AI-accelerated delivery |
| **Stacks** | Animated **WordPress → WPGraphQL → Next.js** headless pipeline + the modern stacks I ship (Payload + PostgreSQL, Sanity, Prismic, Shopify Liquid) |
| **Signature Builds** | Case-study cards: church donation plugin suite, Ahrefs-style SEO audit engine on the WordPress API, Google Maps service finder, booking platforms |
| **Projects** | Filterable grid of real client sites (UK 🇬🇧 & Bangladesh 🇧🇩) with auto-generated live screenshots |
| **Skill Matrix** | 60+ skills across WordPress engineering, frontend, backend, commerce/CMS, SEO and DevOps |
| **Experience** | 9-year timeline with a scroll-drawn progress line + education & certifications |
| **Testimonials** | Auto-scrolling client feedback marquee |
| **Contact** | Rotating **Card Globe** of client faces behind the CTA, direct email/WhatsApp actions |

## 🎬 Animation system

- **animos-inspired section entrances** — Grid Reveal (Services), Orbit Carousel (Signature Builds), Pop Grid (Skill Matrix), Cover Ring (Education), each implemented as pure **CSS transitions** driven by a triple-redundant in-view trigger (`IntersectionObserver` + scroll listener + interval fallback) in [`lib/viewAnim.ts`](lib/viewAnim.ts)
- **GSAP** (ScrollTrigger + SplitText) for the hero intro timeline, split-text headings, scroll-scrubbed effects and the 3D globes' spin + back-face fading
- **Lenis** smooth scrolling, magnetic buttons, custom cursor, marquees — with `prefers-reduced-motion` respected throughout
- Heavy per-frame work (Sphere Wall / Card Globe tickers) pauses automatically when off-screen

## 🚀 Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build — fully static
```

## 📁 Project structure

```
app/           layout (fonts, SEO metadata), page, design tokens (globals.css), favicon
components/    one component per section + shared pieces (Hero, SphereWall, OrbitRing, …)
lib/           data.ts (ALL site content), gsapSetup.ts, icons.ts, viewAnim.ts
public/        profile photo
```

## ✏️ Editing content

Every word on the site lives in **[`lib/data.ts`](lib/data.ts)** — profile & contact info, services, skills, projects, experience, education, clients and testimonials. Change the data, the UI follows.

> Note: the testimonials shipped in this repo are **demo placeholders** (marked in the code) — swap them for real client feedback before going live.

Design tokens (brand color `#22BF76`, fonts, surfaces) are in the `@theme` block of [`app/globals.css`](app/globals.css).

## 👤 Author

**Md Alamgir Hossen** — Sr. WordPress Developer (Team Lead) @ OMH, UK

- 📧 [alamgirwordpress1@gmail.com](mailto:alamgirwordpress1@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/wordpress-developer-alan/)
- 🐙 [GitHub](https://github.com/mdalamgirhosen)
- 📍 Dhaka, Bangladesh

---

Built with Next.js 16 + Tailwind v4 + GSAP · Deployed on Vercel
