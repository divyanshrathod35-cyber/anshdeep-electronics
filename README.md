# Anshdeep Electronics — Flagship Storefront

Research-led, enquiry-first website for the Anshdeep Electronics showroom in Rajnandgaon, Chhattisgarh.

## Principles

- **No fictional inventory**: current showroom prices, stock levels and product model availability remain unverified.
- **One clear conversion path**: ask for a quote, shortlist what matters, then call / email / use the store-confirmed WhatsApp Business number.
- **Local-first**: verified VIP Road/Basantpur and GE Road location references.
- **Original design**: custom vector product silhouettes and bespoke editorial UI. Replace illustration with owner-approved original photography at launch.
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
