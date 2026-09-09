'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { useAppStore } from '@/lib/store'
import { calculateProgress } from '@/lib/utils'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { Fire, Trophy, ChartLine, Lightning } from '@phosphor-icons/react'

export default function ProgressPage() {
  const { progress, subjects, achievements, initialize, isInitialized } = useAppStore()
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<'stats' | 'achievements'>('stats')

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

  const totalTopics = subjects.reduce((sum, s) => sum + s.totalTopics, 0)
  const completedTopics = subjects.reduce((sum, s) => sum + s.completedTopics, 0)
  const overallProgress = calculateProgress(completedTopics, totalTopics)
  const unlockedCount = achievements.filter((a) => a.unlocked).length

  const tabs = [
    { id: 'stats' as const, label: t.progress.studyStats, icon: ChartLine },
    { id: 'achievements' as const, label: t.progress.achievementsBadges, icon: Trophy },
  ]

  return (
    <main className="min-h-screen bg-background pb-24 lg:pb-12 lg:pl-64 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 lg:px-8 pt-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-text-primary tracking-tight mb-2">
            {t.progress.title}
          </h1>
          <p className="text-text-secondary text-sm">
            {t.progress.subtitle}
          </p>
        </motion.div>

        {/* Streak Card */}
        <motion.div
          className="bg-surface border border-border rounded-2xl p-6 mb-6 shadow-card hover:border-border-hover transition-colors"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-accent/15 text-accent flex items-center justify-center shrink-0">
              <Fire size={32} weight="fill" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl lg:text-4xl font-bold text-text-primary font-mono tracking-tight">
                  {progress.streak}
                </span>
                <span className="text-sm font-medium text-text-muted">
                  {t.progress.daysInARow}
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-0.5">
                {progress.streak > 0 ? t.progress.keepStreakGoing : t.progress.startStreak}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1.5 mb-6 bg-surface border border-border p-1 rounded-xl shadow-sm">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-accent rounded-lg"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <Icon
                  size={16}
                  weight={isActive ? 'fill' : 'regular'}
                  className="relative z-10"
                />
                <span className="relative z-10">{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'stats' ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Overview Card */}
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-card">
              <h2 className="font-semibold text-text-primary text-sm mb-5">{t.progress.materialSummary}</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 rounded-xl bg-surface-elevated/50 border border-border">
                  <p className="text-2xl lg:text-3xl font-bold text-accent font-mono mb-0.5">
                    {progress.totalTopicsCompleted}
                  </p>
                  <p className="text-[11px] text-text-muted">{t.progress.materialsCompleted}</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-surface-elevated/50 border border-border">
                  <p className="text-2xl lg:text-3xl font-bold text-success font-mono mb-0.5">
                    {progress.longestStreak}
                  </p>
                  <p className="text-[11px] text-text-muted">{t.progress.streakRecord}</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-surface-elevated/50 border border-border">
                  <p className="text-2xl lg:text-3xl font-bold text-text-primary font-mono mb-0.5">
                    {overallProgress}%
                  </p>
                  <p className="text-[11px] text-text-muted">{t.progress.totalMastery}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">{t.progress.syllabusProgress}</span>
                  <span className="font-bold text-accent font-mono">{overallProgress}%</span>
                </div>
                <div className="h-2.5 bg-surface-elevated rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${overallProgress}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>

            {/* Subject Progress */}
            <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-card">
              <div className="px-6 py-4 border-b border-border">
                <h2 className="font-semibold text-text-primary text-sm">{t.progress.progressBySubject}</h2>
              </div>
              <div className="p-5 space-y-4">
                {subjects.map((subject, index) => {
                  const progressPct = calculateProgress(
                    subject.completedTopics,
                    subject.totalTopics
                  )
                  return (
                    <motion.div
                      key={subject.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="flex items-center gap-4"
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0"
                        style={{ background: `${subject.color}18` }}
                      >
                        {subject.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-medium text-text-primary text-xs truncate">
                            {subject.name}
                          </span>
                          <span
                            className="text-xs font-bold font-mono ml-2 shrink-0"
                            style={{ color: subject.color }}
                          >
                            {progressPct}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: subject.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPct}%` }}
                            transition={{ duration: 0.6, delay: 0.05 + index * 0.04 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Achievement Overview */}
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-card">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-accent/15 rounded-2xl flex items-center justify-center shrink-0">
                  <span className="text-3xl font-bold text-accent font-mono">
                    {unlockedCount}
                  </span>
                </div>
                <div>
                  <p className="text-text-muted text-xs mb-0.5">
                    {unlockedCount} {t.progress.ofBadgesEarned} {achievements.length}
                  </p>
                  <h3 className="text-lg font-bold text-text-primary tracking-tight">{t.progress.achievementsUnlocked}</h3>
                </div>
                <Trophy size={36} weight="fill" className="ml-auto text-text-muted/40" />
              </div>
            </div>

            {/* Achievement Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className={`relative overflow-hidden rounded-2xl p-4 shadow-card transition-all ${
                    achievement.unlocked
                      ? 'bg-surface border border-success/30'
                      : 'bg-surface border border-border opacity-50'
                  }`}
                >
                  <div className="relative z-10 text-center">
                    <div
                      className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center text-2xl mb-2.5 ${
                        achievement.unlocked
                          ? 'bg-warning/15'
                          : 'bg-surface-elevated'
                      }`}
                    >
                      {achievement.icon}
                    </div>
                    <h4
                      className={`font-semibold text-xs mb-1 ${
                        achievement.unlocked
                          ? 'text-text-primary'
                          : 'text-text-muted'
                      }`}
                    >
                      {achievement.title}
                    </h4>
                    <p className="text-[10px] text-text-muted leading-relaxed">
                      {achievement.description}
                    </p>
                    {achievement.unlocked && (
                      <div className="mt-2.5 inline-flex items-center gap-1 text-success text-[10px] font-medium px-2 py-0.5 bg-success/10 rounded-full">
                        <Lightning size={12} weight="fill" />
                        {t.progress.unlocked}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}
