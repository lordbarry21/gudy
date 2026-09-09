'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import { useAppStore } from '@/lib/store'
import { formatDate } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/lib/i18n/useLanguage'
import {
  Fire,
  Books,
  Trophy,
  Target,
  Bell,
  Trash,
  CaretRight,
  Lightning,
  ChartLineUp,
  SignOut,
} from '@phosphor-icons/react'

export default function ProfilePage() {
  const {
    progress,
    achievements,
    updateDailyGoal,
    resetAllProgress,
    initialize,
    isInitialized,
  } = useAppStore()
  const { user, signOut } = useAuth()
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [showDailyGoal, setShowDailyGoal] = useState(false)
  const [showReset, setShowReset] = useState(false)
  const [quizStats, setQuizStats] = useState({
    averageScore: 0,
    totalQuizzesTaken: 0,
    categoriesPlayed: 0,
  })
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isInitialized) {
      initialize()
    }
  }, [initialize, isInitialized])

  // Load quiz stats
  useEffect(() => {
    if (!user) return

    try {
      const stored = localStorage.getItem('gudy_quiz_progress')
      if (stored) {
        const parsed = JSON.parse(stored)
        const progressData = parsed.state?.progress
        if (progressData) {
          setQuizStats({
            averageScore: progressData.averageScore || 0,
            totalQuizzesTaken: progressData.totalQuizzesTaken || 0,
            categoriesPlayed: Object.keys(progressData.bestScores || {}).length,
          })
        }
      }
    } catch {
      // Ignore
    }
  }, [user])

  if (!mounted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </main>
    )
  }

  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const dailyGoalOptions = [1, 3, 5, 10]

  const settingsItems = [
    {
      icon: Target,
      title: t.profile.dailyTarget,
      subtitle: `${progress.dailyGoal} ${t.profile.materialsPerDay}`,
      color: '#4E9A70',
      onClick: () => setShowDailyGoal(true),
    },
    {
      icon: Bell,
      title: t.profile.reminder,
      subtitle: t.profile.notificationSchedule,
      color: '#D99B26',
      onClick: () => {},
    },
    {
      icon: Trash,
      title: t.profile.resetProgress,
      subtitle: t.profile.resetDescription,
      color: '#D9534F',
      onClick: () => setShowReset(true),
      danger: true,
    },
  ]

  return (
    <main className="min-h-screen bg-background pb-24 lg:pb-12 lg:pl-64 transition-colors duration-200">
      <div className="max-w-2xl mx-auto px-4 lg:px-8 pt-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-text-primary tracking-tight">
            {t.profile.title}
          </h1>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          className="bg-surface border border-border rounded-2xl p-6 mb-6 shadow-card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <div className="flex items-center gap-4 mb-6">
            {/* Profile Picture */}
            {user?.photoURL && !imageError ? (
              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm shrink-0">
                <Image
                  src={user.photoURL}
                  alt={user.displayName || 'Profile'}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                  unoptimized
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-accent text-white flex items-center justify-center shadow-sm shrink-0">
                <span className="text-2xl font-bold font-mono">
                  {user?.displayName?.[0]?.toUpperCase() || 'U'}
                </span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-text-primary truncate">
                {user?.displayName || t.profile.user}
              </h2>
              <p className="text-xs text-text-muted mt-0.5">
                {user?.email}
              </p>
              {user && (
                <p className="text-[10px] text-text-muted mt-0.5">
                  {t.profile.joined} {formatDate(user.metadata.creationTime || new Date().toISOString())}
                </p>
              )}
            </div>
            <button
              onClick={() => {
                signOut().then(() => {
                  window.location.href = '/'
                })
              }}
              className="p-2.5 rounded-xl bg-surface-elevated border border-border text-text-secondary hover:text-danger hover:border-danger/50 transition-all"
              title={t.profile.logout}
            >
              <SignOut size={18} />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-surface-elevated rounded-xl p-3.5 text-center border border-border">
              <Fire size={22} weight="fill" className="mx-auto mb-1.5 text-accent" />
              <p className="text-xl font-bold text-text-primary font-mono">
                {progress.streak}
              </p>
              <p className="text-[10px] text-text-muted uppercase tracking-wider">{t.profile.streak}</p>
            </div>
            <div className="bg-surface-elevated rounded-xl p-3.5 text-center border border-border">
              <Books size={22} weight="fill" className="mx-auto mb-1.5 text-success" />
              <p className="text-xl font-bold text-text-primary font-mono">
                {progress.totalTopicsCompleted}
              </p>
              <p className="text-[10px] text-text-muted uppercase tracking-wider">{t.profile.materials}</p>
            </div>
            <div className="bg-surface-elevated rounded-xl p-3.5 text-center border border-border">
              <Trophy size={22} weight="fill" className="mx-auto mb-1.5 text-warning" />
              <p className="text-xl font-bold text-text-primary font-mono">
                {unlockedCount}
              </p>
              <p className="text-[10px] text-text-muted uppercase tracking-wider">{t.profile.badges}</p>
            </div>
          </div>
        </motion.div>

        {/* Quiz Stats Card */}
        {user && quizStats.totalQuizzesTaken > 0 && (
          <motion.div
            className="bg-surface border border-border rounded-2xl p-6 mb-6 shadow-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h3 className="font-semibold text-text-primary text-sm mb-4">{t.profile.quizStats}</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-surface-elevated rounded-xl p-3.5 text-center border border-border">
                <ChartLineUp size={22} weight="fill" className="mx-auto mb-1.5 text-warning" />
                <p className="text-xl font-bold text-text-primary font-mono">
                  {quizStats.averageScore}%
                </p>
                <p className="text-[10px] text-text-muted uppercase tracking-wider">{t.profile.average}</p>
              </div>
              <div className="bg-surface-elevated rounded-xl p-3.5 text-center border border-border">
                <Lightning size={22} weight="fill" className="mx-auto mb-1.5 text-accent" />
                <p className="text-xl font-bold text-text-primary font-mono">
                  {quizStats.totalQuizzesTaken}
                </p>
                <p className="text-[10px] text-text-muted uppercase tracking-wider">{t.profile.completed}</p>
              </div>
              <div className="bg-surface-elevated rounded-xl p-3.5 text-center border border-border">
                <Target size={22} weight="fill" className="mx-auto mb-1.5 text-success" />
                <p className="text-xl font-bold text-text-primary font-mono">
                  {quizStats.categoriesPlayed}
                </p>
                <p className="text-[10px] text-text-muted uppercase tracking-wider">{t.profile.categories}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8"
        >
          <h3 className="font-semibold text-text-primary text-sm mb-3">{t.profile.accountSettings}</h3>
          <div className="bg-surface border border-border rounded-2xl overflow-hidden divide-y divide-border shadow-card">
            {settingsItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.title}
                  onClick={item.onClick}
                  className={`w-full flex items-center gap-3.5 px-5 py-3.5 hover:bg-surface-elevated transition-colors text-left ${
                    item.danger ? 'text-danger' : ''
                  }`}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${item.color}15` }}
                  >
                    <Icon size={18} style={{ color: item.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-text-primary text-xs">{item.title}</p>
                    <p className="text-[11px] text-text-muted truncate mt-0.5">{item.subtitle}</p>
                  </div>
                  <CaretRight size={14} className="text-text-muted" />
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <h3 className="font-semibold text-text-primary text-sm mb-3">{t.profile.aboutApp}</h3>
          <div className="bg-surface border border-border rounded-2xl p-5 shadow-card">
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-11 h-11 rounded-xl bg-accent text-white flex items-center justify-center text-xl shrink-0 shadow-sm">
                <span>📖</span>
              </div>
              <div>
                <h4 className="font-bold text-text-primary text-sm">Gudy - Study Tracker</h4>
                <p className="text-[11px] text-text-muted font-mono">v1.0.0 • Claude Editorial Theme</p>
              </div>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Pelacak silabus dan kurikulum pembelajaran persiapan Matematika OSN, TKA Matematika, Bahasa Indonesia, Bahasa Inggris, dan Serkom Laravel.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Daily Goal Modal */}
      <AnimatePresence>
        {showDailyGoal && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDailyGoal(false)}
          >
            <motion.div
              className="bg-surface border border-border rounded-2xl p-6 w-full max-w-sm shadow-card"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-base font-bold text-text-primary mb-3">{t.profile.dailyTargetTitle}</h3>
              <div className="space-y-2">
                {dailyGoalOptions.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => {
                      updateDailyGoal(goal)
                      setShowDailyGoal(false)
                    }}
                    className={`w-full px-4 py-2.5 rounded-xl text-left text-xs font-medium transition-colors ${
                      progress.dailyGoal === goal
                        ? 'bg-accent text-white shadow-sm'
                        : 'bg-surface-elevated hover:bg-border text-text-primary border border-border'
                    }`}
                  >
                    {goal} {t.profile.materialsPerDay}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset Confirmation Modal */}
      <AnimatePresence>
        {showReset && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowReset(false)}
          >
            <motion.div
              className="bg-surface border border-border rounded-2xl p-6 w-full max-w-sm text-center shadow-card"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-danger/15 flex items-center justify-center text-danger">
                <Trash size={24} />
              </div>
              <h3 className="text-base font-bold text-text-primary mb-1">
                {t.profile.confirmReset}
              </h3>
              <p className="text-xs text-text-secondary mb-5 leading-relaxed">
                {t.profile.resetWarning}
              </p>
              <div className="flex gap-2.5">
                <button
                  onClick={() => setShowReset(false)}
                  className="flex-1 px-4 py-2 bg-surface-elevated text-text-secondary hover:text-text-primary text-xs font-medium rounded-xl border border-border transition-colors"
                >
                  {t.profile.cancel}
                </button>
                <button
                  onClick={() => {
                    resetAllProgress()
                    setShowReset(false)
                  }}
                  className="flex-1 px-4 py-2 bg-danger hover:opacity-90 text-white text-xs font-medium rounded-xl transition-opacity shadow-sm"
                >
                  {t.profile.reset}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
