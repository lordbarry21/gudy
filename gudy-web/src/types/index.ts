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

// App State
export interface AppState {
  progress: UserProgress
  subjects: Subject[]
  topics: Topic[]
  achievements: Achievement[]
}
