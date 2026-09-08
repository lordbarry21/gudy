'use client'

import { motion } from 'framer-motion'
import { Lightbulb, ArrowRight } from '@phosphor-icons/react'
import { QuizQuestion } from '@/types'
import { MathRenderer } from './MathRenderer'

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
      className="space-y-5"
    >
      {/* Result Banner */}
      <div
        className={`
          p-5 rounded-2xl border-2
          ${isCorrect
            ? 'bg-success/10 border-success/30'
            : wasSkipped
              ? 'bg-warning/10 border-warning/30'
              : 'bg-error/10 border-error/30'
          }
        `}
      >
        <div className="flex items-center gap-4">
          <div
            className={`
              w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold shadow-sm
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
                font-display font-bold text-base
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
            <p className="font-sans text-sm text-text-secondary mt-0.5">
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
      <div className="bg-surface-elevated border border-border rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center shrink-0 shadow-sm">
            <Lightbulb size={20} weight="fill" className="text-accent" />
          </div>
          <div className="flex-1">
            <h4 className="font-display font-bold text-base text-text-primary mb-3">
              Pembahasan
            </h4>
            <div className="font-serif text-base text-text-secondary leading-relaxed">
              <MathRenderer text={question.solution} inline={true} />
            </div>
          </div>
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-accent text-white font-sans font-bold text-sm hover:bg-accent-hover transition-all shadow-md hover:shadow-lg"
      >
        <span>{isLast ? 'Lihat Hasil' : 'Soal Berikutnya'}</span>
        <ArrowRight size={16} weight="bold" />
      </button>
    </motion.div>
  )
}
