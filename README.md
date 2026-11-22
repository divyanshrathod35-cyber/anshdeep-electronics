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

The website uses optimized, pinned, local editorial JPEG files under `public/editorial/` where available, with licensed CDN and original vector fallbacks. The reproducible pinning command is `node --experimental-strip-types scripts/sync-editorial-assets.mjs`; an isolated GitHub Actions asset-pinning workflow can commit these photographs to the review branch. Each photo's source and photographer are recorded in `src/data/editorialImages.ts` and `docs/IMAGE_SOURCES.md`. Before launch, confirm depicted trademark rights and replace these context photos with owner-approved product and showroom imagery.

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
