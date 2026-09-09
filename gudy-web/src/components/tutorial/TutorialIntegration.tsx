'use client'

import { TutorialProvider, useTutorial, WelcomeModal } from '@/components/tutorial'

function TutorialWrapper({ children }: { children: React.ReactNode }) {
  const { startTutorial, skipTutorial } = useTutorial()

  return (
    <>
      {children}
      <WelcomeModal
        onStartTutorial={startTutorial}
        onSkip={skipTutorial}
      />
    </>
  )
}

export function TutorialIntegration({ children }: { children: React.ReactNode }) {
  return (
    <TutorialProvider>
      <TutorialWrapper>{children}</TutorialWrapper>
    </TutorialProvider>
  )
}
