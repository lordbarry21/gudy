'use client'

import { motion } from 'framer-motion'
import {
  Play,
  FilePdf,
  Trophy,
  Books,
  Clock,
} from '@phosphor-icons/react'

interface QuizCardProps {
  title: string
  description: string
  questionCount: number
  duration?: number // in minutes
  subjectColor: string
  subjectIcon: string
  subjectName: string
  bestScore?: number // just the score percentage
  bestAttempts?: number // total attempts
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
  bestAttempts,
  onStartQuiz,
  onOpenPdf,
  index,
}: QuizCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.04 * (index % 10), duration: 0.3 }}
      className="bg-surface border border-border rounded-2xl p-5 hover:border-border-hover hover:shadow-lg transition-all flex flex-col justify-between group"
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-sm"
              style={{ background: `${subjectColor}20` }}
            >
              {subjectIcon}
            </div>
            <div>
              {/* Subject Label - Uppercase tracking */}
              <span
                className="font-sans text-[10px] font-bold tracking-widest uppercase block mb-0.5"
                style={{ color: subjectColor }}
              >
                {subjectName}
              </span>
              {/* Title - Fraunces for personality */}
              <h3 className="font-display font-semibold text-text-primary text-base group-hover:text-accent transition-colors leading-snug tracking-tight">
                {title}
              </h3>
            </div>
          </div>

          {/* Best Score Badge */}
          {bestScore !== undefined && bestScore > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-warning/15 text-warning font-sans text-xs font-bold shadow-sm">
              <Trophy size={11} weight="fill" />
              <span>{bestScore}%</span>
            </div>
          )}
        </div>

        {/* Description - Serif for readability */}
        <p className="font-serif text-sm text-text-secondary leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>

        {/* Badges - Sans for UI */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold bg-surface-elevated text-text-secondary px-2.5 py-1.5 rounded-lg border border-border">
            <Books size={12} className="text-accent" />
            {questionCount} Soal
          </span>
          <span className="inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold bg-surface-elevated text-text-secondary px-2.5 py-1.5 rounded-lg border border-border">
            <Clock size={12} className="text-warning" />
            {duration} Menit
          </span>
          {bestAttempts !== undefined && bestAttempts > 0 && (
            <span className="inline-flex items-center gap-1.5 font-sans text-[11px] font-bold bg-accent/10 text-accent px-2.5 py-1.5 rounded-lg">
              <Trophy size={12} weight="fill" />
              {bestAttempts}x Dicoba
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-border flex items-center gap-2">
        <button
          onClick={onStartQuiz}
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-sans text-sm font-bold bg-accent text-white hover:bg-accent-hover transition-all shadow-md hover:shadow-lg"
        >
          <Play size={16} weight="fill" />
          <span>Mulai Quiz</span>
        </button>

        {onOpenPdf && (
          <button
            onClick={onOpenPdf}
            className="inline-flex items-center justify-center gap-1.5 p-2.5 rounded-xl font-sans text-xs font-medium bg-surface-elevated text-text-secondary hover:text-text-primary border border-border hover:border-border-hover transition-all"
            title="Lihat PDF"
          >
            <FilePdf size={18} />
          </button>
        )}
      </div>
    </motion.div>
  )
}
