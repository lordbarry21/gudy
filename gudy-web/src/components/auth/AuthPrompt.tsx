'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Sparkle, UserPlus, SignIn, X, Lock } from '@phosphor-icons/react'

interface AuthPromptProps {
  isOpen: boolean
  onClose: () => void
  message?: string
}

export function AuthPrompt({ isOpen, onClose, message }: AuthPromptProps) {
  const router = useRouter()

  const handleRedirect = (mode: 'login' | 'register') => {
    // Encode current path to redirect back after auth
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/learn'
    const redirectFrom = encodeURIComponent(currentPath)
    router.push(`/login?mode=${mode}&from=${redirectFrom}`)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-surface border border-border rounded-2xl p-6 w-full max-w-sm shadow-xl pointer-events-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
                    <Lock size={18} weight="fill" />
                  </div>
                  <h3 className="font-semibold text-text-primary">Login Diperlukan</h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-surface-elevated text-text-muted hover:text-text-primary transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Message */}
              <p className="text-sm text-text-secondary mb-5">
                {message || 'Untuk menyimpan progress belajarmu, silakan login atau daftar akun dulu ya!'}
              </p>

              {/* Buttons */}
              <div className="space-y-3">
                {/* Register Button */}
                <button
                  onClick={() => handleRedirect('register')}
                  className="w-full py-3 bg-accent hover:bg-accent-dark text-white text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <UserPlus size={18} weight="fill" />
                  <span>Daftar Akun Baru</span>
                </button>

                {/* Login Button */}
                <button
                  onClick={() => handleRedirect('login')}
                  className="w-full py-3 bg-surface-elevated hover:bg-border border border-border text-text-primary text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <SignIn size={18} />
                  <span>Sudah Punya Akun? Masuk</span>
                </button>
              </div>

              {/* Hint */}
              <p className="text-[11px] text-text-muted text-center mt-4">
                Progress akan tersimpan setelah kamu login
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
