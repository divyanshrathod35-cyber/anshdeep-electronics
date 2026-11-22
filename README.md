# Anshdeep Electronics — Flagship Storefront

Research-led, enquiry-first website for the Anshdeep Electronics showroom in Rajnandgaon, Chhattisgarh.

## Principles

- **No fictional inventory**: current showroom prices, stock levels and product model availability remain unverified.
- **One clear conversion path**: ask for a quote, shortlist what matters, then call / email / use the store-confirmed WhatsApp Business number.
- **Local-first**: verified VIP Road/Basantpur and GE Road location references.
- **Photographic retail design**: eight individually sourced Pexels editorial photographs with custom illustrated offline fallbacks. These are not actual showroom photographs or inventory representations. Replace with store-owner-approved original product photography at launch.
- **Respect customer trust**: financing illustrations are not loan quotes; the online offer form does not promise a price match.

## Stack

React 19, TypeScript, Vite 6, Tailwind 3 with custom design tokens and stylesheet; no external backend or analytics. Product data and store locations live in the source, making the proof-of-concept easy to hand over.

## Run

```bash
npm install
npm run dev
npm run test
npm run typecheck
npm run build
```

The site runs locally at the URL printed by Vite. Built assets are in `dist/`.

## Photography and source tracing

Category photography is loaded responsively from the Pexels CDN. Each image's photographer, photo page and composition are recorded in `src/data/editorialImages.ts`; the commercial-use licence is documented in `docs/IMAGE_SOURCES.md`. If the CDN is unavailable, original vector fallback artwork appears. Before a public launch, self-host optimized assets (with appropriate rights), verify depicted trademarks, and check the privacy impact of third-party image requests.

## Store-approved SKU content

`src/data/verifiedProducts.ts` is **intentionally empty**; there is no evidence for live prices or product stock yet. To publish any real model, obtain explicit store-owner approval and accurate inventory data. The validator rejects missing approval, invalid prices, and stock confirmations more than 24 hours old. This publication gate does not replace a real inventory feed, manual pre-publication review or frequent stock updates.

## Verified contact

Manufacturer dealer listings identify Anshdeep Electronics at VIP Road, Basantpur and GE Road, Rajnandgaon, with publicly listed phone number `99771 08780`. The site provides click-to-call and map directions.

WhatsApp Business is **not** enabled by default because the store-specific WhatsApp destination has not been independently confirmed. After checking it with the owner, create `.env.local`:

```bash
VITE_STORE_WHATSAPP_NUMBER=91XXXXXXXXXX
```

The number must contain the country code and digits only. The quote panel then displays a pre-filled WhatsApp link. Public environment variables are not secrets. Do not commit customer information or private keys.

## Documentation

- [Research-led design, tokens, source evidence and CRO rationale](docs/DESIGN.md)
- [Functional verification and launch blockers](docs/LAUNCH_CHECKLIST.md)

## Publication

**Do not launch as an official live site without store authorization and release QA.** Verify ownership, product content, prices, delivery and installation terms, branch hours, finance terms, WhatsApp routing, photo and logo licenses, domain, SEO, and privacy disclosures.
