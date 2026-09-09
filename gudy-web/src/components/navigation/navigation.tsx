'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import {
  House,
  BookOpen,
  ChartLineUp,
  Lightning,
  User,
  Sun,
  Moon,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/components/theme-provider'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { LanguageSwitch, LanguageSwitchCompact } from '@/components/LanguageSwitch'

const iconMap: Record<string, React.ElementType> = {
  house: House,
  'book-open': BookOpen,
  'chart-line-up': ChartLineUp,
  lightning: Lightning,
  user: User,
}

export function Navigation({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const { user, loading } = useAuth()
  const { t } = useLanguage()

  // Navigation items with translated labels
  const navItems = [
    { label: t.nav.home, href: '/', icon: 'house' },
    { label: t.nav.learn, href: '/learn', icon: 'book-open' },
    { label: t.nav.progress, href: '/progress', icon: 'chart-line-up' },
    { label: t.nav.practice, href: '/practice', icon: 'lightning' },
    { label: t.nav.profile, href: '/profile', icon: 'user' },
  ]

  // Hide navigation on login page
  const isLoginPage = pathname === '/login'

  const handleProfileClick = (e: React.MouseEvent) => {
    // If not logged in and clicking profile, redirect to login
    if (!loading && !user) {
      e.preventDefault()
      router.push('/login?from=' + encodeURIComponent(pathname))
    }
  }

  if (isLoginPage) {
    // On login page, just render children without navigation
    return <>{children}</>
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-surface-sidebar border-r border-border flex-col p-6 z-50 transition-colors duration-200">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mb-8 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="w-10 h-10 relative shrink-0 rounded-xl overflow-hidden shadow-sm border border-border/40"
          >
            <Image
              src="/logo.png"
              alt="Gudy Logo"
              width={40}
              height={40}
              className="w-full h-full object-cover hidden dark:block"
              priority
            />
            <Image
              src="/logo-white-512.png"
              alt="Gudy Logo"
              width={40}
              height={40}
              className="w-full h-full object-cover block dark:hidden"
              priority
            />
          </motion.div>
          <div>
            <h1 className="font-bold text-xl text-text-primary tracking-tight group-hover:text-accent transition-colors">
              Gudy
            </h1>
            <p className="text-xs text-text-muted">Study Tracker</p>
          </div>
        </Link>

        {/* Nav Items */}
        <nav className="flex-1 space-y-1.5">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon]
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            const isProfile = item.href === '/profile'

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={isProfile ? handleProfileClick : undefined}
                className={cn(
                  'relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors duration-150 outline-none focus:outline-none focus-visible:outline-none',
                  isActive
                    ? 'text-accent font-semibold'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated/70'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-accent/12 dark:bg-accent/15 rounded-xl"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  >
                    <div className="absolute left-1 top-2 bottom-2 w-1 rounded-full bg-accent" />
                  </motion.div>
                )}
                <Icon
                  size={20}
                  weight={isActive ? 'fill' : 'regular'}
                  className="relative z-10"
                />
                <span className="relative z-10 text-sm">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer & Theme Toggle */}
        <div className="pt-4 border-t border-border space-y-3">
          {/* Language Switch */}
          <LanguageSwitch variant="dropdown" />

          <button
            type="button"
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-surface-elevated hover:bg-border text-text-secondary hover:text-text-primary text-xs font-medium transition-colors border border-border"
          >
            <span className="flex items-center gap-2">
              {theme === 'dark' ? <Moon size={16} weight="fill" className="text-accent" /> : <Sun size={16} weight="fill" className="text-accent" />}
              <span>{theme === 'dark' ? t.theme.dark : t.theme.light}</span>
            </span>
            <span className="text-[10px] text-text-muted uppercase tracking-wider font-mono">
              {t.theme.toggle}
            </span>
          </button>

          <p className="text-[11px] text-text-muted text-center">
            Map Your Mastery
          </p>
        </div>
      </aside>

      {/* Mobile Top Header (with Theme Toggle) */}
      <header className="lg:hidden sticky top-0 left-0 right-0 h-14 bg-surface-sidebar/95 backdrop-blur-md border-b border-border flex items-center justify-between px-4 z-40">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 relative shrink-0 rounded-lg overflow-hidden shadow-sm border border-border/40">
            <Image
              src="/logo.png"
              alt="Gudy Logo"
              width={32}
              height={32}
              className="w-full h-full object-cover hidden dark:block"
              priority
            />
            <Image
              src="/logo-white-512.png"
              alt="Gudy Logo"
              width={32}
              height={32}
              className="w-full h-full object-cover block dark:hidden"
              priority
            />
          </div>
          <span className="font-bold text-lg text-text-primary tracking-tight">Gudy</span>
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSwitchCompact />
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-lg bg-surface-elevated border border-border text-text-secondary hover:text-text-primary transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} weight="fill" className="text-accent" /> : <Moon size={18} weight="fill" className="text-accent" />}
          </button>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-sidebar/95 backdrop-blur-md border-t border-border z-50">
        <div className="flex items-center justify-around h-full px-2">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon]
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            const isProfile = item.href === '/profile'

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={isProfile ? handleProfileClick : undefined}
                className={cn(
                  'relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors outline-none focus:outline-none focus-visible:outline-none',
                  isActive ? 'text-accent font-semibold' : 'text-text-muted hover:text-text-secondary'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavMobile"
                    className="absolute inset-0 bg-accent/15 rounded-xl"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <Icon
                  size={20}
                  weight={isActive ? 'fill' : 'regular'}
                  className="relative z-10"
                />
                <span className="relative z-10 text-[11px] font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Main Content */}
      {children}
    </>
  )
}
