'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Envelope,
  Lock,
  User,
  GoogleLogo,
  Eye,
  EyeSlash,
  SpinnerGap,
} from '@phosphor-icons/react'
import { useAuth } from '@/contexts/AuthContext'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialTab?: 'login' | 'register'
}

export function AuthModal({
  isOpen,
  onClose,
  initialTab = 'login',
}: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  const { signIn, signUp, signInWithGoogle, loading, error, clearError } = useAuth()

  const handleTabChange = (tab: 'login' | 'register') => {
    setActiveTab(tab)
    setLocalError(null)
    clearError()
    setEmail('')
    setPassword('')
    setDisplayName('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)

    if (!email || !password) {
      setLocalError('Mohon isi semua field')
      return
    }

    if (activeTab === 'register' && !displayName) {
      setLocalError('Mohon isi nama kamu')
      return
    }

    try {
      if (activeTab === 'login') {
        await signIn(email, password)
      } else {
        await signUp(email, password, displayName)
      }
      onClose()
    } catch (err) {
      // Error is already set in context
    }
  }

  const handleGoogleSignIn = async () => {
    setLocalError(null)
    try {
      await signInWithGoogle()
      onClose()
    } catch (err) {
      // Error is already set in context
    }
  }

  const displayError = localError || error

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-surface border border-border rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="font-bold text-text-primary">
                {activeTab === 'login' ? 'Masuk ke Akun' : 'Daftar Akun Baru'}
              </h2>
              <p className="text-xs text-text-secondary mt-0.5">
                {activeTab === 'login'
                  ? 'Lanjutkan perjalanan belajarmu'
                  : 'Mulai轨迹 belajar yang baru'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Tab Switcher */}
            <div className="flex gap-2 p-1 bg-surface-elevated rounded-xl mb-6">
              <button
                onClick={() => handleTabChange('login')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'login'
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Masuk
              </button>
              <button
                onClick={() => handleTabChange('register')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'register'
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Daftar
              </button>
            </div>

            {/* Error Message */}
            {displayError && (
              <div className="mb-4 p-3 rounded-xl bg-error/10 border border-error/20 text-error text-sm">
                {displayError}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Display Name (Register only) */}
              {activeTab === 'register' && (
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1.5">
                    Nama
                  </label>
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                    />
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Nama kamu"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-elevated border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Envelope
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@contoh.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-elevated border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-elevated border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                  >
                    {showPassword ? (
                      <EyeSlash size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <SpinnerGap size={18} className="animate-spin" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <span>
                    {activeTab === 'login' ? 'Masuk' : 'Daftar'}
                  </span>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-text-muted">atau</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-surface-elevated border border-border text-text-primary font-medium text-sm hover:bg-surface transition-colors disabled:opacity-50"
            >
              <GoogleLogo size={20} weight="bold" />
              <span>Lanjutkan dengan Google</span>
            </button>

            {/* Footer */}
            <p className="text-xs text-text-muted text-center mt-6">
              Dengan melanjutkan, kamu menyetujui{' '}
              <button className="text-accent hover:underline">
                Syarat & Ketentuan
              </button>{' '}
              dan{' '}
              <button className="text-accent hover:underline">
                Kebijakan Privasi
              </button>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
