'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Envelope, Lock, User, Eye, EyeSlash, X } from '@phosphor-icons/react'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/lib/i18n/useLanguage'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialTab?: 'login' | 'register'
}

type AuthMode = 'login' | 'register'

export function AuthModal({
  isOpen,
  onClose,
  initialTab = 'login',
}: AuthModalProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const [mode, setMode] = useState<AuthMode>(initialTab)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [localError, setLocalError] = useState('')

  const { signIn, signUp, error, clearError } = useAuth()

  useEffect(() => {
    if (isOpen) {
      setMode(initialTab)
      setLocalError('')
      clearError()
      setEmail('')
      setPassword('')
      setDisplayName('')
    }
  }, [isOpen, initialTab, clearError])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handleModeChange = (newMode: AuthMode) => {
    setMode(newMode)
    setLocalError('')
    clearError()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError('')
    clearError()

    if (!email || !password) {
      setLocalError(t.auth.emailPasswordRequired)
      return
    }

    if (mode === 'register' && !displayName) {
      setLocalError(t.auth.nameRequired)
      return
    }

    if (password.length < 6) {
      setLocalError(t.auth.passwordMinLength)
      return
    }

    setLoading(true)
    try {
      if (mode === 'login') {
        await signIn(email, password)
      } else {
        await signUp(email, password, displayName)
      }
      onClose()
    } catch {
      // Handled by AuthContext
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    onClose()
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/'
    router.push(`/login?provider=google&from=${encodeURIComponent(currentPath)}`)
  }

  const handleGithubSignIn = () => {
    onClose()
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/'
    router.push(`/login?provider=github&from=${encodeURIComponent(currentPath)}`)
  }

  const displayError = localError || error

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop with blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Card - Styled to match website card & typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md bg-surface rounded-3xl p-6 sm:p-7 shadow-2xl font-sans z-10 overflow-hidden"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors z-20"
            aria-label={t.common.close}
          >
            <X size={18} />
          </button>

          {/* Logo */}
          <div className="flex justify-center mb-3">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-lg shadow-accent/20">
              <Image
                src="/logo.png"
                alt="Gudy Logo"
                width={48}
                height={48}
                className="w-full h-full object-cover hidden dark:block"
                priority
              />
              <Image
                src="/logo-white-512.png"
                alt="Gudy Logo"
                width={48}
                height={48}
                className="w-full h-full object-cover block dark:hidden"
                priority
              />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-4 min-h-[52px] flex flex-col justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.18, ease: 'easeInOut' }}
              >
                <h2 className="font-display text-2xl font-bold text-text-primary mb-1 tracking-tight">
                  {mode === 'login' ? t.auth.welcomeTitle : t.auth.joinTitle}
                </h2>
                <p className="font-sans text-sm text-text-secondary">
                  {mode === 'login' ? t.auth.loginSubtitle : t.auth.registerSubtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mode Tabs */}
          <div className="relative flex gap-1.5 p-1 bg-surface-elevated rounded-xl mb-4 font-sans">
            <button
              type="button"
              onClick={() => handleModeChange('login')}
              className={`relative flex-1 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 z-10 ${
                mode === 'login'
                  ? 'text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {mode === 'login' && (
                <motion.div
                  layoutId="authModalActiveTab"
                  className="absolute inset-0 bg-accent rounded-lg shadow-md -z-10"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                />
              )}
              {t.auth.login}
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('register')}
              className={`relative flex-1 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 z-10 ${
                mode === 'register'
                  ? 'text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {mode === 'register' && (
                <motion.div
                  layoutId="authModalActiveTab"
                  className="absolute inset-0 bg-accent rounded-lg shadow-md -z-10"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                />
              )}
              {t.auth.register}
            </button>
          </div>

          {/* Error Message */}
          {displayError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 p-3 bg-error/10 border border-error/20 rounded-xl font-sans"
            >
              <p className="text-sm text-error text-center">{displayError}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 font-sans">
            <AnimatePresence initial={false}>
              {mode === 'register' && (
                <motion.div
                  key="register-name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="pb-3">
                    <label className="block text-xs font-medium text-text-secondary mb-1.5 font-sans">
                      {t.auth.fullNameLabel}
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder={t.auth.fullNamePlaceholder}
                        className="w-full pl-10 pr-3 py-2 bg-surface-elevated rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-sans"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5 font-sans">
                {t.auth.email}
              </label>
              <div className="relative">
                <Envelope size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.auth.emailPlaceholder}
                  className="w-full pl-10 pr-3 py-2 bg-surface-elevated rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5 font-sans">
                {t.auth.password}
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.auth.passwordPlaceholder}
                  className="w-full pl-10 pr-10 py-2 bg-surface-elevated rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-accent hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-accent/30 hover:shadow-accent/50 mt-4 overflow-hidden font-sans"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {t.auth.processing}
                </span>
              ) : (
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={mode}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="block"
                  >
                    {mode === 'login' ? t.auth.submitLogin : t.auth.submitRegister}
                  </motion.span>
                </AnimatePresence>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-text-muted font-sans">{t.auth.orDivider}</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-2 font-sans">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="py-2 px-2 bg-white dark:bg-surface-elevated hover:bg-gray-50 dark:hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-xs font-semibold text-gray-700 dark:text-text-primary transition-all flex items-center justify-center gap-1.5 hover:shadow-md font-sans"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="truncate">{t.auth.googleBtn}</span>
            </button>

            <button
              type="button"
              onClick={handleGithubSignIn}
              disabled={loading}
              className="py-2 px-2 bg-[#24292e] hover:bg-[#2f363d] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-xs font-semibold text-white transition-all flex items-center justify-center gap-1.5 hover:shadow-lg font-sans"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span className="truncate">{t.auth.githubBtn}</span>
            </button>
          </div>

          {/* Footer tagline */}
          <p className="text-center text-text-muted text-xs mt-4 font-sans">
            {t.auth.termsNotice}
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default AuthModal
