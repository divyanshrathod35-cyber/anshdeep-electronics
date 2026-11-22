# ANSHDEEP ELECTRONICS — Award-Caliber Design Benchmark

Researched: 22 November 2026. This is an internal evidence-led design/QA comparison, **not** an award nomination, award win, CSSDA score, Awwwards score, or independent certification.

## Independently recognized reference projects

| Reference | Verified award record | Jury score and practical learning |
|---|---|---|
| GenCell, REJOUICE | CSS Design Awards **Website of the Day**, 22 January 2024. https://cssdesignawards.com/sites/gencell/44831/ | Judges: **8.48/10** (CSSDA). High-impact display type, cinematic hardware, product storytelling and navigation economy. |
| Global Electronics, KEMARI | CSS Design Awards **Special Kudos**, 3 September 2023. https://cssdesignawards.com/sites/global-electronics/44197/ | Judges: **7.71/10** (CSSDA). Immersive composition and distinctive industrial-brand identity. |
| Fratelli Simonetti | CSS Design Awards Website of the Day entry, 21 November 2026. https://www.cssdesignawards.com/ | Reference for structured editorial grids, readable retail UX; verify the official project page before relying on an individual score. |

**Important:** Those judge scores apply only to the respective reference sites, not ANSHDEEP. They cannot be transferred to this project.

## Usability evidence (not a design competition)

- Baymard Institute, *Product Listing Page UX Best Practices*, 20 August 2026: https://baymard.com/blog/product-listing-page-plp-ux — filtering, scanning and useful next actions.
- Baymard, *Product Lists & Filtering*: https://baymard.com/research/ecommerce-product-lists — avoid hidden filters and unexplained product states.
- Mobbin: https://mobbin.com/ — pattern and screen journey analysis; no paid Mobbin screen access was available; do not claim a full private-library audit.
- 21st.dev: https://21st.dev/community/components/explore/ecommerce-components — publicly visible commerce-component patterns; no preset component was copied into this project.
- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/ — focus indicators, keyboard operation, accessible names and reasonable pointer targets.
- Google Core Web Vitals: https://web.dev/articles/vitals — good field thresholds at p75: LCP <=2.5 seconds, INP <=200ms and CLS <=0.1.

## Design hypothesis and differentiation

A local electronics retailer competes on guidance, trust and accountability, not only discounts. Use one editorial hero and one clear enquiry CTA. An interactive AC/TV choice should deliver a useful answer before asking users to communicate. Category imagery remains context-only, never "live stock." No fabricated numbers, offers, product models or testimonials.

The signature interaction is a **product-led hero selector** that swaps real editorial imagery and context, followed by deterministic buying guidance. A restrained scroll narrative reveals editorial sections but never hijacks scrolling and respects reduced-motion preferences.

## Design system

| Attribute | Implementation |
|---|---|
| Paper / canvas | `#FFFFFF` / `#F5F6F8` |
| Primary editorial contrast | `#0B0F19` |
| Text and explanatory copy | `#0F172A` / `#475569` |
| One dominant action accent | `#0052FF` |
| Display / reading / numerical | Space Grotesk / DM Sans / JetBrains Mono |
| Spacing tokens | 4px and 8px system |
| Structure | 12-column asymmetric layouts, multi-scale mobile reflow |
| Interaction | 150–220ms actionable-control transitions; restrained section entrances |
| Keyboard and motion | Visible focus, dialogue focus return, reduced-motion opt-out |

## Evaluation rubric (internal, not an independent award score)

| Category | Weight | Evidence gate |
|---|---:|---|
| Design / art direction | 40% | Original editorial composition, professional product photography, responsive alignment, visual consistency, refined motion; human review required. |
| UX / accessibility | 30% | Task completion on mobile, shortlisting, enquiries, keyboard/assistive tech, automated axe, comprehensible forms and accurate local information. |
| Creativity / interaction | 20% | One high-value distinctive interaction, narrative choreography, no gimmicks, performance-safe motion. |
| Content / trust | 10% | Correct locations and contact, honest offers/availability, high-quality local photography, source provenance, owner-approved copy. |

**No numeric self-assessment is presented as an award judge score.** The CI pipeline now produces Lighthouse lab results (not field measurements), axe WCAG scans, responsive screenshots and executable tests. Review the exact run and artifacts for scores and failures instead of assuming a passing score.

## Evidence and launch gates

The following must be completed before seeking competitive design recognition:
1. Replace licensed editorial photos with real owner-approved showroom and product photography; obtain logo/brand rights.
2. Verify store phone, WhatsApp Business, hours, locations, real SKU/stock/pricing and financing/service promises.
3. Run and inspect the Lighthouse mobile and desktop benchmark JSON; do not claim real-user INP from a lab report. Measure p75 field Web Vitals after authorized launch.
4. Fix all automated WCAG A/AA violations and complete human screen-reader, mobile/keyboard and focus-order checks.
5. Carry out a human visual audit against real winners with 375px, 834px, 1440px screenshots. Verify brand individuality; avoid copying copyrighted visuals.
6. Establish meaningful enquiry conversion events after privacy review and track only real consented business metrics.
7. Submit to Awwwards/CSSDA only after authorization and completion; do not claim nomination/award prior to a public record.
