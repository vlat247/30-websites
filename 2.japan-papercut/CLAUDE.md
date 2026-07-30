# Japan Tales — Project Knowledge File

## Project Overview
**Name:** Japan Tales  
**Theme:** Paper-cutout / diorama aesthetic inspired by traditional Japanese art  
**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion

## Design Aesthetic
- **Style:** Paper-cutout / kirie / diorama — flat layered shapes with soft drop-shadows suggesting depth
- **Palette:** Muted traditional Japanese tones — indigo, soft vermillion, washi cream, desaturated gold, blush pink
- **No vivid/neon colors** — everything soft, slightly desaturated, like aged paper or gouache
- **Animations:** Slow, gentle, cinematic — nothing jarring or fast
- **Typography:** Elegant serif or Japanese brush-style fonts (Noto Serif SC, IM Fell English, Shippori Mincho)

## Color Tokens (approximate)
| Name         | Hex       | Use                        |
|--------------|-----------|----------------------------|
| Sky Blue     | #2c5f7c   | Hero gradient top          |
| Evening Peach| #d99b6c   | Hero gradient bottom       |
| Blush Pink   | #e8b4a0   | Sakura section bg          |
| Washi Cream  | #f5ede0   | General backgrounds        |
| Indigo       | #3d4f6e   | Text, accents              |
| Vermillion   | #c0513a   | Accent details             |
| Muted Gold   | #c9a84c   | Decorative details         |
| Sakura Pink  | #f0b8c8   | Petal color                |

## File Structure
```
app/
├── layout.tsx            — Root layout, fonts, metadata
├── page.tsx              — Page assembly: Hero + SakuraScroll + Placeholder
├── globals.css           — Tailwind base + custom CSS vars + keyframes
components/
├── Hero.tsx              — Full-viewport hero with gradient, clouds, title, illustration placeholders
├── SakuraScroll.tsx      — Scroll-triggered sakura petal rain + branch placeholder
└── PlaceholderSection.tsx — Scaffolded section (TODO: content TBD)
```

## Key Animation Patterns
- **Clouds (Hero):** Framer Motion `animate` with `x` keyframes loop — slow left-to-right drift, 3 layers at different speeds/opacity
- **Sakura Petals (SakuraScroll):** `useScroll` + `useTransform` to trigger fall as section enters viewport; petals rotate and sway with staggered delays
- **All motion:** transitions 2s+ duration, ease "easeInOut" — nothing jarring or fast

## Illustration Placeholders
User will supply their own SVG paper-craft illustrations. Placeholder divs are marked with comments:
- `{/* PLACEHOLDER: paper-craft tiger illustration */}`
- `{/* PLACEHOLDER: paper-craft tree illustration */}`
- `{/* PLACEHOLDER: sakura branch illustration */}`

## Dependencies Installed
- `framer-motion` — animation + scroll logic
- `tailwindcss@^4` — utility styling (uses `@import "tailwindcss"` NOT old directives)
- Google Fonts via next/font: **IM Fell English SC** (display), **Noto Serif** (body)

## ⚠️ Known Font Compatibility Issue
`Shippori_Mincho` from `next/font/google` **does NOT work** with Next.js 16 Turbopack.  
Error: `Module not found: Can't resolve '@vercel/turbopack-next/internal/font/google/font'`  
**Solution:** Use `Noto_Serif` as a drop-in replacement — similar classical feel, fully compatible.

## Dev Server
```bash
cd 2.japan-papercut
npm run dev   # http://localhost:3000
```

## Notes for AI Agent
- Tailwind CSS v4 uses `@import "tailwindcss"` — NOT `@tailwind base/components/utilities`
- Custom theme tokens live in `@theme { }` blocks inside CSS, not in tailwind.config.js
- `"use client"` is required on any component using hooks (useScroll, useState, etc.) or Framer Motion
- All scroll animation uses Framer Motion `useScroll` + `useTransform` — not IntersectionObserver
- Components live in `/components/` (root level), not inside `/app/`
- Each component is a separate file for easy future extension
