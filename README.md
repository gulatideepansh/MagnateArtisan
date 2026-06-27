# Magnate Artisan AI Try-On Website

Luxury bespoke catalog website for Magnate Artisan. This is not an ecommerce checkout: there is no cart, payment, inventory, or account system. Ordering is WhatsApp-first.

## What Is Included

- Next.js App Router, TypeScript, Tailwind CSS, and lucide-react.
- Full local catalog import: 138 products and 1,558 images copied into `public/catalog`.
- Downloaded site media copied into `public/site-media`, including 3 videos and WebP/image assets.
- Collection routes, product pages, AI try-on page, and bespoke inquiry page.
- SVG embroidery/measurement-line motion with reduced-motion support.
- Leffa API proxy at `/api/try-on`.
- 276-job AI stock-model manifest: two luxury editorial outputs per product.

## Commands

```bash
npm run dev
npm run build
npm run lint
npm run catalog:generate
npm run ai:batch
```

## Environment

Create `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=61400000000
LEFFA_API_URL=http://localhost:7860/try-on
```

Replace the WhatsApp number with the real business number.

## Leffa Batch Requirements

Leffa needs a person image plus a garment image. Before running `npm run ai:batch`, add:

- `public/ai-assets/model-references/male-01.jpg`
- `public/ai-assets/model-references/male-02.jpg`
- `public/ai-assets/model-references/female-01.jpg`
- `public/ai-assets/model-references/female-02.jpg`

Then start the Leffa service separately and set `LEFFA_API_URL` to its `/try-on` endpoint. The batch runner saves generated outputs to each product folder under `public/catalog/<product>/ai_model_outputs/` and updates `src/data/ai-generation-manifest.json`.

## Important Notes

- Real product photography remains the source of truth.
- AI previews should be labeled as visual references only.
- The current machine has an RTX 4080 Laptop GPU with roughly 12 GB VRAM, so generation should run sequentially unless testing proves concurrency is stable.
