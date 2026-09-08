import { create } from 'zustand'
import type { UserProgress, Subject, Topic, Achievement } from '@/types'
import {
  getProgress,
  saveProgress,
  getSubjects,
  saveSubjects,
  getTopics,
  saveTopics,
  getAchievements,
  saveAchievements,
  getCurriculumVersion,
  saveCurriculumVersion,
} from './storage'
import { SUBJECTS_DATA, ACHIEVEMENTS_DATA } from './constants'
import { getAllInitialTopics, CURRICULUM_VERSION } from '@/data/syllabus'

interface AppStore {
  // State
  progress: UserProgress
  subjects: Subject[]
  topics: Topic[]
  achievements: Achievement[]
  isInitialized: boolean

  // Actions
  initialize: () => void
  updateUserName: (name: string) => void
  updateDailyGoal: (goal: number) => void
  updateStudyTime: (minutes: number) => void
  toggleChecklistItem: (topicId: string, itemId: string) => void
  markAsMastered: (topicId: string) => void
  toggleTopicMasteredCascade: (topicId: string) => void
  resetTopicProgress: (topicId: string) => void
  refreshCounts: () => void
  resetAllProgress: () => void
}

export const useAppStore = create<AppStore>((set, get) => ({
  // Initial State
  progress: getProgress(),
  subjects: getSubjects(),
  topics: getTopics(),
  achievements: getAchievements(),
  isInitialized: false,

  // Initialize app data
  initialize: () => {
    const { subjects, topics, achievements, progress, isInitialized } = get()

    if (isInitialized) return

    const storedVersion = getCurriculumVersion()
    const isCurriculumOutdated = storedVersion !== CURRICULUM_VERSION || topics.length < 88

    let updatedSubjects = subjects
    let updatedTopics = topics
    let updatedAchievements = achievements

    // Initialize or migrate topics if empty or curriculum updated
    if (subjects.length === 0 || topics.length === 0 || isCurriculumOutdated) {
      const initialTopics = getAllInitialTopics()

      // Preserve existing user progress if available
      const savedTopicMap = new Map<string, Topic>()
      topics.forEach((t) => savedTopicMap.set(t.id, t))

      updatedTopics = initialTopics.map((newTopic) => {
        const existing = savedTopicMap.get(newTopic.id)
        if (!existing) return newTopic

        const existingChecklistMap = new Map<string, boolean>()
        existing.checklist.forEach((c) => existingChecklistMap.set(c.title, c.isChecked))

        const updatedChecklist = newTopic.checklist.map((item) => ({
          ...item,
          isChecked: existingChecklistMap.get(item.title) ?? false,
        }))

        return {
          ...newTopic,
          status: existing.status,
          completedAt: existing.completedAt,
          lastStudiedAt: existing.lastStudiedAt,
          checklist: updatedChecklist,
        }
      })

      // Calculate topic counts per subject
      const leafTopics = updatedTopics.filter((t) => t.isLeaf)
      const branches = updatedTopics.filter((t) => !t.isLeaf && !t.parentId)

      updatedSubjects = SUBJECTS_DATA.map((s, index) => {
        const subjectLeafTopics = leafTopics.filter((t) => t.subjectId === s.id)
        const subjectBranches = branches.filter((t) => t.subjectId === s.id)

        return {
          id: s.id,
          name: s.name,
          icon: s.icon,
          description: s.description,
          color: s.color,
          totalTopics: subjectLeafTopics.length,
          completedTopics: subjectLeafTopics.filter((t) => t.status === 'mastered').length,
          totalBranches: subjectBranches.length,
          completedBranches: subjectBranches.filter((t) => t.status === 'mastered').length,
          order: index,
          createdAt: new Date().toISOString(),
        }
      })

      saveCurriculumVersion(CURRICULUM_VERSION)
    }

    // Initialize achievements if empty
    if (achievements.length === 0) {
      updatedAchievements = ACHIEVEMENTS_DATA.map((a) => ({
        ...a,
        unlocked: false,
        unlockedAt: undefined,
      }))
    }

    const completedCount = updatedTopics.filter((t) => t.isLeaf && t.status === 'mastered').length
    const updatedProgress = {
      ...progress,
      totalTopicsCompleted: completedCount,
    }

    // Save to state
    set({
      subjects: updatedSubjects,
      topics: updatedTopics,
      achievements: updatedAchievements,
      progress: updatedProgress,
      isInitialized: true,
    })

    // Persist to storage
    saveSubjects(updatedSubjects)
    saveTopics(updatedTopics)
    saveAchievements(updatedAchievements)
    saveProgress(updatedProgress)
  },

  // Update user name
  updateUserName: (name: string) => {
    const { progress } = get()
    const updated = { ...progress, userName: name }
    set({ progress: updated })
    saveProgress(updated)
  },

  // Update daily goal
  updateDailyGoal: (goal: number) => {
    const { progress } = get()
    const updated = { ...progress, dailyGoal: goal }
    set({ progress: updated })
    saveProgress(updated)
  },

  // Update study time
  updateStudyTime: (minutes: number) => {
    const { progress } = get()
    const updated = {
      ...progress,
      totalMinutesSpent: progress.totalMinutesSpent + minutes,
    }
    set({ progress: updated })
    saveProgress(updated)
  },

  // Toggle checklist item
  toggleChecklistItem: (topicId: string, itemId: string) => {
    const { topics, subjects, progress } = get()

    const updatedTopics = topics.map((topic) => {
      if (topic.id !== topicId) return topic

      const updatedChecklist = topic.checklist.map((item) => {
        if (item.id !== itemId) return item
        return {
          ...item,
          isChecked: !item.isChecked,
          checkedAt: !item.isChecked ? new Date().toISOString() : undefined,
        }
      })

      const allChecked = updatedChecklist.every((item) => item.isChecked)
      const someChecked = updatedChecklist.some((item) => item.isChecked)

      let newStatus: 'notStarted' | 'inProgress' | 'mastered' = 'notStarted'
      if (allChecked) newStatus = 'mastered'
      else if (someChecked) newStatus = 'inProgress'

      return {
        ...topic,
        checklist: updatedChecklist,
        status: newStatus,
        completedAt: newStatus === 'mastered' ? new Date().toISOString() : undefined,
      }
    })

    // Update subject counts
    const updatedSubjects = subjects.map((subject) => {
      const subjectTopics = updatedTopics.filter((t) => t.subjectId === subject.id && t.isLeaf)
      return {
        ...subject,
        completedTopics: subjectTopics.filter((t) => t.status === 'mastered').length,
      }
    })

    // Update progress
    const completedCount = updatedTopics.filter((t) => t.status === 'mastered').length
    const updatedProgress = {
      ...progress,
      totalTopicsCompleted: completedCount,
    }

    set({
      topics: updatedTopics,
      subjects: updatedSubjects,
      progress: updatedProgress,
    })

    saveTopics(updatedTopics)
    saveSubjects(updatedSubjects)
    saveProgress(updatedProgress)
  },

  // Mark topic as mastered
  markAsMastered: (topicId: string) => {
    const { topics, subjects, progress } = get()

    const updatedTopics = topics.map((topic) => {
      if (topic.id !== topicId) return topic

      const updatedChecklist = topic.checklist.map((item) => ({
        ...item,
        isChecked: true,
        checkedAt: item.checkedAt || new Date().toISOString(),
      }))

      return {
        ...topic,
        checklist: updatedChecklist,
        status: 'mastered' as const,
        completedAt: new Date().toISOString(),
      }
    })

    // Update subject counts
    const updatedSubjects = subjects.map((subject) => {
      const subjectTopics = updatedTopics.filter((t) => t.subjectId === subject.id && t.isLeaf)
      return {
        ...subject,
        completedTopics: subjectTopics.filter((t) => t.status === 'mastered').length,
      }
    })

    // Update progress
    const completedCount = updatedTopics.filter((t) => t.status === 'mastered').length
    const updatedProgress = {
      ...progress,
      totalTopicsCompleted: completedCount,
    }

    set({
      topics: updatedTopics,
      subjects: updatedSubjects,
      progress: updatedProgress,
    })

    saveTopics(updatedTopics)
    saveSubjects(updatedSubjects)
    saveProgress(updatedProgress)
  },

  // Toggle topic or entire branch recursively
  toggleTopicMasteredCascade: (topicId: string) => {
    const { topics, subjects, progress } = get()
    const targetTopic = topics.find((t) => t.id === topicId)
    if (!targetTopic) return

    const getDescendantIds = (parentId: string): string[] => {
      const directChildren = topics.filter((t) => t.parentId === parentId)
      return [parentId, ...directChildren.flatMap((child) => getDescendantIds(child.id))]
    }

    const affectedIds = new Set(getDescendantIds(topicId))
    const isCurrentlyMastered = targetTopic.status === 'mastered'
    const newStatus = isCurrentlyMastered ? ('notStarted' as const) : ('mastered' as const)
    const now = new Date().toISOString()

    const updatedTopics = topics.map((topic) => {
      if (!affectedIds.has(topic.id)) return topic

      const updatedChecklist = topic.checklist.map((item) => ({
        ...item,
        isChecked: !isCurrentlyMastered,
        checkedAt: !isCurrentlyMastered ? now : undefined,
      }))

      return {
        ...topic,
        checklist: updatedChecklist,
        status: newStatus,
        completedAt: newStatus === 'mastered' ? now : undefined,
      }
    })

    // Update parent topics' status if their children changed
    const finalTopics = updatedTopics.map((topic) => {
      if (topic.isLeaf) return topic

      const allDescendantLeaves = updatedTopics.filter((t) => {
        if (!t.isLeaf) return false
        let curr = t
        while (curr.parentId) {
          if (curr.parentId === topic.id) return true
          const parent = updatedTopics.find((p) => p.id === curr.parentId)
          if (!parent) break
          curr = parent
        }
        return false
      })

      if (allDescendantLeaves.length === 0) return topic

      const allDone = allDescendantLeaves.every((t) => t.status === 'mastered')
      const anyDone = allDescendantLeaves.some((t) => t.status === 'mastered' || t.status === 'inProgress')
      const branchStatus = allDone ? ('mastered' as const) : anyDone ? ('inProgress' as const) : ('notStarted' as const)

      return {
        ...topic,
        status: branchStatus,
        completedAt: branchStatus === 'mastered' ? topic.completedAt || now : undefined,
      }
    })

    // Update subject counts
    const updatedSubjects = subjects.map((subject) => {
      const subjectLeafTopics = finalTopics.filter((t) => t.subjectId === subject.id && t.isLeaf)
      const subjectBranches = finalTopics.filter((t) => t.subjectId === subject.id && !t.isLeaf && !t.parentId)
      return {
        ...subject,
        completedTopics: subjectLeafTopics.filter((t) => t.status === 'mastered').length,
        completedBranches: subjectBranches.filter((t) => t.status === 'mastered').length,
      }
    })

    // Update progress
    const completedCount = finalTopics.filter((t) => t.isLeaf && t.status === 'mastered').length
    const updatedProgress = {
      ...progress,
      totalTopicsCompleted: completedCount,
    }

    set({
      topics: finalTopics,
      subjects: updatedSubjects,
      progress: updatedProgress,
    })

    saveTopics(finalTopics)
    saveSubjects(updatedSubjects)
    saveProgress(updatedProgress)
  },

  // Reset topic progress
  resetTopicProgress: (topicId: string) => {
    const { topics, subjects, progress } = get()

    const updatedTopics = topics.map((topic) => {
      if (topic.id !== topicId) return topic

      const updatedChecklist = topic.checklist.map((item) => ({
        ...item,
        isChecked: false,
        checkedAt: undefined,
      }))

      return {
        ...topic,
        checklist: updatedChecklist,
        status: 'notStarted' as const,
        completedAt: undefined,
      }
    })

    // Update subject counts
    const updatedSubjects = subjects.map((subject) => {
      const subjectTopics = updatedTopics.filter((t) => t.subjectId === subject.id && t.isLeaf)
      return {
        ...subject,
        completedTopics: subjectTopics.filter((t) => t.status === 'mastered').length,
      }
    })

    // Update progress
    const completedCount = updatedTopics.filter((t) => t.status === 'mastered').length
    const updatedProgress = {
      ...progress,
      totalTopicsCompleted: completedCount,
    }

    set({
      topics: updatedTopics,
      subjects: updatedSubjects,
      progress: updatedProgress,
    })

    saveTopics(updatedTopics)
    saveSubjects(updatedSubjects)
    saveProgress(updatedProgress)
  },

  // Refresh subject counts
  refreshCounts: () => {
    const { subjects, topics } = get()

    const updatedSubjects = subjects.map((subject) => {
      const subjectTopics = topics.filter((t) => t.subjectId === subject.id && t.isLeaf)
      const branches = topics.filter((t) => t.subjectId === subject.id && !t.isLeaf && !t.parentId)

      return {
        ...subject,
        totalTopics: subjectTopics.length,
        completedTopics: subjectTopics.filter((t) => t.status === 'mastered').length,
        totalBranches: branches.length,
        completedBranches: 0,
      }
    })

    set({ subjects: updatedSubjects })
    saveSubjects(updatedSubjects)
  },

  // Reset all progress
  resetAllProgress: () => {
    const { topics, achievements } = get()

    // Reset topics
    const updatedTopics = topics.map((topic) => ({
      ...topic,
      status: 'notStarted' as const,
      completedAt: undefined,
      checklist: topic.checklist.map((item) => ({
        ...item,
        isChecked: false,
        checkedAt: undefined,
      })),
    }))

    // Reset achievements
    const updatedAchievements = achievements.map((a) => ({
      ...a,
      unlocked: false,
      unlockedAt: undefined,
    }))

    // Reset progress
    const resetProgress: UserProgress = {
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
    }

    set({
      progress: resetProgress,
      topics: updatedTopics,
      achievements: updatedAchievements,
    })

    saveProgress(resetProgress)
    saveTopics(updatedTopics)
    saveAchievements(updatedAchievements)
  },
}))
