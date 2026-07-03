# Samiha Consulting — Portfolio Website

A premium, single-page portfolio site for a freelance AutoCAD drafting business,
positioned to win overflow drafting work from small architectural and engineering
practices in the UK.

## Tech stack
- **React 18 + Vite** — fast single-page app
- **Tailwind CSS** — bespoke dark/glassmorphism design system
- **Framer Motion** — entrance animations and transitions
- **Supabase** — contact form submissions + secure file uploads

## Brand system
| Token | Hex | Use |
|---|---|---|
| Deep Dark Slate | `#0B0F17` | Background |
| Electric Cyan | `#00E5FF` | Primary accent / CTAs |
| Volumetric Violet | `#7B61FF` | Soft lighting / gradients |
| Frosted Pearl | `#FFFFFF @ 10%` | Glass cards |
| Crisp Silver | `#E2E8F0` | Body text |

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the build
```

## Enable live contact form
1. Create a Supabase project.
2. Run the SQL in `.env.example` to create the `enquiries` table and a
   `client-uploads` storage bucket.
3. Copy `.env.example` to `.env` and fill in your URL + anon key.

Without env vars the form runs in **demo mode** (simulated success) so the site
works out of the box for presentations.

## Structure
```
src/
  components/
    BackgroundFX.jsx   # fixed volumetric lighting + grid
    Navbar.jsx          # glass sticky nav
    Hero.jsx            # marketing hook + animated wireframe viewport
    Services.jsx        # 3 service cards + value props
    Portfolio.jsx       # filterable gallery + lightbox modal
    Process.jsx         # 4-step workflow
    Pricing.jsx         # per-project / hourly / day rate
    CTABand.jsx         # the "reframe" conversion band
    Contact.jsx         # client portal form w/ drag-drop upload
    Wireframes.jsx      # glowing CAD drawing SVGs (the visual centerpiece)
    Footer.jsx
  lib/
    projects.js         # content + service data
    supabase.js         # submission client
```

The four portfolio drawings (Stanchion Mount, Kitchen Plan, Converge, Site Plan)
are rendered as **glowing cyan wireframe SVGs** on a dark viewport — the
"inverted CAD" aesthetic specified in the design document. Swap these for real
exported drawings by editing `src/components/Wireframes.jsx`.
