/**
 * Transparent, indicative buying tools; none of these are lender approvals,
 * engineering load calculations, real-time inventory or contractual offers.
 */
export type Exposure = 'normal' | 'sun';
export function suggestAc(area: number, exposure: Exposure, hours: number) {
  const adjusted = Math.max(80, Math.min(400, area)) * (exposure === 'sun' ? 1.18 : 1) * (hours >= 10 ? 1.06 : 1);
  const tons = adjusted <= 120 ? '1.0 ton' : adjusted <= 210 ? '1.5 ton' : adjusted <= 310 ? '2.0 ton' : 'Expert assessment';
  const efficiency = hours >= 9 ? 'Compare higher BEE-rated models for longer daily use' : 'Compare efficiency and upfront budget together';
  return { tons, efficiency, adjustedArea: Math.round(adjusted) };
}
export function suggestTv(distanceFeet: number) {
  const feet = Math.max(5, Math.min(14, distanceFeet));
  const inches = feet <= 6 ? 43 : feet <= 8 ? 55 : feet <= 11 ? 65 : 75;
  return { inches, note: inches >= 65 ? 'Compare room brightness, viewing angles and wall width.' : 'Compare 4K picture quality and room lighting.' };
}
export function suggestLaundry(familyMembers: number) {
  if (familyMembers <= 2) return { washer: '6–7 kg', fridge: '200–300 L' };
  if (familyMembers <= 4) return { washer: '7–8 kg', fridge: '300–400 L' };
  return { washer: '9 kg+', fridge: '400 L+' };
}
export function emiIllustration(price: number, downPayment: number, exchangeAssumption: number, months: number) {
  const safePrice = Math.max(0, Math.min(200000, price));
  const safeDown = Math.max(0, Math.min(safePrice, downPayment));
  const safeExchange = Math.max(0, Math.min(safePrice - safeDown, exchangeAssumption));
  const financed = Math.max(0, safePrice - safeDown - safeExchange);
  const term = [3, 6, 9, 12, 18, 24].includes(months) ? months : 12;
  return { financed, months: term, monthly: Math.ceil(financed / term), downPayment: safeDown, exchangeAssumption: safeExchange };
}
export function safeMessage(message: string) {
  return message.replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, 1500);
}
export function whatsappUrl(phone: string, message: string) {
  const digits = phone.replace(/\D/g, '');
  if (!/^\d{10,15}$/.test(digits)) return null;
  return 'https://wa.me/' + digits + '?text=' + encodeURIComponent(safeMessage(message));
}
export function isIndianMobile(phone: string) { return /^[6-9]\d{9}$/.test(phone.trim()); }
export function indianRupees(value: number) { return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value); }
