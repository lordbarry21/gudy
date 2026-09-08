'use client'

import { motion } from 'framer-motion'
import { Target } from '@phosphor-icons/react'
import { QuizQuestion } from '@/types'
import { AnswerOption } from './AnswerOption'
import { MathRenderer } from './MathRenderer'

interface QuestionCardProps {
  question: QuizQuestion
  questionNumber: number
  totalQuestions: number
  selectedAnswer?: string
  showResult?: boolean
  onSelectAnswer: (answer: string) => void
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  showResult,
  onSelectAnswer,
}: QuestionCardProps) {
  const optionKeys = Object.keys(question.options)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Question Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {/* Topic Badge - Centered */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-elevated font-sans text-xs font-semibold text-text-secondary">
              <Target size={13} weight="bold" className="text-accent" />
              <span>{question.topic}</span>
            </div>
          </div>

          {/* Question Number - Centered */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 bg-border max-w-[80px]" />
            <span className="font-display text-sm font-bold text-accent tracking-wider">
              SOAL {questionNumber} DARI {totalQuestions}
            </span>
            <div className="h-px flex-1 bg-border max-w-[80px]" />
          </div>

          {/* Question Text - Larger for better readability */}
          <div className="font-serif text-xl lg:text-2xl text-text-primary leading-relaxed">
            {question.question.split('\n').map((line, idx, arr) => (
              <p key={idx} className={idx === arr.length - 1 ? '' : 'mb-4'}>
                <MathRenderer text={line} inline={true} />
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Answer Options - Larger spacing */}
      <div className="space-y-4 pt-2">
        {optionKeys.map((key) => (
          <AnswerOption
            key={key}
            optionKey={key}
            text={question.options[key]}
            isSelected={selectedAnswer === key}
            isCorrect={showResult && key === question.answer}
            isWrong={
              showResult &&
              selectedAnswer === key &&
              key !== question.answer
            }
            showResult={showResult}
            onClick={() => !showResult && onSelectAnswer(key)}
            disabled={showResult}
          />
        ))}
      </div>
    </motion.div>
  )
}
