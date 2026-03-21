import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { app } from './config';

export const auth = getAuth(app);

// Google provider configured with GMC + Ads scopes
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/content'); // GMC
googleProvider.addScope('https://www.googleapis.com/auth/adwords'); // Google Ads
googleProvider.setCustomParameters({ access_type: 'offline', prompt: 'consent' });

export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  return { user: result.user, credential };
}

export async function signOut() {
  await firebaseSignOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
