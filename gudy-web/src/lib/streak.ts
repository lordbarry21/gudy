import type { UserProgress, Topic, StudySession } from '@/types'

export interface WeekDayStatus {
  label: string
  fullDay: string
  dateStr: string
  completed: boolean
  isToday: boolean
  isPast: boolean
  isSkipped: boolean
  isFrozen?: boolean
}

export const MAX_STREAK_FREEZES = 2
export const FREEZE_STREAK_INTERVAL = 7

/**
 * Formats a Date object to YYYY-MM-DD in local time
 */
export function formatLocalDate(date: Date = new Date()): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Calculates the calendar days difference between two YYYY-MM-DD strings (d2 - d1)
 */
export function getCalendarDaysDiff(earlierDateStr: string, laterDateStr: string): number {
  const [y1, m1, d1] = earlierDateStr.split('-').map(Number)
  const [y2, m2, d2] = laterDateStr.split('-').map(Number)
  const date1 = new Date(y1, m1 - 1, d1).getTime()
  const date2 = new Date(y2, m2 - 1, d2).getTime()
  return Math.round((date2 - date1) / (1000 * 60 * 60 * 24))
}

/**
 * Returns the count of topics completed on today's local date
 */
export function getTodayTopicsCompletedCount(topics: Topic[]): number {
  const todayStr = formatLocalDate()
  return topics.filter((t) => t.isLeaf && t.completedAt && t.completedAt.startsWith(todayStr)).length
}

/**
 * Returns whether a specific date had study activity (via study session or topic completion)
 */
export function isDateActive(
  dateStr: string,
  studySessions: StudySession[],
  topics: Topic[]
): boolean {
  const hasSession = studySessions.some(
    (s) => s.date === dateStr || (s.completedAt && s.completedAt.startsWith(dateStr))
  )
  if (hasSession) return true

  return topics.some(
    (t) =>
      (t.completedAt && t.completedAt.startsWith(dateStr)) ||
      t.checklist.some((c) => c.checkedAt && c.checkedAt.startsWith(dateStr))
  )
}

/**
 * Computes the 7-day activity array for the current Monday-to-Sunday week
 */
export function getWeeklyActivity(
  studySessions: StudySession[],
  topics: Topic[],
  currentStreak: number,
  lastActiveAt?: string
): WeekDayStatus[] {
  const now = new Date()
  const currentDayIndex = now.getDay()
  // Monday = 0, ..., Sunday = 6
  const mondayOffset = (currentDayIndex + 6) % 7

  const monday = new Date(now)
  monday.setDate(now.getDate() - mondayOffset)
  monday.setHours(0, 0, 0, 0)

  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const todayStr = formatLocalDate(now)

  // Determine if Sunday before this Monday had active streak
  const prevSunday = new Date(monday)
  prevSunday.setDate(monday.getDate() - 1)
  const prevSundayStr = formatLocalDate(prevSunday)
  let prevDayActive = isDateActive(prevSundayStr, studySessions, topics)

  return Array.from({ length: 7 }, (_, i) => {
    const dayDate = new Date(monday)
    dayDate.setDate(monday.getDate() + i)
    const dateStr = formatLocalDate(dayDate)
    const isToday = dateStr === todayStr
    const isPast = dayDate < now && !isToday

    // Active if recorded in sessions/topics, or covered by active consecutive streak
    let completed = isDateActive(dateStr, studySessions, topics)
    if (!completed && currentStreak > 0 && isPast) {
      const daysAgo = getCalendarDaysDiff(dateStr, todayStr)
      if (daysAgo > 0 && daysAgo < currentStreak) {
        completed = true
      }
    }

    // Check if protected by streak freeze yesterday
    let isFrozen = false
    if (!completed && isPast && lastActiveAt && currentStreak > 0) {
      const lastActiveStr = lastActiveAt.split('T')[0]
      const daysSinceLastActive = getCalendarDaysDiff(lastActiveStr, todayStr)
      const daysAgo = getCalendarDaysDiff(dateStr, todayStr)
      if (daysSinceLastActive === 2 && daysAgo === 1) {
        isFrozen = true
      }
    }

    // A past day is ONLY marked as skipped (broken streak X) if the user had an active
    // streak immediately prior to that day, but missed this day without a freeze.
    // If the user had no active streak yet, the slot remains empty (no X).
    const isSkipped = isPast && !completed && !isFrozen && prevDayActive

    // Update active streak tracker for next day
    prevDayActive = completed || isFrozen

    return {
      label: dayLabels[i],
      fullDay: dayNames[i],
      dateStr,
      completed,
      isToday,
      isPast,
      isSkipped,
      isFrozen,
    }
  })
}

/**
 * Evaluates current streak and applies streak freeze protection if yesterday was missed
 */
export function evaluateStreakOnAppLaunch(
  progress: UserProgress,
  studySessions: StudySession[],
  topics: Topic[]
): { updatedProgress: UserProgress; freezeConsumed: boolean } {
  if (!progress.lastActiveAt) {
    return { updatedProgress: progress, freezeConsumed: false }
  }

  const todayStr = formatLocalDate()
  const lastActiveStr = progress.lastActiveAt.split('T')[0]
  const daysSinceLastActive = getCalendarDaysDiff(lastActiveStr, todayStr)

  // Already active today or yesterday was active: streak is healthy
  if (daysSinceLastActive <= 1) {
    return { updatedProgress: progress, freezeConsumed: false }
  }

  // User missed yesterday or more: check for streak freeze
  const availableFreezes = progress.streakFreezeAvailable ?? 1

  // Missed exactly 1 day (daysSinceLastActive === 2) and has a freeze
  if (daysSinceLastActive === 2 && availableFreezes > 0 && progress.streak > 0) {
    const updatedProgress: UserProgress = {
      ...progress,
      streakFreezeAvailable: Math.max(availableFreezes - 1, 0),
    }
    return { updatedProgress, freezeConsumed: true }
  }

  // More than 1 day missed or no freeze available: streak resets
  if (daysSinceLastActive > 1 && progress.streak > 0) {
    const updatedProgress: UserProgress = {
      ...progress,
      streak: 0,
    }
    return { updatedProgress, freezeConsumed: false }
  }

  return { updatedProgress: progress, freezeConsumed: false }
}

/**
 * Records new study activity for today, incrementing streak and awarding freezes at milestones
 */
export function recordStudyActivity(progress: UserProgress): {
  updatedProgress: UserProgress
  streakIncremented: boolean
  freezeEarned: boolean
} {
  const now = new Date()
  const todayStr = formatLocalDate(now)
  const availableFreezes = progress.streakFreezeAvailable ?? 1

  // Already active today: keep current streak
  if (progress.lastActiveAt && progress.lastActiveAt.startsWith(todayStr)) {
    return { updatedProgress: progress, streakIncremented: false, freezeEarned: false }
  }

  let newStreak = 1
  let newFreezes = availableFreezes
  let freezeEarned = false

  if (progress.lastActiveAt) {
    const lastActiveStr = progress.lastActiveAt.split('T')[0]
    const daysSinceLastActive = getCalendarDaysDiff(lastActiveStr, todayStr)

    if (daysSinceLastActive === 1) {
      // Consecutive day: increment streak
      newStreak = progress.streak + 1
    } else if (daysSinceLastActive === 2 && availableFreezes > 0 && progress.streak > 0) {
      // Used freeze for yesterday, continue streak
      newStreak = progress.streak + 1
      newFreezes = Math.max(availableFreezes - 1, 0)
    } else {
      // Streak broken, restart from 1
      newStreak = 1
    }
  }

  // Reward +1 Freeze every 7 streak days (capped at MAX_STREAK_FREEZES)
  if (newStreak > 0 && newStreak % FREEZE_STREAK_INTERVAL === 0 && newFreezes < MAX_STREAK_FREEZES) {
    newFreezes = Math.min(newFreezes + 1, MAX_STREAK_FREEZES)
    freezeEarned = true
  }

  const updatedProgress: UserProgress = {
    ...progress,
    streak: newStreak,
    longestStreak: Math.max(progress.longestStreak || 0, newStreak),
    lastActiveAt: now.toISOString(),
    totalStudyDays: (progress.totalStudyDays || 0) + 1,
    streakFreezeAvailable: newFreezes,
  }

  return { updatedProgress, streakIncremented: true, freezeEarned }
}

/**
 * Returns mock data demonstrating a scenario where the learner skipped yesterday
 * without having an active streak freeze, resetting their streak counter to 0.
 */
export function getSkippedDayDummyScenario(): {
  streak: number
  longestStreak: number
  streakFreezeAvailable: number
  todayTopicsCount: number
  dailyTargetCount: number
  weekDays: WeekDayStatus[]
} {
  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const todayStr = formatLocalDate()

  // Mon: Done, Tue: Done, Wed (yesterday): Skipped (no freeze), Thu (today): in progress, Fri-Sun: upcoming
  const weekDays: WeekDayStatus[] = dayLabels.map((label, i) => ({
    label,
    fullDay: dayNames[i],
    dateStr: todayStr,
    completed: i < 2,
    isToday: i === 3,
    isPast: i < 3,
    isSkipped: i === 2,
  }))

  return {
    streak: 0,
    longestStreak: 5,
    streakFreezeAvailable: 0,
    todayTopicsCount: 0,
    dailyTargetCount: 3,
    weekDays,
  }
}

/**
 * Returns mock data demonstrating a scenario where the learner skipped yesterday
 * BUT was protected by a Streak Freeze, so their 5-day streak is successfully saved!
 */
export function getFrozenDayDummyScenario(): {
  streak: number
  longestStreak: number
  streakFreezeAvailable: number
  todayTopicsCount: number
  dailyTargetCount: number
  weekDays: WeekDayStatus[]
} {
  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const todayStr = formatLocalDate()

  // Mon: Done, Tue: Done, Wed (yesterday): Protected by Freeze!, Thu (today): in progress, Fri-Sun: upcoming
  const weekDays: WeekDayStatus[] = dayLabels.map((label, i) => ({
    label,
    fullDay: dayNames[i],
    dateStr: todayStr,
    completed: i < 2,
    isToday: i === 3,
    isPast: i < 3,
    isSkipped: false,
    isFrozen: i === 2,
  }))

  return {
    streak: 5,
    longestStreak: 8,
    streakFreezeAvailable: 0, // Had 1, consumed yesterday to protect the 5-day streak!
    todayTopicsCount: 1,
    dailyTargetCount: 3,
    weekDays,
  }
}
