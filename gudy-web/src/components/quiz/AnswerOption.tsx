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

    return 'bg-surface border-border hover:border-accent hover:bg-surface-elevated'
  }

  const getIcon = () => {
    if (showResult) {
      if (isCorrect) {
        return <CheckCircle size={32} weight="fill" className="text-success" />
      }
      if (isWrong) {
        return <XCircle size={32} weight="fill" className="text-error" />
      }
    }

    if (isSelected) {
      return <Circle size={32} weight="fill" className="text-accent" />
    }

    return <Circle size={32} className="text-text-muted" />
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.008 }}
      whileTap={{ scale: disabled ? 1 : 0.992 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full flex items-center gap-5 sm:gap-6 p-5 sm:p-6 rounded-2xl border-2
        transition-all duration-200 text-left group
        ${getStyles()}
        ${disabled ? 'cursor-default' : 'cursor-pointer'}
      `}
    >
      {/* Option Key Badge */}
      <span
        className={`
          w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center
          font-sans font-bold text-xl sm:text-2xl shrink-0 transition-colors
          ${isSelected || isCorrect
            ? 'bg-accent text-white shadow-sm'
            : isWrong
              ? 'bg-error text-white shadow-sm'
              : 'bg-surface-elevated text-text-secondary group-hover:bg-accent/15 group-hover:text-accent'
          }
        `}
      >
        {optionKey}
      </span>

      {/* Option Text */}
      <span className="flex-1 font-sans text-xl sm:text-2xl font-medium leading-relaxed tracking-normal">
        <MathRenderer text={text} inline={true} className="!text-inherit" />
      </span>

      {/* Status Icon */}
      <span className="shrink-0">
        {getIcon()}
      </span>
    </motion.button>
  )
}
