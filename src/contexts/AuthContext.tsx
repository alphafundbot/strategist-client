
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onIdTokenChanged, User, IdTokenResult } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

async function setSessionCookie(idToken: string) {
  await fetch('/api/auth/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });
}

async function clearSessionCookie() {
    await fetch('/api/auth/session', { method: 'DELETE' });
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (newUser) => {
      setUser(newUser);
      setLoading(false);
      if (newUser) {
        const idToken = await newUser.getIdToken();
        await setSessionCookie(idToken);
      } else {
        await clearSessionCookie();
      }
    });

    return () => unsubscribe();
  }, []);
  
  // Force a token refresh on visibility change to keep session alive
  useEffect(() => {
    const onVisibilityChange = () => {
        if (document.visibilityState === 'visible' && auth.currentUser) {
            auth.currentUser.getIdToken(true);
        }
    }
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  },[])


  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
