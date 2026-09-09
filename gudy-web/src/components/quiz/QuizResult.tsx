'use client'

import { motion } from 'framer-motion'
import {
  Trophy,
  Target,
  CheckCircle,
  XCircle,
  Clock,
  ArrowCounterClockwise,
} from '@phosphor-icons/react'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { QuizAttempt, QuizQuestion } from '@/types'

interface QuizResultProps {
  attempt: QuizAttempt
  questions: QuizQuestion[]
  onRetry: () => void
  onClose: () => void
}

export function QuizResult({
  attempt,
  questions,
  onRetry,
  onClose,
}: QuizResultProps) {
  const { t } = useLanguage()

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success'
    if (score >= 60) return 'text-warning'
    return 'text-error'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Luar Biasa!'
    if (score >= 80) return 'Sangat Baik!'
    if (score >= 70) return 'Baik'
    if (score >= 60) return 'Cukup Baik'
    if (score >= 50) return 'Perlu Perbaikan'
    return 'Ayo Coba Lagi!'
  }

  const getScoreEmoji = (score: number) => {
    if (score >= 90) return '🏆'
    if (score >= 80) return '🌟'
    if (score >= 70) return '👏'
    if (score >= 60) return '👍'
    if (score >= 50) return '💪'
    return '📚'
  }

  const formatDuration = (start: string, end: string) => {
    const diff = new Date(end).getTime() - new Date(start).getTime()
    const minutes = Math.floor(diff / 60000)
    const seconds = Math.floor((diff % 60000) / 1000)
    return `${minutes}m ${seconds}s`
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 sm:space-y-10"
    >
      {/* Score Circle */}
      <div className="flex flex-col items-center py-10 sm:py-12 lg:py-14">
        <div
          className={`
            w-52 h-52 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rounded-full flex items-center justify-center
            border-[10px] lg:border-[12px] mb-6 lg:mb-8
            ${attempt.score >= 80
              ? 'border-success/30 bg-success/10'
              : attempt.score >= 60
                ? 'border-warning/30 bg-warning/10'
                : 'border-error/30 bg-error/10'
            }
          `}
        >
          <div className="text-center">
            <span
              className={`text-7xl sm:text-8xl lg:text-9xl font-black ${getScoreColor(attempt.score)}`}
            >
              {attempt.score}
            </span>
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-secondary">%</span>
          </div>
        </div>

        <span className="text-5xl sm:text-6xl lg:text-7xl mb-4 lg:mb-5">{getScoreEmoji(attempt.score)}</span>
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${getScoreColor(attempt.score)}`}>
          {getScoreLabel(attempt.score)}
        </h2>
        <p className="text-lg sm:text-xl lg:text-2xl text-text-secondary mt-3 lg:mt-4">
          {attempt.subcategoryTitle}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
        {/* Correct */}
        <div className="bg-success/10 border border-success/20 rounded-2xl p-6 sm:p-7 lg:p-8 text-center">
          <CheckCircle
            size={36}
            weight="fill"
            className="text-success mx-auto mb-4 lg:mb-5"
          />
          <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-success">
            {attempt.correctAnswers}
          </p>
          <p className="text-base sm:text-lg lg:text-xl text-text-secondary mt-2 lg:mt-3">{t.quiz.correct}</p>
        </div>

        {/* Wrong */}
        <div className="bg-error/10 border border-error/20 rounded-2xl p-6 sm:p-7 lg:p-8 text-center">
          <XCircle
            size={36}
            weight="fill"
            className="text-error mx-auto mb-4 lg:mb-5"
          />
          <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-error">
            {attempt.wrongAnswers}
          </p>
          <p className="text-base sm:text-lg lg:text-xl text-text-secondary mt-2 lg:mt-3">{t.quiz.incorrect}</p>
        </div>

        {/* Skipped */}
        <div className="bg-warning/10 border border-warning/20 rounded-2xl p-6 sm:p-7 lg:p-8 text-center">
          <Target size={36} weight="fill" className="text-warning mx-auto mb-4 lg:mb-5" />
          <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-warning">
            {attempt.skippedQuestions}
          </p>
          <p className="text-base sm:text-lg lg:text-xl text-text-secondary mt-2 lg:mt-3">Kosong</p>
        </div>
      </div>

      {/* Duration */}
      <div className="flex items-center justify-center gap-3 text-lg sm:text-xl lg:text-2xl text-text-secondary">
        <Clock size={22} />
        <span>{t.quiz.estimatedTime}: {formatDuration(attempt.startedAt, attempt.completedAt)}</span>
      </div>

      {/* Actions */}
      <div className="space-y-4 sm:space-y-5 pt-6 sm:pt-8">
        <button
          onClick={onRetry}
          className="w-full flex items-center justify-center gap-3 py-5 px-6 rounded-xl bg-accent text-white font-semibold text-xl lg:text-2xl hover:bg-accent-hover transition-colors"
        >
          <ArrowCounterClockwise size={26} />
          <span>{t.quiz.retry}</span>
        </button>

        <button
          onClick={onClose}
          className="w-full flex items-center justify-center gap-3 py-5 px-6 rounded-xl bg-surface-elevated border border-border text-text-primary font-semibold text-xl lg:text-2xl hover:bg-surface transition-colors"
        >
          <Trophy size={26} />
          <span>{t.quiz.backToPractice}</span>
        </button>
      </div>
    </motion.div>
  )
}
