/**
 * Quiz Store
 * Zustand store for managing quiz state
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  QuizSession,
  QuizAttempt,
  QuizQuestion,
  QuizProgress,
  QuizBestScore,
} from '@/types'

// Storage key for quiz progress
const QUIZ_PROGRESS_KEY = 'gudy_quiz_progress'

interface QuizStore {
  // Active quiz session
  activeQuiz: QuizSession | null

  // Quiz progress (attempts, best scores)
  progress: QuizProgress

  // Actions - Quiz Session
  startQuiz: (
    subjectId: string,
    subcategoryId: string,
    subcategoryTitle: string,
    questions: QuizQuestion[]
  ) => void
  selectAnswer: (questionNum: number, answer: string) => void
  nextQuestion: () => void
  prevQuestion: () => void
  goToQuestion: (index: number) => void
  submitQuiz: () => QuizAttempt
  cancelQuiz: () => void

  // Actions - Quiz Progress
  getBestScore: (subcategoryId: string) => QuizBestScore | null
  getProgress: () => QuizProgress
  clearProgress: () => void
}

const initialProgress: QuizProgress = {
  attempts: [],
  bestScores: {},
  totalQuizzesTaken: 0,
  averageScore: 0,
}

export const useQuizStore = create<QuizStore>()(
  persist(
    (set, get) => ({
      activeQuiz: null,
      progress: initialProgress,

      // Start a new quiz
      startQuiz: (subjectId, subcategoryId, subcategoryTitle, questions) => {
        set({
          activeQuiz: {
            subjectId,
            subcategoryId,
            subcategoryTitle,
            questions,
            currentIndex: 0,
            answers: {},
            startedAt: new Date().toISOString(),
            isSubmitted: false,
            isComplete: false,
          },
        })
      },

      // Select an answer for a question
      selectAnswer: (questionNum, answer) => {
        const { activeQuiz } = get()
        if (!activeQuiz || activeQuiz.isSubmitted) return

        set({
          activeQuiz: {
            ...activeQuiz,
            answers: {
              ...activeQuiz.answers,
              [questionNum]: answer,
            },
          },
        })
      },

      // Go to next question
      nextQuestion: () => {
        const { activeQuiz } = get()
        if (!activeQuiz) return

        const nextIndex = activeQuiz.currentIndex + 1
        if (nextIndex >= activeQuiz.questions.length) return

        set({
          activeQuiz: {
            ...activeQuiz,
            currentIndex: nextIndex,
          },
        })
      },

      // Go to previous question
      prevQuestion: () => {
        const { activeQuiz } = get()
        if (!activeQuiz) return

        const prevIndex = activeQuiz.currentIndex - 1
        if (prevIndex < 0) return

        set({
          activeQuiz: {
            ...activeQuiz,
            currentIndex: prevIndex,
          },
        })
      },

      // Go to specific question
      goToQuestion: (index) => {
        const { activeQuiz } = get()
        if (!activeQuiz) return
        if (index < 0 || index >= activeQuiz.questions.length) return

        set({
          activeQuiz: {
            ...activeQuiz,
            currentIndex: index,
          },
        })
      },

      // Submit the quiz and calculate results
      submitQuiz: () => {
        const { activeQuiz, progress } = get()
        if (!activeQuiz) {
          throw new Error('No active quiz to submit')
        }

        const { questions, answers, subjectId, subcategoryId, subcategoryTitle, startedAt } = activeQuiz

        // Calculate results
        let correctAnswers = 0
        let wrongAnswers = 0
        let skippedQuestions = 0

        questions.forEach((q) => {
          const userAnswer = answers[q.num]
          if (!userAnswer) {
            skippedQuestions++
          } else if (userAnswer === q.answer) {
            correctAnswers++
          } else {
            wrongAnswers++
          }
        })

        const totalQuestions = questions.length
        const score = totalQuestions > 0
          ? Math.round((correctAnswers / totalQuestions) * 100)
          : 0

        // Create attempt record
        const attempt: QuizAttempt = {
          id: `attempt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          subjectId,
          subcategoryId,
          subcategoryTitle,
          score,
          correctAnswers,
          wrongAnswers,
          skippedQuestions,
          totalQuestions,
          answers,
          startedAt,
          completedAt: new Date().toISOString(),
        }

        // Update best scores
        const existingBest = progress.bestScores[subcategoryId]
        const newBestScore: QuizBestScore = {
          subcategoryId,
          bestScore: existingBest
            ? Math.max(existingBest.bestScore, score)
            : score,
          bestAttemptAt:
            existingBest && existingBest.bestScore >= score
              ? existingBest.bestAttemptAt
              : new Date().toISOString(),
          totalAttempts: (existingBest?.totalAttempts || 0) + 1,
        }

        // Calculate new average
        const newTotalAttempts = progress.totalQuizzesTaken + 1
        const newAverage =
          ((progress.averageScore * progress.totalQuizzesTaken) + score) /
          newTotalAttempts

        // Update state
        set({
          activeQuiz: {
            ...activeQuiz,
            isSubmitted: true,
            isComplete: true,
          },
          progress: {
            attempts: [...progress.attempts, attempt],
            bestScores: {
              ...progress.bestScores,
              [subcategoryId]: newBestScore,
            },
            totalQuizzesTaken: newTotalAttempts,
            averageScore: Math.round(newAverage),
          },
        })

        return attempt
      },

      // Cancel the current quiz without saving
      cancelQuiz: () => {
        set({ activeQuiz: null })
      },

      // Get best score for a subcategory
      getBestScore: (subcategoryId) => {
        const { progress } = get()
        return progress.bestScores[subcategoryId] || null
      },

      // Get quiz progress
      getProgress: () => {
        return get().progress
      },

      // Clear all quiz progress
      clearProgress: () => {
        set({ progress: initialProgress })
      },
    }),
    {
      name: QUIZ_PROGRESS_KEY,
      partialize: (state) => ({
        progress: state.progress,
      }),
    }
  )
)

// Helper hooks
export const useActiveQuiz = () => useQuizStore((state) => state.activeQuiz)
export const useQuizProgress = () => useQuizStore((state) => state.progress)
export const useBestScore = (subcategoryId: string) =>
  useQuizStore((state) => state.progress.bestScores[subcategoryId])
