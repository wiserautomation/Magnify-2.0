import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  onSnapshot,
  serverTimestamp,
  type DocumentData,
  type QueryConstraint,
  Timestamp,
} from 'firebase/firestore';
import { app } from './config';

export const db = getFirestore(app);
export { serverTimestamp, Timestamp };

// ── User helpers ────────────────────────────────────────────────────────────

export async function upsertUser(uid: string, data: DocumentData) {
  const ref = doc(db, 'users', uid);
  await setDoc(ref, { ...data, updatedAt: serverTimestamp() }, { merge: true });
}

export async function getUser(uid: string) {
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// ── Store helpers ────────────────────────────────────────────────────────────

export async function getStoresByUser(userId: string) {
  const q = query(collection(db, 'stores'), where('userId', '==', userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function createStore(data: DocumentData) {
  return addDoc(collection(db, 'stores'), {
    ...data,
    createdAt: serverTimestamp(),
    lastSyncAt: null,
  });
}

export async function updateStore(storeId: string, data: DocumentData) {
  await updateDoc(doc(db, 'stores', storeId), { ...data, updatedAt: serverTimestamp() });
}

// ── Product helpers ──────────────────────────────────────────────────────────

export async function getProducts(storeId: string, constraints: QueryConstraint[] = []) {
  const q = query(collection(db, 'stores', storeId, 'products'), ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getProductsRealtime(
  storeId: string,
  cb: (products: DocumentData[]) => void,
  constraints: QueryConstraint[] = [],
) {
  const q = query(collection(db, 'stores', storeId, 'products'), ...constraints);
  return onSnapshot(q, (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
}

// ── Experiment helpers ───────────────────────────────────────────────────────

export async function getExperiments(storeId: string, constraints: QueryConstraint[] = []) {
  const q = query(collection(db, 'stores', storeId, 'experiments'), ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getExperimentsRealtime(
  storeId: string,
  cb: (exps: DocumentData[]) => void,
) {
  const q = query(
    collection(db, 'stores', storeId, 'experiments'),
    orderBy('startedAt', 'desc'),
    limit(50),
  );
  return onSnapshot(q, (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
}

// ── Intelligence helpers ─────────────────────────────────────────────────────

export async function getPlatformBenchmarks(category?: string) {
  if (category) {
    const snap = await getDoc(doc(db, 'platform_benchmarks', category));
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  }
  const snap = await getDocs(collection(db, 'platform_benchmarks'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getIntelligenceInsights(constraints: QueryConstraint[] = []) {
  const q = query(collection(db, 'intelligence'), ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
