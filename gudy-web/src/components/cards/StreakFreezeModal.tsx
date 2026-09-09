'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Fire,
  ShieldCheck,
  X,
  Trophy,
  Target,
  Sparkle,
  CheckCircle,
  Check,
  Snowflake,
  CalendarBlank,
} from '@phosphor-icons/react'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { MAX_STREAK_FREEZES } from '@/lib/streak'

interface StreakFreezeModalProps {
  isOpen: boolean
  onClose: () => void
  currentFreezes: number
  currentStreak?: number
}

export function StreakFreezeModal({
  isOpen,
  onClose,
  currentFreezes,
  currentStreak = 0,
}: StreakFreezeModalProps) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'overview' | 'freeze'>('overview')

  if (!isOpen) return null

  const isProtected = currentFreezes > 0

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-surface rounded-3xl p-6 shadow-2xl z-10 overflow-hidden font-sans max-h-[90vh] flex flex-col"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors cursor-pointer z-10"
            aria-label={t.common.close}
          >
            <X size={18} />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 mb-4 shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-accent/15 text-accent flex items-center justify-center shadow-inner shrink-0">
              <Fire size={26} weight="fill" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-text-primary tracking-tight">
                {t.home.streakGuideTitle}
              </h3>
              <p className="text-xs text-text-muted">
                {t.home.streakGuideSubtitle}
              </p>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex bg-surface-elevated p-1 rounded-xl mb-4 shrink-0 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-surface text-text-primary shadow-sm'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <Fire
                size={15}
                weight={activeTab === 'overview' ? 'fill' : 'regular'}
                className={activeTab === 'overview' ? 'text-accent' : ''}
              />
              <span>{t.home.tabStreakOverview}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('freeze')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'freeze'
                  ? 'bg-surface text-text-primary shadow-sm'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <ShieldCheck
                size={15}
                weight={activeTab === 'freeze' ? 'fill' : 'regular'}
                className={activeTab === 'freeze' ? 'text-sky-400' : ''}
              />
              <span>{t.home.tabStreakFreeze}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 font-bold">
                {currentFreezes}
              </span>
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="overflow-y-auto space-y-3 pr-1 text-xs">
            {activeTab === 'overview' ? (
              <>
                {/* 1. What is it & what is it for */}
                <div className="p-3.5 rounded-2xl bg-surface-elevated/70 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-text-primary">
                    <Sparkle size={16} weight="fill" className="text-accent" />
                    <h4>{t.home.whatIsStreakTitle}</h4>
                  </div>
                  <p className="text-text-secondary text-[11px] leading-relaxed">
                    {t.home.whatIsStreakDesc}
                  </p>
                </div>

                {/* 2. How to maintain */}
                <div className="p-3.5 rounded-2xl bg-surface-elevated/70 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-text-primary">
                    <Target size={16} weight="fill" className="text-success" />
                    <h4>{t.home.howStreakWorksTitle}</h4>
                  </div>
                  <p className="text-text-secondary text-[11px] leading-relaxed">
                    {t.home.howStreakWorksDesc}
                  </p>
                </div>

                {/* 3. Weekly Momentum Strip Symbols */}
                <div className="p-3.5 rounded-2xl bg-surface-elevated/70 space-y-2.5">
                  <div className="flex items-center gap-2 font-bold text-text-primary">
                    <CalendarBlank size={16} weight="fill" className="text-accent" />
                    <h4>{t.home.weeklyStripMeaningTitle}</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-surface">
                      <div className="w-6 h-6 rounded-md bg-accent text-white flex items-center justify-center font-bold text-xs shrink-0">
                        <Check size={13} weight="bold" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-text-primary truncate">{t.home.symbolCompletedLabel}</p>
                        <p className="text-[10px] text-text-muted truncate">{t.home.symbolCompletedDesc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-surface">
                      <div className="w-6 h-6 rounded-md bg-surface-elevated text-text-muted flex items-center justify-center text-xs shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-text-muted/40" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-text-primary truncate">{t.home.symbolEmptyLabel}</p>
                        <p className="text-[10px] text-text-muted truncate">{t.home.symbolEmptyDesc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-surface">
                      <div className="w-6 h-6 rounded-md bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs shrink-0">
                        <Snowflake size={13} weight="bold" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sky-500 dark:text-sky-400 truncate">{t.home.symbolFrozenLabel}</p>
                        <p className="text-[10px] text-text-muted truncate">{t.home.symbolFrozenDesc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-surface">
                      <div className="w-6 h-6 rounded-md bg-danger/15 text-danger flex items-center justify-center font-bold text-xs shrink-0">
                        <X size={13} weight="bold" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-danger truncate">{t.home.symbolSkippedLabel}</p>
                        <p className="text-[10px] text-text-muted truncate">{t.home.symbolSkippedDesc}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Milestones */}
                <div className="p-3.5 rounded-2xl bg-surface-elevated/70 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-text-primary">
                    <Trophy size={16} weight="fill" className="text-warning" />
                    <h4>{t.home.streakMilestonesTitle}</h4>
                  </div>
                  <p className="text-text-secondary text-[11px] leading-relaxed">
                    {t.home.streakMilestonesDesc}
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Explainer paragraph */}
                <p className="text-xs text-text-secondary leading-relaxed">
                  {t.home.streakFreezeExplainer}
                </p>

                {/* Status Badge */}
                <div
                  className={`p-3 rounded-2xl flex items-center gap-3 ${
                    isProtected
                      ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400'
                      : 'bg-warning/10 text-warning'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-surface flex items-center justify-center shrink-0">
                    {isProtected ? (
                      <CheckCircle size={20} weight="fill" className="text-sky-500" />
                    ) : (
                      <ShieldCheck size={20} weight="regular" className="text-warning" />
                    )}
                  </div>
                  <div className="text-xs">
                    <p className="font-bold">
                      {isProtected ? t.home.freezeActiveStatus : t.home.freezeEmptyStatus}
                    </p>
                    <p className="text-[11px] opacity-85">
                      {isProtected
                        ? `${currentFreezes} ${t.home.freezeProtectedNote}`
                        : t.home.freezeEmptyNote}
                    </p>
                  </div>
                </div>

                {/* How to Earn Rules */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                    {t.home.howToGetFreeze}
                  </h4>

                  <div className="space-y-2">
                    <div className="flex items-start gap-3 p-3 rounded-2xl bg-surface-elevated/70">
                      <div className="w-7 h-7 rounded-lg bg-accent/15 text-accent flex items-center justify-center shrink-0 mt-0.5">
                        <Trophy size={16} weight="fill" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-text-primary">
                          {t.home.freezeRule1Title}
                        </p>
                        <p className="text-[11px] text-text-muted leading-relaxed">
                          {t.home.freezeRule1Desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-2xl bg-surface-elevated/70">
                      <div className="w-7 h-7 rounded-lg bg-success/15 text-success flex items-center justify-center shrink-0 mt-0.5">
                        <Target size={16} weight="fill" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-text-primary">
                          {t.home.freezeRule2Title}
                        </p>
                        <p className="text-[11px] text-text-muted leading-relaxed">
                          {t.home.freezeRule2Desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-2xl bg-surface-elevated/70">
                      <div className="w-7 h-7 rounded-lg bg-warning/15 text-warning flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkle size={16} weight="fill" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-text-primary">
                          {t.home.freezeRule3Title}
                        </p>
                        <p className="text-[11px] text-text-muted leading-relaxed">
                          {t.home.freezeRule3Desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-text-muted text-center pt-1">
                  {t.home.freezeMaxLimit}
                </p>
              </>
            )}
          </div>

          {/* Action Button */}
          <div className="pt-3.5 mt-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 bg-accent hover:bg-accent-dark text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-accent/25 cursor-pointer"
            >
              {t.home.gotIt}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default StreakFreezeModal

