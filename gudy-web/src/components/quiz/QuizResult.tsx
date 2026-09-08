'use client'

import { motion } from 'framer-motion'
import {
  Trophy,
  Target,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  ArrowCounterClockwise,
  X,
} from '@phosphor-icons/react'
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
      className="space-y-6"
    >
      {/* Score Circle */}
      <div className="flex flex-col items-center py-6">
        <div
          className={`
            w-36 h-36 rounded-full flex items-center justify-center
            border-8 mb-4
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
              className={`text-5xl font-black ${getScoreColor(attempt.score)}`}
            >
              {attempt.score}
            </span>
            <span className="text-xl font-bold text-text-secondary">%</span>
          </div>
        </div>

        <span className="text-3xl mb-2">{getScoreEmoji(attempt.score)}</span>
        <h2 className={`text-xl font-bold ${getScoreColor(attempt.score)}`}>
          {getScoreLabel(attempt.score)}
        </h2>
        <p className="text-sm text-text-secondary mt-1">
          {attempt.subcategoryTitle}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        {/* Correct */}
        <div className="bg-success/10 border border-success/20 rounded-xl p-4 text-center">
          <CheckCircle
            size={24}
            weight="fill"
            className="text-success mx-auto mb-2"
          />
          <p className="text-2xl font-bold text-success">
            {attempt.correctAnswers}
          </p>
          <p className="text-xs text-text-secondary">Benar</p>
        </div>

        {/* Wrong */}
        <div className="bg-error/10 border border-error/20 rounded-xl p-4 text-center">
          <XCircle
            size={24}
            weight="fill"
            className="text-error mx-auto mb-2"
          />
          <p className="text-2xl font-bold text-error">
            {attempt.wrongAnswers}
          </p>
          <p className="text-xs text-text-secondary">Salah</p>
        </div>

        {/* Skipped */}
        <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 text-center">
          <Target size={24} weight="fill" className="text-warning mx-auto mb-2" />
          <p className="text-2xl font-bold text-warning">
            {attempt.skippedQuestions}
          </p>
          <p className="text-xs text-text-secondary">Kosong</p>
        </div>
      </div>

      {/* Duration */}
      <div className="flex items-center justify-center gap-2 text-sm text-text-secondary">
        <Clock size={16} />
        <span>Waktu: {formatDuration(attempt.startedAt, attempt.completedAt)}</span>
      </div>

      {/* Actions */}
      <div className="space-y-3 pt-4">
        <button
          onClick={onRetry}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-colors"
        >
          <ArrowCounterClockwise size={18} />
          <span>Coba Lagi</span>
        </button>

        <button
          onClick={onClose}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-surface-elevated border border-border text-text-primary font-semibold text-sm hover:bg-surface transition-colors"
        >
          <Trophy size={18} />
          <span>Kembali ke Practice</span>
        </button>
      </div>
    </motion.div>
  )
}
