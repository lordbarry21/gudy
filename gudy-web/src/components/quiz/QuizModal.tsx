'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ArrowLeft,
  ArrowRight,
  Clock,
  ListBullets,
} from '@phosphor-icons/react'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { QuizQuestion, QuizAttempt } from '@/types'
import { QuestionCard } from './QuestionCard'
import { SolutionPanel } from './SolutionPanel'
import { QuizResult } from './QuizResult'

interface QuizModalProps {
  isOpen: boolean
  onClose: () => void
  subjectName: string
  subcategoryTitle: string
  questions: QuizQuestion[]
  currentIndex: number
  answers: Record<number, string>
  isSubmitted: boolean
  submittedAttempt?: QuizAttempt
  onSelectAnswer: (questionNum: number, answer: string) => void
  onNext: () => void
  onPrev: () => void
  onGoToQuestion: (index: number) => void
  onSubmit: () => QuizAttempt
  onRetry: () => void
}

export function QuizModal({
  isOpen,
  onClose,
  subjectName,
  subcategoryTitle,
  questions,
  currentIndex,
  answers,
  isSubmitted,
  submittedAttempt,
  onSelectAnswer,
  onNext,
  onPrev,
  onGoToQuestion,
  onSubmit,
  onRetry,
}: QuizModalProps) {
  const { t } = useLanguage()
  const currentQuestion = questions[currentIndex]
  const totalQuestions = questions.length
  const answeredCount = Object.keys(answers).length
  const progress = (answeredCount / totalQuestions) * 100
  const isLastQuestion = currentIndex === totalQuestions - 1
  const selectedAnswer = answers[currentQuestion?.num]

  // Calculate estimated time (1.5 min per question)
  const estimatedMinutes = Math.ceil(totalQuestions * 1.5)

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || isSubmitted) return

      switch (e.key) {
        case 'ArrowLeft':
          if (currentIndex > 0) onPrev()
          break
        case 'ArrowRight':
          if (isLastQuestion) {
            onSubmit()
          } else {
            onNext()
          }
          break
        case 'Escape':
          onClose()
          break
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          const optionMap: Record<string, string> = {
            '1': 'A',
            '2': 'B',
            '3': 'C',
            '4': 'D',
            '5': 'E',
          }
          if (optionMap[e.key] && currentQuestion) {
            onSelectAnswer(currentQuestion.num, optionMap[e.key])
          }
          break
      }
    },
    [isOpen, isSubmitted, currentIndex, isLastQuestion, currentQuestion, onPrev, onNext, onSubmit, onClose, onSelectAnswer]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen || !currentQuestion) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-surface border border-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden"
        >
          {/* Modal Header */}
          <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-surface-elevated shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent text-sm font-bold">
                {currentIndex + 1}
              </div>
              <div>
                <h3 className="font-bold text-text-primary text-sm leading-tight">
                  {subcategoryTitle}
                </h3>
                <p className="text-[11px] text-text-muted">
                  {subjectName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Progress indicator */}
              <div className="hidden sm:flex items-center gap-2 mr-2">
                <div className="w-24 h-2 bg-surface-elevated rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs text-text-secondary">
                  {answeredCount}/{totalQuestions}
                </span>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface border border-border transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Question Navigator (optional) */}
          {!isSubmitted && (
            <div className="px-5 py-2 border-b border-border bg-surface-elevated shrink-0">
              <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
                <ListBullets size={14} className="text-text-muted shrink-0" />
                {questions.map((q, idx) => {
                  const isAnswered = !!answers[q.num]
                  const isCurrent = idx === currentIndex

                  return (
                    <button
                      key={q.num}
                      onClick={() => onGoToQuestion(idx)}
                      className={`
                        w-7 h-7 rounded-lg text-xs font-bold shrink-0 transition-colors
                        ${isCurrent
                          ? 'bg-accent text-white'
                          : isAnswered
                            ? 'bg-success/20 text-success'
                            : 'bg-surface-elevated text-text-muted hover:bg-surface'
                        }
                      `}
                    >
                      {idx + 1}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-5">
            {isSubmitted && submittedAttempt ? (
              <QuizResult
                attempt={submittedAttempt}
                questions={questions}
                onRetry={onRetry}
                onClose={onClose}
              />
            ) : (
              <div className="space-y-6">
                {/* Question */}
                <QuestionCard
                  question={currentQuestion}
                  questionNumber={currentIndex + 1}
                  totalQuestions={totalQuestions}
                  selectedAnswer={selectedAnswer}
                  showResult={!!selectedAnswer}
                  onSelectAnswer={(answer) =>
                    onSelectAnswer(currentQuestion.num, answer)
                  }
                />

                {/* Solution (show after answering) */}
                {selectedAnswer && (
                  <SolutionPanel
                    question={currentQuestion}
                    selectedAnswer={selectedAnswer}
                    onNext={onNext}
                    isLast={isLastQuestion}
                  />
                )}
              </div>
            )}
          </div>

          {/* Modal Footer (only for non-submitted state) */}
          {!isSubmitted && !selectedAnswer && (
            <div className="px-5 py-4 border-t border-border bg-surface-elevated shrink-0">
              <div className="flex items-center justify-between">
                {/* Previous Button */}
                <button
                  onClick={onPrev}
                  disabled={currentIndex === 0}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors
                    ${currentIndex === 0
                      ? 'text-text-muted cursor-not-allowed'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                    }
                  `}
                >
                  <ArrowLeft size={16} />
                  <span>{t.quiz.previous}</span>
                </button>

                {/* Timer estimate */}
                <div className="flex items-center gap-1.5 text-xs text-text-muted">
                  <Clock size={14} />
                  <span>~{estimatedMinutes} {t.quiz.minutes}</span>
                </div>

                {/* Next/Submit Button */}
                <button
                  onClick={isLastQuestion ? onSubmit : onNext}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-accent text-white hover:bg-accent-hover transition-colors"
                >
                  <span>
                    {isLastQuestion ? t.quiz.submit : t.quiz.next}
                  </span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
