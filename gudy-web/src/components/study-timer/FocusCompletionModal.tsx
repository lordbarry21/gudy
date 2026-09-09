'use client'

import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle, Confetti, Coffee, BookOpen, X } from '@phosphor-icons/react'
import { useTimerStore } from '@/lib/timer-store'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { useRouter } from 'next/navigation'

export function FocusCompletionModal() {
  const { showCompletionModal, completedSessionData, dismissCompletionModal, startTimer } =
    useTimerStore()
  const { t } = useLanguage()
  const router = useRouter()

  if (!showCompletionModal || !completedSessionData) return null

  const handleStartBreak = () => {
    dismissCompletionModal()
    startTimer(completedSessionData.subjectId, 25)
  }

  const handleContinueStudy = () => {
    dismissCompletionModal()
    if (completedSessionData.subjectId && completedSessionData.subjectId !== 'general') {
      router.push(`/learn/${completedSessionData.subjectId}`)
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-surface border border-border rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        >
          {/* Top Background Glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 blur-3xl opacity-20 pointer-events-none rounded-full"
            style={{ backgroundColor: completedSessionData.subjectColor || '#3A92A6' }}
          />

          {/* Close Button */}
          <button
            onClick={dismissCompletionModal}
            className="absolute top-4 right-4 p-2 rounded-xl bg-surface-elevated hover:bg-border text-text-muted hover:text-text-primary transition-colors"
          >
            <X size={18} />
          </button>

          {/* Celebration Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-success/15 border border-success/30 flex items-center justify-center text-success shadow-inner">
              <Confetti size={32} weight="fill" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary tracking-tight">
              {t.timer.celebrationTitle}
            </h2>
            <p className="text-xs text-text-muted mt-1">
              {t.timer.congratulations}
            </p>
          </div>

          {/* Session Detail Card */}
          <div className="bg-surface-elevated border border-border rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-text-muted font-medium">Mata Pelajaran</span>
              <span className="text-xs font-semibold text-text-primary">
                {completedSessionData.subjectName}
              </span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-text-muted font-medium">{t.timer.focusedFor}</span>
              <span className="text-sm font-bold text-accent font-mono">
                {completedSessionData.durationMinutes} {t.timer.minutes}
              </span>
            </div>
            <div className="pt-3 border-t border-border/60 flex items-center gap-2 text-xs text-success">
              <CheckCircle size={16} weight="fill" />
              <span>{t.timer.sessionSaved}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleContinueStudy}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent hover:bg-accent-dark text-white text-xs font-semibold rounded-xl shadow-md transition-all active:scale-[0.98]"
            >
              <BookOpen size={16} weight="bold" />
              <span>{t.timer.continueStudying}</span>
            </button>
            <button
              onClick={dismissCompletionModal}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-surface-elevated hover:bg-border text-text-secondary hover:text-text-primary text-xs font-medium rounded-xl border border-border transition-colors"
            >
              <span>Tutup</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
