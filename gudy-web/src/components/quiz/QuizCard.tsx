'use client'

import { motion } from 'framer-motion'
import {
  Play,
  FilePdf,
  Trophy,
  Books,
  Clock,
} from '@phosphor-icons/react'
import { QuizBestScore } from '@/types'

interface QuizCardProps {
  title: string
  description: string
  questionCount: number
  duration?: number // in minutes
  subjectColor: string
  subjectIcon: string
  subjectName: string
  bestScore?: QuizBestScore
  onStartQuiz: () => void
  onOpenPdf?: () => void
  index: number
}

export function QuizCard({
  title,
  description,
  questionCount,
  duration = 60,
  subjectColor,
  subjectIcon,
  subjectName,
  bestScore,
  onStartQuiz,
  onOpenPdf,
  index,
}: QuizCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.03 * (index % 10) }}
      className="bg-surface border border-border rounded-2xl p-5 hover:border-border-hover transition-all shadow-card flex flex-col justify-between group"
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
              style={{ background: `${subjectColor}18` }}
            >
              {subjectIcon}
            </div>
            <div>
              <span
                className="text-[11px] font-semibold tracking-wide uppercase block"
                style={{ color: subjectColor }}
              >
                {subjectName}
              </span>
              <h3 className="font-bold text-text-primary text-sm group-hover:text-accent transition-colors leading-snug">
                {title}
              </h3>
            </div>
          </div>

          {/* Best Score Badge */}
          {bestScore && bestScore.totalAttempts > 0 && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-warning/10 text-warning text-xs font-bold">
              <Trophy size={12} weight="fill" />
              <span>{bestScore.bestScore}%</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-text-secondary line-clamp-2 mb-4">
          {description}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-surface-elevated text-text-secondary px-2.5 py-1 rounded-lg border border-border">
            <Books size={12} className="text-accent" />
            {questionCount} Soal
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-surface-elevated text-text-secondary px-2.5 py-1 rounded-lg border border-border">
            <Clock size={12} className="text-warning" />
            {duration} Menit
          </span>
          {bestScore && bestScore.totalAttempts > 0 && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-accent/10 text-accent px-2.5 py-1 rounded-lg">
              <Trophy size={12} weight="fill" />
              {bestScore.totalAttempts}x尝试
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-3 border-t border-border/60 flex items-center gap-2">
        <button
          onClick={onStartQuiz}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-accent text-white hover:bg-accent-hover transition-colors shadow-sm"
        >
          <Play size={15} weight="fill" />
          <span>Mulai Quiz</span>
        </button>

        {onOpenPdf && (
          <button
            onClick={onOpenPdf}
            className="inline-flex items-center justify-center gap-1 p-2 rounded-xl text-xs font-medium bg-surface-elevated text-text-secondary hover:text-text-primary border border-border hover:border-border-hover transition-colors"
            title="Lihat PDF"
          >
            <FilePdf size={16} />
          </button>
        )}
      </div>
    </motion.div>
  )
}
