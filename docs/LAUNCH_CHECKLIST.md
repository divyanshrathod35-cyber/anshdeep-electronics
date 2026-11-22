# Release verification / store owner sign-off

## Available functionality
- Category search and brand filters
- Responsive navigation, interactive product family hero, accessible shortlist and comparison of buying factors
- AC, TV, fridge and laundry advisory tools with explicit limitations
- Illustrative monthly installment planning and calculations
- Online offer review form with client-side input validation and outbound enquiry draft
- Two showroom map directions, click-to-call and email
- WhatsApp button appears only after store number is explicitly configured

## Commands

```sh
npm install
npm run test
npm run typecheck
npm run build
npm run preview
```

## Launch blockers / not yet verified

1. Verify store ownership and signage, address, contact, branch relationship and current opening hours directly with owner.
2. Confirm public WhatsApp Business number and set `VITE_STORE_WHATSAPP_NUMBER`. Do not point to an IFB shared support account.
3. Obtain store-approved product photos and rights to use them, SKU-level price and availability feed, and brand-logo permissions.
4. Approve any no-cost EMI, price-match, exchange, free/same-day delivery and installation promises in writing, with conditions.
5. Ensure privacy notice and final website domain; establish data/analytics consent if adding tracking.
6. Perform tests at 375px / 834px / 1440px, keyboard, VoiceOver/NVDA, real device and reduced-motion modes.
7. Run Lighthouse/Web Vitals with a deployed preview and document the measured scores.
8. Validate SEO canonical and local business details after domain selection.
9. Verify that outbound calls, mailto, maps and the configured WhatsApp links lead to the correct store account.

## Source versus claim
The store's exact inventory, live pricing and offer eligibility are unknown. The site intentionally offers a quotation journey instead of simulated shopping-cart checkout or fake inventory.
