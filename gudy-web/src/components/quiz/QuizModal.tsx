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
          className="bg-surface border border-border rounded-2xl shadow-2xl w-full max-w-5xl 2xl:max-w-6xl max-h-[96vh] flex flex-col overflow-hidden"
        >
          {/* Modal Header */}
          <div className="px-6 py-4 lg:px-8 border-b border-border flex items-center justify-between bg-surface-elevated shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-accent/15 flex items-center justify-center text-accent text-lg lg:text-xl font-bold">
                {currentIndex + 1}
              </div>
              <div>
                <h3 className="font-bold text-text-primary text-base lg:text-lg leading-tight">
                  {subcategoryTitle}
                </h3>
                <p className="text-sm lg:text-base text-text-muted">
                  {subjectName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Progress indicator */}
              <div className="hidden sm:flex items-center gap-3 mr-2">
                <div className="w-32 h-2.5 bg-surface-elevated rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-base font-medium text-text-secondary">
                  {answeredCount}/{totalQuestions}
                </span>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="p-2.5 lg:p-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface border border-border transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Question Navigator (optional) */}
          {!isSubmitted && (
            <div className="px-6 py-3 lg:px-8 border-b border-border bg-surface-elevated shrink-0">
              <div className="flex items-center gap-3 overflow-x-auto custom-scrollbar pb-1">
                <ListBullets size={16} className="text-text-muted shrink-0" />
                {questions.map((q, idx) => {
                  const isAnswered = !!answers[q.num]
                  const isCurrent = idx === currentIndex

                  return (
                    <button
                      key={q.num}
                      onClick={() => onGoToQuestion(idx)}
                      className={`
                        w-8 h-8 lg:w-9 lg:h-9 rounded-lg text-sm lg:text-base font-bold shrink-0 transition-colors
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
          <div className="flex-1 overflow-y-auto p-8 sm:p-10 lg:p-12 xl:p-14">
            {isSubmitted && submittedAttempt ? (
              <QuizResult
                attempt={submittedAttempt}
                questions={questions}
                onRetry={onRetry}
                onClose={onClose}
              />
            ) : (
              <div className="space-y-10">
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
            <div className="px-6 py-5 lg:px-8 border-t border-border bg-surface-elevated shrink-0">
              <div className="flex items-center justify-between">
                {/* Previous Button */}
                <button
                  onClick={onPrev}
                  disabled={currentIndex === 0}
                  className={`
                    flex items-center gap-2.5 px-5 py-3 rounded-xl text-base font-medium transition-colors
                    ${currentIndex === 0
                      ? 'text-text-muted cursor-not-allowed'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                    }
                  `}
                >
                  <ArrowLeft size={18} />
                  <span>{t.quiz.previous}</span>
                </button>

                {/* Timer estimate */}
                <div className="flex items-center gap-2 text-base text-text-muted">
                  <Clock size={16} />
                  <span>~{estimatedMinutes} {t.quiz.minutes}</span>
                </div>

                {/* Next/Submit Button */}
                <button
                  onClick={isLastQuestion ? onSubmit : onNext}
                  className="flex items-center gap-2.5 px-6 py-3 rounded-xl text-base font-semibold bg-accent text-white hover:bg-accent-hover transition-colors"
                >
                  <span>
                    {isLastQuestion ? t.quiz.submit : t.quiz.next}
                  </span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
