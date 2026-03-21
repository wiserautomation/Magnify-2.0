import { NextResponse } from 'next/server';
import { fetchGmcProducts } from '@/lib/gmc/api';
import { db } from '@/lib/firebase/firestore'; 
import { doc, collection, writeBatch, serverTimestamp } from 'firebase/firestore';
import { scoreTitle } from '@/lib/scoring/titleScorer';
import { analyzeProductImage } from '@/lib/ai/vision';
import { scoutMarketGaps } from '@/lib/ai/scouter';
import { generateTitleVariants } from '@/lib/ai/engine';

/**
 * API Route to trigger a catalog sync from GMC
 */
export async function POST(req: Request) {
  try {
    const { merchantId, accessToken, userId, storeId } = await req.json();

    if (!merchantId || !accessToken || !userId || !storeId) {
      return NextResponse.json({ error: 'Missing sync parameters' }, { status: 400 });
    }

    // 1. Fetch from GMC
    const products = await fetchGmcProducts(merchantId, accessToken);

    // 1.5. Scout for Market Gaps (for the category of the first product as sample)
    const marketGaps = await scoutMarketGaps(products[0]?.category || 'General', ['Competitor1.com', 'Competitor2.com']);

    // 2. Batch write to Firestore
    const batch = writeBatch(db);
    const productsRef = collection(db, 'stores', storeId, 'products');

    for (const product of products) {
      // Score Title
      const scoring = scoreTitle(product.title, product.brand);
      
      // Vision Analysis (Kill-Zone detection)
      const vision = await analyzeProductImage(product.imageUrl);

      const productDoc = {
        ...product,
        storeId,
        titleScore: scoring.score,
        titleIssues: scoring.issues,
        visionMetrics: {
           isTruncated: vision.isTruncated,
           centeringScore: vision.score,
           recommendation: vision.recommendation
        },
        syncAt: serverTimestamp(),
      };
      
      const docRef = doc(productsRef, product.id);
      batch.set(docRef, productDoc, { merge: true });
    }

    await batch.commit();

    // 3. Update store status
    const storeRef = doc(db, 'stores', storeId);
    await batch.set(storeRef, { 
      lastSyncAt: serverTimestamp(),
      totalProducts: products.length
    }, { merge: true });

    return NextResponse.json({ success: true, count: products.length });

  } catch (error: any) {
    console.error('Core sync error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
