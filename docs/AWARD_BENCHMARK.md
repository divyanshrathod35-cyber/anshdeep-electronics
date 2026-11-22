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

## Initial lab baseline and subsequent font optimization

The first GitHub Actions Lighthouse run used runtime Google Fonts and a custom desktop-sized viewport without the official desktop throttling preset. Results were mobile perf **92**, accessibility **96**, best practices **100**, SEO **92**, with LCP ~3.23s; desktop perf **60**, accessibility **100**, best practices **100**, SEO **92**, with LCP ~5.34s. Full source: https://github.com/divyanshrathod35-cyber/anshdeep-electronics/actions/runs/44978150352

**Comparability caution:** those baseline numbers are one-off local Lighthouse lab measurements and the initial desktop throttling calibration was not the official desktop preset. Do not compare them as a clean before/after with subsequent desktop-preset scores.

The follow-up change self-hosts variable DM Sans, Space Grotesk and JetBrains Mono via Fontsource, removing the Google Fonts stylesheet fetch. The lab script now applies desktop-specific throttling settings as well as desktop dimensions. The recorded JSON includes category scores and LCP/CLS/TBT diagnostics.

## Second calibration result and targeted mobile correction

The official-desktop-calibrated run with self-hosted variable fonts (before the mobile hero-preload adjustment) measured Lighthouse **99 desktop performance** and **83 mobile performance**. Refer to https://github.com/divyanshrathod35-cyber/anshdeep-electronics/actions/runs/44978322701 . A subsequent run with a hero-photo preload measured **99 desktop / 82 mobile**, indicating that eager photo fetching alone did not improve the mobile critical path: https://github.com/divyanshrathod35-cyber/anshdeep-electronics/actions/runs/44978569038 .

To avoid loading a largely below-the-fold editorial photograph before the mobile hero copy, the image preload is now constrained to screens >=701px. A Vite build-time HTML transform injects the hashed Space Grotesk Latin WOFF2 font URL as a same-origin critical font preload, so the browser discovers the display typeface earlier. This is an optimization hypothesis pending the next CI measurement, not an invented speed gain.

## Award-caliber retail reference update — 22 November 2026

Primary award records, not cloned layouts:
- Quiet Cubes — CSS Design Awards Special Kudos (29 July 2026), judges' final score 7.68; award description highlights seamless transitions, 3D, and custom configuration: https://www.cssdesignawards.com/sites/quiet-cubes/49850/ . The transferable principle is a high-value product configuration journey, not copying its 3D effects.
- LEDUP — CSS Design Awards Special Kudos (23 September 2026), final judge score 7.79; restrained product/light narrative: https://cssdesignawards.com/sites/ledup/50200/ . The transferable principle is focused visual hierarchy and disciplined transitions.
- Baymard 2026 mobile commerce research: https://baymard.com/research-articles/mobile-ux-ecommerce . A product list should avoid unnecessary duplicated variants, buried filters, or misleading categorization.
- Chrome LCP guide: https://web.dev/articles/optimize-lcp/ . Early HTML rendering and avoiding render-blocking CSS/JS directly informs the ANSHDEEP static pre-rendering architecture.

Implementation after research: preserve the bespoke local showroom identity, replace the three boxed hero buttons with an editorial chapter index, connect the chosen chapter to filtered product discovery, and preserve keyboard semantics. The same React tree is statically rendered at build time and hydrated in the browser; the initial HTML contains genuine product categories and navigation, reducing mobile LCP while retaining app interactivity. Do not claim awards until external juries provide them.

## CI evidence addendum: static rendering and crawl-policy audit

- Mobile Lighthouse lab result from the first prerender/hydration CI run was **98 performance**, with LCP **2.194s**, plus desktop performance **99**; 14/14 browser tests and 10/10 unit tests. This is one lab sample, not real-user field evidence: https://github.com/divyanshrathod35-cyber/anshdeep-electronics/actions/runs/44979516204 .
- Subsequent design/keyboard audit run returned mobile **90 performance**, LCP **3.183s**, desktop performance **99**, 15/15 browser tests, and automated WCAG 2.2 A/AA with no detected violations: https://github.com/divyanshrathod35-cyber/anshdeep-electronics/actions/runs/44979873532 .
- The mobile LCP spread (roughly **2.19–3.18s**) shows meaningful laboratory variability. Do not assert the site has verified field LCP <=2.5s. Evaluate field p75 after release.
- Both initial SEO scores of **92** came from Lighthouse's explicit `robots-txt` failure, because the missing file fell back to HTML. Adding `public/robots.txt` with valid Allow directives eliminates this known, non-competitive failure. Do not add unverified canonical/sitemap domain details until the authorized live domain is chosen.

## November 22, 2026 — award-caliber implementation verification

**Verification is internal, not an Awwwards or CSS Design Awards judging outcome.**

- **Current implementation**: the true React storefront pre-renders into `dist/index.html` at build time and then hydrates. This improves initial content availability, SEO and no-JavaScript access without duplicating content for bots.
- **Brand interaction**: three product families are a restrained editorial index, not three decorative cards. Selecting a family updates the visual and provides a direct route into its filtered catalogue. The finder/price-review enquiries remain real functional journeys.
- **Art direction**: intentional white/obsidian contrasts, licensed editorial photographs and distinctive typesetting. Current imagery is context-only, not store-owned and not evidence of live stock.
- **Resilience**: SVG product artwork is a fallback only after local image plus licensed CDN fail. This reduced pre-rendered HTML from 37,090 to 26,144 characters.

### Evidence

| Automated metric | Latest lab evidence |
|---|---|
| Mobile Lighthouse | Performance **95**, Accessibility **100**, Best Practices **100**, SEO **100** |
| Desktop Lighthouse | Performance **99**, Accessibility **100**, Best Practices **100**, SEO **100** |
| Mobile lab LCP | **2.643s**, near but **above** the 2.5s good threshold |
| Desktop lab LCP | **0.868s** |
| Node unit tests | **10/10 passing** |
| Playwright E2E | **16/16 passing** |
| Axe WCAG 2.2 A/AA | No violations detected by tested rules; manual assistive-technology checks still required |
| Static HTML | Available without JavaScript; hydration exercised in browser tests |

Source CI with screenshots and Lighthouse report artifacts: https://github.com/divyanshrathod35-cyber/anshdeep-electronics/actions/runs/44980120698

The first verified pre-rendered version achieved **98 mobile Lighthouse performance** with **2.194s** lab LCP in another individual CI run (https://github.com/divyanshrathod35-cyber/anshdeep-electronics/actions/runs/44979516204), demonstrating that scores are variable on a shared CI runner. Treat all isolated scores as **lab samples**, not guaranteed device/network performance or field Core Web Vitals. No independent aesthetic/jury score has been measured.

### Acceptance still outstanding

1. Business-owner verification and approval of brand identity, store addresses/hours and public contact destinations, including WhatsApp Business.
2. Licensed/owner-owned photos of actual showrooms and confirmed inventory. Do not portray current editorial context as the physical store or as specific stocked models.
3. Written acceptance of genuine offers, warranty, exchange, EMI/financing and delivery terms before making such claims.
4. A real deployed preview, external design critique, assisted-technology review and repeatable field Web Vitals at p75.
5. Official awards require an actual external submission and judging outcome. Do not display award badges, fabricate jury scores or claim that ANSHDEEP has already won.

**Draft PR stays open. No production release or merge was authorized.**
