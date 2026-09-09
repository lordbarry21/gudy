/**
 * Hook for tracking feature-level tutorial status
 * Tracks which features the user has seen tutorials for
 */

import { useState, useEffect, useCallback } from 'react'

export type FeatureType = 'learn' | 'progress' | 'practice' | 'focus' | 'streak' | 'profile'

interface FeatureTutorialState {
  hasSeenLearn: boolean
  hasSeenProgress: boolean
  hasSeenPractice: boolean
  hasSeenFocus: boolean
  hasSeenStreak: boolean
  hasSeenProfile: boolean
}

const STORAGE_KEY = 'gudy_feature_tutorials_seen'

const defaultState: FeatureTutorialState = {
  hasSeenLearn: false,
  hasSeenProgress: false,
  hasSeenPractice: false,
  hasSeenFocus: false,
  hasSeenStreak: false,
  hasSeenProfile: false,
}

export function useFeatureTutorial() {
  const [state, setState] = useState<FeatureTutorialState>(defaultState)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setState({ ...defaultState, ...parsed })
      }
    } catch {
      // Ignore parse errors
    }
    setIsLoaded(true)
  }, [])

  // Save state to localStorage whenever it changes
  const saveState = useCallback((newState: FeatureTutorialState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
    } catch {
      // Ignore storage errors
    }
    setState(newState)
  }, [])

  // Mark a feature as having seen its tutorial
  const markFeatureSeen = useCallback((feature: FeatureType) => {
    const key = `hasSeen${feature.charAt(0).toUpperCase() + feature.slice(1)}` as keyof FeatureTutorialState
    if (state[key]) return // Already seen

    saveState({
      ...state,
      [key]: true,
    })
  }, [state, saveState])

  // Check if a feature tutorial has been seen
  const hasSeen = useCallback((feature: FeatureType): boolean => {
    const key = `hasSeen${feature.charAt(0).toUpperCase() + feature.slice(1)}` as keyof FeatureTutorialState
    return state[key]
  }, [state])

  // Reset all feature tutorials (for testing)
  const resetAll = useCallback(() => {
    saveState(defaultState)
  }, [saveState])

  // Check if ALL features have been seen
  const allFeaturesSeen = Object.values(state).every(Boolean)

  return {
    state,
    isLoaded,
    markFeatureSeen,
    hasSeen,
    allFeaturesSeen,
    resetAll,
  }
}

// Feature tutorial config
export interface FeatureTutorialConfig {
  feature: FeatureType
  title: string
  description: string
  icon: React.ReactNode
  actionLabel: string
}

export const FEATURE_TUTORIALS: Record<FeatureType, FeatureTutorialConfig> = {
  learn: {
    feature: 'learn',
    title: '📚 Halaman Learn',
    description: 'Pelajari materi dengan graph interaktif. Klik setiap node untuk melihat detail dan centang saat sudah dipahami. Gunakan filter untuk fokus pada subjek tertentu.',
    icon: '📚',
    actionLabel: 'Mulai Belajar',
  },
  progress: {
    feature: 'progress',
    title: '📈 Halaman Progress',
    description: 'Lacak perkembangan belajarmu dengan visualisasi yang jelas. Lihat statistik mingguan, monthly summary, dan analisis performa quiz.',
    icon: '📈',
    actionLabel: 'Lihat Progress',
  },
  practice: {
    feature: 'practice',
    title: '✍️ Halaman Practice',
    description: 'Uji pemahamanmu dengan quiz interaktif! Pilih subjek, jawab pertanyaan, dan lihat skor terbaikmu. Ada juga latihan PDF untuk persiapan ujian.',
    icon: '✍️',
    actionLabel: 'Mulai Practice',
  },
  focus: {
    feature: 'focus',
    title: '⏱️ Mode Fokus',
    description: 'Gunakan timer Pomodoro untuk sesi belajar yang lebih fokus. Atur durasi sesuai kebutuhanmu dan fokus hanya pada belajar!',
    icon: '⏱️',
    actionLabel: 'Coba Focus Mode',
  },
  streak: {
    feature: 'streak',
    title: '🔥 Daily Streak',
    description: 'Jaga streakmu dengan belajar setiap hari! Selesaikan target harian untuk menambah streak. Gunakan Streak Freeze jika butuh istirahat satu hari.',
    icon: '🔥',
    actionLabel: 'Pelajari Streak',
  },
  profile: {
    feature: 'profile',
    title: '⚙️ Pengaturan Profil',
    description: 'Atur target harian, lihat statistik quiz keseluruhan, atur tema dan bahasa, serta kelola akunmu di halaman Profil.',
    icon: '⚙️',
    actionLabel: 'Pengaturan',
  },
}
