# ANSHDEEP ELECTRONICS | Final release research and design architecture
Date: 22 November 2026
Release target: verified local electronics showroom website, Rajnandgaon, India.

## Global, source-linked benchmark

**CANCAN Furnishings — Awwwards nominee (2025)**: decisive editorial typography and image-led merchandising demonstrate how a physical retailer can tell a compelling story. Transfer the clarity and content hierarchy, never clone its branding or layout. https://www.awwwards.com/sites/cancan-furnishings

**LEDUP — CSS Design Awards Special Kudos, 23 Sep 2026**: deliberate one-idea visual anchoring is useful for a tech brand. ANSHDEEP takes restrained chapters and genuine category actions rather than high-cost decorative WebGL. https://cssdesignawards.com/sites/ledup/50200/

**Baymard Mobile E-Commerce UX Trends (2026)**: around three quarters of audited mobile commerce experiences still have mediocre usability. Our highest-impact fixes are applied-filter context, a single clear action, obvious product category results, sensible search and stable mobile orientation. https://baymard.com/research-articles/mobile-ux-ecommerce

**Baymard Product List & Filtering**: visible applied-filter summaries improve orientation; filter complexity without genuine SKU data creates misleading choices. This implementation shows real editorial categories and a live results count, not fake inventory. https://baymard.com/research/ecommerce-product-lists

**21st.dev Ecommerce Category Page**: a reference for removable filters, mobile filter sheets and empty-state clarity, not a drop-in template. Our category selector remains original, accessible and adapted to eight verified editorial category types. https://docs.21st.dev/%40mohammadshehadeh/components/ecommerce-04

**Mobbin**: shipped interaction-flow research is more reliable for designing accessible mobile navigation and enquiry states than decorative hero references. The target is a complete shopper journey from interest to advice to local contact. https://mobbin.com/

**W3C WCAG 2.2**: meet AA target-size minimum and design key touch actions around 44px+, with visible keyboard focus, accessible dialogs, live feedback and reduced-motion handling. https://www.w3.org/TR/WCAG22/

**Google Core Web Vitals**: track LCP/INP/CLS from real field traffic at p75. Lighthouse scores in CI are lab measurements and can fluctuate. https://developers.google.com/search/docs/appearance/core-web-vitals

**Government of India DPDP guidance (MeitY/PIB)**: privacy information should be clear, purpose-specific and easily found, with a genuine contact path. Phased commencement means this release is a technical disclosure draft, not a certification of legal compliance. https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190655

## Visual tokens and rationale

- Theme: original Obsidian `#0B0F19`, Porcelain `#F5F6F8`, Cobalt `#0052FF`. Legible dark-on-light supporting surfaces, not generic violet gradients, ornamental glow or decorative card strips.
- Typography: Space Grotesk variable for anchor headlines, DM Sans variable for readable product and body language, JetBrains Mono variable for editorial indices. All self-hosted, reduced to Latin WOFF2 subsets. Body 15–17px and primary tap targets 44–56px.
- Spacing: disciplined 4/8px rhythm, 12-column desktop product layout, single-column catalogue on narrow screens, asymmetric legal-hero and document body; layouts respond at 930px, 700px and 360px.
- Motion: restrained 180–400ms focus and entrance transitions; no scroll hijack, no gratuitous GPU scenes, reduced-motion compatible.
- UX anchor: one brand proposition + one primary quote CTA, mobile category swipes / typed search, applied-scope status + reset, helpful product advisory, then an explicit human showroom enquiry.
- Privacy: explain that the quote planner and price-review form prepare messages locally, with no silent form submission. Place links in footer, price-review form, and quote dialog. Do not add a cookie banner for tracking that does not exist.
- SEO: crawlable pre-rendered HTML for `/`, `/privacy/`, `/terms/`, `/accessibility/`, canonical URLs and sitemap.

## 10/10 release acceptance versus claims

- No design award, independent jury score or perfect mobile field Core Web Vitals has been established.
- Repository CI must pass typecheck, unit, build, Playwright, axe and Lighthouse diagnostics.
- Verify 320/360/375/390/430/700/768/834/1024/1440 widths, mobile gestures, no horizontal page overflow, reduced motion, keyboard and no-JS content.
- Verify production deployment's exact Git SHA and HTTP 200 for every path; a GitHub success does NOT publish a production build.
- Store owner must approve legal identity, email, privacy/data retention operations, two branches, actual hours, editorial photo licences, stock, product data, WhatsApp and finance wording.
- Final store-facing release is **conditional on owner signoff**. Current branch is a tested technical release candidate, not a legally approved sales platform.
