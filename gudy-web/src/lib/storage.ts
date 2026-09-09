import { STORAGE_KEYS } from './constants'
import type { UserProgress, Subject, Topic, Achievement, StudySession, DailyStudySummary, StudyTimerState } from '@/types'

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

// Timer State - For persisting focus timer across page navigation
export interface StoredTimerState {
  isActive: boolean
  isPaused: boolean
  selectedSubjectId: string | null
  selectedPreset: number
  remainingSeconds: number
  totalSeconds: number
  elapsedSeconds: number
  currentMode: 'focus' | 'break'
  startTime: string | null  // ISO timestamp when timer started (for calculating elapsed time)
  pausedAt: string | null   // ISO timestamp when paused
}

const DEFAULT_TIMER_STATE: StoredTimerState = {
  isActive: false,
  isPaused: false,
  selectedSubjectId: null,
  selectedPreset: 25,
  remainingSeconds: 25 * 60,
  totalSeconds: 25 * 60,
  elapsedSeconds: 0,
  currentMode: 'focus',
  startTime: null,
  pausedAt: null,
}

export function getTimerState(): StoredTimerState {
  return getFromStorage(STORAGE_KEYS.TIMER_STATE, DEFAULT_TIMER_STATE)
}

export function saveTimerState(state: StoredTimerState): void {
  setToStorage(STORAGE_KEYS.TIMER_STATE, state)
}

// Calculate elapsed seconds based on stored start time (for background timer)
export function calculateLiveElapsedSeconds(stored: StoredTimerState): number {
  if (!stored.isActive || !stored.startTime) {
    return stored.elapsedSeconds
  }

  if (stored.isPaused && stored.pausedAt) {
    // Timer is paused - calculate elapsed up to when it was paused
    const pausedTime = new Date(stored.pausedAt).getTime()
    const startTime = new Date(stored.startTime).getTime()
    return Math.floor((pausedTime - startTime) / 1000)
  }

  // Timer is running - calculate live elapsed
  const now = Date.now()
  const startTime = new Date(stored.startTime).getTime()
  return Math.floor((now - startTime) / 1000)
}

// Calculate live remaining seconds
export function calculateLiveRemainingSeconds(stored: StoredTimerState): number {
  const liveElapsed = calculateLiveElapsedSeconds(stored)
  const remaining = stored.totalSeconds - liveElapsed
  return Math.max(0, remaining)
}

// Clear all data
export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach((key) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key)
    }
  })
}
