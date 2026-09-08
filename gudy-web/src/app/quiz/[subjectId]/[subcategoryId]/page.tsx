'use client'

import { useEffect, useCallback, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ArrowLeft,
  ArrowRight,
  Clock,
  ListBullets,
  CheckCircle,
  Target,
  House,
  ArrowCounterClockwise,
  Trophy,
} from '@phosphor-icons/react'
import { useQuizStore, useActiveQuiz } from '@/lib/quiz-store'
import { loadQuizData } from '@/lib/quiz-data'
import { QuestionCard } from '@/components/quiz/QuestionCard'
import { SolutionPanel } from '@/components/quiz/SolutionPanel'
import { QuizResult } from '@/components/quiz/QuizResult'
import { QuizData, QuizAttempt } from '@/types'
import { useAuth } from '@/contexts/AuthContext'

export default function QuizPage() {
  const router = useRouter()
  const params = useParams()
  const { user } = useAuth()

  const subjectId = params.subjectId as string
  const subcategoryId = params.subcategoryId as string

  const [quizData, setQuizData] = useState<QuizData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submittedAttempt, setSubmittedAttempt] = useState<QuizAttempt | null>(null)

  const activeQuiz = useActiveQuiz()
  const {
    startQuiz,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    submitQuiz,
    cancelQuiz,
  } = useQuizStore()

  // Load quiz data
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadQuizData(subjectId)
        if (!data) {
          setError('Quiz tidak ditemukan')
          setLoading(false)
          return
        }

        const subcategory = data.subcategories.find((s) => s.id === subcategoryId)
        if (!subcategory) {
          setError('Subkategori tidak ditemukan')
          setLoading(false)
          return
        }

        setQuizData(data)

        // Start quiz if not already active
        if (!activeQuiz || activeQuiz.subjectId !== subjectId || activeQuiz.subcategoryId !== subcategoryId) {
          startQuiz(subjectId, subcategoryId, subcategory.title, subcategory.questions)
        }

        setLoading(false)
      } catch (err) {
        setError('Gagal memuat quiz')
        setLoading(false)
      }
    }

    loadData()
  }, [subjectId, subcategoryId, startQuiz, activeQuiz])

  const currentQuestion = activeQuiz?.questions[activeQuiz.currentIndex]
  const totalQuestions = activeQuiz?.questions.length || 0
  const answeredCount = activeQuiz ? Object.keys(activeQuiz.answers).length : 0
  const progress = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0
  const isLastQuestion = activeQuiz ? activeQuiz.currentIndex === totalQuestions - 1 : false
  const selectedAnswer = currentQuestion ? activeQuiz?.answers[currentQuestion.num] : undefined
  const estimatedMinutes = Math.ceil(totalQuestions * 1.5)

  // Handle next question
  const handleNextQuestion = useCallback(() => {
    if (!activeQuiz) return

    const nextIndex = activeQuiz.currentIndex + 1
    if (nextIndex >= totalQuestions) {
      const attempt = submitQuiz()
      setSubmittedAttempt(attempt)
    } else {
      nextQuestion()
    }
  }, [activeQuiz, totalQuestions, submitQuiz, nextQuestion])

  // Handle submit
  const handleSubmit = useCallback(() => {
    const attempt = submitQuiz()
    setSubmittedAttempt(attempt)
  }, [submitQuiz])

  // Handle retry
  const handleRetry = useCallback(() => {
    if (!quizData) return

    const subcategory = quizData.subcategories.find((s) => s.id === subcategoryId)
    if (subcategory) {
      setSubmittedAttempt(null)
      startQuiz(subjectId, subcategoryId, subcategory.title, subcategory.questions)
    }
  }, [quizData, subjectId, subcategoryId, startQuiz])

  // Handle close/back to practice
  const handleClose = useCallback(() => {
    cancelQuiz()
    router.push('/practice')
  }, [cancelQuiz, router])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeQuiz || activeQuiz.isSubmitted) return

      switch (e.key) {
        case 'ArrowLeft':
          if (activeQuiz.currentIndex > 0) prevQuestion()
          break
        case 'ArrowRight':
          if (isLastQuestion) {
            handleSubmit()
          } else {
            handleNextQuestion()
          }
          break
        case 'Escape':
          handleClose()
          break
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          if (currentQuestion) {
            const optionMap: Record<string, string> = {
              '1': 'A',
              '2': 'B',
              '3': 'C',
              '4': 'D',
              '5': 'E',
            }
            if (optionMap[e.key]) {
              selectAnswer(currentQuestion.num, optionMap[e.key])
            }
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeQuiz, isLastQuestion, currentQuestion, handleSubmit, handleNextQuestion, handleClose, prevQuestion, selectAnswer])

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Memuat quiz...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !quizData || !activeQuiz || !currentQuestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-error/10 flex items-center justify-center mx-auto mb-4">
            <X size={32} className="text-error" />
          </div>
          <h1 className="text-xl font-bold text-text-primary mb-2">
            {error || 'Quiz tidak ditemukan'}
          </h1>
          <p className="text-text-secondary mb-6">
            Sepertinya ada yang salah dengan quiz ini.
          </p>
          <Link
            href="/practice"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent-dark transition-colors"
          >
            <House size={16} />
            Kembali ke Practice
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-surface border-b border-border px-4 sm:px-6 lg:px-10 xl:px-12 py-4 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Back button and subject info */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleClose}
              className="p-2.5 rounded-xl bg-surface-elevated border border-border text-text-secondary hover:text-text-primary hover:border-border-hover transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                style={{ backgroundColor: `${quizData.color}20` }}
              >
                {quizData.icon}
              </div>
              <div>
                <h1 className="font-bold text-text-primary text-sm sm:text-base leading-tight">
                  {activeQuiz.subcategoryTitle}
                </h1>
                <p className="text-xs text-text-muted">
                  {quizData.subject_name}
                </p>
              </div>
            </div>
          </div>

          {/* Center: Progress */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-48 h-2.5 bg-surface-elevated rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="text-sm font-medium text-text-secondary min-w-[80px]">
                {answeredCount} / {totalQuestions} soal
              </span>
            </div>
          </div>

          {/* Right: Timer and close */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <Clock size={18} />
              <span className="hidden sm:inline">~{estimatedMinutes} menit</span>
            </div>
            <button
              onClick={handleClose}
              className="p-2.5 rounded-xl bg-surface-elevated border border-border text-text-secondary hover:text-text-primary hover:border-border-hover transition-all"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Mobile progress bar */}
        <div className="md:hidden mt-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-surface-elevated rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="text-xs font-medium text-text-secondary shrink-0">
              {answeredCount}/{totalQuestions}
            </span>
          </div>
        </div>
      </header>

      {/* Question Navigator (horizontal scrollable) */}
      {!activeQuiz.isSubmitted && (
        <div className="bg-surface-elevated/50 border-b border-border px-4 sm:px-6 lg:px-10 xl:px-12 py-3 shrink-0">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
              <ListBullets size={16} className="text-text-muted shrink-0 mr-1" />
              {activeQuiz.questions.map((q, idx) => {
                const isAnswered = !!activeQuiz.answers[q.num]
                const isCurrent = idx === activeQuiz.currentIndex

                return (
                  <button
                    key={q.num}
                    onClick={() => goToQuestion(idx)}
                    className={`
                      w-10 h-8 rounded-lg text-sm font-bold shrink-0 transition-all
                      ${isCurrent
                        ? 'bg-accent text-white shadow-lg shadow-accent/30'
                        : isAnswered
                          ? 'bg-success/20 text-success border border-success/30'
                          : 'bg-surface border border-border text-text-muted hover:bg-surface-elevated hover:text-text-secondary'
                      }
                    `}
                  >
                    {idx + 1}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <AnimatePresence mode="wait">
            {activeQuiz.isSubmitted && submittedAttempt ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <QuizResult
                  attempt={submittedAttempt}
                  questions={activeQuiz.questions}
                  onRetry={handleRetry}
                  onClose={handleClose}
                />
              </motion.div>
            ) : (
              <motion.div
                key="question"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                {/* Question Card */}
                <QuestionCard
                  question={currentQuestion}
                  questionNumber={activeQuiz.currentIndex + 1}
                  totalQuestions={totalQuestions}
                  selectedAnswer={selectedAnswer}
                  showResult={!!selectedAnswer}
                  onSelectAnswer={(answer) => currentQuestion && selectAnswer(currentQuestion.num, answer)}
                />

                {/* Solution Panel */}
                {selectedAnswer && (
                  <SolutionPanel
                    question={currentQuestion}
                    selectedAnswer={selectedAnswer}
                    onNext={handleNextQuestion}
                    isLast={isLastQuestion}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Navigation (only for non-submitted state without answer) */}
      {!activeQuiz.isSubmitted && !selectedAnswer && (
        <footer className="bg-surface border-t border-border px-4 sm:px-6 lg:px-10 xl:px-12 py-4 shrink-0">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={prevQuestion}
              disabled={activeQuiz.currentIndex === 0}
              className={`
                flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all
                ${activeQuiz.currentIndex === 0
                  ? 'text-text-muted cursor-not-allowed bg-surface-elevated/50'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated border border-border'
                }
              `}
            >
              <ArrowLeft size={18} />
              <span>Sebelumnya</span>
            </button>

            <div className="text-sm text-text-muted">
              Tekan <kbd className="px-1.5 py-0.5 bg-surface-elevated rounded text-xs font-mono border border-border">←</kbd> <kbd className="px-1.5 py-0.5 bg-surface-elevated rounded text-xs font-mono border border-border">→</kbd> untuk navigasi
            </div>

            <button
              onClick={isLastQuestion ? handleSubmit : handleNextQuestion}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-accent text-white hover:bg-accent-dark transition-all shadow-lg shadow-accent/20"
            >
              <span>{isLastQuestion ? 'Submit Quiz' : 'Selanjutnya'}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </footer>
      )}

      {/* Submitted Footer */}
      {activeQuiz.isSubmitted && submittedAttempt && (
        <footer className="bg-surface border-t border-border px-4 sm:px-6 lg:px-10 xl:px-12 py-4 shrink-0">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-accent text-white hover:bg-accent-dark transition-all shadow-lg shadow-accent/20"
            >
              <ArrowCounterClockwise size={18} />
              <span>Coba Lagi</span>
            </button>
            <button
              onClick={handleClose}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-surface-elevated text-text-primary hover:bg-surface border border-border transition-all"
            >
              <Trophy size={18} />
              <span>Kembali ke Practice</span>
            </button>
          </div>
        </footer>
      )}
    </div>
  )
}
