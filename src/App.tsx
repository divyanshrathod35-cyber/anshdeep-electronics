import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { EditorialPhoto } from './components/EditorialPhoto';
import { categories, filterInterests, interests, type Category, type Interest, type Artwork } from './data/catalog';
import { store, mapUrl } from './config/storeConfig';
import { emiIllustration, indianRupees, isIndianMobile, safeMessage, suggestAc, suggestLaundry, suggestTv, whatsappUrl, type Exposure } from './lib/shopping';

type Finder = 'ac' | 'tv' | 'home';
type HeroChoice = 'cooling' | 'viewing' | 'living';

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className="arrow-glyph">{diagonal ? '↗' : '→'}</span>;
}

const heroOptions: { id: HeroChoice; label: string; art: Artwork; title: string; text: string }[] = [
  { id: 'cooling', label: 'Cooling', art: 'ac', title: 'Comfort, correctly sized.', text: 'Start with your room, not a random model number.' },
  { id: 'viewing', label: 'Televisions', art: 'tv', title: 'A better view starts here.', text: 'Screen size and picture quality for your space.' },
  { id: 'living', label: 'Home essentials', art: 'washer', title: 'Made for everyday living.', text: 'Choose appliances around the way you live.' },
];

function useOverlay(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement as HTMLElement;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => ref.current?.querySelector<HTMLElement>('button, a, input, textarea')?.focus(), 0);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab' || !ref.current) return;
      const focusable = Array.from(ref.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled])'));
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { window.clearTimeout(timer); document.removeEventListener('keydown', onKey); document.body.style.overflow = oldOverflow; previousFocus.current?.focus(); };
  }, [open]);
  return ref;
}

export default function App() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [heroChoice, setHeroChoice] = useState<HeroChoice>('viewing');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [search, setSearch] = useState('');
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quote, setQuote] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const [finder, setFinder] = useState<Finder>('ac');
  const [roomArea, setRoomArea] = useState(160);
  const [roomExposure, setRoomExposure] = useState<Exposure>('normal');
  const [roomHours, setRoomHours] = useState(8);
  const [tvDistance, setTvDistance] = useState(8);
  const [family, setFamily] = useState(4);
  const [price, setPrice] = useState(50000);
  const [downPayment, setDownPayment] = useState(10000);
  const [exchangeEstimate, setExchangeEstimate] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [matchModel, setMatchModel] = useState('');
  const [matchPrice, setMatchPrice] = useState('');
  const [matchPlatform, setMatchPlatform] = useState('Amazon');
  const [matchPhone, setMatchPhone] = useState('');
  const [matchError, setMatchError] = useState('');
  const [branch, setBranch] = useState<'vip' | 'ge'>('vip');

  const activeHero = heroOptions.find(option => option.id === heroChoice)!;
  const visible = useMemo(() => filterInterests(interests, activeCategory, search), [activeCategory, search]);
  const selected = interests.filter(item => shortlist.includes(item.id));
  const ac = suggestAc(roomArea, roomExposure, roomHours);
  const tv = suggestTv(tvDistance);
  const laundry = suggestLaundry(family);
  const emi = emiIllustration(price, downPayment, exchangeEstimate, tenure);
  const selectedBranch = store.branches.find(item => item.id === branch)!;
  const whatsappHref = whatsappUrl(store.whatsappNumber, quote);
  const closeQuote = () => setQuoteOpen(false);
  const closeCompare = () => setCompareOpen(false);
  const quoteRef = useOverlay(quoteOpen, closeQuote);
  const compareRef = useOverlay(compareOpen, closeCompare);

  const openQuote = (message: string) => {
    setCompareOpen(false);
    setCopyStatus('');
    setQuote(safeMessage(message));
    setQuoteOpen(true);
  };
  const toggleShortlist = (id: string) => {
    setShortlist(current => current.includes(id) ? current.filter(item => item !== id) : current.length >= 3 ? current : [...current, id]);
  };
  const inquiryFor = (item: Interest) => openQuote('Hello Anshdeep Electronics, I am interested in ' + item.title + '. Please share available models, current showroom prices, warranty and delivery/installation details for Rajnandgaon.');
  const submitMatch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (matchModel.trim().length < 3) { setMatchError('Enter the exact model or product name.'); return; }
    const observed = Number(matchPrice);
    if (!Number.isFinite(observed) || observed <= 0 || observed > 10000000) { setMatchError('Enter a valid online price in rupees.'); return; }
    if (!isIndianMobile(matchPhone)) { setMatchError('Enter a valid 10-digit Indian mobile number.'); return; }
    setMatchError('');
    openQuote('Hello Anshdeep Electronics, could you review this online offer? Model: ' + matchModel.trim() + '. Platform: ' + matchPlatform + '. Online listed price: ' + indianRupees(observed) + '. My contact: +91 ' + matchPhone.trim() + '. Please confirm your current showroom quote; I understand price matching is not guaranteed.');
  };
  const copyEnquiry = async () => {
    try { await navigator.clipboard.writeText(quote); setCopyStatus('Enquiry copied. Paste it into your preferred messaging app.'); }
    catch { setCopyStatus('Clipboard unavailable here. You can select the message above and copy it manually.'); }
  };
  const shortlistRequest = () => openQuote('Hello Anshdeep Electronics, please help me compare these product categories: ' + selected.map(item => item.title).join(', ') + '. Please share current model options and showroom quotes.');

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="utility-bar"><div className="layout utility-inner"><span>VIP Road · Basantpur · Rajnandgaon</span><span className="utility-right">Visit the showroom. Explore with confidence. <a href={mapUrl(store.branches[0].address)} target="_blank" rel="noopener noreferrer">Directions <Arrow diagonal /></a></span></div></div>
      <header className="site-header">
        <div className="layout header-inner">
          <a href="#top" className="wordmark" aria-label="Anshdeep Electronics home" onClick={() => setMobileMenu(false)}>
            <span className="wordmark-monogram" aria-hidden="true">A<span>.</span></span>
            <span className="wordmark-text"><strong>ANSHDEEP</strong><small>ELECTRONICS · RAJNANDGAON</small></span>
          </a>
          <nav id="mobile-navigation" className={'main-nav' + (mobileMenu ? ' main-nav--open' : '')} aria-label="Main navigation">
            <a href="#catalog" onClick={() => setMobileMenu(false)}>Explore products</a>
            <a href="#finder" onClick={() => setMobileMenu(false)}>Find your fit</a>
            <a href="#finance" onClick={() => setMobileMenu(false)}>EMI guide</a>
            <a href="#showrooms" onClick={() => setMobileMenu(false)}>Showrooms</a>
          </nav>
          <div className="header-actions">
            <button className="header-enquiry" onClick={() => openQuote('Hello Anshdeep Electronics, I would like a current showroom quote. Please help me choose the right product.')}>Get a quote <Arrow /></button>
            <button className="menu-toggle" type="button" aria-expanded={mobileMenu} aria-controls="mobile-navigation" aria-label={mobileMenu ? 'Close menu' : 'Open menu'} onClick={() => setMobileMenu(value => !value)}><span/><span/></button>
          </div>
        </div>
        <div className={'mobile-shortcuts' + (mobileMenu ? ' mobile-shortcuts--show' : '')}><a href="#catalog" onClick={() => setMobileMenu(false)}>Browse collections</a><a href="#showrooms" onClick={() => setMobileMenu(false)}>Get directions</a></div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="layout hero-layout">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-mark"/> THE RAJNANDGAON ELECTRONICS EDIT</div>
              <h1>Good technology.<br/><em>Better decisions.</em></h1>
              <p>New television? Cooler room? Better everyday essentials? Discover what matters, compare with clarity, and speak to a real local showroom.</p>
              <div className="hero-actions">
                <button className="button button--primary" onClick={() => openQuote('Hello Anshdeep Electronics, I want to explore the best options for my budget. Please share current showroom availability and quotes.')}>Ask for a showroom quote <Arrow /></button>
                <a className="button button--text" href="#catalog">Explore the collection <Arrow /></a>
              </div>
              <div className="hero-facts">
                <span><strong>VIP ROAD</strong><small>Basantpur, Rajnandgaon</small></span>
                <span><strong>LOCAL EXPERTISE</strong><small>Advice before you decide</small></span>
                <span><strong>BUY WITH CLARITY</strong><small>Ask about pricing & warranty</small></span>
              </div>
            </div>
            <div className="hero-visual" aria-label="Illustrative electronics showcase">
              <div className="hero-image-stage">
                <span className="stage-coordinate">A / 01</span>
                <span className="stage-vertical">THE SHOWROOM EDIT · 2026</span>
                <div className="stage-display" key={activeHero.id}>
                  <EditorialPhoto kind={activeHero.art} hero />
                </div>
                <div className="stage-info"><span>SELECTED INTEREST</span><strong>{activeHero.title}</strong><p>{activeHero.text}</p></div>
              </div>
              <div className="hero-switcher" role="group" aria-label="Explore product families">
                {heroOptions.map((item, index) => <button type="button" key={item.id} className={heroChoice === item.id ? 'is-active' : ''} aria-pressed={heroChoice === item.id} onClick={() => setHeroChoice(item.id)}><small>0{index+1}</small><span>{item.label}</span><Arrow /></button>)}
              </div>
            </div>
          </div>
          <div className="layout hero-bottom"><span>NOT ANOTHER ENDLESS PRODUCT FEED.</span><span>YOUR NEXT GOOD PURCHASE STARTS WITH A BETTER QUESTION.</span></div>
        </section>

        <section className="section intro-section" id="catalog">
          <div className="layout">
            <div className="section-heading section-heading--split">
              <div><span className="kicker">01 / DISCOVER</span><h2>Find something<br/><em>worth bringing home.</em></h2></div>
              <p>Browse by what you need, not by a hundred confusing model numbers. Product availability and offers are confirmed directly by the store.</p>
            </div>
            <div className="catalog-toolbar">
              <div className="search-field"><span aria-hidden="true">⌕</span><label className="sr-only" htmlFor="catalog-search">Search product categories or brands</label><input id="catalog-search" type="search" autoComplete="off" placeholder="Search AC, Sony, washing machine…" value={search} onChange={event => setSearch(event.target.value)}/>{search && <button onClick={() => setSearch('')} type="button" aria-label="Clear search">×</button>}</div>
              <div className="catalog-count" aria-live="polite">{visible.length.toString().padStart(2,'0')} COLLECTIONS</div>
            </div>
            <div className="filter-list" role="group" aria-label="Filter collections by category">
              {categories.map(item => <button type="button" key={item} className={'filter-button' + (item === activeCategory ? ' is-active' : '')} aria-pressed={item === activeCategory} onClick={() => setActiveCategory(item)}>{item}<span className="filter-count" aria-hidden="true">{filterInterests(interests, item, search).length}</span></button>)}
            </div>
            {visible.length ? <div className="product-grid">{visible.map((item, index) => (
              <article key={item.id} className={'product-card' + (index === 0 && activeCategory === 'All' && !search ? ' product-card--feature' : '')}>
                <div className="product-image"><span className="product-index">{item.number} / 08</span><EditorialPhoto kind={item.artwork}/><span className="product-image-label">Editorial image · ask for live stock</span></div>
                <div className="product-details"><p className="product-eyebrow">{item.eyebrow}</p><h3>{item.title}</h3><p>{item.description}</p><div className="brand-line"><span>BRANDS TO DISCUSS</span><small>{item.brands.join(' · ')}</small></div>
                  <div className="product-actions"><button className="action-link" onClick={() => inquiryFor(item)}>Ask about options <Arrow /></button><button className={'shortlist-button' + (shortlist.includes(item.id) ? ' is-selected' : '')} aria-pressed={shortlist.includes(item.id)} aria-label={(shortlist.includes(item.id) ? 'Remove ' : 'Shortlist ') + item.title} onClick={() => toggleShortlist(item.id)} disabled={!shortlist.includes(item.id) && shortlist.length >= 3}>{shortlist.includes(item.id) ? '✓ Added' : '+ Compare'}</button></div>
                </div>
              </article>
            ))}</div> : <div className="empty-state"><h3>No matching collections.</h3><p>Try a different brand or category.</p><button className="action-link" onClick={() => {setSearch('');setActiveCategory('All');}}>Reset filters <Arrow /></button></div>}
            <div className="catalog-caption"><span>SELECTED FOR THE WAY YOU SHOP</span><p>Editorial photographs and brand examples are for buying guidance only, not live models or verified stock.</p></div>
          </div>
        </section>

        <section className="feature-interlude">
          <div className="layout interlude-inner">
            <span className="kicker">THE ANSHDEEP APPROACH</span>
            <h2>Less guessing.<br/><em>More getting it right.</em></h2>
            <div className="interlude-columns">
              <div><span>01</span><h3>Start with your needs.</h3><p>Your room, family, budget and priorities come first.</p></div>
              <div><span>02</span><h3>Understand the options.</h3><p>Compare meaningful specifications without jargon overload.</p></div>
              <div><span>03</span><h3>Talk to your local store.</h3><p>Confirm current prices, availability, service and installation.</p></div>
            </div>
          </div>
        </section>

        <section className="section finder-section" id="finder">
          <div className="layout finder-layout">
            <div className="finder-intro"><span className="kicker">02 / YOUR BUYING ASSISTANT</span><h2>Find your fit.<br/><em>Before the fit-out.</em></h2><p>Three practical starting points to make your next showroom conversation more useful.</p><div className="finder-note"><span>NOTE / 01</span> These are indicative shopping guidelines, not a site survey, engineering specification, or professional installation assessment.</div></div>
            <div className="finder-tool">
              <div className="finder-tabs" role="tablist" aria-label="Product finder">
                <button role="tab" aria-selected={finder === 'ac'} className={finder === 'ac' ? 'is-active' : ''} onClick={() => setFinder('ac')}>Air conditioning</button>
                <button role="tab" aria-selected={finder === 'tv'} className={finder === 'tv' ? 'is-active' : ''} onClick={() => setFinder('tv')}>Television</button>
                <button role="tab" aria-selected={finder === 'home'} className={finder === 'home' ? 'is-active' : ''} onClick={() => setFinder('home')}>Home appliances</button>
              </div>
              {finder === 'ac' && <div className="tool-body" role="tabpanel"><div className="control-heading"><label htmlFor="room-area">Room size</label><strong>{roomArea} <small>sq ft</small></strong></div><input className="range" id="room-area" type="range" min="80" max="400" step="10" value={roomArea} onChange={event => setRoomArea(Number(event.target.value))}/><div className="range-markers"><span>80 sq ft</span><span>400 sq ft</span></div><div className="control-heading control-heading--low"><span>Heat exposure</span></div><div className="segmented"><button className={roomExposure === 'normal' ? 'is-active' : ''} aria-pressed={roomExposure === 'normal'} onClick={() => setRoomExposure('normal')}>Standard room</button><button className={roomExposure === 'sun' ? 'is-active' : ''} aria-pressed={roomExposure === 'sun'} onClick={() => setRoomExposure('sun')}>Top floor / direct sun</button></div><div className="control-heading control-heading--low"><label htmlFor="daily-hours">Daily use</label><strong>{roomHours} <small>hours</small></strong></div><input className="range" id="daily-hours" type="range" min="6" max="14" step="1" value={roomHours} onChange={event => setRoomHours(Number(event.target.value))}/><div className="tool-result"><span>START YOUR SEARCH WITH</span><strong>{ac.tons}</strong><p>{ac.efficiency}. Have the installer verify the actual heat load.</p><button onClick={() => openQuote('Hello Anshdeep Electronics, please suggest an AC for a ' + roomArea + ' sq ft room, ' + (roomExposure === 'sun' ? 'top floor/direct sun' : 'standard exposure') + ', used about ' + roomHours + ' hours daily. Your guide suggests ' + ac.tons + '. Please advise models and current quotes.')}>Ask for AC recommendations <Arrow /></button></div></div>}
              {finder === 'tv' && <div className="tool-body" role="tabpanel"><div className="control-heading"><label htmlFor="viewing-distance">Viewing distance</label><strong>{tvDistance} <small>feet</small></strong></div><input className="range" id="viewing-distance" type="range" min="5" max="14" step="1" value={tvDistance} onChange={event => setTvDistance(Number(event.target.value))}/><div className="range-markers"><span>5 feet</span><span>14 feet</span></div><p className="inline-guide">Distance is a starting point. Your preferences, viewing content and wall width matter too.</p><div className="tool-result"><span>SUGGESTED SCREEN SIZE TO EXPLORE</span><strong>{tv.inches}” 4K</strong><p>{tv.note}</p><button onClick={() => openQuote('Hello Anshdeep Electronics, my TV viewing distance is around ' + tvDistance + ' feet. Please suggest options around ' + tv.inches + ' inches and share available models, prices and warranty details.')}>Discuss television options <Arrow /></button></div></div>}
              {finder === 'home' && <div className="tool-body" role="tabpanel"><div className="control-heading"><label htmlFor="family-size">People at home</label><strong>{family} <small>members</small></strong></div><input className="range" id="family-size" type="range" min="1" max="8" step="1" value={family} onChange={event => setFamily(Number(event.target.value))}/><div className="range-markers"><span>1 member</span><span>8+ members</span></div><div className="dual-results"><div><span>WASHING MACHINE</span><strong>{laundry.washer}</strong></div><div><span>REFRIGERATOR</span><strong>{laundry.fridge}</strong></div></div><p className="inline-guide">Laundry volume, food habits and space constraints may change the ideal capacity.</p><div className="tool-result tool-result--compact"><button onClick={() => openQuote('Hello Anshdeep Electronics, we are a household of about ' + family + '. Please suggest washing machines around ' + laundry.washer + ' and refrigerators around ' + laundry.fridge + ', with current prices and dimensions.')}>Ask for a suitable shortlist <Arrow /></button></div></div>}
            </div>
          </div>
        </section>

        <section className="section finance-section" id="finance">
          <div className="layout">
            <div className="section-heading section-heading--split"><div><span className="kicker">03 / PLAN WITH CLARITY</span><h2>Know the numbers.<br/><em>Before you ask.</em></h2></div><p>An illustrative monthly payment planner. Actual EMI, bank charges, offers and exchange valuations must be confirmed with the showroom and financing provider.</p></div>
            <div className="finance-shell">
              <div className="finance-controls">
                <div className="control-heading"><label htmlFor="product-price">Illustrative purchase budget</label><strong>{indianRupees(price)}</strong></div>
                <input id="product-price" className="range" type="range" min="15000" max="200000" step="5000" value={price} onChange={event => { const next=Number(event.target.value); setPrice(next);setDownPayment(old=>Math.min(old,next));setExchangeEstimate(old=>Math.min(old,next)); }}/>
                <div className="range-markers"><span>₹15,000</span><span>₹2,00,000</span></div>
                <div className="finance-pairs"><div><label htmlFor="down-payment">Down payment (₹)</label><input id="down-payment" type="number" min="0" max={price} step="500" value={downPayment} onChange={event => setDownPayment(Math.max(0, Number(event.target.value) || 0))}/></div><div><label htmlFor="exchange-value">Assumed exchange value (₹)</label><input id="exchange-value" type="number" min="0" max={price} step="500" value={exchangeEstimate} onChange={event => setExchangeEstimate(Math.max(0, Number(event.target.value) || 0))}/></div></div>
                <div className="control-heading control-heading--low"><span>Illustrative tenure</span></div>
                <div className="tenure-list" role="group" aria-label="Choose EMI tenure">{[3, 6, 9, 12, 18, 24].map(month => <button key={month} className={tenure === month ? 'is-active' : ''} aria-pressed={tenure === month} onClick={() => setTenure(month)}>{month}<small>mo</small></button>)}</div>
                <p className="finance-disclaimer">Assumes 0% interest solely to illustrate how installments divide. It does not establish eligibility for no-cost EMI or predict lender fees.</p>
              </div>
              <div className="finance-summary"><span className="ledger-label">ILLUSTRATIVE MONTHLY OUTLAY</span><strong className="ledger-total">{indianRupees(emi.monthly)}<small> / month</small></strong><div className="ledger-rule"/><div className="ledger-row"><span>Budget</span><strong>{indianRupees(price)}</strong></div><div className="ledger-row"><span>Down payment</span><strong>− {indianRupees(emi.downPayment)}</strong></div><div className="ledger-row"><span>Assumed exchange</span><strong>− {indianRupees(emi.exchangeAssumption)}</strong></div><div className="ledger-row ledger-row--total"><span>Illustrative amount financed</span><strong>{indianRupees(emi.financed)}</strong></div><button className="button button--white" onClick={() => openQuote('Hello Anshdeep Electronics, please advise available EMI options. My illustrative budget is ' + indianRupees(price) + ', planned down payment ' + indianRupees(emi.downPayment) + ', assumed exchange value ' + indianRupees(emi.exchangeAssumption) + ', and preferred tenure ' + emi.months + ' months. Please confirm actual eligibility, fees and offers.')}>Check financing options <Arrow /></button></div>
            </div>
          </div>
        </section>

        <section className="review-band" id="offer-review">
          <div className="layout review-layout">
            <div className="review-copy"><span className="kicker kicker--light">04 / ONLINE OFFER REVIEW</span><h2>Found an offer<br/>worth comparing?</h2><p>Share the model and listed price. Ask the showroom for its current quote. Price matching is subject to store confirmation, not guaranteed.</p><div className="review-steps"><span>01 / NAME THE MODEL</span><span>02 / SHARE THE LISTING</span><span>03 / REQUEST A STORE QUOTE</span></div></div>
            <form className="review-form" onSubmit={submitMatch} noValidate><span className="form-topline">REQUEST A PRICE REVIEW <span>01 — 03</span></span><div className="form-field"><label htmlFor="match-model">Exact model or product name</label><input id="match-model" maxLength={100} placeholder="e.g. 1.5 ton inverter split AC" value={matchModel} onChange={event => setMatchModel(event.target.value)} required/></div><div className="form-grid"><div className="form-field"><label htmlFor="match-price">Online price seen (₹)</label><input id="match-price" type="number" inputMode="decimal" min="1" max="10000000" placeholder="49990" value={matchPrice} onChange={event => setMatchPrice(event.target.value)} required/></div><div className="form-field"><label htmlFor="match-platform">Listing platform</label><select id="match-platform" value={matchPlatform} onChange={event => setMatchPlatform(event.target.value)}><option>Amazon</option><option>Flipkart</option><option>Brand website</option><option>Other</option></select></div></div><div className="form-field"><label htmlFor="match-phone">Your mobile number</label><input id="match-phone" type="tel" inputMode="numeric" autoComplete="tel-national" pattern="[6-9][0-9]{9}" maxLength={10} placeholder="10-digit Indian mobile" value={matchPhone} onChange={event => setMatchPhone(event.target.value.replace(/[^0-9]/g, ''))} required/></div>{matchError && <p role="alert" className="form-error">{matchError}</p>}<button className="button button--primary review-submit" type="submit">Prepare my enquiry <Arrow /></button><p className="form-privacy">No details are sent to a server by this form. You choose how to contact the store in the next step.</p></form>
          </div>
        </section>

        <section className="section visit-section" id="showrooms">
          <div className="layout">
            <div className="section-heading section-heading--split"><div><span className="kicker">05 / VISIT ANSHDEEP</span><h2>Online discovery.<br/><em>Real-world confidence.</em></h2></div><p>See products in person and confirm availability, finance, delivery and installation details with the team before placing an order.</p></div>
            <div className="showroom-shell">
              <div className="showroom-map" aria-hidden="true"><div className="map-road map-road--a"/><div className="map-road map-road--b"/><div className="map-road map-road--c"/><div className="map-city">RAJNANDGAON <span>CHHATTISGARH · 491441</span></div><span className="map-pin map-pin--vip">01</span><span className="map-pin map-pin--ge">02</span><span className="map-caption">LOCAL SHOWROOM GUIDE / SCHEMATIC, NOT NAVIGATION</span></div>
              <div className="showroom-details"><div className="location-tabs" role="group" aria-label="Select showroom location"><button aria-pressed={branch === 'vip'} className={branch === 'vip' ? 'is-active' : ''} onClick={() => setBranch('vip')}>01 / VIP Road</button><button aria-pressed={branch === 'ge'} className={branch === 'ge' ? 'is-active' : ''} onClick={() => setBranch('ge')}>02 / GE Road</button></div><span className="address-label">RAJNANDGAON · CHHATTISGARH</span><h3>{selectedBranch.label}</h3><p>{selectedBranch.address}</p><div className="showroom-actions"><a className="button button--dark" href={mapUrl(selectedBranch.address)} target="_blank" rel="noopener noreferrer">Open Google Maps <Arrow diagonal /></a><a className="button button--outline" href={'tel:' + store.phone}>Call showroom <Arrow /></a></div><p className="showroom-note">Hours and availability can change. Call ahead before visiting.</p><div className="listed-badge"><span aria-hidden="true">✓</span> Location cross-checked against manufacturer dealer directories</div></div>
            </div>
          </div>
        </section>
        <section className="closing-banner"><div className="layout closing-inner"><div><span className="kicker kicker--light">ANSHDEEP ELECTRONICS / RAJNANDGAON</span><h2>Make the next one<br/><em>a good decision.</em></h2></div><button className="button button--white" onClick={() => openQuote('Hello Anshdeep Electronics, I would like help choosing electronics or home appliances. Please contact me with current store options.')}>Speak to the showroom <Arrow /></button></div></section>
      </main>

      <footer className="site-footer"><div className="layout footer-main"><div><a href="#top" className="footer-wordmark">ANSHDEEP <span>ELECTRONICS</span></a><p>Good technology. Better decisions.<br/>Rajnandgaon, Chhattisgarh.</p></div><div><span>EXPLORE</span><a href="#catalog">Collections</a><a href="#finder">Buying assistant</a><a href="#finance">Financing guide</a></div><div><span>GET IN TOUCH</span><a href={'tel:' + store.phone}>{store.phoneLabel}</a><a href={mapUrl(store.branches[0].address)} target="_blank" rel="noopener noreferrer">VIP Road directions</a><a href={mapUrl(store.branches[1].address)} target="_blank" rel="noopener noreferrer">GE Road directions</a></div><div><span>REFERENCE</span><a href={store.references.daikin} target="_blank" rel="noopener noreferrer">Dealer location source <Arrow diagonal /></a><a href={store.references.ifb} target="_blank" rel="noopener noreferrer">IFB listing <Arrow diagonal /></a></div></div><div className="layout footer-bottom"><span>© {new Date().getFullYear()} ANSHDEEP ELECTRONICS</span><span>Independent showroom site · Availability, prices and offers require confirmation.</span><a href="#top">BACK TO TOP ↑</a></div></footer>

      {selected.length > 0 && !compareOpen && !quoteOpen && <div className="compare-dock" role="status"><div><strong>{selected.length} / 3</strong><span>Added to your shortlist</span></div><div className="dock-actions"><button onClick={() => setShortlist([])}>Clear</button><button className="button button--dark" onClick={() => setCompareOpen(true)}>Review shortlist <Arrow /></button></div></div>}
      {compareOpen && <div className="overlay" onMouseDown={event => {if (event.target === event.currentTarget) closeCompare();}}><div className="modal compare-modal" role="dialog" aria-modal="true" aria-labelledby="compare-title" ref={compareRef}><div className="modal-top"><span>YOUR SHORTLIST / UP TO 3</span><button className="close-button" aria-label="Close shortlist" onClick={closeCompare}>×</button></div><h2 id="compare-title">What matters when you compare.</h2><p>Without live model and pricing data, we compare the questions to ask rather than inventing specifications.</p><div className="compare-columns">{selected.map(item => <div className="compare-column" key={item.id}><span>{item.category}</span><h3>{item.title}</h3><ul>{item.compareOn.map(point => <li key={point}>{point}</li>)}</ul><button onClick={() => toggleShortlist(item.id)}>Remove from list ×</button></div>)}</div><button className="button button--primary" onClick={shortlistRequest}>Request a combined quote <Arrow /></button></div></div>}
      {quoteOpen && <div className="overlay" onMouseDown={event => { if (event.target === event.currentTarget) closeQuote(); }}><div role="dialog" aria-modal="true" aria-labelledby="quote-title" className="quote-panel" ref={quoteRef}><div className="modal-top"><span>YOUR ENQUIRY / ANSHDEEP ELECTRONICS</span><button className="close-button" aria-label="Close enquiry" onClick={closeQuote}>×</button></div><span className="kicker">DIRECT TO YOUR LOCAL SHOWROOM</span><h2 id="quote-title">Ready to ask?</h2><p className="quote-intro">Review your request below, then choose how to contact the store. This site does not send your details automatically.</p><label htmlFor="quote-message">Your message</label><textarea id="quote-message" rows={7} maxLength={1500} value={quote} onChange={event => setQuote(event.target.value)}></textarea><div className="quote-actions">{whatsappHref && <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="button button--primary">Open WhatsApp <Arrow diagonal /></a>}<a className="button button--dark" href={'tel:' + store.phone}>Call {store.phoneLabel} <Arrow diagonal /></a><button className="button button--outline" onClick={copyEnquiry}>Copy message <Arrow /></button><a className="button button--text" href={'mailto:' + store.email + '?subject=' + encodeURIComponent('Showroom product enquiry') + '&body=' + encodeURIComponent(quote)}>Use email <Arrow diagonal /></a></div>{!whatsappHref && <p className="quote-note">Store WhatsApp Business number has not been confirmed. Calling, emailing or copying the message is available now.</p>}{copyStatus && <p className="copy-status" role="status">{copyStatus}</p>}</div></div>}
    </>
  );
}
