'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, GraduationCap, BookOpen, ChartLineUp, Lightning, Timer, Fire, User } from '@phosphor-icons/react'
import { useFeatureTutorial, type FeatureType, FEATURE_TUTORIALS } from '@/hooks/useFeatureTutorial'
import { useLanguage } from '@/lib/i18n/useLanguage'

// Icon map
const featureIcons: Record<FeatureType, React.ReactNode> = {
  learn: <BookOpen size={24} className="text-accent" weight="fill" />,
  progress: <ChartLineUp size={24} className="text-accent" weight="fill" />,
  practice: <Lightning size={24} className="text-accent" weight="fill" />,
  focus: <Timer size={24} className="text-accent" weight="fill" />,
  streak: <Fire size={24} className="text-accent" weight="fill" />,
  profile: <User size={24} className="text-accent" weight="fill" />,
}

interface FeatureTutorialPromptProps {
  feature: FeatureType
  onDismiss?: () => void
  onShowFullTutorial?: () => void
  className?: string
}

export function FeatureTutorialPrompt({
  feature,
  onDismiss,
  onShowFullTutorial,
  className = '',
}: FeatureTutorialPromptProps) {
  const { hasSeen, markFeatureSeen } = useFeatureTutorial()
  const { t } = useLanguage()

  // Don't show if already seen
  if (hasSeen(feature)) return null

  const config = FEATURE_TUTORIALS[feature]

  const handleDismiss = () => {
    markFeatureSeen(feature)
    onDismiss?.()
  }

  const handleShowTutorial = () => {
    markFeatureSeen(feature)
    onShowFullTutorial?.()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[60] max-w-md w-[calc(100%-2rem)] ${className}`}
    >
      <div className="bg-white dark:bg-surface-elevated border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-accent to-orange-500 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap size={20} className="text-white" weight="fill" />
            <span className="text-white text-sm font-bold">
              {t.tutorial?.newHere || 'Tips untukmu!'} 💡
            </span>
          </div>
          <button
            onClick={handleDismiss}
            className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            aria-label="Dismiss"
          >
            <X size={14} className="text-white" weight="bold" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              {featureIcons[feature]}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-text-primary mb-1">
                {config.title}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {config.description}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleDismiss}
              className="flex-1 py-2.5 text-xs font-medium text-text-muted hover:text-text-secondary transition-colors bg-surface-elevated rounded-lg hover:bg-border"
            >
              {t.tutorial?.dismiss || 'Nanti'}
            </button>
            <button
              onClick={handleShowTutorial}
              className="flex-1 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-accent to-orange-500 hover:from-accent-dark hover:to-orange-600 rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <GraduationCap size={14} weight="fill" />
              {t.tutorial?.showTutorial || 'Lihat Tips'}
            </button>
          </div>
        </div>
      </div>

      {/* Decorative corner */}
      <div className="absolute -bottom-1 -right-1 w-16 h-16 bg-gradient-to-tl from-accent/20 to-transparent rounded-bl-full pointer-events-none" />
    </motion.div>
  )
}

// Compact inline version for embedding in pages
interface InlineTutorialHintProps {
  feature: FeatureType
  className?: string
}

export function InlineTutorialHint({ feature, className = '' }: InlineTutorialHintProps) {
  const { hasSeen } = useFeatureTutorial()

  if (hasSeen(feature)) return null

  const config = FEATURE_TUTORIALS[feature]

  return (
    <div className={`bg-accent/5 border border-accent/20 rounded-xl p-3 ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <GraduationCap size={14} className="text-accent" weight="fill" />
        <span className="text-xs font-semibold text-accent">Tips</span>
      </div>
      <p className="text-xs text-text-secondary leading-relaxed">
        {config.description}
      </p>
    </div>
  )
}
