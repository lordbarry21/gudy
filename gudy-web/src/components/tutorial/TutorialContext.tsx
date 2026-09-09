'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import { TUTORIAL_STEPS_ID, TUTORIAL_STEPS_EN, TUTORIAL_STORAGE_KEY, type TutorialStep } from './TutorialConfig'

interface TutorialContextType {
  isActive: boolean
  currentStep: number
  totalSteps: number
  currentStepData: TutorialStep | null
  isCompleted: boolean
  startTutorial: () => void
  skipTutorial: () => void
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
  completeTutorial: () => void
  isLanguageIndonesian: boolean
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined)

export function TutorialProvider({
  children,
  isIndonesian = true,
}: {
  children: ReactNode
  isIndonesian?: boolean
}) {
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  const steps = isIndonesian ? TUTORIAL_STEPS_ID : TUTORIAL_STEPS_EN

  // Check if tutorial has been completed on mount
  useEffect(() => {
    const completed = localStorage.getItem(TUTORIAL_STORAGE_KEY)
    setIsCompleted(completed === 'true')
    setIsInitialized(true)
  }, [])

  // Start tutorial
  const startTutorial = useCallback(() => {
    setCurrentStep(0)
    setIsActive(true)
  }, [])

  // Skip tutorial
  const skipTutorial = useCallback(() => {
    setIsActive(false)
    setIsCompleted(true)
    localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true')
  }, [])

  // Complete tutorial
  const completeTutorial = useCallback(() => {
    setIsActive(false)
    setIsCompleted(true)
    localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true')
  }, [])

  // Next step
  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      completeTutorial()
    }
  }, [currentStep, steps.length, completeTutorial])

  // Previous step
  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }, [currentStep])

  // Go to specific step
  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step)
    }
  }, [steps.length])

  const value: TutorialContextType = {
    isActive,
    currentStep,
    totalSteps: steps.length,
    currentStepData: steps[currentStep] || null,
    isCompleted,
    startTutorial,
    skipTutorial,
    nextStep,
    prevStep,
    goToStep,
    completeTutorial,
    isLanguageIndonesian: isIndonesian,
  }

  return (
    <TutorialContext.Provider value={value}>
      {children}
    </TutorialContext.Provider>
  )
}

export function useTutorial() {
  const context = useContext(TutorialContext)
  if (context === undefined) {
    throw new Error('useTutorial must be used within a TutorialProvider')
  }
  return context
}
