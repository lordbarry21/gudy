'use client'

import { useEffect, useState } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useAppStore } from './store'
import type { PomodoroPreset, StudySession } from '@/types'
import { addStudySession } from './storage'

const TIMER_STORAGE_KEY = 'gudy_timer_v2'

export interface CompletedSessionData {
  subjectId: string
  subjectName: string
  subjectColor: string
  durationMinutes: number
}

interface TimerStoreState {
  isActive: boolean
  isPaused: boolean
  selectedSubjectId: string | null
  selectedPreset: PomodoroPreset
  totalSeconds: number
  startTime: number | null
  accumulatedElapsed: number
  pausedAt: number | null
  isZenMode: boolean
  showCompletionModal: boolean
  completedSessionData: CompletedSessionData | null

  initialize: () => void
  selectPreset: (preset: PomodoroPreset) => void
  selectSubject: (subjectId: string) => void
  startTimer: (subjectId?: string, preset?: PomodoroPreset) => void
  pauseTimer: () => void
  resumeTimer: () => void
  completeSession: (manualMinutes?: number) => void
  resetTimer: () => void
  toggleZenMode: (enabled?: boolean) => void
  dismissCompletionModal: () => void
  getLiveElapsed: () => number
  getLiveRemaining: () => number
  checkTimerProgress: () => void
}

export const useTimerStore = create<TimerStoreState>()(
  persist(
    (set, get) => ({
      isActive: false,
      isPaused: false,
      selectedSubjectId: null,
      selectedPreset: 25,
      totalSeconds: 25 * 60,
      startTime: null,
      accumulatedElapsed: 0,
      pausedAt: null,
      isZenMode: false,
      showCompletionModal: false,
      completedSessionData: null,

      initialize: () => {
        // Called on mount if needed; Zustand persist auto-hydrates
      },

      selectPreset: (preset: PomodoroPreset) => {
        if (get().isActive) return
        set({
          selectedPreset: preset,
          totalSeconds: preset * 60,
          accumulatedElapsed: 0,
        })
      },

      selectSubject: (subjectId: string) => {
        if (get().isActive) return
        set({ selectedSubjectId: subjectId })
      },

      startTimer: (subjectId?: string, preset?: PomodoroPreset) => {
        const state = get()
        const resolvedSubjectId = subjectId ?? state.selectedSubjectId
        const resolvedPreset = preset ?? state.selectedPreset
        const durationSeconds = resolvedPreset * 60

        set({
          isActive: true,
          isPaused: false,
          selectedSubjectId: resolvedSubjectId,
          selectedPreset: resolvedPreset,
          totalSeconds: durationSeconds,
          startTime: Date.now(),
          accumulatedElapsed: 0,
          pausedAt: null,
          showCompletionModal: false,
          completedSessionData: null,
        })
      },

      pauseTimer: () => {
        const state = get()
        if (!state.isActive || state.isPaused) return

        const currentElapsed = get().getLiveElapsed()
        set({
          isPaused: true,
          pausedAt: Date.now(),
          startTime: null,
          accumulatedElapsed: currentElapsed,
        })
      },

      resumeTimer: () => {
        const state = get()
        if (!state.isActive || !state.isPaused) return

        set({
          isPaused: false,
          startTime: Date.now(),
          pausedAt: null,
        })
      },

      completeSession: (manualMinutes?: number) => {
        const state = get()
        const liveElapsed = get().getLiveElapsed()
        const minutesToRecord = manualMinutes ?? Math.max(1, Math.round(liveElapsed / 60))

        const { subjects, updateStudyTime } = useAppStore.getState()
        const selectedSubject = subjects.find((s) => s.id === state.selectedSubjectId)

        const subjectId = selectedSubject?.id || state.selectedSubjectId || 'general'
        const subjectName = selectedSubject?.name || 'Mata Pelajaran'
        const subjectColor = selectedSubject?.color || '#3A92A6'

        const todayStr = new Date().toISOString().split('T')[0]
        const session: StudySession = {
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          subjectId,
          subjectName,
          subjectColor,
          durationMinutes: minutesToRecord,
          targetMinutes: state.selectedPreset,
          completedAt: new Date().toISOString(),
          date: todayStr,
        }

        addStudySession(session)
        updateStudyTime(minutesToRecord)

        set({
          isActive: false,
          isPaused: false,
          startTime: null,
          pausedAt: null,
          accumulatedElapsed: 0,
          showCompletionModal: true,
          completedSessionData: {
            subjectId,
            subjectName,
            subjectColor,
            durationMinutes: minutesToRecord,
          },
        })
      },

      resetTimer: () => {
        const state = get()
        set({
          isActive: false,
          isPaused: false,
          startTime: null,
          pausedAt: null,
          accumulatedElapsed: 0,
          totalSeconds: state.selectedPreset * 60,
          isZenMode: false,
        })
      },

      toggleZenMode: (enabled?: boolean) => {
        set((state) => ({
          isZenMode: typeof enabled === 'boolean' ? enabled : !state.isZenMode,
        }))
      },

      dismissCompletionModal: () => {
        set({ showCompletionModal: false, completedSessionData: null })
      },

      getLiveElapsed: () => {
        const state = get()
        if (!state.isActive) return 0
        if (state.isPaused || !state.startTime) {
          return Math.min(state.totalSeconds, state.accumulatedElapsed)
        }

        const currentSegment = Math.max(0, Math.floor((Date.now() - state.startTime) / 1000))
        return Math.min(state.totalSeconds, state.accumulatedElapsed + currentSegment)
      },

      getLiveRemaining: () => {
        const state = get()
        if (!state.isActive) return state.totalSeconds
        const elapsed = get().getLiveElapsed()
        return Math.max(0, state.totalSeconds - elapsed)
      },

      checkTimerProgress: () => {
        const state = get()
        if (!state.isActive || state.isPaused) return

        const remaining = get().getLiveRemaining()
        if (remaining <= 0) {
          get().completeSession(state.selectedPreset)
        }
      },
    }),
    {
      name: TIMER_STORAGE_KEY,
      partialize: (state) => ({
        isActive: state.isActive,
        isPaused: state.isPaused,
        selectedSubjectId: state.selectedSubjectId,
        selectedPreset: state.selectedPreset,
        totalSeconds: state.totalSeconds,
        startTime: state.startTime,
        accumulatedElapsed: state.accumulatedElapsed,
        pausedAt: state.pausedAt,
        isZenMode: state.isZenMode,
      }),
    }
  )
)

export function useLiveTimer() {
  const store = useTimerStore()
  const [, setTick] = useState(0)

  useEffect(() => {
    if (!store.isActive || store.isPaused) return

    store.checkTimerProgress()

    const intervalId = setInterval(() => {
      setTick((prev) => (prev + 1) % 1000000)
      useTimerStore.getState().checkTimerProgress()
    }, 1000)

    return () => clearInterval(intervalId)
  }, [store.isActive, store.isPaused])

  const liveElapsedSeconds = store.getLiveElapsed()
  const liveRemainingSeconds = store.getLiveRemaining()
  const progressPercent =
    store.totalSeconds > 0 ? Math.min(100, (liveElapsedSeconds / store.totalSeconds) * 100) : 0

  return {
    liveElapsedSeconds,
    liveRemainingSeconds,
    progressPercent,
    isActive: store.isActive,
    isPaused: store.isPaused,
    totalSeconds: store.totalSeconds,
  }
}
