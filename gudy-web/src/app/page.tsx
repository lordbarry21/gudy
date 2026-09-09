'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { formatStudyTime, calculateProgress } from '@/lib/utils'
import { useLanguage, getGreetingTranslation } from '@/lib/i18n/useLanguage'
import { StudyTimer } from '@/components/study-timer'
import { DailyStreakCard } from '@/components/cards/DailyStreakCard'
import {
  Books,
  Clock,
  TrendUp,
  ArrowRight,
  Sparkle,
  Fire,
  Trophy,
} from '@phosphor-icons/react'
import Link from 'next/link'

export default function HomePage() {
  const { progress, subjects, initialize, isInitialized } = useAppStore()
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isInitialized) {
      initialize()
    }
  }, [initialize, isInitialized])

  if (!mounted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </main>
    )
  }

  const greeting = getGreetingTranslation(t)

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
            <span>{greeting}</span>
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
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* New Study Timer Card */}
            <div className="h-full">
              <StudyTimer />
            </div>

            {/* Streak Card */}
            <div className="h-full">
              <DailyStreakCard progress={progress} />
            </div>
          </motion.div>

          {/* Overall Progress */}
          <motion.div variants={itemVariants}>
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-card hover:border-border-hover transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendUp size={18} className="text-accent" weight="bold" />
                  <h2 className="text-sm font-semibold text-text-primary">
                    {t.home.overallProgress}
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
                    <span className="text-text-secondary">{completedTopics} {t.home.topicsCompleted}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-border-hover" />
                    <span className="text-text-secondary">{totalTopics - completedTopics} {t.home.topicsRemaining}</span>
                  </span>
                </div>
                <span>{t.home.totalTopics} {totalTopics}</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Books, label: t.home.topicsDone, value: progress.totalTopicsCompleted, color: 'text-success', bg: 'bg-success/10' },
                { icon: Clock, label: t.home.studyTime, value: formatStudyTime(progress.totalMinutesSpent), color: 'text-accent', bg: 'bg-accent/10' },
                { icon: Trophy, label: t.home.bestStreak, value: `${progress.longestStreak}d`, color: 'text-warning', bg: 'bg-warning/10' },
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
                <span>{t.home.subjects}</span>
              </h2>
              <Link
                href="/learn"
                className="text-xs text-accent hover:text-accent-dark font-medium transition-colors flex items-center gap-1 group"
              >
                <span>{t.home.viewAll}</span>
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
                            {subject.completedTopics} / {subject.totalTopics} {t.home.materialsCompleted}
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
