# ANSHDEEP ELECTRONICS — Design & Conversion Architecture

Status: research-led initial implementation, not approved for production launch.

## Sources reviewed (22 November 2026)

- Mobbin: https://mobbin.com/ — real application screens and flows, used for interaction research at publicly accessible depth. Paid screen-level research was not available.
- 21st.dev: https://21st.dev/community/components/explore/ecommerce-components — product presentation and interaction references; no third-party template imported.
- 21st.dev retail guidance: https://dev.21st.dev/blog/react-product-card-checkout-components — fixed-ratio visuals, concise product labels, clear CTAs, truthful availability.
- Apple India retail: https://www.apple.com/in/store — personal assistance and an uncluttered retail journey.
- Crutchfield TV guide: https://www.crutchfield.com/learn/how-to-choose-a-tv.html — practical buying guidance and relevant filtering.
- B&H comparison: https://www.bhphotovideo.com/find/jsp/comparisonexplained.jsp — compare selection flow.
- Dyson India: https://www.dyson.in/ — focused product presentation and clearly expressed financing details.

## Business evidence and claim policy

- Daikin dealer directory: https://daikinindia.com/node?page=4 — both the VIP Road/Basantpur and GE Road/New Bus Stand dealer locations, public mobile number 9977108780.
- IFB dealer directory: https://www.ifbappliances.com/storelocator/chattisgarh/rajnandgaon/anshdeep-electronics — GE Road location and IFB dealer status; hours there are not assumed to apply to VIP Road.
- Livpure locator: https://store.livpure.com/location/chhattisgarh/rajnandgaon — GE Road listing and phone.
- The business brief describes an establishment date, delivery promises, price matching, multi-brand authorization, financing access and stock. These require direct store approval and are intentionally **not** presented as verified live facts.
- Do not add invented product prices, stock indicators, testimonials, star-rating schema, delivery ETAs, or no-cost EMI eligibility.
- Public rating on third-party directories is not inserted into first-party AggregateRating markup.

## Core user journey

1. Hero: user understands the local showroom positioning and one primary goal: request a quote.
2. Browse: search or filter meaningful product families instead of unverified SKUs.
3. Shortlist: select up to three category interests; compare buying criteria, not fabricated data.
4. Guidance: AC sizing, TV viewing, laundry/fridge sizing with transparent heuristics and warnings.
5. Financing: illustrative 0% division only, labelled clearly as *not a lender offer*.
6. Offer review: model + online price + phone validation; user chooses outbound communication channel.
7. Showrooms: branch-specific map links and verified public phone.

## Design tokens

| Token | Value | Purpose |
|---|---|---|
| --canvas | #F5F6F8 | Primary light background |
| --paper | #FFFFFF | Reading and commerce surfaces |
| --black | #0B0F19 | Hero, footer, premium contrast |
| --black-lift | #141B29 | Nested contrast elevations |
| --ink | #0F172A | Text and high-contrast buttons |
| --muted | #475569 | Supportive copy |
| --blue | #0052FF | One dominant action accent |
| --line | #DFE4EA | Fine dividers |

Display: Space Grotesk; prose: DM Sans; metadata and finance: JetBrains Mono. Spacing based on 4/8px increments, with varied content-driven grids. Desktop uses 12 columns and 7/5 + 5/7 editorial pairings. Tablet and mobile reflow to two and one column respectively. Minimum tappable control: 44px for primary targets; interactive control outlines must be visible.

## Signature interaction

The hero is a product-family selector that switches between original vector illustrations and contextually useful copy, rather than a generic looping video. The tool section carries a practical deterministic advisor from initial interest to a pre-composed enquiry.

## Interaction and accessibility states

- Default / hover / focus / disabled on all major controls.
- No hover lift on decorative content.
- Quote and compare dialogs implement focus containment, Escape dismissal and focus restoration.
- Inputs have explicit labels; forms provide inline validation and failure states.
- Respect prefers-reduced-motion; do not depend on animation to convey critical content.
- Non-live imagery is visibly labelled illustrative.

## Design acceptance gate

Test at 375px, 834px, 1440px; verify there is no horizontal overflow or orphan column. Check WCAG 2.2 AA contrast and keyboard focus behavior with automated + manual audits. Target LCP under 2.5s, CLS under 0.1 and INP under 200ms on representative mobile hardware, but never claim these metrics before measuring.

No full Mobbin paid-screen access, real store photo license, SKU inventory feed, or confirmed WhatsApp Business destination was available during initial development. These are launch-blocking business-content decisions, not reasons to fabricate data.
