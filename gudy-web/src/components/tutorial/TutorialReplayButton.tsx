'use client'

import { motion } from 'framer-motion'
import { Question } from '@phosphor-icons/react'
import { useTutorial } from './TutorialContext'

interface TutorialReplayButtonProps {
  className?: string
}

export function TutorialReplayButton({ className = '' }: TutorialReplayButtonProps) {
  const { isCompleted, startTutorial } = useTutorial()

  // Only show if tutorial was completed AND we're on home page
  if (!isCompleted) return null

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={startTutorial}
      data-tutorial="skip"
      className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-accent hover:bg-accent-dark text-white shadow-lg flex items-center justify-center ${className}`}
      title="Lihat Tutorial"
    >
      <Question size={22} weight="fill" />
    </motion.button>
  )
}
