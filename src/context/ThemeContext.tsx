'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

type Theme = 'light' | 'dark';
interface ThemeContextType {
  theme: Theme;
  toggle: () => void;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const auth = getAuth();
  const db = getFirestore();

  // On mount, load user’s preference
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const prefDoc = doc(db, 'users', uid, 'preferences', 'ui');
    getDoc(prefDoc).then(snap => {
      const data = snap.data();
      if (data?.theme === 'dark') setTheme('dark');
      else setTheme('light');
    });
  }, [auth.currentUser, db]);

  // Whenever theme changes, persist
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const prefDoc = doc(db, 'users', uid, 'preferences', 'ui');
    setDoc(prefDoc, { theme }, { merge: true })
      .catch(err => console.error('Failed to save theme:', err));
  }, [theme, auth.currentUser, db]);

  const toggle = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div className={theme === 'dark' ? 'dark' : ''}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be within ThemeProvider');
  return ctx;
}