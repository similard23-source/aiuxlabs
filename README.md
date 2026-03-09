# Astro SEO Landing System

Production-oriented Astro scaffold for SEO landing pages with selective React islands and Supabase Auth.

## Stack
- Astro + TypeScript
- Tailwind CSS
- React islands
- Supabase JS client
- Vercel-compatible Node adapter

## Local setup
1. Install deps: `npm install`
2. Create `.env` with:
   - `PUBLIC_SUPABASE_URL`
   - `PUBLIC_SUPABASE_ANON_KEY`
3. Start dev server: `npm run dev`

## Build and preview
- `npm run build`
- `npm run preview`

## Deployment (Vercel)
1. Import repository into Vercel.
2. Add env vars in Vercel project settings.
3. Deploy with default Astro build command.

## Routes
- `/`
- `/ai-roi-calculator`
- `/shopify-roas-calculator`
- `/sop-generator`
- `/signup`
- `/login`
- `/confirm`
- `/dashboard` (protected)
- `/privacy`
- `/terms`

## Add new landing
1. Add content object in `src/content/landings/*.ts`.
2. Create page in `src/pages/` using shared sections.
3. Set metadata through `MainLayout` props and optional JSON-LD via `JsonLd`.

## Auth notes
- Signup/login forms use Supabase Auth.
- Client sets `sb-access-token` cookie from session token.
- Middleware checks cookie for `/dashboard` and redirects unauthenticated users to `/login`.

## SEO
- Metadata handled by `src/components/seo/SEOHead.astro`
- JSON-LD helper in `src/components/seo/JsonLd.astro`
- Sitemap via `@astrojs/sitemap`
- `public/robots.txt` included
