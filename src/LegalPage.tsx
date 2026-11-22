import { store, mapUrl } from './config/storeConfig';

export type LegalRoute = 'privacy' | 'terms' | 'accessibility';
type Section = { id: string; heading: string; text: string[] };
type LegalContent = { label: string; title: string; description: string; sections: Section[] };

export const legalPages: Record<LegalRoute, LegalContent> = {
  privacy: {
    label: '01 / PERSONAL INFORMATION',
    title: 'Privacy, made clear.',
    description: 'What this site does, what happens when you contact us, and how you can ask about information you have shared.',
    sections: [
      { id: 'operator', heading: 'About this website', text: [
        'This website presents Anshdeep Electronics, an electronics and home-appliance showroom in Rajnandgaon, Chhattisgarh. The contact details below are provided for website and privacy-related questions.',
        'This notice describes how this public website currently works. It does not describe every offline process or service used by the showroom.'
      ] },
      { id: 'data', heading: 'What you choose to share', text: [
        'You can browse collections, use the buying guides and prepare an enquiry without registering for an account.',
        'Details you enter in the offer-review form, such as a model, online price and phone number, are used in your browser to prepare a message. This website does not automatically submit or save that form to a storefront database.',
        'If you choose to call, email or use an enabled messaging service, the recipient showroom and the chosen provider may handle the details you send.'
      ] },
      { id: 'technical', heading: 'Hosting and technical records', text: [
        'The current website uses locally hosted photographs and fonts. We have not intentionally installed advertising pixels or visitor-analytics scripts in this release.',
        'Hosting and network providers may process technical request information, including IP address, browser and device information, to serve and secure the site. Their privacy notices describe their own practices.'
      ] },
      { id: 'external', heading: 'When you open another service', text: [
        'Maps only opens when you choose directions. Calling uses your phone service. Email and any enabled WhatsApp action open the corresponding external application. Those services have their own privacy practices.',
        'Check the message before sending it. You may remove any information you do not want to share.'
      ] },
      { id: 'rights', heading: 'Your choices and requests', text: [
        'You can leave an enquiry unfinished without sending it. For messages already sent to the store, contact Anshdeep Electronics to request access, correction or deletion as applicable by law.',
        'Privacy questions can be raised by calling the store or emailing the address below. The showroom may need to verify the request before acting on it.'
      ] },
      { id: 'updates', heading: 'Changes to this notice', text: [
        'If this site later adds online payments, account registration, data storage or tracking, the notice and any relevant consent process should be reviewed before those features launch.',
        'Last reviewed: 22 November 2026.'
      ] }
    ]
  },
  terms: {
    label: '02 / INFORMATION & TERMS',
    title: 'Clear terms. Better decisions.',
    description: 'This is a product discovery and showroom enquiry website, not a live online checkout. Here is what that distinction means.',
    sections: [
      { id: 'purpose', heading: 'What the website offers', text: [
        'Browse electronics and appliance categories, compare decision factors, explore indicative buying guidance and prepare a message for the store. This website does not accept online orders or collect payments.'
      ] },
      { id: 'accuracy', heading: 'Stock, brands and pricing', text: [
        'Brand names and editorial photos illustrate products you may want to discuss. They are not claims that specific models are in stock, that an official manufacturer partnership exists, or that an offer is available.',
        'Always confirm models, prices, availability, warranty, installation, service, delivery and exchange terms directly with the store before purchasing.'
      ] },
      { id: 'finance', heading: 'Buying guides and finance illustrations', text: [
        'AC capacity, TV size and home-appliance recommendations are general starting points, not a technical survey or installation specification.',
        'The EMI planner divides an assumed financed amount into equal months using zero interest only for illustration. It is not a no-cost EMI promise, a finance quotation, a lending approval or a statement of eligibility.'
      ] },
      { id: 'enquiry', heading: 'Enquiries and transactions', text: [
        'The website prepares a message for your review. It does not send it automatically. Any sale, warranty or service arrangement is agreed separately with the store.',
        'Showroom hours and branch availability can change. Call ahead before travelling.'
      ] },
      { id: 'outside', heading: 'Third-party services and content', text: [
        'Product marks belong to their respective owners. Editorial photos are illustrative, not confirmed inventory. External maps, email and messaging providers operate under their own terms.',
        'Last reviewed: 22 November 2026.'
      ] }
    ]
  },
  accessibility: {
    label: '03 / DIGITAL ACCESS',
    title: 'Designed for more people.',
    description: 'Simple navigation, useful buying information and direct showroom contact should be possible on phones, with keyboards and with assistive technology.',
    sections: [
      { id: 'approach', heading: 'Accessibility approach', text: [
        'We use meaningful headings, named controls, visible keyboard focus, a skip-to-content link, and dialog keyboard support. The site also respects the reduced-motion preference.',
        'On small screens, product categories remain accessible with touch or keyboard. Browsing and quote preparation do not require an account.'
      ] },
      { id: 'checks', heading: 'Checks and limitations', text: [
        'Release testing includes responsive browser checks, automated WCAG 2.2 A/AA tests, keyboard journeys and form validation.',
        'Automated results do not guarantee perfect accessibility on all browsers or assistive technologies. We do not claim independent accessibility certification.'
      ] },
      { id: 'help', heading: 'Need help or found an obstacle?', text: [
        'Please tell the showroom which page or action is difficult to use. You can also ask for buying guidance by phone rather than using the website.',
        'Use the contact actions below for assistance, feedback or a different way to receive available information.'
      ] },
      { id: 'updates', heading: 'Ongoing review', text: [
        'We plan to review access as the store adds verified product details, media or new interactions.',
        'Last reviewed: 22 November 2026.'
      ] }
    ]
  }
};

export function LegalPage({ page }: { page: LegalRoute }) {
  const content = legalPages[page];
  return <div className="legal-site">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="legal-header"><div className="layout legal-header-inner">
      <a href="/" className="wordmark">
        <span className="wordmark-monogram" aria-hidden="true">A<span>.</span></span>
        <span className="wordmark-text"><strong>ANSHDEEP</strong><small>ELECTRONICS · RAJNANDGAON</small></span>
      </a>
      <a href="/" className="legal-home-link">Back to the showroom <span aria-hidden="true">↗</span></a>
    </div></header>
    <main id="main">
      <section className="legal-hero"><div className="layout legal-hero-grid">
        <div><span className="legal-index">{content.label}</span><h1>{content.title}</h1></div>
        <div className="legal-hero-description"><span>ANSHDEEP / SITE INFORMATION</span><p>{content.description}</p><small>REVIEWED · 22 NOV 2026</small></div>
      </div></section>
      <div className="layout legal-body-grid">
        <nav className="legal-toc" aria-label="On this page"><strong>CONTENTS</strong>
          {content.sections.map((s, i) => <a href={'#' + s.id} key={s.id}><span>{String(i+1).padStart(2,'0')}</span>{s.heading}</a>)}
        </nav>
        <div className="legal-articles">
          {content.sections.map((s,i) => <section id={s.id} className="legal-article" key={s.id}>
            <span className="legal-index">{String(i+1).padStart(2,'0')} / {String(content.sections.length).padStart(2,'0')}</span>
            <h2>{s.heading}</h2>
            {s.text.map((p,j) => <p key={j}>{p}</p>)}
          </section>)}
          <section className="legal-contact" aria-label="Store contact information">
            <span className="legal-index">A HUMAN ANSWER, WHEN YOU NEED ONE</span>
            <h2>Ask the showroom.</h2>
            <p>For a privacy request, site-access problem or product enquiry, contact Anshdeep Electronics directly.</p>
            <div className="legal-contact-actions">
              <a className="button button--primary" href={'tel:' + store.phone}>Call {store.phoneLabel} <span aria-hidden="true">↗</span></a>
              <a className="button button--outline" href={'mailto:' + store.email + '?subject=' + encodeURIComponent('Anshdeep Electronics website enquiry')}>Email the showroom <span aria-hidden="true">↗</span></a>
            </div>
          </section>
        </div>
      </div>
    </main>
    <footer className="legal-footer"><div className="layout legal-footer-grid">
      <div><a href="/" className="footer-wordmark">ANSHDEEP <span>ELECTRONICS</span></a><p>Good technology. Better decisions.<br/>Rajnandgaon, Chhattisgarh.</p></div>
      <nav aria-label="Site information"><a aria-current={page === 'privacy' ? 'page' : undefined} href="/privacy/">Privacy policy</a><a aria-current={page === 'terms' ? 'page' : undefined} href="/terms/">Terms of use</a><a aria-current={page === 'accessibility' ? 'page' : undefined} href="/accessibility/">Accessibility</a></nav>
      <div><a href="/">Explore collections ↗</a><a target="_blank" rel="noopener noreferrer" href={mapUrl(store.branches[0].address)}>Visit the showroom ↗</a></div>
    </div><div className="layout legal-bottom">© 2026 ANSHDEEP ELECTRONICS · Confirm information directly with the store.</div></footer>
  </div>;
}
