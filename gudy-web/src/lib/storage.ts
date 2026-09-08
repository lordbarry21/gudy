import { STORAGE_KEYS } from './constants'
import type { UserProgress, Subject, Topic, Achievement, StudySession, DailyStudySummary } from '@/types'

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

// Study Sessions
export function getStudySessions(): StudySession[] {
  return getFromStorage(STORAGE_KEYS.STUDY_SESSIONS, [])
}

export function saveStudySessions(sessions: StudySession[]): void {
  setToStorage(STORAGE_KEYS.STUDY_SESSIONS, sessions)
}

export function addStudySession(session: StudySession): void {
  const sessions = getStudySessions()
  sessions.push(session)
  // Keep only last 100 sessions to prevent storage overflow
  const trimmed = sessions.slice(-100)
  saveStudySessions(trimmed)
}

export function getTodaySessions(): StudySession[] {
  const sessions = getStudySessions()
  const today = new Date().toISOString().split('T')[0]
  return sessions.filter(s => s.date === today)
}

export function getDailySummaries(days: number = 7): DailyStudySummary[] {
  const sessions = getStudySessions()
  const summaries: Record<string, DailyStudySummary> = {}

  // Get last N days
  for (let i = 0; i < days; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    summaries[dateStr] = {
      date: dateStr,
      totalMinutes: 0,
      sessions: [],
      topicsCompleted: 0,
      subjectBreakdown: {},
    }
  }

  // Fill in session data
  sessions.forEach(session => {
    if (summaries[session.date]) {
      const summary = summaries[session.date]
      summary.totalMinutes += session.durationMinutes
      summary.sessions.push(session)
      summary.subjectBreakdown[session.subjectId] =
        (summary.subjectBreakdown[session.subjectId] || 0) + session.durationMinutes
    }
  })

  return Object.values(summaries).sort((a, b) => b.date.localeCompare(a.date))
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
