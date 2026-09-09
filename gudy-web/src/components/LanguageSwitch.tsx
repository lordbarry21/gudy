'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, CaretDown, Check } from '@phosphor-icons/react'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { cn } from '@/lib/utils'

const languages = [
  { code: 'id' as const, label: 'Indonesia', nativeLabel: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'en' as const, label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
]

export function LanguageSwitch({ variant = 'dropdown' }: { variant?: 'dropdown' | 'toggle' }) {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLang = languages.find((l) => l.code === language) || languages[0]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (variant === 'toggle') {
    return (
      <button
        onClick={() => {
          const nextLang = language === 'id' ? 'en' : 'id'
          setLanguage(nextLang)
        }}
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-surface-elevated hover:bg-border text-text-secondary hover:text-text-primary text-xs font-medium transition-colors border border-border"
        title={t.language.switch}
      >
        <Globe size={14} className="text-accent" />
        <span className="uppercase font-semibold tracking-wide">{language.toUpperCase()}</span>
      </button>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-surface-elevated hover:bg-border text-text-secondary hover:text-text-primary text-xs font-medium transition-colors border border-border"
      >
        <span className="flex items-center gap-2">
          <Globe size={16} className="text-accent" />
          <span>{currentLang.flag} {language === 'id' ? 'ID' : 'EN'}</span>
        </span>
        <CaretDown
          size={14}
          className={cn(
            'transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-0 right-0 mb-2 bg-surface border border-border rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-1.5 space-y-0.5">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code)
                    setIsOpen(false)
                  }}
                  className={cn(
                    'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors',
                    language === lang.code
                      ? 'bg-accent/10 text-accent'
                      : 'hover:bg-surface-elevated text-text-primary'
                  )}
                >
                  <span className="text-base">{lang.flag}</span>
                  <div className="flex-1">
                    <p className="text-xs font-medium">{lang.label}</p>
                    <p className="text-[10px] text-text-muted">{lang.nativeLabel}</p>
                  </div>
                  {language === lang.code && (
                    <Check size={14} weight="bold" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Compact version for mobile header
export function LanguageSwitchCompact() {
  const { language, setLanguage } = useLanguage()

  return (
    <button
      onClick={() => {
        const nextLang = language === 'id' ? 'en' : 'id'
        setLanguage(nextLang)
      }}
      className="p-2 rounded-lg bg-surface-elevated border border-border text-text-secondary hover:text-text-primary transition-colors"
      title="Switch Language"
    >
      <Globe size={18} weight="fill" className="text-accent" />
    </button>
  )
}
