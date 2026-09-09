'use client'

import { Suspense, useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Envelope, Lock, User, ArrowLeft, BookOpenText, ChartLineUp, Trophy, Lightning } from '@phosphor-icons/react'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/lib/i18n/useLanguage'
import Link from 'next/link'

type AuthMode = 'login' | 'register'

function LoginPageContent() {
  const { t } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signIn, signUp, signInWithGoogle, signInWithGithub, error, clearError, isConfigured } = useAuth()
  const [mode, setMode] = useState<AuthMode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [loading, setLoading] = useState(false)
  const [localError, setLocalError] = useState('')
  const autoTriggeredRef = useRef(false)

  const redirectFrom = searchParams.get('from') ? decodeURIComponent(searchParams.get('from')!) : null
  const urlMode = searchParams.get('mode') as AuthMode | null

  const features = [
    { icon: BookOpenText, text: t.auth.feature1 },
    { icon: ChartLineUp, text: t.auth.feature2 },
    { icon: Trophy, text: t.auth.feature3 },
    { icon: Lightning, text: t.auth.feature4 },
  ]

  useEffect(() => {
    if (urlMode === 'register' || urlMode === 'login') {
      setMode(urlMode)
    }
  }, [urlMode])

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
      const redirectTo = redirectFrom || '/'
      router.push(redirectTo)
    } catch {
      // Error handled by auth context
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLocalError('')
    clearError()
    setLoading(true)
    try {
      await signInWithGoogle()
      const redirectTo = redirectFrom || '/'
      router.push(redirectTo)
    } catch {
      // Error handled by auth context
    } finally {
      setLoading(false)
    }
  }

  const handleGithubSignIn = async () => {
    setLocalError('')
    clearError()
    setLoading(true)
    try {
      await signInWithGithub()
      const redirectTo = redirectFrom || '/'
      router.push(redirectTo)
    } catch {
      // Error handled by auth context
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (autoTriggeredRef.current) return
    if (!isConfigured) return

    const provider = searchParams.get('provider')
    if (provider === 'google') {
      autoTriggeredRef.current = true
      handleGoogleSignIn()
    } else if (provider === 'github') {
      autoTriggeredRef.current = true
      handleGithubSignIn()
    }
  }, [searchParams, isConfigured])

  const displayError = localError || error

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center max-w-md font-sans">
          <div className="w-20 h-20 relative mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/logo.png"
              alt="Gudy Logo"
              width={80}
              height={80}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <h1 className="font-display text-2xl font-bold text-text-primary mb-3">{t.auth.firebaseNotConfiguredTitle}</h1>
          <p className="text-text-secondary mb-6 font-sans">
            {t.auth.firebaseNotConfiguredDesc}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-xl hover:bg-accent-dark transition-colors font-sans"
          >
            <ArrowLeft size={16} />
            {t.auth.backToHome}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(193, 95, 60, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(217, 119, 87, 0.06) 0%, transparent 40%)
          `
        }} />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] text-accent"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Main Content - Centered Layout */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 xl:gap-16 max-w-6xl mx-auto">

          {/* Left Side - Hero Content */}
          <div className="hidden lg:flex flex-col justify-center max-w-lg">
            {/* Logo with Tilt Animation */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10"
            >
              <Link href="/" className="inline-flex items-center gap-4 group">
                <div className="relative">
                  {/* Glow effect behind logo */}
                  <div className="absolute inset-0 bg-accent/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-110" />
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-lg shadow-accent/30 transition-all duration-300 group-hover:-rotate-6 group-hover:scale-105">
                    <Image
                      src="/logo.png"
                      alt="Gudy Logo"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover hidden dark:block"
                      priority
                    />
                    <Image
                      src="/logo-white-512.png"
                      alt="Gudy Logo"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover block dark:hidden"
                      priority
                    />
                  </div>
                </div>
                <span className="font-bold text-4xl text-text-primary tracking-tight transition-all duration-300 group-hover:text-accent">
                  Gudy
                </span>
              </Link>
            </motion.div>

            {/* Hero Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-10"
            >
              <h1 className="font-display text-5xl xl:text-6xl text-text-primary mb-6 leading-[1.1]">
                {t.auth.heroTitleLine1}<br />
                <span className="text-accent">{t.auth.heroTitleAccent}</span> {t.auth.heroTitleLine2}
              </h1>
              <p className="font-sans text-xl xl:text-2xl text-text-secondary leading-relaxed max-w-lg">
                {t.auth.heroSubtitle}
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4 font-sans"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <feature.icon size={24} className="text-accent" weight="duotone" />
                  </div>
                  <span className="text-lg text-text-secondary font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Decorative element */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 font-sans"
            >
              <p className="text-sm text-text-muted">
                {t.auth.trustedBy}
              </p>
            </motion.div>
          </div>

          {/* Right Side - Auth Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="w-full max-w-md font-sans"
          >
            {/* Mobile Logo (visible only on mobile) */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:hidden text-center mb-8"
            >
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-110" />
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-lg shadow-accent/20 transition-all duration-300 group-hover:-rotate-6 group-hover:scale-105">
                    <Image
                      src="/logo.png"
                      alt="Gudy Logo"
                      width={56}
                      height={56}
                      className="w-full h-full object-cover hidden dark:block"
                      priority
                    />
                    <Image
                      src="/logo-white-512.png"
                      alt="Gudy Logo"
                      width={56}
                      height={56}
                      className="w-full h-full object-cover block dark:hidden"
                      priority
                    />
                  </div>
                </div>
                <span className="font-bold text-3xl text-text-primary tracking-tight transition-all duration-300 group-hover:text-accent">
                  Gudy
                </span>
              </Link>
            </motion.div>

            {/* Auth Card */}
            <motion.div
              layout
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="bg-surface rounded-3xl p-6 shadow-xl shadow-black/5"
            >
              {/* Header */}
              <div className="text-center mb-4 min-h-[58px] flex flex-col justify-center">
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
                      {redirectFrom
                        ? (mode === 'login' ? t.auth.redirectLoginPrompt : t.auth.redirectRegisterPrompt)
                        : mode === 'login'
                        ? t.auth.loginSubtitle
                        : t.auth.registerSubtitle}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Mode Tabs */}
              <div className="relative flex gap-1.5 p-1 bg-surface-elevated rounded-xl mb-4 font-sans">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login')
                    setLocalError('')
                    clearError()
                  }}
                  className={`relative flex-1 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 z-10 ${
                    mode === 'login'
                      ? 'text-white'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {mode === 'login' && (
                    <motion.div
                      layoutId="activeModeTab"
                      className="absolute inset-0 bg-accent rounded-lg shadow-md -z-10"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                    />
                  )}
                  {t.auth.login}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('register')
                    setLocalError('')
                    clearError()
                  }}
                  className={`relative flex-1 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 z-10 ${
                    mode === 'register'
                      ? 'text-white'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {mode === 'register' && (
                    <motion.div
                      layoutId="activeModeTab"
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
                            className="w-full pl-10 pr-3 py-2 bg-surface-elevated rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all font-sans"
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
                      className="w-full pl-10 pr-3 py-2 bg-surface-elevated rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all font-sans"
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
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t.auth.passwordPlaceholder}
                      className="w-full pl-10 pr-3 py-2 bg-surface-elevated rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all font-sans"
                    />
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
                {/* Google */}
                <button
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

                {/* GitHub */}
                <button
                  onClick={handleGithubSignIn}
                  disabled={loading}
                  className="py-2 px-2 bg-[#24292e] hover:bg-[#2f363d] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-xs font-semibold text-white transition-all flex items-center justify-center gap-1.5 hover:shadow-lg font-sans"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span className="truncate">{t.auth.githubBtn}</span>
                </button>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-4 text-center font-sans">
                <p className="text-xs text-text-secondary">
                  {redirectFrom ? (
                    <>
                      <Link href={redirectFrom} className="text-accent hover:underline font-medium">
                        {t.auth.cancel}
                      </Link>
                      {' '}{t.auth.andReturn}
                    </>
                  ) : (
                    <>
                      {t.auth.exploreFirst}{' '}
                      <Link href="/" className="text-accent hover:underline font-medium">
                        {t.auth.continueWithoutLogin}
                      </Link>
                    </>
                  )}
                </p>
              </div>
            </motion.div>

            {/* Bottom tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center text-text-muted text-xs mt-4 font-sans"
            >
              {t.auth.termsNotice}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  )
}
