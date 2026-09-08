// Mastery Status
export type MasteryStatus = 'notStarted' | 'inProgress' | 'mastered'

// Checklist Item
export interface ChecklistItem {
  id: string
  title: string
  isChecked: boolean
  checkedAt?: string
  createdAt: string
}

// Topic
export interface Topic {
  id: string
  subjectId: string
  parentId?: string
  title: string
  description?: string
  scope?: string
  targetCriteria?: string
  memoryBooster?: string
  aiPrompt?: string
  status: MasteryStatus
  completedAt?: string
  checklist: ChecklistItem[]
  createdAt: string
  lastStudiedAt?: string
  isLeaf: boolean
  order: number
}

// Subject
export interface Subject {
  id: string
  name: string
  icon: string
  description: string
  totalTopics: number
  completedTopics: number
  totalBranches: number
  completedBranches: number
  color: string
  order: number
  createdAt: string
}

// User Progress
export interface UserProgress {
  streak: number
  longestStreak: number
  lastActiveAt?: string
  totalTopicsCompleted: number
  totalMinutesSpent: number
  dailyGoal: number
  streakFreezeAvailable: number
  totalStudyDays: number
  createdAt: string
  userName: string
}

// Achievement
export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: string
  requiredValue: number
  type: 'general' | 'streak' | 'progress' | 'subject'
}

// Practice Item
export interface PracticeItem {
  id: string
  title: string
  subtitle: string
  icon: string
  color: string
  questionCount: number
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
}

// Navigation Item
export interface NavItem {
  label: string
  href: string
  icon: string
}

// ============== QUIZ SYSTEM TYPES ==============

// Quiz Question
export interface QuizQuestion {
  num: number
  topic: string
  question: string
  options: Record<string, string> // A, B, C, D, E
  answer: string
  solution: string
}

// Quiz Subcategory
export interface QuizSubcategory {
  id: string
  title: string
  description?: string
  questions: QuizQuestion[]
}

// Quiz Data (from JSON)
export interface QuizData {
  subject_id: string
  subject_name: string
  icon: string
  color: string
  subcategories: QuizSubcategory[]
}

// Quiz Attempt Record
export interface QuizAttempt {
  id: string
  subjectId: string
  subcategoryId: string
  subcategoryTitle: string
  score: number // percentage 0-100
  correctAnswers: number
  wrongAnswers: number
  skippedQuestions: number
  totalQuestions: number
  answers: Record<number, string> // questionNum -> selectedAnswer
  startedAt: string
  completedAt: string
}

// Quiz State (active quiz session)
export interface QuizSession {
  subjectId: string
  subcategoryId: string
  subcategoryTitle: string
  questions: QuizQuestion[]
  currentIndex: number
  answers: Record<number, string> // questionNum -> selectedAnswer
  startedAt: string
  isSubmitted: boolean
  isComplete: boolean
}

// Quiz Result Summary
export interface QuizResult {
  attempt: QuizAttempt
  questions: QuizQuestion[]
  answers: Record<number, string>
}

// Best Score per subcategory
export interface QuizBestScore {
  subcategoryId: string
  bestScore: number
  bestAttemptAt: string
  totalAttempts: number
}

// Quiz Progress (user's quiz history)
export interface QuizProgress {
  attempts: QuizAttempt[]
  bestScores: Record<string, QuizBestScore>
  totalQuizzesTaken: number
  averageScore: number
}

// ============== FIREBASE AUTH TYPES ==============

export interface FirebaseUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

// App State
export interface AppState {
  progress: UserProgress
  subjects: Subject[]
  topics: Topic[]
  achievements: Achievement[]
}

// ============== STUDY TIMER TYPES ==============

// Pomodoro Preset Durations
export type PomodoroPreset = 25 | 45 | 60 | 90

// Study Session (logged session)
export interface StudySession {
  id: string
  subjectId: string
  subjectName: string
  subjectColor: string
  durationMinutes: number
  targetMinutes: number
  completedAt: string
  date: string // YYYY-MM-DD format for grouping
}

// Daily Study Summary
export interface DailyStudySummary {
  date: string
  totalMinutes: number
  sessions: StudySession[]
  topicsCompleted: number
  subjectBreakdown: Record<string, number> // subjectId -> minutes
}

// Study Timer State
export interface StudyTimerState {
  isActive: boolean
  isPaused: boolean
  selectedSubjectId: string | null
  selectedPreset: PomodoroPreset
  customDuration: number
  remainingSeconds: number
  totalSeconds: number
  elapsedSeconds: number
  currentMode: 'focus' | 'break'
  sessionsToday: StudySession[]
}

// Break Suggestion
export interface BreakSuggestion {
  shouldBreak: boolean
  message: string
  duration: number // minutes
  quote?: string
}
