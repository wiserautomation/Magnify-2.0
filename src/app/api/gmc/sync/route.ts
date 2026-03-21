import { NextResponse } from 'next/server';
import { fetchGmcProducts } from '@/lib/gmc/api';
import { db } from '@/lib/firebase/firestore'; // Note: Server-side usage requires firebase-admin for full security, 
                                             // but for this v1 spike we use the standard db with appropriate rules.
import { doc, collection, writeBatch, serverTimestamp } from 'firebase/firestore';
import { scoreTitle } from '@/lib/scoring/titleScorer';

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

    // 2. Batch write to Firestore
    const batch = writeBatch(db);
    const productsRef = collection(db, 'stores', storeId, 'products');

    for (const product of products) {
      const scoring = scoreTitle(product.title, product.brand);
      const productDoc = {
        ...product,
        storeId,
        titleScore: scoring.score,
        titleIssues: scoring.issues,
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
