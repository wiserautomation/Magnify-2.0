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
  isDemo: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: MagnifyUser = {
  id: 'demo-id',
  email: 'test@test.com',
  displayName: 'Demo User',
  photoURL: undefined,
  createdAt: new Date(),
  lastLoginAt: new Date(),
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [isDemo, setIsDemo] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('magnify_demo_mode') === 'true';
    }
    return false;
  });
  const [magnifyUser, setMagnifyUser] = useState<MagnifyUser | null>(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('magnify_demo_mode') === 'true') {
      return DEMO_USER;
    }
    return null;
  });
  const [loading, setLoading] = useState(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('magnify_demo_mode') === 'true') {
      return false;
    }
    return true;
  });

  useEffect(() => {
    // Check if demo mode is active
    if (isDemo) {
      return;
    }

    const unsubscribe = onAuthChange(async (user) => {
      setFirebaseUser(user);
      
      if (user) {
        try {
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
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Fallback if firestore fails (e.g. during build or restricted env)
          setMagnifyUser({
            id: user.uid,
            email: user.email || '',
            displayName: user.displayName || 'User',
            createdAt: new Date(),
            lastLoginAt: new Date(),
          } as MagnifyUser);
        }
      } else {
        setMagnifyUser(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isDemo]);

  const signOut = async () => {
    localStorage.removeItem('magnify_demo_mode');
    setIsDemo(false);
    await firebaseSignOut();
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user: magnifyUser, firebaseUser, loading, signOut, isDemo }}>
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
