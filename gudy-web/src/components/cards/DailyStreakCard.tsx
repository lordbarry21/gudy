'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Fire,
  Sparkle,
  ShieldSlash,
  ShieldCheck,
  Trophy,
  Check,
  CalendarBlank,
  X,
  Snowflake,
  Info,
} from '@phosphor-icons/react'
import type { UserProgress } from '@/types'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { useAppStore } from '@/lib/store'
import { getStudySessions } from '@/lib/storage'
import {
  getWeeklyActivity,
  getTodayTopicsCompletedCount,
  formatLocalDate,
} from '@/lib/streak'
import { StreakFreezeModal } from './StreakFreezeModal'

interface DailyStreakCardProps {
  progress: UserProgress
  className?: string
}

export function DailyStreakCard({ progress, className = '' }: DailyStreakCardProps) {
  const { t } = useLanguage()
  const { topics } = useAppStore()
  const [isFreezeModalOpen, setIsFreezeModalOpen] = useState(false)

  const studySessions = typeof window !== 'undefined' ? getStudySessions() : []
  const todayStr = formatLocalDate()

  const liveWeeklyDays = getWeeklyActivity(
    studySessions,
    topics,
    progress.streak,
    progress.lastActiveAt
  )

  const liveTodayTopics = getTodayTopicsCompletedCount(topics)
  const liveTodaySessions = studySessions.filter(
    (session) =>
      session.date === todayStr ||
      (session.completedAt && session.completedAt.startsWith(todayStr))
  ).length
  const todayCompletedCount = liveTodayTopics + liveTodaySessions

  const activeStreak = progress.streak
  const longestStreak = progress.longestStreak || 0
  const streakFreezeCount = progress.streakFreezeAvailable ?? 1
  const completedDaysCount = liveWeeklyDays.filter((day) => day.completed || day.isFrozen).length
  const dailyTargetCount = progress.dailyGoal || 3

  const todayProgressPercent = Math.min(
    Math.round((todayCompletedCount / dailyTargetCount) * 100),
    100
  )
  const isTargetMet = todayCompletedCount >= dailyTargetCount

  const nextMilestone =
    activeStreak < 7
      ? 7
      : activeStreak < 14
      ? 14
      : activeStreak < 30
      ? 30
      : 100
  const daysRemainingToMilestone = Math.max(nextMilestone - activeStreak, 0)

  const motivationalMessage =
    activeStreak > 0 ? t.home.maintainStreak : t.home.startStreak

  const freezeSubtitle =
    streakFreezeCount > 0 ? t.home.streakProtected : t.home.noFreezesYet

  return (
    <>
      <div
        className={`bg-surface rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-200 h-full flex flex-col justify-between font-sans relative overflow-hidden ${className}`}
      >
        <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none opacity-15 blur-3xl bg-accent"
          aria-hidden="true"
        />

        <div className="space-y-4">
          {/* Top Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                {t.home.dailyStreak}
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  activeStreak > 0
                    ? 'bg-accent/15 text-accent'
                    : 'bg-surface-elevated text-text-muted'
                }`}
              >
                <Sparkle size={10} weight="fill" />
                <span>{activeStreak > 0 ? `${activeStreak}d` : '0d'}</span>
              </span>
            </div>

            {/* Streak Freeze info logo button */}
            <button
              type="button"
              onClick={() => setIsFreezeModalOpen(true)}
              className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors cursor-pointer"
              title={t.home.tapToLearnFreeze}
              aria-label={t.home.tapToLearnFreeze}
            >
              <Info size={16} className="text-accent" />
            </button>
          </div>

          {/* Hero Streak Row */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-display text-4xl lg:text-5xl font-bold text-text-primary tracking-tight">
                  {activeStreak}
                </span>
                <span className="text-xs font-medium text-text-muted">
                  {activeStreak === 1 ? t.home.day : t.home.days} {t.home.streak}
                </span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                {motivationalMessage}
              </p>
            </div>

            {/* Flame Badge */}
            <div className="relative shrink-0">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${
                  activeStreak > 0
                    ? 'bg-surface-elevated text-accent'
                    : 'bg-surface-elevated text-text-muted/40'
                }`}
              >
                <Fire
                  size={30}
                  weight="fill"
                  className={activeStreak > 0 ? 'text-accent animate-pulse' : 'text-text-muted/40'}
                />
              </div>
              {activeStreak >= 7 && (
                <span className="absolute -bottom-1 -right-1 bg-accent text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                  HOT
                </span>
              )}
            </div>
          </div>

          {/* 7-Day Weekly Streak Strip */}
          <div className="bg-surface-elevated rounded-xl p-3">
            <div className="flex items-center justify-between text-[11px] text-text-muted mb-2.5">
              <div className="flex items-center gap-1.5">
                <CalendarBlank size={13} className="text-accent" />
                <span className="font-medium text-text-secondary">{t.home.weeklyActivity}</span>
              </div>
              <span className="font-semibold text-text-primary">
                {completedDaysCount}/7 {t.home.daysActiveThisWeek}
              </span>
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {liveWeeklyDays.map((dayStatus, index) => (
                <div
                  key={`${dayStatus.fullDay}-${index}`}
                  className="flex flex-col items-center gap-1"
                >
                  <span className="text-[10px] font-medium text-text-muted">
                    {dayStatus.label}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-all duration-200 ${
                      dayStatus.completed
                        ? 'bg-accent text-white shadow-sm font-bold'
                        : dayStatus.isFrozen
                        ? 'bg-sky-500/20 text-sky-400 font-bold shadow-sm shadow-sky-500/10'
                        : dayStatus.isSkipped
                        ? 'bg-danger/15 text-danger font-bold'
                        : dayStatus.isToday
                        ? 'bg-accent/15 text-accent font-bold ring-1 ring-accent/30'
                        : 'bg-surface text-text-muted'
                    }`}
                    title={`${dayStatus.fullDay}${
                      dayStatus.completed
                        ? ' (Completed)'
                        : dayStatus.isFrozen
                        ? ` (${t.home.dayFrozenProtected})`
                        : dayStatus.isSkipped
                        ? ` (${t.home.skippedNoFreeze})`
                        : dayStatus.isToday
                        ? ' (Today)'
                        : ''
                    }`}
                  >
                    {dayStatus.completed ? (
                      <Check size={14} weight="bold" />
                    ) : dayStatus.isFrozen ? (
                      <Snowflake size={14} weight="bold" className="text-sky-400" />
                    ) : dayStatus.isSkipped ? (
                      <X size={13} weight="bold" />
                    ) : dayStatus.isToday ? (
                      <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-text-muted/30" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Target Progress Bar */}
          <div className="bg-surface-elevated rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-medium text-text-secondary">{t.home.todayProgress}</span>
              <span className="font-semibold text-text-primary">
                {todayCompletedCount} / {dailyTargetCount} {t.home.materialsCompletedCount}
              </span>
            </div>

            <div className="h-2 bg-surface rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${todayProgressPercent}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>

            <p className="text-[11px] text-text-muted">
              {isTargetMet ? (
                <span className="text-success font-medium">{t.home.goalReached}</span>
              ) : (
                <span>
                  {Math.max(dailyTargetCount - todayCompletedCount, 0)}{' '}
                  {activeStreak === 0 ? t.home.toStartNewStreak : t.home.toExtendStreak}
                </span>
              )}
            </p>
          </div>

          {/* Perks & Milestone Badges Row */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Streak Freeze Badge (Static display card, modal opens via Click for details button) */}
            <div className="bg-surface-elevated rounded-xl p-2.5 flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  streakFreezeCount > 0
                    ? 'bg-sky-500/15 text-sky-500'
                    : 'bg-surface text-text-muted'
                }`}
              >
                {streakFreezeCount > 0 ? (
                  <ShieldCheck size={16} weight="fill" />
                ) : (
                  <ShieldSlash size={16} weight="fill" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold text-text-primary truncate">
                  {streakFreezeCount} Freeze
                </p>
                <p
                  className={`text-[10px] truncate font-medium ${
                    streakFreezeCount > 0
                      ? 'text-sky-600 dark:text-sky-400'
                      : 'text-text-muted'
                  }`}
                >
                  {freezeSubtitle}
                </p>
              </div>
            </div>

            {/* Next Milestone Badge */}
            <div className="bg-surface-elevated rounded-xl p-2.5 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-warning/15 text-warning flex items-center justify-center shrink-0">
                <Trophy size={16} weight="fill" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-text-primary truncate">
                  {nextMilestone}d Goal
                </p>
                <p className="text-[10px] text-text-muted truncate">
                  {daysRemainingToMilestone > 0 ? `${daysRemainingToMilestone}d left` : 'Achieved!'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="pt-4 border-t border-border mt-4 flex items-center justify-between text-[11px] text-text-muted">
          <span>
            {t.home.target}:{' '}
            <strong className="text-text-primary font-medium">
              {dailyTargetCount} {t.home.materialsPerDay}
            </strong>
          </span>
          <span className="text-text-muted">
            {t.home.bestStreak}:{' '}
            <strong className="text-text-primary">{longestStreak}d</strong>
          </span>
        </div>
      </div>

      {/* Streak Freeze & Daily Streak Explainer Modal */}
      <StreakFreezeModal
        isOpen={isFreezeModalOpen}
        onClose={() => setIsFreezeModalOpen(false)}
        currentFreezes={streakFreezeCount}
        currentStreak={activeStreak}
      />
    </>
  )
}

export default DailyStreakCard
