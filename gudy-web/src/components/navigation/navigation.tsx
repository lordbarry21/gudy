'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'motion/react'
import {
  House,
  BookOpen,
  ChartLineUp,
  Lightning,
  User,
  Sparkle,
  Sun,
  Moon,
} from '@phosphor-icons/react'
import { NAV_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useTheme } from '@/components/theme-provider'

const iconMap: Record<string, React.ElementType> = {
  house: House,
  'book-open': BookOpen,
  'chart-line-up': ChartLineUp,
  lightning: Lightning,
  user: User,
}

export function Navigation({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-surface-sidebar border-r border-border flex-col p-6 z-50 transition-colors duration-200">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shadow-sm"
          >
            <Sparkle size={20} weight="fill" />
          </motion.div>
          <div>
            <h1 className="font-bold text-xl text-text-primary tracking-tight">
              Gudy
            </h1>
            <p className="text-xs text-text-muted">Study Tracker</p>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = iconMap[item.icon]
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
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
          <button
            type="button"
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-surface-elevated hover:bg-border/60 text-text-secondary hover:text-text-primary text-xs font-medium transition-colors border border-border"
          >
            <span className="flex items-center gap-2">
              {theme === 'dark' ? <Moon size={16} weight="fill" className="text-accent" /> : <Sun size={16} weight="fill" className="text-accent" />}
              <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            </span>
            <span className="text-[10px] text-text-muted uppercase tracking-wider font-mono">
              Toggle
            </span>
          </button>

          <p className="text-[11px] text-text-muted text-center">
            Map Your Mastery
          </p>
        </div>
      </aside>

      {/* Mobile Top Header (with Theme Toggle) */}
      <header className="lg:hidden sticky top-0 left-0 right-0 h-14 bg-surface-sidebar/95 backdrop-blur-md border-b border-border flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center shadow-sm">
            <Sparkle size={16} weight="fill" />
          </div>
          <span className="font-bold text-lg text-text-primary tracking-tight">Gudy</span>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="p-2 rounded-lg bg-surface-elevated border border-border text-text-secondary hover:text-text-primary transition-colors"
        >
          {theme === 'dark' ? <Sun size={18} weight="fill" className="text-accent" /> : <Moon size={18} weight="fill" className="text-accent" />}
        </button>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-sidebar/95 backdrop-blur-md border-t border-border z-50">
        <div className="flex items-center justify-around h-full px-2">
          {NAV_ITEMS.map((item) => {
            const Icon = iconMap[item.icon]
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
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
