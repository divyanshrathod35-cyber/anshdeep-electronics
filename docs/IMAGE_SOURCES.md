# Editorial Photography Provenance Ledger

Reviewed: 22 November 2026. Scope: category imagery only, not representations of current ANSHDEEP store stock.

Pexels official licence: https://www.pexels.com/license/ (commercial website use permitted without required credit).
Rights limitation: trademark, recognizable property/person, and third-party endorsements are **not automatically cleared** merely because a photograph uses the Pexels licence. Avoid misleading identification of other retailers, stores, branded products, people or models. No ANSHDEEP watermark is applied to third-party photography, since the store did not create it.

| Category | Pexels ID | Photographer | Source |
|---|---|---|---|
| AC | 16914846 | Mak_ jp | https://www.pexels.com/photo/air-conditioner-at-the-buildings-corner-16914846/ |
| TV | 7587865 | Max Vakhtbovych | https://www.pexels.com/photo/a-spacious-living-room-with-couch-and-flat-screen-television-on-the-wall-7587865/ |
| Phones | 9403822 | Atharva Whaval | https://www.pexels.com/photo/close-up-shot-of-a-smartphone-9403822/ |
| Refrigerator | 8805274 | Mike Jones | https://www.pexels.com/photo/a-woman-opening-a-fridge-8805274/ |
| Washing machine | 8142971 | Max Vakhtbovych | https://www.pexels.com/photo/washing-machine-in-a-comfort-room-8142971/ |
| Water / kitchen | 8054764 | Annushka Ahuja | https://www.pexels.com/photo/mother-and-daughter-pouring-water-from-filter-jug-8054764/ |
| Audio | 15670390 | Norman Balian | https://www.pexels.com/photo/a-speaker-on-a-wooden-surface-15670390/ |
| Computing | 25636747 | Jakub Zerdzicki | https://www.pexels.com/photo/laptop-on-a-wooden-desk-25636747/ |

## Rendering decisions

- Browser receives `srcset` and responsive `sizes`; non-hero content is lazy-loaded and decoded asynchronously.
- Hero image is prioritized for loading, with dimensions declared to mitigate layout shift.
- When the Pexels CDN is blocked, on-error swaps to original local vector artwork, keeping the site functional.
- The visual is always editorial/contextual; it is not a representation of the precise model, stock condition, authorization or availability of ANSHDEEP.
- Explicit product imagery and SKU-specific descriptions must come from store owner approval and provenance evidence.
- Third-party CDN images create third-party network requests: obtain privacy review and self-host authorized optimized media for production.

## Source checklist for production

1. Shoot actual VIP Road / GE Road storefront; obtain owner release and confirm branch identity.
2. Photograph product stock with explicit model/serial visibility or obtain authorized press assets from applicable brands.
3. Confirm no photo implies a price, promotion, installation service or after-sales entitlement that the store cannot support.
4. Convert approved photos into AVIF/WebP with stable aspect ratios; test 3 breakpoints and image alt text.
5. Keep a manifest (photographer/source/license/date/rights) under version control.
