import { type Product } from '@/types';

/**
 * Google Merchant Center (GMC) API Integration
 * 
 * This module handles:
 * 1. Fetching products from the GMC Content API
 * 2. Patching optimized titles via supplemental feeds
 */

const GMC_API_BASE = 'https://shoppingcontent.googleapis.com/content/v2.1';

export interface GmcProduct {
  id: string;
  offerId: string;
  title: string;
  description: string;
  link: string;
  imageLink: string;
  contentLanguage: string;
  targetCountry: string;
  channel: string;
  brand?: string;
  googleProductCategory?: string;
  price: {
    value: string;
    currency: string;
  };
}

/**
 * Fetch products from GMC using an OAuth token
 */
export async function fetchGmcProducts(
  merchantId: string,
  accessToken: string,
  maxResults = 250
): Promise<Product[]> {
  const response = await fetch(`${GMC_API_BASE}/${merchantId}/products?maxResults=${maxResults}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`GMC fetch failed: ${error.error?.message || response.statusText}`);
  }

  const data = await response.json();
  const gmcItems: GmcProduct[] = data.resources || [];

  return gmcItems.map((item) => ({
    id: item.id,
    storeId: '', // To be filled by caller
    gmcId: item.offerId,
    title: item.title,
    originalTitle: item.title,
    currentTitle: item.title,
    description: item.description,
    imageUrl: item.imageLink,
    price: parseFloat(item.price.value),
    currency: item.price.currency,
    category: item.googleProductCategory || 'Uncategorized',
    brand: item.brand || 'No Brand',
    geography: item.targetCountry,
    language: item.contentLanguage,
    titleScore: 0, // Calculated during sync
    titleIssues: [],
    impressions: 0,
    clicks: 0,
    ctr: 0,
    conversions: 0,
    revenue: 0,
    lastOptimizedAt: null,
    optimizationCount: 0,
    status: 'pending',
  }));
}

/**
 * List account info to help user select the correct Merchant ID
 */
export async function listGmcAccounts(accessToken: string) {
  const response = await fetch(`${GMC_API_BASE}/accounts/authinfo`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) throw new Error('Failed to fetch GMC accounts info');
  const data = await response.json();
  return data.accountIdentifiers || [];
}

/**
 * Push an updated title to GMC (v2.1 custombatch patch)
 */
export async function updateGmcProductTitle(
  merchantId: string,
  accessToken: string,
  productId: string,
  newTitle: string
) {
  const response = await fetch(`${GMC_API_BASE}/${merchantId}/products/${productId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: newTitle,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`GMC title update failed: ${error.error?.message}`);
  }

  return response.json();
}
