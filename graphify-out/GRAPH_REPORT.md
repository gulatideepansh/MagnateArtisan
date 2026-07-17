# Graph Report - magnate-artisan-ai  (2026-07-11)

## Corpus Check
- 72 files · ~59,628,776 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 327 nodes · 612 edges · 22 communities (17 shown, 5 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e48b8aa6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_staff-cms.ts|staff-cms.ts]]
- [[_COMMUNITY_page.tsx|page.tsx]]
- [[_COMMUNITY_dependencies|dependencies]]
- [[_COMMUNITY_catalog.ts|catalog.ts]]
- [[_COMMUNITY_staff-dashboard.tsx|staff-dashboard.tsx]]
- [[_COMMUNITY_compilerOptions|compilerOptions]]
- [[_COMMUNITY_generate-catalog.mjs|generate-catalog.mjs]]
- [[_COMMUNITY_page.tsx|page.tsx]]
- [[_COMMUNITY_page.tsx|page.tsx]]
- [[_COMMUNITY_run-leffa-batch.mjs|run-leffa-batch.mjs]]
- [[_COMMUNITY_Magnate Artisan AI Try-On Website|Magnate Artisan AI Try-On Website]]
- [[_COMMUNITY_layout.tsx|layout.tsx]]
- [[_COMMUNITY_route.ts|route.ts]]
- [[_COMMUNITY_AGENTS|AGENTS.md]]
- [[_COMMUNITY_eslint.config.mjs|eslint.config.mjs]]
- [[_COMMUNITY_next.config.ts|next.config.ts]]
- [[_COMMUNITY_postcss.config.mjs|postcss.config.mjs]]
- [[_COMMUNITY_staffCredentials|staffCredentials]]
- [[_COMMUNITY_achievement-counts.tsx|achievement-counts.tsx]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `cn()` - 12 edges
3. `requestHasStaffSession()` - 11 edges
4. `ProductPage()` - 10 edges
5. `SiteHeader()` - 10 edges
6. `formatMoney()` - 10 edges
7. `SiteFooter()` - 9 edges
8. `Product` - 9 edges
9. `ProductCard()` - 8 edges
10. `StitchOverlay()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `GET()` --calls--> `getTestimonials()`  [EXTRACTED]
  src/app/api/reviews/route.ts → src/lib/etsy-reviews.ts
- `POST()` --calls--> `staffCredentials()`  [EXTRACTED]
  src/app/api/staff/login/route.ts → src/lib/staff-auth.ts
- `ProductPage()` --calls--> `whatsappUrl()`  [EXTRACTED]
  src/app/products/[slug]/page.tsx → src/lib/whatsapp.ts
- `StaffPage()` --calls--> `hasStaffSession()`  [EXTRACTED]
  src/app/staff/page.tsx → src/lib/staff-auth.ts
- `TestimonialsPage()` --calls--> `getTestimonials()`  [EXTRACTED]
  src/app/testimonials/page.tsx → src/lib/etsy-reviews.ts

## Import Cycles
- None detected.

## Communities (22 total, 5 thin omitted)

### Community 0 - "staff-cms.ts"
Cohesion: 0.14
Nodes (26): GET(), PUT(), POST(), POST(), POST(), requestHasStaffSession(), collectionCounts(), ensureCmsState() (+18 more)

### Community 1 - "page.tsx"
Cohesion: 0.08
Nodes (30): GET(), steps, metadata, metadata, Home(), metadata, TestimonialsPage(), CollectionCard() (+22 more)

### Community 2 - "dependencies"
Cohesion: 0.07
Nodes (29): dependencies, class-variance-authority, clsx, jspdf, lucide-react, motion, next, react (+21 more)

### Community 3 - "catalog.ts"
Cohesion: 0.22
Nodes (11): BespokeInquiryForm(), initialState, InquiryState, ByoStudio(), choices, empty, steps, InquiryDetails (+3 more)

### Community 4 - "staff-dashboard.tsx"
Cohesion: 0.14
Nodes (21): createBlankInvoice(), createBlankProduct(), discountCampaignGroups, discountCampaignOptions, exportInvoicePdf(), garmentTypes, imageToDataUrl(), invoiceDateLabel() (+13 more)

### Community 5 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 6 - "generate-catalog.mjs"
Cohesion: 0.16
Nodes (18): appRoot, classifyCollection(), classifyGarmentType(), classifyModelGender(), cleanPrice(), collections, copyProductAssets(), copySiteMedia() (+10 more)

### Community 7 - "page.tsx"
Cohesion: 0.08
Nodes (23): CollectionDetailPage(), CollectionStackHero(), MeasurementGuides(), Stack(), StackProps, defaultProduct(), TryOnClient(), getCollection() (+15 more)

### Community 8 - "page.tsx"
Cohesion: 0.26
Nodes (14): editorialTitle(), includedPieces(), occasionTags(), ProductPage(), ProductCard(), ProductGallery(), ProductEditor(), getProduct() (+6 more)

### Community 9 - "run-leffa-batch.mjs"
Cohesion: 0.24
Nodes (10): appRoot, dataPath, fileToBlob(), main(), missingModelReferences(), modelRefs, outputIndex(), publicRoot (+2 more)

### Community 10 - "Magnate Artisan AI Try-On Website"
Cohesion: 0.29
Nodes (6): Commands, Environment, Important Notes, Leffa Batch Requirements, Magnate Artisan AI Try-On Website, What Is Included

### Community 11 - "layout.tsx"
Cohesion: 0.33
Nodes (4): cormorant, geistMono, geistSans, metadata

### Community 20 - "staffCredentials"
Cohesion: 0.28
Nodes (6): POST(), StaffLoginPage(), StaffPage(), StaffLoginForm(), hasStaffSession(), staffCredentials()

### Community 21 - "achievement-counts.tsx"
Cohesion: 0.13
Nodes (15): Achievement, AchievementCounts(), achievements, CountUpNumber(), customisationOptions, fabricTextureClasses, formatCount(), ButtonLink() (+7 more)

## Knowledge Gaps
- **101 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+96 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `achievement-counts.tsx` to `page.tsx`, `page.tsx`, `staff-dashboard.tsx`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Why does `Collection` connect `page.tsx` to `staff-cms.ts`, `page.tsx`, `staff-dashboard.tsx`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `Product` connect `page.tsx` to `page.tsx`, `staff-cms.ts`, `staff-dashboard.tsx`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _101 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `staff-cms.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1431451612903226 - nodes in this community are weakly interconnected._
- **Should `page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07957393483709273 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._