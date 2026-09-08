import { STORAGE_KEYS } from './constants'
import type { UserProgress, Subject, Topic, Achievement } from '@/types'

// Get data from localStorage
function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue

  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

// Set data to localStorage
function setToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Failed to save to localStorage: ${key}`, error)
  }
}

// User Progress
export function getProgress(): UserProgress {
  return getFromStorage(STORAGE_KEYS.PROGRESS, {
    streak: 0,
    longestStreak: 0,
    lastActiveAt: undefined,
    totalTopicsCompleted: 0,
    totalMinutesSpent: 0,
    dailyGoal: 3,
    streakFreezeAvailable: 1,
    totalStudyDays: 0,
    createdAt: new Date().toISOString(),
    userName: 'Learner',
  })
}

export function saveProgress(progress: UserProgress): void {
  setToStorage(STORAGE_KEYS.PROGRESS, progress)
}

// Subjects
export function getSubjects(): Subject[] {
  return getFromStorage(STORAGE_KEYS.SUBJECTS, [])
}

export function saveSubjects(subjects: Subject[]): void {
  setToStorage(STORAGE_KEYS.SUBJECTS, subjects)
}

// Topics
export function getTopics(): Topic[] {
  return getFromStorage(STORAGE_KEYS.TOPICS, [])
}

export function saveTopics(topics: Topic[]): void {
  setToStorage(STORAGE_KEYS.TOPICS, topics)
}

// Achievements
export function getAchievements(): Achievement[] {
  return getFromStorage(STORAGE_KEYS.ACHIEVEMENTS, [])
}

export function saveAchievements(achievements: Achievement[]): void {
  setToStorage(STORAGE_KEYS.ACHIEVEMENTS, achievements)
}

// Curriculum Version
export function getCurriculumVersion(): string | null {
  return getFromStorage<string | null>(STORAGE_KEYS.CURRICULUM_VERSION, null)
}

export function saveCurriculumVersion(version: string): void {
  setToStorage(STORAGE_KEYS.CURRICULUM_VERSION, version)
}

// Clear all data
export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach((key) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key)
    }
  })
}
