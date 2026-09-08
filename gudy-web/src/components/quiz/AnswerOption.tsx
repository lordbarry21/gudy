'use client'

import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Circle } from '@phosphor-icons/react'
import { MathRenderer } from './MathRenderer'

interface AnswerOptionProps {
  optionKey: string
  text: string
  isSelected: boolean
  isCorrect?: boolean
  isWrong?: boolean
  showResult?: boolean
  onClick: () => void
  disabled?: boolean
}

export function AnswerOption({
  optionKey,
  text,
  isSelected,
  isCorrect,
  isWrong,
  showResult,
  onClick,
  disabled,
}: AnswerOptionProps) {
  const getStyles = () => {
    if (showResult) {
      if (isCorrect) {
        return 'bg-success/15 border-success text-success'
      }
      if (isWrong) {
        return 'bg-error/15 border-error text-error'
      }
    }

    if (isSelected) {
      return 'bg-accent/15 border-accent text-accent'
    }

    return 'bg-surface border-border hover:border-accent/50 hover:bg-surface-elevated'
  }

  const getIcon = () => {
    if (showResult) {
      if (isCorrect) {
        return <CheckCircle size={24} weight="fill" className="text-success" />
      }
      if (isWrong) {
        return <XCircle size={24} weight="fill" className="text-error" />
      }
    }

    if (isSelected) {
      return <Circle size={24} weight="fill" className="text-accent" />
    }

    return <Circle size={24} className="text-text-muted" />
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.01 }}
      whileTap={{ scale: disabled ? 1 : 0.99 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full flex items-center gap-4 lg:gap-5 p-5 lg:p-6 rounded-2xl border-2
        transition-all duration-200 text-left
        ${getStyles()}
        ${disabled ? 'cursor-default' : 'cursor-pointer'}
      `}
    >
      {/* Option Key Badge */}
      <span
        className={`
          w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center
          font-bold text-base lg:text-lg shrink-0
          ${isSelected || isCorrect
            ? 'bg-accent text-white'
            : isWrong
              ? 'bg-error text-white'
              : 'bg-surface-elevated text-text-secondary'
          }
        `}
      >
        {optionKey}
      </span>

      {/* Option Text - Larger for PC */}
      <span className="flex-1 text-base lg:text-lg font-medium leading-relaxed">
        <MathRenderer text={text} inline={true} />
      </span>

      {/* Status Icon */}
      <span className="shrink-0">
        {getIcon()}
      </span>
    </motion.button>
  )
}
