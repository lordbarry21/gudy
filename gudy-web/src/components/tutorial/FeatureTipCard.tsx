'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  BookOpen,
  ChartLineUp,
  Lightning,
  Timer,
  Fire,
  User,
  X,
  ArrowRight,
  Sparkle,
} from '@phosphor-icons/react'
import { useTutorial } from './TutorialContext'
import { useLanguage } from '@/lib/i18n/useLanguage'

type FeatureType = 'learn' | 'progress' | 'practice' | 'focus' | 'streak' | 'profile'

interface FeatureTip {
  id: FeatureType
  title: string
  description: string
  icon: React.ReactNode
  color: string
}

const FEATURE_TIPS: FeatureTip[] = [
  {
    id: 'learn',
    title: '📚 Halaman Belajar',
    description: 'Pelajari semua mata pelajaran dengan graph interaktif. Klik setiap node untuk melihat detail dan centang saat sudah dipahami.',
    icon: <BookOpen size={20} weight="fill" />,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'progress',
    title: '📈 Progress',
    description: 'Lacak perkembangan belajarmu. Lihat statistik mingguan, ringkasan bulanan, dan analisis performa quiz.',
    icon: <ChartLineUp size={20} weight="fill" />,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'practice',
    title: '✍️ Halaman Latihan',
    description: 'Uji pemahamanmu dengan quiz interaktif! Pilih subjek, jawab pertanyaan, dan lihat skor terbaikmu.',
    icon: <Lightning size={20} weight="fill" />,
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'focus',
    title: '⏱️ Mode Fokus',
    description: 'Gunakan timer Pomodoro untuk sesi belajar yang lebih fokus. Setiap sesi selesai dihitung untuk target harianmu!',
    icon: <Timer size={20} weight="fill" />,
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 'streak',
    title: '🔥 Daily Streak',
    description: 'Jaga streakmu dengan belajar setiap hari! Gunakan Streak Freeze jika butuh istirahat tanpa kehilangan streak.',
    icon: <Fire size={20} weight="fill" />,
    color: 'from-red-500 to-rose-600',
  },
  {
    id: 'profile',
    title: '⚙️ Pengaturan',
    description: 'Atur target harian, ubah tema dan bahasa, lihat statistik quiz keseluruhan, dan kelola akunmu.',
    icon: <User size={20} weight="fill" />,
    color: 'from-gray-500 to-slate-600',
  },
]

interface FeatureTipCardProps {
  feature: FeatureType
  onDismiss?: () => void
  onShowTutorial?: () => void
  position?: 'top' | 'bottom'
  className?: string
}

export function FeatureTipCard({
  feature,
  onDismiss,
  onShowTutorial,
  position = 'top',
  className = '',
}: FeatureTipCardProps) {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [storageKey] = useState(`gudy_tip_seen_${feature}`)

  const tip = FEATURE_TIPS.find((t) => t.id === feature)
  if (!tip) return null

  useEffect(() => {
    // Check if user has seen this tip
    const hasSeen = localStorage.getItem(storageKey)
    if (!hasSeen) {
      const timer = setTimeout(() => setIsVisible(true), 800)
      return () => clearTimeout(timer)
    }
  }, [storageKey])

  const handleDismiss = () => {
    localStorage.setItem(storageKey, 'true')
    setIsVisible(false)
    onDismiss?.()
  }

  const handleShowTutorial = () => {
    localStorage.setItem(storageKey, 'true')
    setIsVisible(false)
    onShowTutorial?.()
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: position === 'top' ? -20 : 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: position === 'top' ? -20 : 20, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={`fixed ${position === 'top' ? 'top-4' : 'bottom-24'} left-1/2 -translate-x-1/2 z-[70] max-w-sm w-[calc(100%-2rem)] ${className}`}
      >
        <div className="bg-white dark:bg-surface-elevated rounded-2xl shadow-2xl overflow-hidden border border-border">
          {/* Header with gradient */}
          <div className={`bg-gradient-to-r ${tip.color} px-4 py-2.5 flex items-center justify-between`}>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-white">
                <GraduationCap size={14} weight="fill" />
              </div>
              <span className="text-white text-xs font-bold">Tips Fitur 💡</span>
            </div>
            <button
              onClick={handleDismiss}
              className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X size={11} className="text-white" weight="bold" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tip.color} flex items-center justify-center shrink-0 text-white`}>
                {tip.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-text-primary mb-1">
                  {tip.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {tip.description}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleDismiss}
                className="flex-1 py-2 text-xs font-medium text-text-muted hover:text-text-secondary transition-colors bg-surface-elevated dark:bg-surface rounded-lg hover:bg-border"
              >
                Nanti
              </button>
              <button
                onClick={handleShowTutorial}
                className={`flex-1 py-2 text-xs font-bold text-white bg-gradient-to-r ${tip.color} rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm`}
              >
                <Sparkle size={12} weight="fill" />
                Lihat Tips Lengkap
              </button>
            </div>
          </div>
        </div>

        {/* Decorative */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-surface-elevated rounded-full" />
      </motion.div>
    </AnimatePresence>
  )
}

// Compact inline version
interface InlineFeatureTipProps {
  feature: FeatureType
  className?: string
}

export function InlineFeatureTip({ feature, className = '' }: InlineFeatureTipProps) {
  const [storageKey] = useState(`gudy_tip_seen_${feature}`)
  const tip = FEATURE_TIPS.find((t) => t.id === feature)
  const [hasSeen, setHasSeen] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem(storageKey)
    setHasSeen(!!seen)
  }, [storageKey])

  if (hasSeen || !tip) return null

  const handleDismiss = () => {
    localStorage.setItem(storageKey, 'true')
    setHasSeen(true)
  }

  return (
    <div className={`bg-accent/5 border border-accent/20 rounded-xl p-3 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <GraduationCap size={14} className="text-accent" weight="fill" />
          <span className="text-xs font-semibold text-accent">Tips</span>
        </div>
        <button onClick={handleDismiss} className="text-text-muted hover:text-text-secondary">
          <X size={14} weight="bold" />
        </button>
      </div>
      <p className="text-xs text-text-secondary leading-relaxed">
        {tip.description}
      </p>
    </div>
  )
}
