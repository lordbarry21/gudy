'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, GraduationCap, X } from '@phosphor-icons/react'
import { useTutorial } from './TutorialContext'

interface TutorialToastProps {
  className?: string
}

export function TutorialToast({ className = '' }: TutorialToastProps) {
  const { isCompleted, startTutorial, skipTutorial } = useTutorial()

  // Only show if NOT completed yet (first time user)
  if (isCompleted) return null

  const handleDismiss = () => {
    skipTutorial()
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`fixed bottom-6 right-6 z-[70] max-w-sm ${className}`}
    >
      <div className="bg-white dark:bg-surface-elevated border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-accent to-orange-500 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap size={20} className="text-white" weight="fill" />
            <span className="text-white text-sm font-bold">New di Gudy!</span>
          </div>
          <button
            onClick={handleDismiss}
            className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X size={14} className="text-white" weight="bold" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-sm text-text-primary mb-1">
            Yuk, kenali fitur-fitur aplikasi dengan tutorial singkat! 🎓
          </p>
          <p className="text-xs text-text-muted mb-4">
            Pelajari cara belajar efektif dengan Gudy dalam 1 menit.
          </p>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleDismiss}
              className="flex-1 py-2.5 text-xs font-medium text-text-muted hover:text-text-secondary transition-colors bg-surface-elevated rounded-lg hover:bg-border"
            >
              Nanti
            </button>
            <button
              onClick={startTutorial}
              className="flex-1 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-accent to-orange-500 hover:from-accent-dark hover:to-orange-600 rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <BookOpen size={14} weight="fill" />
              Mulai Tutorial
            </button>
          </div>
        </div>
      </div>

      {/* Decorative corner */}
      <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-gradient-to-tl from-accent/20 to-transparent rounded-bl-full pointer-events-none" />
    </motion.div>
  )
}
