'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { id, en, Language, TranslationKeys } from './translations'

interface LanguageStore {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslationKeys
}

// Get translations based on language
const translations: Record<Language, TranslationKeys> = { id, en }

export const useLanguage = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'id', // Default to Indonesian
      setLanguage: (lang: Language) => set({ language: lang, t: translations[lang] }),
      t: translations.id, // Default translations
    }),
    {
      name: 'gudy_language',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.t = translations[state.language]
        }
      },
    }
  )
)

// Helper function to get greeting based on time of day
export function getGreetingTranslation(t: TranslationKeys): string {
  const hour = new Date().getHours()

  if (hour >= 5 && hour < 12) {
    return t.greeting.morning
  } else if (hour >= 12 && hour < 18) {
    return t.greeting.afternoon
  } else {
    return t.greeting.evening
  }
}

// Helper to format streak text
export function formatStreak(streak: number, t: TranslationKeys): string {
  return `${streak} ${streak === 1 ? t.home.day : t.home.days}`
}
