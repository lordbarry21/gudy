'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Rocket,
  GraduationCap,
  BookOpen,
  ChartLineUp,
  Lightning,
  Gear,
  X,
  ArrowRight,
  Question,
} from '@phosphor-icons/react'
import { useLanguage } from '@/lib/i18n/useLanguage'

interface WelcomeModalProps {
  onStartTutorial: () => void
  onSkip: () => void
}

export function WelcomeModal({ onStartTutorial, onSkip }: WelcomeModalProps) {
  const { language } = useLanguage()
  const isId = language === 'id'
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if user has seen the welcome modal
    const hasSeenWelcome = localStorage.getItem('gudy_welcome_seen')
    if (!hasSeenWelcome) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsOpen(true), 500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('gudy_welcome_seen', 'true')
    setIsOpen(false)
    onStartTutorial()
  }

  const handleSkip = () => {
    localStorage.setItem('gudy_welcome_seen', 'true')
    setIsOpen(false)
    onSkip()
  }

  if (!isOpen) return null

  const featureItems = isId
    ? [
        { icon: BookOpen, label: 'Belajar', desc: 'Graph interaktif' },
        { icon: ChartLineUp, label: 'Progres', desc: 'Lacak perkembangan' },
        { icon: Lightning, label: 'Latihan', desc: 'Quiz & PDF' },
        { icon: Gear, label: 'Pengaturan', desc: 'Sesuaikan profil' },
      ]
    : [
        { icon: BookOpen, label: 'Learn', desc: 'Interactive graph' },
        { icon: ChartLineUp, label: 'Progress', desc: 'Track progress' },
        { icon: Lightning, label: 'Practice', desc: 'Quiz & PDF' },
        { icon: Gear, label: 'Settings', desc: 'Profile setup' },
      ]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/65 backdrop-blur-sm"
          onClick={handleSkip}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="relative w-full max-w-md bg-white dark:bg-surface-elevated border border-border rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Decorative Header */}
          <div className="bg-gradient-to-br from-accent via-orange-500 to-amber-500 p-6 sm:p-7 relative overflow-hidden text-center">
            {/* Decorative subtle circles */}
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-white/10 rounded-full pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full pointer-events-none" />

            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
              aria-label={isId ? 'Tutup' : 'Close'}
            >
              <X size={16} weight="bold" />
            </button>

            <div className="w-16 h-16 mx-auto mb-3 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-inner text-white">
              <Rocket size={34} weight="fill" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-1.5 tracking-tight">
              {isId ? 'Selamat Datang di Gudy! 🚀' : 'Welcome to Gudy! 🚀'}
            </h1>
            <p className="text-white/90 text-xs sm:text-sm max-w-xs mx-auto leading-relaxed">
              {isId
                ? 'Pelacak belajar yang akan membantumu menguasai materi'
                : 'Study tracker to help you master materials effectively'}
            </p>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6 space-y-4">
            <p className="text-xs sm:text-sm text-text-secondary text-center leading-relaxed">
              {isId
                ? 'Mau tahu cara pakai Gudy dengan efektif? Ikuti tur singkat fitur-fiturnya!'
                : 'Want to learn how to use Gudy effectively? Take a quick feature tour!'}
            </p>

            {/* Feature Preview */}
            <div className="grid grid-cols-2 gap-2.5">
              {featureItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 p-2.5 bg-surface border border-border/60 rounded-xl"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 text-accent">
                    <item.icon size={16} weight="fill" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-text-primary leading-tight truncate">{item.label}</p>
                    <p className="text-[10px] text-text-muted leading-tight mt-0.5 truncate">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Time estimate */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-text-muted font-medium py-0.5">
              <GraduationCap size={15} className="text-accent" weight="fill" />
              <span>{isId ? 'Tur singkat • ±1 menit' : 'Quick tour • ±1 min'}</span>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2.5 pt-1">
              <button
                onClick={handleSkip}
                className="flex-1 py-2.5 px-4 text-xs sm:text-sm font-semibold text-text-muted hover:text-text-secondary transition-colors bg-surface border border-border rounded-xl hover:bg-border/60"
              >
                {isId ? 'Lewati' : 'Skip'}
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 py-2.5 px-4 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-accent to-orange-500 hover:from-accent-dark hover:to-orange-600 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/25"
              >
                <span>{isId ? 'Mulai Tur' : 'Start Tour'}</span>
                <ArrowRight size={15} weight="bold" />
              </button>
            </div>

            {/* Footer hint */}
            <div className="pt-2 text-[11px] text-text-muted text-center flex items-center justify-center flex-wrap gap-1">
              <span>{isId ? 'Kamu bisa lihat tutorial kapan saja dengan klik ikon' : 'You can view the tutorial anytime by clicking'}</span>
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gradient-to-br from-accent to-orange-600 text-white shadow-sm shrink-0">
                <Question size={10} weight="bold" />
              </span>
              <span>{isId ? 'di pojok kanan bawah' : 'in the bottom right corner'}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
