'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play,
  Pause,
  ArrowCounterClockwise,
  Coffee,
  Target,
  CheckCircle,
  Fire,
  Brain,
  Clock,
  CaretDown,
  X,
  Sparkle,
  SunDim,
  Moon,
  Confetti,
  SpeakerHigh,
} from '@phosphor-icons/react'
import { useAppStore } from '@/lib/store'
import {
  POMODORO_PRESETS,
  BREAK_PRESETS,
  BREAK_MESSAGES,
  MOTIVATIONAL_QUOTES,
} from '@/lib/constants'
import type { PomodoroPreset, StudySession, StudyTimerState } from '@/types'
import {
  addStudySession,
  getTodaySessions,
} from '@/lib/storage'

// Generate unique ID
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

// Format seconds to display
const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// Format minutes to readable string
const formatMinutes = (mins: number) => {
  if (mins < 60) return `${mins}m`
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

// Get today's date string
const getTodayString = () => new Date().toISOString().split('T')[0]

// Get random item from array
const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

export default function StudyTimer() {
  const { subjects, progress, updateStudyTime } = useAppStore()
  const [timerState, setTimerState] = useState<StudyTimerState>({
    isActive: false,
    isPaused: false,
    selectedSubjectId: subjects[0]?.id || null,
    selectedPreset: 25,
    customDuration: 45,
    remainingSeconds: 25 * 60,
    totalSeconds: 25 * 60,
    elapsedSeconds: 0,
    currentMode: 'focus',
    sessionsToday: getTodaySessions(),
  })
  const [showSubjectPicker, setShowSubjectPicker] = useState(false)
  const [showBreakPanel, setShowBreakPanel] = useState(false)
  const [breakMessage, setBreakMessage] = useState('')
  const [breakQuote, setBreakQuote] = useState<{ text: string; author: string } | null>(null)
  const [showCompletion, setShowCompletion] = useState(false)
  const [completedSession, setCompletedSession] = useState<StudySession | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Get selected subject info
  const selectedSubject = subjects.find(s => s.id === timerState.selectedSubjectId)

  // Calculate daily progress
  const todayMinutes = timerState.sessionsToday.reduce((sum, s) => sum + s.durationMinutes, 0)
  const dailyTargetMinutes = progress.dailyGoal * 20 // ~20 min per topic as baseline
  const dailyProgress = Math.min((todayMinutes / dailyTargetMinutes) * 100, 100)

  // Preset buttons
  const presets: { value: PomodoroPreset; label: string }[] = [
    { value: 25, label: '25m' },
    { value: 45, label: '45m' },
    { value: 60, label: '1h' },
    { value: 90, label: '1.5h' },
  ]

  // Select preset
  const selectPreset = (preset: PomodoroPreset) => {
    if (timerState.isActive) return
    setTimerState(prev => ({
      ...prev,
      selectedPreset: preset,
      remainingSeconds: preset * 60,
      totalSeconds: preset * 60,
      elapsedSeconds: 0,
    }))
  }

  // Select subject
  const selectSubject = (subjectId: string) => {
    if (timerState.isActive) return
    setTimerState(prev => ({ ...prev, selectedSubjectId: subjectId }))
    setShowSubjectPicker(false)
  }

  // Start timer
  const startTimer = () => {
    setTimerState(prev => ({
      ...prev,
      isActive: true,
      isPaused: false,
      currentMode: 'focus',
    }))
  }

  // Pause timer
  const pauseTimer = () => {
    setTimerState(prev => ({ ...prev, isPaused: true }))
  }

  // Resume timer
  const resumeTimer = () => {
    setTimerState(prev => ({ ...prev, isPaused: false }))
  }

  // Complete session manually (log and save)
  const completeSession = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    const elapsedMinutes = Math.ceil(timerState.elapsedSeconds / 60)
    if (elapsedMinutes < 1 || !selectedSubject) {
      setTimerState(prev => ({
        ...prev,
        isActive: false,
        isPaused: false,
        remainingSeconds: timerState.selectedPreset * 60,
        totalSeconds: timerState.selectedPreset * 60,
        elapsedSeconds: 0,
        sessionsToday: getTodaySessions(),
      }))
      return
    }

    // Create session record
    const session: StudySession = {
      id: generateId(),
      subjectId: selectedSubject.id,
      subjectName: selectedSubject.name,
      subjectColor: selectedSubject.color,
      durationMinutes: elapsedMinutes,
      targetMinutes: timerState.selectedPreset,
      completedAt: new Date().toISOString(),
      date: getTodayString(),
    }

    // Save session
    addStudySession(session)
    updateStudyTime(elapsedMinutes)

    // Show completion
    setCompletedSession(session)
    setShowCompletion(true)

    // Reset timer
    setTimerState(prev => ({
      ...prev,
      isActive: false,
      isPaused: false,
      remainingSeconds: prev.selectedPreset * 60,
      totalSeconds: prev.selectedPreset * 60,
      elapsedSeconds: 0,
      sessionsToday: getTodaySessions(),
    }))
  }, [timerState.elapsedSeconds, timerState.selectedPreset, selectedSubject, updateStudyTime])

  // Skip to break
  const skipToBreak = () => {
    if (!timerState.isActive) return
    completeSession()
    setShowBreakPanel(true)
    setBreakMessage(getRandomItem(BREAK_MESSAGES))
    setBreakQuote(getRandomItem(MOTIVATIONAL_QUOTES))
  }

  // Timer tick effect
  useEffect(() => {
    if (timerState.isActive && !timerState.isPaused) {
      intervalRef.current = setInterval(() => {
        setTimerState(prev => {
          if (prev.remainingSeconds <= 1) {
            // Timer complete!
            clearInterval(intervalRef.current!)
            intervalRef.current = null

            // Auto-complete session
            const elapsedMinutes = Math.ceil(prev.elapsedSeconds / 60)
            if (elapsedMinutes >= 1 && selectedSubject) {
              const session: StudySession = {
                id: generateId(),
                subjectId: selectedSubject.id,
                subjectName: selectedSubject.name,
                subjectColor: selectedSubject.color,
                durationMinutes: elapsedMinutes,
                targetMinutes: prev.selectedPreset,
                completedAt: new Date().toISOString(),
                date: getTodayString(),
              }
              addStudySession(session)
              updateStudyTime(elapsedMinutes)
              setCompletedSession(session)
              setShowCompletion(true)
            }

            return {
              ...prev,
              isActive: false,
              isPaused: false,
              remainingSeconds: prev.selectedPreset * 60,
              totalSeconds: prev.selectedPreset * 60,
              elapsedSeconds: 0,
              sessionsToday: getTodaySessions(),
            }
          }
          return {
            ...prev,
            remainingSeconds: prev.remainingSeconds - 1,
            elapsedSeconds: prev.elapsedSeconds + 1,
          }
        })
      }, 1000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [timerState.isActive, timerState.isPaused, selectedSubject, updateStudyTime])

  // Reset timer
  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setTimerState(prev => ({
      ...prev,
      isActive: false,
      isPaused: false,
      remainingSeconds: prev.selectedPreset * 60,
      totalSeconds: prev.selectedPreset * 60,
      elapsedSeconds: 0,
    }))
  }

  // Dismiss completion modal
  const dismissCompletion = () => {
    setShowCompletion(false)
    setCompletedSession(null)
  }

  // Calculate progress percentage
  const progressPercent = timerState.totalSeconds > 0
    ? ((timerState.totalSeconds - timerState.remainingSeconds) / timerState.totalSeconds) * 100
    : 0

  return (
    <div className="space-y-4">
      {/* Main Timer Card */}
      <div className="bg-surface border border-border rounded-2xl p-5 shadow-card">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                timerState.isActive && !timerState.isPaused
                  ? 'bg-success/15 text-success'
                  : timerState.elapsedSeconds > 0
                  ? 'bg-accent/15 text-accent'
                  : 'bg-surface-elevated text-text-secondary'
              }`}
            >
              <Brain size={20} weight="fill" />
            </div>
            <div>
              <span className="text-sm font-semibold text-text-primary block">
                Focus Mode
              </span>
              <span className="text-[11px] text-text-muted">
                {timerState.isActive && !timerState.isPaused
                  ? 'Tetap fokus ya! 🔥'
                  : timerState.elapsedSeconds > 0
                  ? 'Sesi berlangsung'
                  : 'Pilih mata pelajaran dan mulai'}
              </span>
            </div>
          </div>

          {timerState.isActive && !timerState.isPaused && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-2 px-2.5 py-1 bg-success/10 border border-success/20 rounded-full"
            >
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-success font-medium">Focusing</span>
            </motion.div>
          )}
        </div>

        {/* Subject Selector */}
        <button
          onClick={() => !timerState.isActive && setShowSubjectPicker(!showSubjectPicker)}
          disabled={timerState.isActive}
          className={`w-full mb-4 p-3 rounded-xl border transition-all ${
            timerState.isActive
              ? 'bg-surface-elevated border-border cursor-not-allowed opacity-60'
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
                      {selectedSubject.completedTopics}/{selectedSubject.totalTopics} topik selesai
                    </p>
                  </div>
                </>
              ) : (
                <span className="text-sm text-text-muted">Pilih mata pelajaran</span>
              )}
            </div>
            {!timerState.isActive && (
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
                    onClick={() => selectSubject(subject.id)}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-colors ${
                      timerState.selectedSubjectId === subject.id
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
                    {timerState.selectedSubjectId === subject.id && (
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
          <span className="text-[11px] text-text-muted mr-1">Durasi:</span>
          {presets.map((preset) => (
            <button
              key={preset.value}
              onClick={() => selectPreset(preset.value)}
              disabled={timerState.isActive}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                timerState.selectedPreset === preset.value
                  ? 'bg-accent text-white shadow-sm'
                  : timerState.isActive
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
          className={`text-center py-6 rounded-xl mb-5 transition-colors relative overflow-hidden ${
            timerState.isActive && !timerState.isPaused
              ? 'bg-success/5 border border-success/15'
              : timerState.elapsedSeconds > 0
              ? 'bg-accent/5 border border-accent/15'
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
                className="text-surface-elevated"
              />
              <motion.circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${progressPercent * 2.83} 283`}
                className={timerState.isActive ? 'text-success' : 'text-accent'}
                initial={{ strokeDasharray: '0 283' }}
                animate={{ strokeDasharray: `${progressPercent * 2.83} 283` }}
                transition={{ duration: 0.3 }}
              />
            </svg>
          </div>

          <div className="relative z-10">
            <span
              className={`text-4xl lg:text-5xl font-bold font-mono tracking-tight ${
                timerState.isActive && !timerState.isPaused
                  ? 'text-success'
                  : timerState.elapsedSeconds > 0
                  ? 'text-accent'
                  : 'text-text-primary'
              }`}
            >
              {formatTime(timerState.remainingSeconds)}
            </span>
            <p className="text-[11px] text-text-muted mt-1">
              {timerState.isActive
                ? `Sesi ${formatMinutes(timerState.elapsedSeconds / 60)} / ${formatMinutes(timerState.selectedPreset)}`
                : `Target: ${timerState.selectedPreset} menit`}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          {!timerState.isActive && timerState.elapsedSeconds === 0 && (
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={startTimer}
              disabled={!selectedSubject}
              className={`flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-xl shadow-sm transition-colors ${
                selectedSubject
                  ? 'bg-accent hover:bg-accent-dark text-white'
                  : 'bg-surface-elevated text-text-muted cursor-not-allowed'
              }`}
            >
              <Play size={16} weight="fill" />
              <span>Mulai Fokus</span>
            </motion.button>
          )}

          {timerState.isActive && !timerState.isPaused && (
            <>
              <button
                onClick={pauseTimer}
                className="flex items-center gap-1.5 px-4 py-2 bg-warning/10 hover:bg-warning/20 border border-warning/30 text-warning text-xs font-medium rounded-xl transition-colors"
              >
                <Pause size={16} weight="fill" />
                <span>Pause</span>
              </button>
              <button
                onClick={completeSession}
                className="flex items-center gap-1.5 px-4 py-2 bg-accent hover:bg-accent-dark text-white text-xs font-medium rounded-xl transition-colors shadow-sm"
              >
                <Confetti size={16} weight="fill" />
                <span>Selesai</span>
              </button>
            </>
          )}

          {timerState.isActive && timerState.isPaused && (
            <>
              <button
                onClick={resumeTimer}
                className="flex items-center gap-1.5 px-4 py-2 bg-success hover:bg-success/90 text-white text-xs font-medium rounded-xl transition-colors"
              >
                <Play size={16} weight="fill" />
                <span>Lanjut</span>
              </button>
              <button
                onClick={completeSession}
                className="flex items-center gap-1.5 px-4 py-2 bg-accent hover:bg-accent-dark text-white text-xs font-medium rounded-xl transition-colors shadow-sm"
              >
                <Confetti size={16} weight="fill" />
                <span>Simpan</span>
              </button>
            </>
          )}

          {!timerState.isActive && timerState.elapsedSeconds > 0 && (
            <>
              <button
                onClick={resumeTimer}
                className="flex items-center gap-1.5 px-4 py-2 bg-accent hover:bg-accent-dark text-white text-xs font-medium rounded-xl transition-colors shadow-sm"
              >
                <Play size={16} weight="fill" />
                <span>Lanjut</span>
              </button>
              <button
                onClick={resetTimer}
                className="flex items-center gap-1.5 px-4 py-2 bg-surface-elevated hover:bg-border text-text-secondary text-xs font-medium rounded-xl border border-border transition-colors"
              >
                <ArrowCounterClockwise size={16} />
                <span>Reset</span>
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
            <span className="text-xs font-semibold text-text-primary">Target Harian</span>
          </div>
          <span className="text-xs font-medium text-text-secondary">
            {formatMinutes(todayMinutes)} / {formatMinutes(dailyTargetMinutes)}
          </span>
        </div>

        <div className="h-2 bg-surface-elevated rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: todayMinutes >= dailyTargetMinutes ? '#22c55e' : '#f59e0b' }}
            initial={{ width: 0 }}
            animate={{ width: `${dailyProgress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Today's Sessions */}
        {timerState.sessionsToday.length > 0 && (
          <div className="space-y-2">
            <span className="text-[10px] text-text-muted uppercase tracking-wider">
              Sesi hari ini
            </span>
            <div className="space-y-1.5">
              {timerState.sessionsToday.slice(-3).reverse().map((session) => (
                <div
                  key={session.id}
                  className="flex items-center gap-2 p-2 bg-surface-elevated rounded-lg"
                >
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center text-xs"
                    style={{ background: `${session.subjectColor}20` }}
                  >
                    {subjects.find(s => s.id === session.subjectId)?.icon || '📚'}
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

        {timerState.sessionsToday.length === 0 && (
          <p className="text-[11px] text-text-muted text-center py-2">
            Belum ada sesi hari ini. Mulai belajar sekarang! 🚀
          </p>
        )}
      </div>

      {/* Break Suggestion Panel */}
      <AnimatePresence>
        {showBreakPanel && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-surface border border-border rounded-2xl p-5 shadow-card"
          >
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent/15 text-accent flex items-center justify-center mx-auto mb-3">
                <Coffee size={24} weight="fill" />
              </div>
              <h3 className="text-sm font-semibold text-text-primary mb-1">Waktunya Istirahat!</h3>
              <p className="text-xs text-text-secondary mb-4">{breakMessage}</p>

              {breakQuote && (
                <div className="bg-surface-elevated rounded-xl p-3 mb-4">
                  <p className="text-[11px] text-text-primary italic">"{breakQuote.text}"</p>
                  <p className="text-[10px] text-text-muted mt-1">— {breakQuote.author}</p>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-xs text-text-muted">Rekomendasi istirahat:</span>
                {[5, 10, 15].map((mins) => (
                  <span
                    key={mins}
                    className="px-2.5 py-1 bg-surface-elevated rounded-lg text-[11px] text-text-secondary"
                  >
                    {mins} menit
                  </span>
                ))}
              </div>

              <button
                onClick={() => {
                  setShowBreakPanel(false)
                  setBreakQuote(null)
                }}
                className="w-full py-2 bg-accent hover:bg-accent-dark text-white text-xs font-medium rounded-xl transition-colors"
              >
                Oke, lanjut nanti! 💪
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion Modal */}
      <AnimatePresence>
        {showCompletion && completedSession && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={dismissCompletion}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface border border-border rounded-2xl p-6 w-full max-w-sm shadow-xl"
            >
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-success/15 text-success flex items-center justify-center mx-auto mb-4">
                  <Sparkle size={28} weight="fill" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-1">Sesi Selesai! 🎉</h3>
                <p className="text-sm text-text-secondary mb-4">
                  Kerja bagus! Istirahat sebentar ya.
                </p>

                <div
                  className="p-3 rounded-xl mb-4"
                  style={{ background: `${completedSession.subjectColor}10` }}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-lg">
                      {subjects.find(s => s.id === completedSession.subjectId)?.icon || '📚'}
                    </span>
                    <span className="text-sm font-medium text-text-primary">
                      {completedSession.subjectName}
                    </span>
                  </div>
                  <p className="text-2xl font-bold" style={{ color: completedSession.subjectColor }}>
                    {formatMinutes(completedSession.durationMinutes)}
                  </p>
                  <p className="text-[11px] text-text-muted">
                    dari target {formatMinutes(completedSession.targetMinutes)}
                  </p>
                </div>

                <button
                  onClick={dismissCompletion}
                  className="w-full py-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-medium rounded-xl transition-colors"
                >
                  Lanjut Belajar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
