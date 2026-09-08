'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { getGreeting, formatStudyTime, calculateProgress } from '@/lib/utils'
import {
  Books,
  Clock,
  TrendUp,
  ArrowRight,
  Play,
  Pause,
  ArrowCounterClockwise,
  Sparkle,
  Brain,
  Confetti,
  Fire,
  Trophy,
} from '@phosphor-icons/react'
import Link from 'next/link'

export default function HomePage() {
  const { progress, subjects, initialize, isInitialized, updateStudyTime } = useAppStore()
  const [mounted, setMounted] = useState(false)

  // Study timer state
  const [isStudying, setIsStudying] = useState(false)
  const [studySeconds, setStudySeconds] = useState(0)

  useEffect(() => {
    setMounted(true)
    if (!isInitialized) {
      initialize()
    }
  }, [initialize, isInitialized])

  // Study timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isStudying) {
      interval = setInterval(() => {
        setStudySeconds((prev) => prev + 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isStudying])

  const formatTimer = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStartStudy = () => {
    setIsStudying(true)
  }

  const handlePauseStudy = () => {
    setIsStudying(false)
  }

  const handleResetStudy = () => {
    if (studySeconds > 0) {
      updateStudyTime(Math.ceil(studySeconds / 60))
    }
    setStudySeconds(0)
    setIsStudying(false)
  }

  if (!mounted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </main>
    )
  }

  const totalTopics = subjects.reduce((sum, s) => sum + s.totalTopics, 0)
  const completedTopics = subjects.reduce((sum, s) => sum + s.completedTopics, 0)
  const overallProgress = calculateProgress(completedTopics, totalTopics)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <main className="min-h-screen bg-background pb-24 lg:pb-12 lg:pl-64 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 lg:px-8 pt-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-text-secondary text-xs uppercase tracking-wider font-medium mb-1.5 flex items-center gap-1.5">
            <Sparkle className="text-accent" size={14} weight="fill" />
            <span>{getGreeting()}</span>
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold text-text-primary tracking-tight">
            {progress.userName || 'Student'}
          </h1>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Top Row: Study Timer & Streak */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Study Timer Card (spans 2 cols on md+) */}
            <motion.div variants={itemVariants} className="md:col-span-2">
              <div className="bg-surface border border-border rounded-2xl p-6 shadow-card hover:border-border-hover transition-colors h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                          isStudying
                            ? 'bg-success/15 text-success'
                            : studySeconds > 0
                            ? 'bg-accent/15 text-accent'
                            : 'bg-surface-elevated text-text-secondary'
                        }`}
                      >
                        <Brain size={20} weight="fill" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-text-primary block">
                          Study Timer
                        </span>
                        <span className="text-[11px] text-text-muted">
                          {isStudying ? 'Focus session active' : 'Ready when you are'}
                        </span>
                      </div>
                    </div>

                    {isStudying && (
                      <div className="flex items-center gap-2 px-2.5 py-1 bg-success/10 border border-success/20 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                        <span className="text-xs text-success font-medium">Focusing</span>
                      </div>
                    )}
                  </div>

                  {/* Timer Display */}
                  <div
                    className={`text-center py-5 rounded-xl mb-5 transition-colors ${
                      isStudying
                        ? 'bg-success/5 border border-success/15'
                        : studySeconds > 0
                        ? 'bg-accent/5 border border-accent/15'
                        : 'bg-surface-elevated'
                    }`}
                  >
                    <span
                      className={`text-4xl lg:text-5xl font-bold font-mono tracking-tight ${
                        isStudying ? 'text-success' : studySeconds > 0 ? 'text-accent' : 'text-text-primary'
                      }`}
                    >
                      {formatTimer(studySeconds)}
                    </span>
                  </div>
                </div>

                {/* Timer Controls */}
                <div className="flex items-center justify-center gap-3">
                  {!isStudying && studySeconds === 0 && (
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={handleStartStudy}
                      className="flex items-center gap-2 px-6 py-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-medium rounded-xl shadow-sm transition-colors"
                    >
                      <Play size={16} weight="fill" />
                      <span>Start Studying</span>
                    </motion.button>
                  )}

                  {isStudying && (
                    <>
                      <button
                        type="button"
                        onClick={handlePauseStudy}
                        className="flex items-center gap-1.5 px-4 py-2 bg-warning/10 hover:bg-warning/20 border border-warning/30 text-warning text-xs font-medium rounded-xl transition-colors"
                      >
                        <Pause size={16} weight="fill" />
                        <span>Pause</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleResetStudy}
                        className="flex items-center gap-1.5 px-4 py-2 bg-accent hover:bg-accent-dark text-white text-xs font-medium rounded-xl transition-colors shadow-sm"
                      >
                        <Confetti size={16} weight="fill" />
                        <span>Log Session</span>
                      </button>
                    </>
                  )}

                  {!isStudying && studySeconds > 0 && (
                    <>
                      <button
                        type="button"
                        onClick={handleStartStudy}
                        className="flex items-center gap-1.5 px-4 py-2 bg-accent hover:bg-accent-dark text-white text-xs font-medium rounded-xl transition-colors shadow-sm"
                      >
                        <Play size={16} weight="fill" />
                        <span>Resume</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleResetStudy}
                        className="flex items-center gap-1.5 px-4 py-2 bg-surface-elevated hover:bg-border text-text-secondary text-xs font-medium rounded-xl border border-border transition-colors"
                      >
                        <ArrowCounterClockwise size={16} />
                        <span>Reset & Save</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Streak Card */}
            <motion.div variants={itemVariants}>
              <div className="bg-surface border border-border rounded-2xl p-6 shadow-card hover:border-border-hover transition-colors h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                      Daily Streak
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
                      <Fire size={18} weight="fill" />
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-text-primary tracking-tight">
                      {progress.streak}
                    </span>
                    <span className="text-xs text-text-muted">
                      {progress.streak === 1 ? 'day' : 'days'} streak
                    </span>
                  </div>

                  <p className="text-xs text-text-secondary leading-relaxed">
                    {progress.streak > 0
                      ? 'Konsistensi adalah kunci penguasaan materi. Pertahankan!'
                      : 'Mulai belajar hari ini untuk menyalakan streak belajarmu.'}
                  </p>
                </div>

                <div className="pt-4 border-t border-border mt-4 flex items-center justify-between text-[11px] text-text-muted">
                  <span>Target harian</span>
                  <span className="font-semibold text-text-primary">{progress.dailyGoal} materi / hari</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Overall Progress */}
          <motion.div variants={itemVariants}>
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-card hover:border-border-hover transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendUp size={18} className="text-accent" weight="bold" />
                  <h2 className="text-sm font-semibold text-text-primary">
                    Overall Progress
                  </h2>
                </div>
                <span className="text-lg font-bold text-accent font-mono">
                  {overallProgress}%
                </span>
              </div>

              <div className="h-2.5 bg-surface-elevated rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full bg-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${overallProgress}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-text-muted pt-1">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-text-secondary">{completedTopics} dikuasai</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-border-hover" />
                    <span className="text-text-secondary">{totalTopics - completedTopics} tersisa</span>
                  </span>
                </div>
                <span>Total {totalTopics} topik</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Books, label: 'Topics Done', value: progress.totalTopicsCompleted, color: 'text-success', bg: 'bg-success/10' },
                { icon: Clock, label: 'Study Time', value: formatStudyTime(progress.totalMinutesSpent), color: 'text-accent', bg: 'bg-accent/10' },
                { icon: Trophy, label: 'Best Streak', value: `${progress.longestStreak}d`, color: 'text-warning', bg: 'bg-warning/10' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  className="bg-surface border border-border rounded-2xl p-4 text-center shadow-card hover:border-border-hover transition-all"
                >
                  <div className={`w-10 h-10 mx-auto mb-2.5 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                    <stat.icon size={20} weight="fill" />
                  </div>
                  <p className="text-2xl font-bold text-text-primary tracking-tight">{stat.value}</p>
                  <p className="text-[11px] text-text-muted mt-0.5">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Featured Subjects */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                <Sparkle size={16} className="text-accent" weight="fill" />
                <span>Mata Pelajaran Silabus</span>
              </h2>
              <Link
                href="/learn"
                className="text-xs text-accent hover:text-accent-dark font-medium transition-colors flex items-center gap-1 group"
              >
                <span>Lihat Semua</span>
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid gap-3.5">
              {subjects.slice(0, 3).map((subject) => {
                const progressPct = calculateProgress(subject.completedTopics, subject.totalTopics)
                return (
                  <Link key={subject.id} href={`/learn/${subject.id}`} className="group block">
                    <div className="bg-surface border border-border rounded-2xl p-4 hover:border-border-hover transition-all card-hover">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                          style={{ background: `${subject.color}18` }}
                        >
                          {subject.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-sm text-text-primary group-hover:text-accent transition-colors truncate">
                              {subject.name}
                            </h3>
                            <span className="text-xs font-bold font-mono ml-2 shrink-0" style={{ color: subject.color }}>
                              {progressPct}%
                            </span>
                          </div>
                          <p className="text-xs text-text-muted truncate mb-2">
                            {subject.completedTopics} / {subject.totalTopics} materi selesai
                          </p>
                          <div className="h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${progressPct}%`, backgroundColor: subject.color }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
