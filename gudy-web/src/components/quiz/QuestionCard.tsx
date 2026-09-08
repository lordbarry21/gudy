'use client'

import { motion } from 'framer-motion'
import { Target } from '@phosphor-icons/react'
import { QuizQuestion } from '@/types'
import { AnswerOption } from './AnswerOption'

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
      className="space-y-6"
    >
      {/* Question Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {/* Topic Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-elevated text-xs font-medium text-text-secondary mb-3">
            <Target size={12} weight="bold" className="text-accent" />
            <span>{question.topic}</span>
          </div>

          {/* Question Number */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-accent">
              SOAL {questionNumber} DARI {totalQuestions}
            </span>
          </div>

          {/* Question Text */}
          <div className="text-text-primary text-base leading-relaxed whitespace-pre-wrap">
            {question.question.split('\n').map((line, idx, arr) => (
              <p key={idx} className={idx === arr.length - 1 ? '' : 'mb-3'}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
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
