'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { type User } from 'firebase/auth';
import { onAuthChange, signOut as firebaseSignOut } from '@/lib/firebase/auth';
import { getUser, upsertUser } from '@/lib/firebase/firestore';
import { type MagnifyUser } from '@/types';

interface AuthContextType {
  user: MagnifyUser | null;
  firebaseUser: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [magnifyUser, setMagnifyUser] = useState<MagnifyUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      setFirebaseUser(user);
      
      if (user) {
        // Fetch or create the MagnifyUser document in Firestore
        let mUser = await getUser(user.uid) as MagnifyUser | null;
        
        if (!mUser) {
          const newUser: Partial<MagnifyUser> = {
            id: user.uid,
            email: user.email || '',
            displayName: user.displayName || '',
            photoURL: user.photoURL || undefined,
            createdAt: new Date(),
            lastLoginAt: new Date(),
          };
          await upsertUser(user.uid, newUser);
          mUser = { ...newUser, id: user.uid, createdAt: new Date(), lastLoginAt: new Date() } as MagnifyUser;
        } else {
          // Update last login
          await upsertUser(user.uid, { lastLoginAt: new Date() });
          mUser.lastLoginAt = new Date();
        }
        
        setMagnifyUser(mUser);
      } else {
        setMagnifyUser(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    await firebaseSignOut();
  };

  return (
    <AuthContext.Provider value={{ user: magnifyUser, firebaseUser, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
