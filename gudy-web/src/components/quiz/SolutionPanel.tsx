'use client'

import { motion } from 'framer-motion'
import { Lightbulb, ArrowRight } from '@phosphor-icons/react'
import { QuizQuestion } from '@/types'

interface SolutionPanelProps {
  question: QuizQuestion
  selectedAnswer?: string
  onNext: () => void
  isLast: boolean
}

export function SolutionPanel({
  question,
  selectedAnswer,
  onNext,
  isLast,
}: SolutionPanelProps) {
  const isCorrect = selectedAnswer === question.answer
  const wasSkipped = !selectedAnswer

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Result Banner */}
      <div
        className={`
          p-4 rounded-xl border-2
          ${isCorrect
            ? 'bg-success/10 border-success/30'
            : wasSkipped
              ? 'bg-warning/10 border-warning/30'
              : 'bg-error/10 border-error/30'
          }
        `}
      >
        <div className="flex items-center gap-3">
          <div
            className={`
              w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold
              ${isCorrect
                ? 'bg-success text-white'
                : wasSkipped
                  ? 'bg-warning text-white'
                  : 'bg-error text-white'
              }
            `}
          >
            {isCorrect ? '✓' : wasSkipped ? '!' : '✗'}
          </div>
          <div>
            <p
              className={`
                font-bold text-sm
                ${isCorrect
                  ? 'text-success'
                  : wasSkipped
                    ? 'text-warning'
                    : 'text-error'
                }
              `}
            >
              {isCorrect
                ? 'Benar!'
                : wasSkipped
                  ? 'Tidak Dijawab'
                  : 'Kurang Tepat'}
            </p>
            <p className="text-xs text-text-secondary">
              {isCorrect
                ? 'Jawaban kamu benar!'
                : wasSkipped
                  ? 'Pertanyaan ini tidak dijawab'
                  : `Jawaban yang benar adalah ${question.answer}`}
            </p>
          </div>
        </div>
      </div>

      {/* Solution Content */}
      <div className="bg-surface-elevated border border-border rounded-xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
            <Lightbulb size={18} weight="fill" className="text-accent" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-text-primary mb-2">
              Pembahasan
            </h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              {question.solution}
            </p>
          </div>
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-colors"
      >
        <span>{isLast ? 'Lihat Hasil' : 'Soal Berikutnya'}</span>
        <ArrowRight size={16} weight="bold" />
      </button>
    </motion.div>
  )
}
