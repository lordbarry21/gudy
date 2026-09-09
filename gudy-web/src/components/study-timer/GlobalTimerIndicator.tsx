'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import {
  Brain,
  Play,
  Pause,
  Confetti,
  Sparkle,
  BookOpen,
  CaretRight,
  CaretLeft,
  X,
} from '@phosphor-icons/react'
import { useTimerStore, useLiveTimer } from '@/lib/timer-store'
import { useAppStore } from '@/lib/store'
import { useLanguage } from '@/lib/i18n/useLanguage'

const formatTimeCompact = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export function GlobalTimerIndicator() {
  const {
    isActive,
    isPaused,
    selectedSubjectId,
    isZenMode,
    pauseTimer,
    resumeTimer,
    completeSession,
    toggleZenMode,
    resetTimer,
  } = useTimerStore()

  const { liveRemainingSeconds, progressPercent } = useLiveTimer()
  const { subjects } = useAppStore()
  const { t } = useLanguage()
  const [isCollapsed, setIsCollapsed] = useState(false)

  if (!isActive) return null

  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -25, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -25, scale: 0.95 }}
        transition={{ type: 'spring', damping: 20, stiffness: 280 }}
        className="fixed top-4 right-4 z-40 max-w-[calc(100vw-2rem)]"
      >
        <div
          className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-2xl shadow-xl backdrop-blur-md border transition-all ${
            isPaused
              ? 'bg-surface/90 border-warning/40 shadow-warning/5'
              : 'bg-surface/90 border-accent/30 shadow-accent/5'
          }`}
        >
          {/* Status Icon with pulsating aura */}
          <div
            className={`relative w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              isPaused
                ? 'bg-warning/15 text-warning'
                : 'bg-success/15 text-success'
            }`}
          >
            <Brain
              size={18}
              weight="fill"
              className={isPaused ? '' : 'animate-pulse'}
            />
            {!isPaused && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-success ring-2 ring-surface animate-ping" />
            )}
          </div>

          {/* Collapsed Pill View */}
          {isCollapsed ? (
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-bold font-mono ${
                  isPaused ? 'text-warning' : 'text-text-primary'
                }`}
              >
                {formatTimeCompact(liveRemainingSeconds)}
              </span>
              <button
                onClick={() => setIsCollapsed(false)}
                className="p-1 rounded-lg hover:bg-border/60 text-text-muted hover:text-text-primary transition-colors"
                title="Perluas"
              >
                <CaretLeft size={14} />
              </button>
            </div>
          ) : (
            /* Expanded Full Dock View */
            <div className="flex items-center gap-3">
              {/* Subject Info & Countdown */}
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  {selectedSubject && (
                    <span className="text-xs shrink-0">{selectedSubject.icon}</span>
                  )}
                  <span className="text-xs font-bold text-text-primary truncate max-w-[130px] sm:max-w-[180px]">
                    {selectedSubject?.name || 'Mode Fokus'}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className={`text-sm font-extrabold font-mono tracking-tight ${
                      isPaused ? 'text-warning' : 'text-accent'
                    }`}
                  >
                    {formatTimeCompact(liveRemainingSeconds)}
                  </span>
                  <span className="text-[10px] text-text-muted">
                    {isPaused ? 'Dijeda' : 'Tersisa'}
                  </span>
                </div>
              </div>

              {/* Progress mini indicator */}
              <div className="hidden sm:block w-12 h-1.5 bg-surface-elevated rounded-full overflow-hidden shrink-0">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isPaused ? 'bg-warning' : 'bg-accent'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 pl-1 border-l border-border">
                {/* Go to Material link if subject selected */}
                {selectedSubject && (
                  <Link
                    href={`/learn/${selectedSubject.id}`}
                    className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-elevated hover:bg-accent hover:text-white text-text-secondary text-[11px] font-medium border border-border transition-all"
                    title={`Buka materi ${selectedSubject.name}`}
                  >
                    <BookOpen size={13} weight="bold" />
                    <span>Materi</span>
                  </Link>
                )}

                {/* Zen Mode Toggle */}
                <button
                  onClick={() => toggleZenMode()}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isZenMode
                      ? 'bg-accent/20 text-accent border border-accent/40'
                      : 'bg-surface-elevated hover:bg-border text-text-muted hover:text-text-primary'
                  }`}
                  title={isZenMode ? t.timer.exitZenMode : t.timer.zenMode}
                >
                  <Sparkle size={15} weight="fill" />
                </button>

                {/* Play / Pause Toggle */}
                {isPaused ? (
                  <button
                    onClick={resumeTimer}
                    className="p-1.5 rounded-lg bg-success/20 hover:bg-success/30 text-success transition-colors"
                    title={t.timer.resume}
                  >
                    <Play size={14} weight="fill" />
                  </button>
                ) : (
                  <button
                    onClick={pauseTimer}
                    className="p-1.5 rounded-lg bg-warning/20 hover:bg-warning/30 text-warning transition-colors"
                    title={t.timer.pause}
                  >
                    <Pause size={14} weight="fill" />
                  </button>
                )}

                {/* Complete & Save */}
                <button
                  onClick={() => completeSession()}
                  className="p-1.5 rounded-lg bg-accent/20 hover:bg-accent text-accent hover:text-white transition-colors"
                  title="Selesai & Simpan Sesi"
                >
                  <Confetti size={14} weight="fill" />
                </button>

                {/* Collapse Button */}
                <button
                  onClick={() => setIsCollapsed(true)}
                  className="p-1 rounded-lg hover:bg-border/60 text-text-muted hover:text-text-primary transition-colors"
                  title="Perkecil"
                >
                  <CaretRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
