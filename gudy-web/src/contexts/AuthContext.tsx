'use client';

import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  User,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, isConfigured } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  clearError: () => void;
  isConfigured: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signUp: (email: string, pass: string, displayName?: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, pass: string) => {
    if (!auth) throw new Error('Firebase is not configured');
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Gagal masuk akun';
      setError(message);
      throw err;
    }
  };

  const signUp = async (email: string, pass: string, displayName?: string) => {
    if (!auth) throw new Error('Firebase is not configured');
    setError(null);
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, pass);
      if (displayName && credential.user) {
        await updateProfile(credential.user, { displayName });
        setUser({ ...credential.user, displayName });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Gagal mendaftar akun';
      setError(message);
      throw err;
    }
  };

  const signInWithGoogle = async () => {
    if (!auth) throw new Error('Firebase is not configured');
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Gagal masuk dengan Google';
      setError(message);
      throw err;
    }
  };

  const signInWithGithub = async () => {
    if (!auth) throw new Error('Firebase is not configured');
    setError(null);
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Gagal masuk dengan GitHub';
      setError(message);
      throw err;
    }
  };

  const signOut = async () => {
    if (!auth) throw new Error('Firebase is not configured');
    setError(null);
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        clearError,
        isConfigured,
        signIn,
        signUp,
        signInWithGoogle,
        signInWithGithub,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
