import test from 'node:test';
import assert from 'node:assert/strict';
import { publicProducts, publishingIssues, verifiedProducts } from '../src/data/verifiedProducts.ts';
import { photos, editorialUrl } from '../src/data/editorialImages.ts';

const reviewDate = new Date('2026-11-22T12:00:00.000Z');
const approved = {
  sku: 'UNIT-TEST-ONLY',
  displayName: 'Test-only appliance',
  brand: 'Test brand',
  category: 'Cooling',
  specifications: ['1.5 ton', 'Inverter'],
  availability: 'confirmed_in_stock',
  priceInr: 45000,
  approvedByStore: true,
  approvedOn: '2026-11-22',
  lastCheckedOn: '2026-11-22',
};

test('production catalogue is empty until store owner approves real SKUs', () => {
  assert.deepEqual(verifiedProducts, []);
});
test('approved item publishes only with current approval and inventory check', () => {
  assert.deepEqual(publishingIssues(approved, reviewDate), []);
  assert.deepEqual(publicProducts([approved], reviewDate), [approved]);
  assert.equal(publicProducts([{ ...approved, approvedByStore: false }], reviewDate).length, 0);
  assert.equal(publicProducts([{ ...approved, lastCheckedOn: '2026-11-18' }], reviewDate).length, 0);
});
test('invalid prices, future checks, and empty attributes fail closed', () => {
  assert(publishingIssues({...approved, priceInr: -1}, reviewDate).some(x => x.includes('price')));
  assert(publishingIssues({...approved, lastCheckedOn: '2027-01-01'}, reviewDate).some(x => x.includes('Future')));
  assert(publishingIssues({...approved, sku: ' '}, reviewDate).some(x => x.includes('SKU')));
});
test('every visual has a unique traceable public editorial source', () => {
  const items = Object.values(photos);
  assert.equal(items.length, 8);
  assert.equal(new Set(items.map(x => x.id)).size, 8);
  for (const item of items) {
    assert.match(item.page, /^https:\/\/www\.pexels\.com\/photo\//);
    assert.match(item.photographer, /\S+\s*\S*/);
    assert.match(editorialUrl(item.id,900), /^https:\/\/images\.pexels\.com\/photos\/\d+\//);
  }
});
