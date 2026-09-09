'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

// Steps that highlight sidebar navigation items (shown on desktop only)
const SIDEBAR_STEPS = ['learn', 'progress', 'practice', 'profile']
const SIDEBAR_WIDTH = 256 // Width of desktop sidebar

interface TooltipPosition {
  top: number
  left: number
}

export function TutorialOverlay() {
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

  const TOOLTIP_WIDTH = 340
  const TOOLTIP_HEIGHT = 280
  const PADDING = 20
  const TARGET_PADDING = 12

  const findAndPosition = useCallback(() => {
    if (!isActive || !currentStepData) {
      setHighlightRect(null)
      setIsReady(false)
      return
    }

    const vw = window.innerWidth
    const vh = window.innerHeight
    const isDesktop = vw >= 1024
    const isSidebarStep = SIDEBAR_STEPS.includes(currentStepData.id)

    // On mobile, skip sidebar navigation tutorial steps
    if (isSidebarStep && !isDesktop) {
      // Skip this step on mobile - auto advance
      setHighlightRect(null)
      setIsReady(false)
      return
    }

    // Try to find the element
    const selectors = [
      `[data-tutorial="${currentStepData.id}"]`,
      currentStepData.selector,
    ]

    let element: Element | null = null
    for (const selector of selectors) {
      try {
        element = document.querySelector(selector)
        if (element) break
      } catch {
        continue
      }
    }

    if (element) {
      // Scroll element into view smoothly
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })

      // Get position after scroll
      setTimeout(() => {
        const rect = element!.getBoundingClientRect()
        setHighlightRect(rect)

        const spaceBelow = vh - rect.bottom
        const spaceAbove = rect.top
        const spaceRight = vw - rect.right

        let top: number
        let left: number

        // Determine horizontal position based on element location and step type
        if (isSidebarStep && isDesktop) {
          // For sidebar nav items, position tooltip to the RIGHT of the sidebar
          left = SIDEBAR_WIDTH + PADDING + 20

          // If not enough space on right, try to center on element
          if (left + TOOLTIP_WIDTH > vw - PADDING) {
            left = Math.max(PADDING, Math.min(rect.left, vw - TOOLTIP_WIDTH - PADDING))
          }
        } else if (rect.left < TOOLTIP_WIDTH / 2) {
          // Element is too far left, align to left edge
          left = PADDING
        } else if (rect.right > vw - TOOLTIP_WIDTH / 2) {
          // Element is too far right, align to right edge
          left = vw - TOOLTIP_WIDTH - PADDING
        } else {
          // Center horizontally relative to element
          left = rect.left + rect.width / 2 - TOOLTIP_WIDTH / 2
        }

        // Position tooltip below or above based on available space
        // Prefer bottom for most cases
        if (spaceBelow > TOOLTIP_HEIGHT + 80) {
          top = rect.bottom + TARGET_PADDING + 8
        } else if (spaceAbove > TOOLTIP_HEIGHT + 80) {
          top = rect.top - TOOLTIP_HEIGHT - TARGET_PADDING - 8
        } else {
          // Center vertically if no space
          top = Math.max(PADDING, (vh - TOOLTIP_HEIGHT) / 2)
        }

        // Ensure tooltip stays within viewport
        left = Math.max(PADDING, Math.min(left, vw - TOOLTIP_WIDTH - PADDING))
        top = Math.max(PADDING, Math.min(top, vh - TOOLTIP_HEIGHT - PADDING))

        setTooltipPos({ top, left })
        setIsReady(true)
      }, 350)
    } else {
      // Element not found - center on screen
      setHighlightRect(null)
      setTooltipPos({
        top: (vh - TOOLTIP_HEIGHT) / 2,
        left: (vw - TOOLTIP_WIDTH) / 2,
      })
      setIsReady(true)
    }
  }, [isActive, currentStepData])

  // Find element and calculate position
  useEffect(() => {
    findAndPosition()
    window.addEventListener('resize', findAndPosition)
    return () => window.removeEventListener('resize', findAndPosition)
  }, [findAndPosition])

  if (!isActive) return null

  const isLastStep = currentStep === totalSteps - 1
  const isFirstStep = currentStep === 0

  return (
    <AnimatePresence>
      {isActive && (
        <>
          {/* Dark background overlay - reduced opacity for better visibility */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/70"
          />

          {/* Spotlight cutout using SVG */}
          {highlightRect && (
            <>
              {/* SVG mask for spotlight */}
              <svg
                className="fixed inset-0 w-full h-full z-[41]"
                style={{ position: 'fixed' }}
              >
                <defs>
                  <mask id="spotlight-mask">
                    <rect x="0" y="0" width="100%" height="100%" fill="white" />
                    <rect
                      x={highlightRect.left - TARGET_PADDING}
                      y={highlightRect.top - TARGET_PADDING}
                      width={highlightRect.width + TARGET_PADDING * 2}
                      height={highlightRect.height + TARGET_PADDING * 2}
                      rx="12"
                      fill="black"
                    />
                  </mask>
                </defs>
                <rect
                  x="0" y="0" width="100%" height="100%"
                  fill="rgba(0, 0, 0, 0.6)"
                  mask="url(#spotlight-mask)"
                />
              </svg>

              {/* Orange glowing border around highlighted element */}
              <div
                className="fixed z-[45] pointer-events-none animate-pulse"
                style={{
                  top: highlightRect.top - TARGET_PADDING,
                  left: highlightRect.left - TARGET_PADDING,
                  width: highlightRect.width + TARGET_PADDING * 2,
                  height: highlightRect.height + TARGET_PADDING * 2,
                  borderRadius: 14,
                  border: '3px solid #f97316',
                  boxShadow: '0 0 0 4px rgba(249, 115, 22, 0.4), 0 0 30px rgba(249, 115, 22, 0.5), inset 0 0 20px rgba(249, 115, 22, 0.1)',
                }}
              />
            </>
          )}

          {/* Floating Card */}
          <AnimatePresence mode="wait">
            {isReady && currentStepData && (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="fixed z-50 w-[340px]"
                style={{
                  top: tooltipPos.top,
                  left: tooltipPos.left,
                }}
              >
                <div className="bg-white dark:bg-surface-elevated border border-border rounded-2xl shadow-2xl overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-accent to-orange-500 px-4 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
                        {stepIcons[currentStepData.id] || <Rocket size={16} weight="fill" />}
                      </div>
                      <div>
                        <span className="text-white/70 text-[9px] font-bold uppercase tracking-wider block">
                          {isLanguageIndonesian ? 'Tips' : 'Tips'}
                        </span>
                        <p className="text-white text-xs font-semibold leading-tight">
                          Step {currentStep + 1}/{totalSteps}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {currentStepData.skippable && (
                        <button
                          onClick={skipTutorial}
                          className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
                        >
                          <X size={11} className="text-white" weight="bold" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-text-primary mb-1.5">
                      {currentStepData.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed mb-3">
                      {currentStepData.description}
                    </p>

                    {/* Action hint */}
                    {currentStepData.action && (
                      <div className="bg-accent/10 rounded-lg px-3 py-2 flex items-center gap-2 mb-3">
                        <ArrowRight size={12} className="text-accent" weight="bold" />
                        <span className="text-[10px] font-medium text-accent">
                          {currentStepData.action.label}
                        </span>
                      </div>
                    )}

                    {/* Navigation */}
                    <div className="flex items-center gap-2">
                      {isFirstStep ? (
                        <button
                          onClick={skipTutorial}
                          className="px-3 py-2 text-xs font-medium text-text-muted hover:text-text-secondary transition-colors"
                        >
                          {isLanguageIndonesian ? 'Lewati' : 'Skip'}
                        </button>
                      ) : (
                        <button
                          onClick={prevStep}
                          className="w-9 h-9 rounded-lg bg-surface-elevated hover:bg-border flex items-center justify-center transition-colors"
                        >
                          <ArrowLeft size={15} className="text-text-secondary" weight="bold" />
                        </button>
                      )}

                      <button
                        onClick={nextStep}
                        className={`flex-1 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 ${
                          isLastStep
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                            : 'bg-gradient-to-r from-accent to-orange-500 text-white'
                        }`}
                      >
                        {isLastStep ? (
                          <>
                            <CheckCircle size={13} weight="fill" />
                            {isLanguageIndonesian ? 'Selesai!' : 'Complete!'}
                          </>
                        ) : (
                          <>
                            {isLanguageIndonesian ? 'Lanjut' : 'Next'}
                            <ArrowRight size={12} weight="bold" />
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
