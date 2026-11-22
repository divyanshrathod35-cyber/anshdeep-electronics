import type { Artwork } from '../data/catalog';

interface Props { kind: Artwork; hero?: boolean; }
export function ProductArt({ kind, hero = false }: Props) {
  const gradient = 'metal-' + kind;
  const screen = 'screen-' + kind;
  return (
    <svg className={'product-art' + (hero ? ' product-art--hero' : '')} viewBox="0 0 440 340" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gradient} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F9FAFB"/><stop offset=".43" stopColor="#DCE1E8"/><stop offset="1" stopColor="#AEB7C4"/>
        </linearGradient>
        <linearGradient id={screen} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#24435A"/><stop offset=".42" stopColor="#0B1423"/><stop offset="1" stopColor="#547684"/>
        </linearGradient>
        <filter id="shadow-art" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="12"/></filter>
      </defs>
      <ellipse cx="220" cy="298" rx="137" ry="15" fill="#152033" opacity=".13" filter="url(#shadow-art)"/>
      {kind === 'ac' && <>
        <rect x="52" y="88" width="336" height="144" rx="23" fill={'url(#'+gradient+')'} stroke="#A6B0BC"/>
        <path d="M71 183h298v28c0 8-6 14-14 14H85c-8 0-14-6-14-14v-28Z" fill="#C6CDD6"/>
        <path d="M83 189h275" stroke="#738194" strokeWidth="2"/>
        <path d="M98 209h242" stroke="#5A6675" strokeWidth="1.5" opacity=".5"/>
        <rect x="317" y="117" width="44" height="5" rx="2.5" fill="#637083"/>
        <circle cx="106" cy="123" r="4" fill="#0052FF"/>
      </>}
      {kind === 'tv' && <>
        <rect x="29" y="45" width="382" height="232" rx="12" fill="#0E141F" stroke="#718193" strokeWidth="5"/>
        <rect x="39" y="55" width="362" height="211" rx="4" fill={'url(#'+screen+')'}/>
        <path d="M44 255c87-46 115-125 197-150s116-5 157-52v210H44Z" fill="#668D96" opacity=".52"/>
        <path d="M45 257c96-90 123-50 185-119 50-56 119-29 169-81" stroke="#DCE4D8" strokeWidth="3" opacity=".6"/>
        <path d="M196 278v22m48-22v22m-81 0h114" stroke="#606C78" strokeWidth="9" strokeLinecap="round"/>
      </>}
      {kind === 'phone' && <>
        <rect x="127" y="33" width="164" height="271" rx="31" fill="#151B27"/>
        <rect x="133" y="39" width="152" height="259" rx="26" fill={'url(#'+screen+')'}/>
        <path d="M136 247c41-40 90-48 148-137v188H136Z" fill="#7894A1" opacity=".62"/>
        <ellipse cx="205" cy="159" rx="63" ry="81" stroke="#C8D9E0" strokeWidth="5" opacity=".4" transform="rotate(-24 205 159)"/>
        <rect x="177" y="46" width="65" height="15" rx="8" fill="#0A111D"/>
      </>}
      {kind === 'fridge' && <>
        <rect x="136" y="27" width="173" height="288" rx="14" fill={'url(#'+gradient+')'} stroke="#A5AEB9" strokeWidth="2"/>
        <path d="M137 132h170" stroke="#95A0AF" strokeWidth="3"/>
        <rect x="289" y="57" width="5" height="59" rx="2.5" fill="#808C9B"/>
        <rect x="289" y="151" width="5" height="63" rx="2.5" fill="#808C9B"/>
        <path d="M153 306v13m137-13v13" stroke="#8893A0" strokeWidth="7" strokeLinecap="round"/>
      </>}
      {kind === 'washer' && <>
        <rect x="107" y="38" width="224" height="270" rx="15" fill={'url(#'+gradient+')'} stroke="#A3AFBC" strokeWidth="2"/>
        <rect x="120" y="50" width="197" height="51" rx="6" fill="#E7EBF0"/>
        <circle cx="145" cy="75" r="13" fill="#7C8A99" stroke="#E6EBF0" strokeWidth="5"/>
        <rect x="215" y="71" width="67" height="7" rx="3" fill="#B9C2CC"/>
        <circle cx="220" cy="199" r="91" fill="#AEBAC7" stroke="#EAF0F4" strokeWidth="10"/>
        <circle cx="220" cy="199" r="76" fill="#24374A"/>
        <path d="M158 189c19-25 45 0 62-10 20-12 37-8 64 8-7 48-42 72-67 72-39 0-63-28-59-70Z" fill="#678999" opacity=".86"/>
        <circle cx="220" cy="199" r="72" stroke="#A0B6C2" strokeWidth="3"/>
      </>}
      {kind === 'purifier' && <>
        <rect x="143" y="55" width="158" height="247" rx="48" fill={'url(#'+gradient+')'} stroke="#A7B1BD" strokeWidth="2"/>
        <rect x="154" y="68" width="136" height="110" rx="34" fill="#E6EBF1"/>
        <path d="M153 174h138" stroke="#A7B2BF" strokeWidth="2"/>
        <rect x="181" y="101" width="81" height="26" rx="12" fill="#334B61"/>
        <circle cx="220" cy="114" r="5" fill="#85C6B0"/>
        <path d="M170 246h103" stroke="#A9B3BE" strokeWidth="2"/>
      </>}
      {kind === 'speaker' && <>
        <rect x="103" y="80" width="232" height="196" rx="27" fill="#202B38" stroke="#617080" strokeWidth="4"/>
        <rect x="117" y="93" width="204" height="166" rx="19" fill="#273542"/>
        <circle cx="219" cy="178" r="68" fill="#192532" stroke="#425569" strokeWidth="5"/>
        <circle cx="219" cy="178" r="47" fill="#253848" stroke="#5D7283" strokeWidth="3"/>
        <circle cx="219" cy="178" r="18" fill="#536B7C"/>
        <circle cx="290" cy="115" r="5" fill="#76C0A7"/>
      </>}
      {kind === 'laptop' && <>
        <rect x="67" y="62" width="306" height="205" rx="12" fill="#172536" stroke="#A3ADBA" strokeWidth="6"/>
        <rect x="77" y="73" width="286" height="183" rx="3" fill={'url(#'+screen+')'}/>
        <path d="M78 241c105-92 129-60 282-163v178H78Z" fill="#537A8D" opacity=".6"/>
        <path d="M43 270h355l-17 23H59l-16-23Z" fill="#B5BEC9"/>
        <path d="M185 270h71l-6 9h-60l-5-9Z" fill="#8D99A6"/>
      </>}
    </svg>
  );
}
