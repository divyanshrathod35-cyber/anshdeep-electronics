import type { Category } from './catalog';

/**
 * Store-owner approved public SKU publishing gate.
 *
 * This file intentionally ships with no product entries because there is no
 * verified showroom inventory, retail price, or product-photo permission yet.
 * Add only written-owner-approved entries and keep audit evidence separately.
 */
export type VerifiedProduct = {
  sku: string;
  displayName: string;
  brand: string;
  category: Exclude<Category, 'All'>;
  specifications: string[];
  availability: 'ask_store' | 'confirmed_in_stock';
  priceInr?: number;
  originalPriceInr?: number;
  approvedByStore: true;
  approvedOn: string; // ISO date
  lastCheckedOn: string; // ISO date
  /** Explicitly owner-provided or legally licensed product photo path, if any */
  imagePath?: string;
};

export const verifiedProducts: ReadonlyArray<VerifiedProduct> = [];

export function publishingIssues(product: VerifiedProduct, today = new Date()): string[] {
  const errors: string[] = [];
  const nonEmpty = (v: string) => v.trim().length > 0;
  if (!nonEmpty(product.sku)) errors.push('Missing SKU');
  if (!nonEmpty(product.displayName)) errors.push('Missing model name');
  if (!nonEmpty(product.brand)) errors.push('Missing brand');
  if (!product.approvedByStore) errors.push('Store approval required');
  const checked = new Date(product.lastCheckedOn + 'T00:00:00Z');
  const approved = new Date(product.approvedOn + 'T00:00:00Z');
  if (Number.isNaN(checked.getTime()) || Number.isNaN(approved.getTime())) errors.push('Invalid approval dates');
  if (product.priceInr !== undefined && (!Number.isFinite(product.priceInr) || product.priceInr <= 0)) errors.push('Invalid price');
  if (product.originalPriceInr !== undefined && (!Number.isFinite(product.originalPriceInr) || product.originalPriceInr <= 0)) errors.push('Invalid MRP');
  if (product.availability === 'confirmed_in_stock' && (!Number.isFinite(checked.getTime()) || today.getTime() - checked.getTime() > 24 * 60 * 60 * 1000)) errors.push('Stock confirmation stale (24h)');
  if (checked.getTime() > today.getTime() + 24 * 60 * 60 * 1000) errors.push('Future-dated verification');
  if (product.specifications.length > 5) errors.push('Too many specification pills');
  return errors;
}

export function publicProducts(items: readonly VerifiedProduct[], today = new Date()): VerifiedProduct[] {
  return items.filter(item => publishingIssues(item,today).length === 0);
}
