'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import {
  Play,
  Pause,
  ArrowCounterClockwise,
  Target,
  CheckCircle,
  Fire,
  Brain,
  CaretDown,
  Sparkle,
  Confetti,
  BookOpen,
} from '@phosphor-icons/react'
import { useTimerStore, useLiveTimer } from '@/lib/timer-store'
import { useAppStore } from '@/lib/store'
import { useLanguage } from '@/lib/i18n/useLanguage'
import type { PomodoroPreset, StudySession } from '@/types'
import { getTodaySessions } from '@/lib/storage'

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

const formatMinutes = (mins: number) => {
  if (mins < 60) return `${mins}m`
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

const getTodayString = () => new Date().toISOString().split('T')[0]

export default function StudyTimer() {
  const { t } = useLanguage()
  const {
    isActive,
    isPaused,
    selectedSubjectId,
    selectedPreset,
    totalSeconds,
    isZenMode,
    selectPreset,
    selectSubject,
    startTimer,
    pauseTimer,
    resumeTimer,
    completeSession,
    resetTimer,
    toggleZenMode,
  } = useTimerStore()

  const { liveElapsedSeconds, liveRemainingSeconds, progressPercent } = useLiveTimer()
  const { subjects, topics, progress } = useAppStore()

  const [showSubjectPicker, setShowSubjectPicker] = useState(false)
  const [sessionsToday, setSessionsToday] = useState<StudySession[]>([])

  useEffect(() => {
    setSessionsToday(getTodaySessions())
  }, [liveElapsedSeconds, isActive])

  const displayElapsed = liveElapsedSeconds
  const displayRemaining = liveRemainingSeconds

  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId)

  const todayStr = getTodayString()
  const liveTodayTopics = topics.filter(
    (topic) => topic.isLeaf && topic.completedAt && topic.completedAt.startsWith(todayStr)
  ).length
  const liveTodaySessions = sessionsToday.filter(
    (session) =>
      session.date === todayStr ||
      (session.completedAt && session.completedAt.startsWith(todayStr))
  ).length
  const todayCompletedCount = liveTodayTopics + liveTodaySessions
  const dailyTargetCount = progress.dailyGoal || 3

  const isTargetMet = todayCompletedCount >= dailyTargetCount

  const presets: { value: PomodoroPreset; label: string }[] = [
    { value: 25, label: '25m' },
    { value: 45, label: '45m' },
    { value: 60, label: '1h' },
    { value: 90, label: '1.5h' },
  ]

  return (
    <div className="space-y-4">
      {/* Main Timer Card */}
      <div className="bg-surface border border-border rounded-2xl p-5 shadow-card" data-tutorial="focus-timer">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                isActive && !isPaused
                  ? 'bg-success/15 text-success'
                  : displayElapsed > 0
                  ? 'bg-accent/15 text-accent'
                  : 'bg-surface-elevated text-text-secondary'
              }`}
            >
              <Brain size={20} weight="fill" />
            </div>
            <div>
              <span className="text-sm font-semibold text-text-primary block">
                {t.timer.focusMode}
              </span>
              <span className="text-[11px] text-text-muted">
                {isActive && !isPaused
                  ? t.timer.stayFocused
                  : displayElapsed > 0
                  ? t.timer.sessionActive
                  : t.timer.selectSubjectHint}
              </span>
            </div>
          </div>

          {isActive && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`flex items-center gap-2 px-2.5 py-1 rounded-full border ${
                isPaused
                  ? 'bg-warning/10 border-warning/20 text-warning'
                  : 'bg-success/10 border-success/20 text-success'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isPaused ? 'bg-warning' : 'bg-success animate-pulse'
                }`}
              />
              <span className="text-xs font-medium">
                {isPaused ? t.timer.pause : t.timer.focusing}
              </span>
            </motion.div>
          )}
        </div>

        {/* Subject Selector */}
        <button
          onClick={() => !isActive && setShowSubjectPicker(!showSubjectPicker)}
          disabled={isActive}
          className={`w-full mb-4 p-3 rounded-xl border transition-all ${
            isActive
              ? 'bg-surface-elevated border-border cursor-not-allowed opacity-75'
              : 'bg-surface-elevated border-border hover:border-border-hover cursor-pointer'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {selectedSubject ? (
                <>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
                    style={{ background: `${selectedSubject.color}20` }}
                  >
                    {selectedSubject.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-text-primary">
                      {selectedSubject.name}
                    </p>
                    <p className="text-[11px] text-text-muted">
                      {selectedSubject.completedTopics}/{selectedSubject.totalTopics} {t.timer.topicsCompleted}
                    </p>
                  </div>
                </>
              ) : (
                <span className="text-sm text-text-muted">{t.timer.selectSubject}</span>
              )}
            </div>
            {!isActive && (
              <CaretDown
                size={18}
                className={`text-text-muted transition-transform ${showSubjectPicker ? 'rotate-180' : ''}`}
              />
            )}
          </div>
        </button>

        {/* Subject Dropdown */}
        <AnimatePresence>
          {showSubjectPicker && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="mb-4 overflow-hidden"
            >
              <div className="bg-surface-elevated border border-border rounded-xl p-2 space-y-1">
                {subjects.map((subject) => (
                  <button
                    key={subject.id}
                    onClick={() => {
                      selectSubject(subject.id)
                      setShowSubjectPicker(false)
                    }}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-colors ${
                      selectedSubjectId === subject.id
                        ? 'bg-accent/10 text-accent'
                        : 'hover:bg-border/50 text-text-primary'
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center text-sm"
                      style={{ background: `${subject.color}20` }}
                    >
                      {subject.icon}
                    </div>
                    <span className="text-sm font-medium">{subject.name}</span>
                    {selectedSubjectId === subject.id && (
                      <CheckCircle size={16} className="ml-auto text-accent" weight="fill" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Duration Presets */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[11px] text-text-muted mr-1">{t.timer.duration}</span>
          {presets.map((preset) => (
            <button
              key={preset.value}
              onClick={() => selectPreset(preset.value)}
              disabled={isActive}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedPreset === preset.value
                  ? 'bg-accent text-white shadow-sm'
                  : isActive
                  ? 'bg-surface-elevated text-text-muted cursor-not-allowed'
                  : 'bg-surface-elevated text-text-secondary hover:bg-border hover:text-text-primary'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Timer Display */}
        <div
          className={`text-center py-6 rounded-xl mb-4 transition-colors relative overflow-hidden ${
            isActive && !isPaused
              ? 'bg-success/10'
              : isActive && isPaused
              ? 'bg-warning/10'
              : 'bg-surface-elevated'
          }`}
        >
          {/* Progress Ring */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-surface-elevated opacity-40"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${(progressPercent / 100) * 283} 283`}
                className={`transition-all duration-500 ${
                  isActive && !isPaused
                    ? 'text-success'
                    : isPaused
                    ? 'text-warning'
                    : 'text-accent'
                }`}
              />
            </svg>
          </div>

          <div className="relative z-10">
            <span
              className={`text-4xl lg:text-5xl font-bold font-mono tracking-tight transition-colors ${
                isActive && !isPaused
                  ? 'text-success'
                  : isPaused
                  ? 'text-warning'
                  : 'text-text-primary'
              }`}
            >
              {formatTime(displayRemaining)}
            </span>
            <p className="text-[11px] text-text-muted mt-1">
              {isActive
                ? `${t.timer.session} ${formatMinutes(Math.floor(displayElapsed / 60))} / ${formatMinutes(selectedPreset)}`
                : `${t.timer.target} ${selectedPreset} ${t.timer.minutes}`}
            </p>
          </div>
        </div>

        {/* Action Prompt when active: Direct link to /learn/[subjectId] and Zen mode */}
        {isActive && selectedSubject && (
          <div className="mb-4 p-3 bg-surface-elevated border border-border/80 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-base">{selectedSubject.icon}</span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-text-primary truncate">
                  {selectedSubject.name}
                </p>
                <p className="text-[10px] text-text-muted">
                  Buka materi untuk mulai membaca dan latihan
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <Link
                href={`/learn/${selectedSubject.id}`}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 bg-accent hover:bg-accent-dark text-white text-xs font-medium rounded-lg shadow-sm transition-all"
              >
                <BookOpen size={14} weight="bold" />
                <span>{t.timer.openMaterial}</span>
              </Link>
              <button
                onClick={() => toggleZenMode()}
                className={`p-1.5 rounded-lg border transition-colors ${
                  isZenMode
                    ? 'bg-accent/20 border-accent text-accent'
                    : 'bg-surface border-border text-text-secondary hover:text-text-primary'
                }`}
                title={isZenMode ? t.timer.exitZenMode : t.timer.zenMode}
              >
                <Sparkle size={16} weight="fill" />
              </button>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          {!isActive && (
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => startTimer()}
              disabled={!selectedSubject}
              className={`flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-xl shadow-sm transition-all ${
                selectedSubject
                  ? 'bg-accent hover:bg-accent-dark text-white active:scale-95'
                  : 'bg-surface-elevated text-text-muted cursor-not-allowed'
              }`}
            >
              <Play size={16} weight="fill" />
              <span>{t.timer.startFocus}</span>
            </motion.button>
          )}

          {isActive && !isPaused && (
            <>
              <button
                onClick={pauseTimer}
                className="flex items-center gap-1.5 px-4 py-2 bg-warning/10 hover:bg-warning/20 border border-warning/30 text-warning text-xs font-medium rounded-xl transition-colors"
              >
                <Pause size={16} weight="fill" />
                <span>{t.timer.pause}</span>
              </button>
              <button
                onClick={() => completeSession()}
                className="flex items-center gap-1.5 px-4 py-2 bg-accent hover:bg-accent-dark text-white text-xs font-medium rounded-xl transition-colors shadow-sm"
              >
                <Confetti size={16} weight="fill" />
                <span>{t.timer.complete}</span>
              </button>
              <button
                onClick={resetTimer}
                className="p-2 rounded-xl bg-surface-elevated hover:bg-border text-text-muted hover:text-text-primary border border-border transition-colors"
                title={t.timer.reset}
              >
                <ArrowCounterClockwise size={16} />
              </button>
            </>
          )}

          {isActive && isPaused && (
            <>
              <button
                onClick={resumeTimer}
                className="flex items-center gap-1.5 px-4 py-2 bg-success hover:bg-success/90 text-white text-xs font-medium rounded-xl transition-colors shadow-sm"
              >
                <Play size={16} weight="fill" />
                <span>{t.timer.resume}</span>
              </button>
              <button
                onClick={() => completeSession()}
                className="flex items-center gap-1.5 px-4 py-2 bg-accent hover:bg-accent-dark text-white text-xs font-medium rounded-xl transition-colors shadow-sm"
              >
                <Confetti size={16} weight="fill" />
                <span>{t.timer.save}</span>
              </button>
              <button
                onClick={resetTimer}
                className="p-2 rounded-xl bg-surface-elevated hover:bg-border text-text-muted hover:text-text-primary border border-border transition-colors"
                title={t.timer.reset}
              >
                <ArrowCounterClockwise size={16} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Daily Progress Card */}
      <div className="bg-surface border border-border rounded-2xl p-4 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target size={16} className="text-accent" weight="bold" />
            <span className="text-xs font-semibold text-text-primary">{t.timer.dailyTarget}</span>
            {isTargetMet && (
              <span className="px-1.5 py-0.5 bg-success/15 text-success text-[9px] font-bold rounded-full">
                ✓
              </span>
            )}
          </div>
          <span className="text-xs font-medium text-text-secondary">
            {todayCompletedCount} / {dailyTargetCount} {t.home.materialsCompletedCount}
          </span>
        </div>

        <div className="h-2 bg-surface-elevated rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: isTargetMet ? '#22c55e' : '#f59e0b' }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((todayCompletedCount / dailyTargetCount) * 100, 100)}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] text-text-muted">
          <span>
            {isTargetMet ? (
              <span className="text-success font-medium">{t.home.goalReached}</span>
            ) : (
              <span>
                {Math.max(dailyTargetCount - todayCompletedCount, 0)} {t.home.toExtendStreak}
              </span>
            )}
          </span>
          <div className="flex items-center gap-1.5">
            <Fire size={12} className={progress.streak > 0 ? 'text-accent' : 'text-text-muted'} weight="fill" />
            <span className="font-medium">{progress.streak}d streak</span>
          </div>
        </div>

        {/* Today's Sessions */}
        {sessionsToday.length > 0 && (
          <div className="space-y-2 mt-3 pt-3 border-t border-border">
            <span className="text-[10px] text-text-muted uppercase tracking-wider">
              {t.timer.todaysSessions}
            </span>
            <div className="space-y-1.5">
              {sessionsToday.slice(-3).reverse().map((session) => (
                <div
                  key={session.id}
                  className="flex items-center gap-2 p-2 bg-surface-elevated rounded-lg"
                >
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center text-xs"
                    style={{ background: `${session.subjectColor}20` }}
                  >
                    {subjects.find((s) => s.id === session.subjectId)?.icon || '📚'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-text-primary truncate">
                      {session.subjectName}
                    </p>
                    <p className="text-[10px] text-text-muted">
                      {formatMinutes(session.durationMinutes)}
                    </p>
                  </div>
                  <CheckCircle size={14} className="text-success" weight="fill" />
                </div>
              ))}
            </div>
          </div>
        )}

        {sessionsToday.length === 0 && liveTodayTopics === 0 && (
          <div className="text-center py-3">
            <p className="text-[11px] text-text-muted mb-1">
              {t.timer.noSessionToday}
            </p>
            <p className="text-[10px] text-text-muted/70">
              {t.timer.sessionCountsHint}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
