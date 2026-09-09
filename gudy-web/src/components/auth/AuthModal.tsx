'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Envelope,
  Lock,
  User,
  Eye,
  EyeSlash,
  CheckCircle,
  XCircle,
  Sparkle
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

  const { signIn, signUp, signInWithGoogle, signInWithGithub, loading, error, clearError } = useAuth()

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

  const handleGithubSignIn = async () => {
    setLocalError(null)
    try {
      await signInWithGithub()
      onClose()
    } catch (err) {
      // Error is already set in context
    }
  }

  const displayError = localError || error

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-md bg-surface/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/20 overflow-hidden"
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />

          {/* Decorative orbs */}
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-accent/10 blur-2xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-accent/5 blur-2xl" />

          <div className="relative">
            {/* Header */}
            <div className="px-6 pt-6 pb-0 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center shadow-lg shadow-accent/30">
                  <Sparkle size={20} className="text-white" weight="fill" />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-text-primary">
                    {activeTab === 'login' ? 'Masuk ke Akun' : 'Daftar Akun Baru'}
                  </h2>
                  <p className="text-xs text-text-secondary">
                    {activeTab === 'login'
                      ? 'Lanjutkan perjalanan belajarmu'
                      : 'Mulai belajar yang baru'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Tab Switcher */}
              <div className="flex gap-2 p-1.5 bg-surface-elevated/70 backdrop-blur-sm rounded-2xl mb-5">
                <button
                  onClick={() => handleTabChange('login')}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeTab === 'login'
                      ? 'bg-accent text-white shadow-lg shadow-accent/30'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {activeTab === 'login' && <CheckCircle size={16} weight="fill" />}
                    Masuk
                  </span>
                </button>
                <button
                  onClick={() => handleTabChange('register')}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeTab === 'register'
                      ? 'bg-accent text-white shadow-lg shadow-accent/30'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {activeTab === 'register' && <CheckCircle size={16} weight="fill" />}
                    Daftar
                  </span>
                </button>
              </div>

              {/* Error Message */}
              <AnimatePresence mode="wait">
                {displayError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="mb-4 p-3 bg-danger/10 border border-danger/20 rounded-xl"
                  >
                    <p className="text-sm text-danger text-center flex items-center justify-center gap-2">
                      <XCircle size={18} weight="fill" />
                      {displayError}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Display Name (Register only) */}
                <AnimatePresence mode="wait">
                  {activeTab === 'register' && (
                    <motion.div
                      key="name-field"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="relative">
                        <User
                          size={20}
                          weight="duotone"
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                        />
                        <input
                          type="text"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          placeholder="Nama lengkap kamu"
                          className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-surface-elevated text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all text-sm font-medium"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Email */}
                <div className="relative">
                  <Envelope
                    size={20}
                    weight="duotone"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email aktif kamu"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-surface-elevated text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all text-sm font-medium"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <Lock
                    size={20}
                    weight="duotone"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password (min. 6 karakter)"
                    className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-surface-elevated text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all text-sm font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                  >
                    {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-3.5 mt-2 bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Memproses...
                      </>
                    ) : (
                      <span>
                        {activeTab === 'login' ? 'Masuk ke Akun' : 'Daftar Akun Gratis'}
                      </span>
                    )}
                  </span>
                </motion.button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-5">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                <span className="text-xs text-text-muted font-medium">atau</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3">
                {/* Google Sign In */}
                <motion.button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 bg-surface-elevated hover:bg-surface-elevated/80 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl text-sm font-semibold text-text-primary transition-all flex items-center justify-center gap-3 shadow-sm hover:shadow"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span>Lanjutkan dengan Google</span>
                </motion.button>

                {/* GitHub Sign In */}
                <motion.button
                  type="button"
                  onClick={handleGithubSignIn}
                  disabled={loading}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 bg-[#24292e] hover:bg-[#2f363d] disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl text-sm font-semibold text-white transition-all flex items-center justify-center gap-3 shadow-sm hover:shadow"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span>Lanjutkan dengan GitHub</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
