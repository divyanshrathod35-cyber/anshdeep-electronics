import test from 'node:test';
import assert from 'node:assert/strict';
import { suggestAc, suggestTv, suggestLaundry, emiIllustration, whatsappUrl, isIndianMobile, safeMessage } from '../src/lib/shopping.ts';

test('AC finder accounts for hotter top-floor rooms', () => {
  assert.equal(suggestAc(180, 'normal', 6).tons, '1.5 ton');
  assert.equal(suggestAc(180, 'sun', 12).tons, '2.0 ton');
});
test('TV finder uses inclusive bounds', () => {
  assert.equal(suggestTv(5).inches, 43);
  assert.equal(suggestTv(10).inches, 65);
  assert.equal(suggestTv(20).inches, 75);
});
test('Appliance sizing scales with family', () => {
  assert.equal(suggestLaundry(2).washer, '6–7 kg');
  assert.equal(suggestLaundry(5).fridge, '400 L+');
});
test('EMI illustration clamps invalid inputs and never goes negative', () => {
  assert.deepEqual(emiIllustration(30000, 10000, 5000, 6), { financed: 15000, monthly: 2500, months: 6, downPayment: 10000, exchangeAssumption: 5000 });
  assert.equal(emiIllustration(15000, 50000, 90000, 12).financed, 0);
});
test('WhatsApp URL encodes message and rejects unconfigured phone', () => {
  assert.equal(whatsappUrl('', 'quote'), null);
  assert.equal(whatsappUrl('919977108780', 'AC & TV')?.includes('AC%20%26%20TV'), true);
});
test('Indian mobile validation and message hygiene', () => {
  assert.equal(isIndianMobile('9876543210'), true);
  assert.equal(isIndianMobile('1234567890'), false);
  assert.equal(safeMessage('A\nB'), 'A B');
});
