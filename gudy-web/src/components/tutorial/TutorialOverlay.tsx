'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  X,
  ArrowRight,
  ArrowLeft,
  Rocket,
  CheckCircle,
  BookOpen,
  ChartLineUp,
  Lightning,
  User,
  Timer,
  Target,
  Fire,
} from '@phosphor-icons/react'
import { useTutorial } from './TutorialContext'

// Icon map for step icons
const stepIcons: Record<string, React.ReactNode> = {
  welcome: <Rocket size={20} weight="fill" />,
  learn: <BookOpen size={20} weight="fill" />,
  progress: <ChartLineUp size={20} weight="fill" />,
  practice: <Lightning size={20} weight="fill" />,
  'focus-mode': <Timer size={20} weight="fill" />,
  'daily-target': <Target size={20} weight="fill" />,
  streak: <Fire size={20} weight="fill" />,
  profile: <User size={20} weight="fill" />,
  complete: <CheckCircle size={20} weight="fill" />,
}

// Steps that should center the tooltip
const CENTER_STEPS = ['welcome', 'complete']

// Steps that highlight sidebar navigation items
const SIDEBAR_STEPS = ['learn', 'progress', 'practice', 'profile']

// Steps that are in the main content area (home page)
const CONTENT_STEPS = ['focus-mode', 'daily-target', 'streak']

interface TooltipPosition {
  top: number
  left: number
}

export function TutorialOverlay() {
  const router = useRouter()
  const {
    isActive,
    currentStep,
    totalSteps,
    currentStepData,
    nextStep,
    prevStep,
    skipTutorial,
    isLanguageIndonesian,
  } = useTutorial()

  const [tooltipPos, setTooltipPos] = useState<TooltipPosition>({ top: 0, left: 0 })
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [windowSize, setWindowSize] = useState({
    vw: typeof window !== 'undefined' ? window.innerWidth : 1920,
    vh: typeof window !== 'undefined' ? window.innerHeight : 1080,
  })

  const TOOLTIP_WIDTH = 340
  const TOOLTIP_HEIGHT = 220
  const PADDING = 20

  const isSidebarStep = currentStepData ? SIDEBAR_STEPS.includes(currentStepData.id) : false
  const targetPadding = isSidebarStep ? 8 : 12

  const findAndPosition = useCallback(() => {
    if (!isActive || !currentStepData) {
      setHighlightRect(null)
      setIsReady(false)
      return
    }

    const vw = window.innerWidth
    const vh = window.innerHeight
    setWindowSize({ vw, vh })

    const isDesktop = vw >= 1024
    const isStepSidebar = SIDEBAR_STEPS.includes(currentStepData.id)
    const isContentStep = CONTENT_STEPS.includes(currentStepData.id)
    const shouldCenter = CENTER_STEPS.includes(currentStepData.id)

    // For content steps, if user navigated away from home, bring them back
    if (isContentStep && typeof window !== 'undefined' && window.location.pathname !== '/') {
      router.push('/')
      return
    }

    if (shouldCenter) {
      setHighlightRect(null)
      const centerWidth = Math.min(vw - PADDING * 2, 420)
      const centerHeight = 250
      setTooltipPos({
        top: Math.max(PADDING, (vh - centerHeight) / 2),
        left: Math.max(PADDING, (vw - centerWidth) / 2),
      })
      setIsReady(true)
      return
    }

    // Try to find the visible element
    const selectors = [
      `[data-tutorial="${currentStepData.id}"]`,
      currentStepData.selector,
    ]

    let element: Element | null = null
    for (const selector of selectors) {
      try {
        const matches = Array.from(document.querySelectorAll(selector))
        const visibleMatch = matches.find((el) => {
          const r = el.getBoundingClientRect()
          return r.width > 0 && r.height > 0
        })
        if (visibleMatch) {
          element = visibleMatch
          break
        }
        if (matches.length > 0 && !element) {
          element = matches[0]
        }
      } catch {
        continue
      }
    }

    if (!element) {
      setHighlightRect(null)
      setTooltipPos({
        top: Math.max(PADDING, (vh - TOOLTIP_HEIGHT) / 2),
        left: Math.max(PADDING, (vw - TOOLTIP_WIDTH) / 2),
      })
      setIsReady(true)
      return
    }

    // Check if element is in view
    const initialRect = element.getBoundingClientRect()
    const isInView = initialRect.top >= 0 && initialRect.bottom <= vh && initialRect.left >= 0 && initialRect.right <= vw

    if (!isInView && !isStepSidebar) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    // Measure position after any scroll adjustments
    setTimeout(() => {
      const rect = element!.getBoundingClientRect()
      setHighlightRect(rect)

      const spaceRight = vw - rect.right - PADDING
      const spaceLeft = rect.left - PADDING
      const spaceBelow = vh - rect.bottom - PADDING
      const spaceAbove = rect.top - PADDING

      let top: number
      let left: number

      if (isStepSidebar && isDesktop) {
        // Desktop sidebar items: strictly to the right, vertically centered
        left = rect.right + 20
        top = rect.top + (rect.height - TOOLTIP_HEIGHT) / 2
      } else if (isStepSidebar && !isDesktop) {
        // Mobile bottom nav: position above the item
        left = rect.left + (rect.width - TOOLTIP_WIDTH) / 2
        top = rect.top - TOOLTIP_HEIGHT - 16
      } else if (isDesktop) {
        // Desktop content cards: prioritize side-by-side positioning (Right or Left) to NEVER overlap the card
        if (spaceRight >= TOOLTIP_WIDTH + 20) {
          left = rect.right + 20
          top = rect.top + Math.min(20, Math.max(0, (rect.height - TOOLTIP_HEIGHT) / 2))
        } else if (spaceLeft >= TOOLTIP_WIDTH + 20) {
          left = rect.left - TOOLTIP_WIDTH - 20
          top = rect.top + Math.min(20, Math.max(0, (rect.height - TOOLTIP_HEIGHT) / 2))
        } else if (spaceBelow >= TOOLTIP_HEIGHT + 20) {
          left = rect.left + (rect.width - TOOLTIP_WIDTH) / 2
          top = rect.bottom + 20
        } else {
          left = rect.left + (rect.width - TOOLTIP_WIDTH) / 2
          top = rect.top - TOOLTIP_HEIGHT - 20
        }
      } else {
        // Mobile content cards: place below or above
        left = rect.left + (rect.width - TOOLTIP_WIDTH) / 2
        if (spaceBelow >= TOOLTIP_HEIGHT + 16) {
          top = rect.bottom + 16
        } else if (spaceAbove >= TOOLTIP_HEIGHT + 16) {
          top = rect.top - TOOLTIP_HEIGHT - 16
        } else {
          top = Math.max(PADDING, vh - TOOLTIP_HEIGHT - PADDING)
        }
      }

      // Safe clamp ensuring the tooltip is always fully within viewport bounds
      left = Math.max(PADDING, Math.min(left, vw - TOOLTIP_WIDTH - PADDING))
      top = Math.max(PADDING, Math.min(top, vh - TOOLTIP_HEIGHT - PADDING))

      setTooltipPos({ top, left })
      setIsReady(true)
    }, 150)
  }, [isActive, currentStepData, router])

  // Find element and calculate position on change or resize
  useEffect(() => {
    findAndPosition()
    window.addEventListener('resize', findAndPosition)
    window.addEventListener('scroll', findAndPosition, true)
    return () => {
      window.removeEventListener('resize', findAndPosition)
      window.removeEventListener('scroll', findAndPosition, true)
    }
  }, [findAndPosition])

  if (!isActive) return null

  const isLastStep = currentStep === totalSteps - 1
  const isFirstStep = currentStep === 0
  const isCentered = currentStepData ? CENTER_STEPS.includes(currentStepData.id) : false

  // Target coordinates for spotlight cutout
  const targetX = highlightRect ? Math.max(0, highlightRect.left - targetPadding) : 0
  const targetY = highlightRect ? Math.max(0, highlightRect.top - targetPadding) : 0
  const targetW = highlightRect ? highlightRect.width + targetPadding * 2 : 0
  const targetH = highlightRect ? highlightRect.height + targetPadding * 2 : 0
  const targetR = Math.min(16, Math.max(6, Math.floor(targetW / 2)), Math.max(6, Math.floor(targetH / 2)))

  return (
    <AnimatePresence>
      {isActive && (
        <>
          {/* Backdrop Overlay (z-[70]) */}
          {/* If there's a highlighted element, use 4 physical backdrop divs around the target box.
              This leaves the target area completely empty in the DOM so that NO backdrop-blur
              and NO dark tint can ever touch the highlighted element! */}
          {highlightRect ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-none"
            >
              {/* Top slice */}
              <div
                className="fixed top-0 left-0 right-0 z-[70] bg-black/60 backdrop-blur-sm pointer-events-auto transition-all duration-300 ease-out"
                style={{ height: Math.max(0, targetY) }}
              />
              {/* Bottom slice */}
              <div
                className="fixed left-0 right-0 bottom-0 z-[70] bg-black/60 backdrop-blur-sm pointer-events-auto transition-all duration-300 ease-out"
                style={{ top: Math.max(0, targetY + targetH) }}
              />
              {/* Left slice */}
              <div
                className="fixed left-0 z-[70] bg-black/60 backdrop-blur-sm pointer-events-auto transition-all duration-300 ease-out"
                style={{
                  top: Math.max(0, targetY),
                  height: Math.max(0, targetH),
                  width: Math.max(0, targetX),
                }}
              />
              {/* Right slice */}
              <div
                className="fixed right-0 z-[70] bg-black/60 backdrop-blur-sm pointer-events-auto transition-all duration-300 ease-out"
                style={{
                  top: Math.max(0, targetY),
                  height: Math.max(0, targetH),
                  left: Math.max(0, targetX + targetW),
                }}
              />
            </motion.div>
          ) : (
            /* Centered modal steps (welcome, complete) with full backdrop */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm pointer-events-auto"
            />
          )}

          {/* Glowing border around highlighted element (z-[75]) */}
          {highlightRect && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="fixed z-[75] pointer-events-none transition-all duration-300 ease-out"
              style={{
                top: targetY,
                left: targetX,
                width: targetW,
                height: targetH,
                borderRadius: targetR,
                border: '2.5px solid #f97316',
                boxShadow: '0 0 0 4px rgba(249, 115, 22, 0.35), 0 0 24px rgba(249, 115, 22, 0.45)',
              }}
            />
          )}

          {/* Tooltip Card (z-[80]) */}
          <AnimatePresence mode="wait">
            {isReady && currentStepData && (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed z-[80] max-w-[calc(100vw-32px)] ${isCentered ? 'w-[420px]' : 'w-[340px]'}`}
                style={{
                  top: tooltipPos.top,
                  left: tooltipPos.left,
                }}
              >
                <div className="bg-white dark:bg-surface-elevated border border-border rounded-2xl shadow-2xl overflow-hidden">
                  {/* Header */}
                  <div className={`bg-gradient-to-r from-accent to-orange-500 flex items-center justify-between ${
                    isCentered ? 'px-5 py-3.5' : 'px-4 py-2.5'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <div className={`bg-white/20 flex items-center justify-center text-white ${
                        isCentered ? 'w-10 h-10 rounded-xl' : 'w-8 h-8 rounded-lg'
                      }`}>
                        {currentStepData.id === 'welcome' ? (
                          <Rocket size={isCentered ? 22 : 16} weight="fill" />
                        ) : currentStepData.id === 'complete' ? (
                          <CheckCircle size={isCentered ? 22 : 16} weight="fill" />
                        ) : (
                          stepIcons[currentStepData.id] || <Rocket size={16} weight="fill" />
                        )}
                      </div>
                      <div>
                        <span className={`text-white/70 font-bold uppercase tracking-wider block ${
                          isCentered ? 'text-[10px]' : 'text-[9px]'
                        }`}>
                          Tips
                        </span>
                        <p className={`text-white font-semibold leading-tight ${
                          isCentered ? 'text-sm' : 'text-xs'
                        }`}>
                          Step {currentStep + 1}/{totalSteps}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={skipTutorial}
                      className={`rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all ${
                        isCentered ? 'w-8 h-8' : 'w-7 h-7'
                      }`}
                      title={isLanguageIndonesian ? 'Lewati Tutorial' : 'Skip Tutorial'}
                      aria-label={isLanguageIndonesian ? 'Lewati Tutorial' : 'Skip Tutorial'}
                    >
                      <X size={isCentered ? 14 : 12} className="text-white" weight="bold" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className={isCentered ? 'p-6' : 'p-4'}>
                    <h3 className={`font-bold text-text-primary ${
                      isCentered ? 'text-lg mb-2.5' : 'text-sm mb-1.5'
                    }`}>
                      {currentStepData.title}
                    </h3>
                    <p className={`text-text-secondary leading-relaxed ${
                      isCentered ? 'text-sm mb-6' : 'text-xs mb-4'
                    }`}>
                      {currentStepData.description}
                    </p>

                    {/* Navigation */}
                    <div className="flex items-center gap-2.5">
                      {isFirstStep ? (
                        <button
                          onClick={skipTutorial}
                          className={`font-medium text-text-muted hover:text-text-secondary transition-colors bg-surface-elevated dark:bg-surface rounded-xl hover:bg-border ${
                            isCentered ? 'px-5 py-3 text-sm' : 'px-4 py-2 text-xs'
                          }`}
                        >
                          {isLanguageIndonesian ? 'Lewati' : 'Skip'}
                        </button>
                      ) : (
                        <button
                          onClick={prevStep}
                          className={`bg-surface-elevated dark:bg-surface hover:bg-border flex items-center justify-center transition-colors ${
                            isCentered ? 'w-11 h-11 rounded-xl' : 'w-10 h-10 rounded-xl'
                          }`}
                          aria-label="Kembali"
                        >
                          <ArrowLeft size={isCentered ? 18 : 16} className="text-text-secondary" weight="bold" />
                        </button>
                      )}

                      <button
                        onClick={nextStep}
                        className={`flex-1 rounded-xl font-bold flex items-center justify-center ${
                          isCentered ? 'py-3 text-sm gap-2' : 'py-2.5 text-xs gap-1.5'
                        } ${
                          isLastStep
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25'
                            : 'bg-gradient-to-r from-accent to-orange-500 text-white shadow-lg shadow-accent/25'
                        }`}
                      >
                        {isLastStep ? (
                          <>
                            <CheckCircle size={isCentered ? 16 : 14} weight="fill" />
                            {isLanguageIndonesian ? 'Selesai!' : 'Complete!'}
                          </>
                        ) : (
                          <>
                            {isLanguageIndonesian ? 'Lanjut' : 'Next'}
                            <ArrowRight size={isCentered ? 14 : 12} weight="bold" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}
