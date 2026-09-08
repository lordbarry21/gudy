'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { FirebaseUser } from '@/types'

interface AuthContextType {
  user: FirebaseUser | null
  firebaseUser: User | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, displayName: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Convert Firebase User to our FirebaseUser type
  const convertUser = (firebaseUser: User): FirebaseUser => ({
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
  })

  // Create or update user document in Firestore
  const createUserDocument = async (firebaseUser: User) => {
    try {
      const userRef = doc(db, 'users', firebaseUser.uid)
      const userSnap = await getDoc(userRef)

      if (!userSnap.exists()) {
        // Create new user document
        await setDoc(userRef, {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || 'User',
          photoURL: firebaseUser.photoURL || null,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
          // Initialize progress data
          progress: {
            streak: 0,
            longestStreak: 0,
            totalTopicsCompleted: 0,
            totalMinutesSpent: 0,
            dailyGoal: 3,
            totalStudyDays: 0,
          },
          quizProgress: {
            attempts: [],
            bestScores: {},
            totalQuizzesTaken: 0,
            averageScore: 0,
          },
        })
      } else {
        // Update last login
        await setDoc(
          userRef,
          { lastLoginAt: serverTimestamp() },
          { merge: true }
        )
      }
    } catch (err) {
      console.error('Error creating user document:', err)
    }
  }

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setFirebaseUser(currentUser)
      setUser(currentUser ? convertUser(currentUser) : null)

      if (currentUser) {
        await createUserDocument(currentUser)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err: unknown) {
      const firebaseError = err as { code?: string }
      let message = 'Failed to sign in'

      if (firebaseError.code === 'auth/user-not-found') {
        message = 'Email belum terdaftar'
      } else if (firebaseError.code === 'auth/wrong-password') {
        message = 'Password salah'
      } else if (firebaseError.code === 'auth/invalid-email') {
        message = 'Format email tidak valid'
      } else if (firebaseError.code === 'auth/too-many-requests') {
        message = 'Terlalu banyak percobaan. Coba lagi nanti'
      }

      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }, [])

  const signUp = useCallback(
    async (email: string, password: string, displayName: string) => {
      setLoading(true)
      setError(null)
      try {
        const { user: newUser } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        await updateProfile(newUser, { displayName })
      } catch (err: unknown) {
        const firebaseError = err as { code?: string }
        let message = 'Failed to sign up'

        if (firebaseError.code === 'auth/email-already-in-use') {
          message = 'Email sudah terdaftar'
        } else if (firebaseError.code === 'auth/weak-password') {
          message = 'Password minimal 6 karakter'
        } else if (firebaseError.code === 'auth/invalid-email') {
          message = 'Format email tidak valid'
        }

        setError(message)
        throw new Error(message)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const signInWithGoogle = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (err: unknown) {
      const firebaseError = err as { code?: string }
      let message = 'Failed to sign in with Google'

      if (firebaseError.code === 'auth/popup-closed-by-user') {
        message = 'Popup ditutup sebelum login selesai'
      }

      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }, [])

  const signOut = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      await firebaseSignOut(auth)
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to sign out'
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        loading,
        error,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
