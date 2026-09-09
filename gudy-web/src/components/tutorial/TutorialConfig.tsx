import type { ReactNode } from 'react'

export interface TutorialStep {
  id: string
  title: string
  description: string
  icon?: ReactNode
  // CSS selector for the element to highlight
  selector: string
  // Position of the tooltip relative to the highlighted element
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center'
  // Whether to show skip button
  skippable?: boolean
  // Action to highlight (e.g., navigation)
  action?: {
    label: string
    href?: string
  }
}

export const TUTORIAL_STORAGE_KEY = 'gudy_tutorial_completed'

export const TUTORIAL_STEPS_ID: TutorialStep[] = [
  // Step 1: Welcome
  {
    id: 'welcome',
    title: 'Selamat Datang di Gudy! 👋',
    description: 'Aplikasi pelacak belajar yang akan membantu kamu menguasai materi dengan lebih efektif. Yuk, kita lihat fitur-fiturnya!',
    selector: '[data-tutorial="welcome"]',
    position: 'bottom',
    skippable: true,
  },
  // Step 2: Learn Page Overview
  {
    id: 'learn',
    title: '📚 Halaman Belajar',
    description: 'Di sini kamu bisa melihat semua mata pelajaran dalam graph interaktif. Klik setiap node untuk melihat detail dan centang saat sudah dipahami. Filter berdasarkan subjek untuk fokus!',
    selector: '[data-tutorial="learn"]',
    position: 'right',
    action: {
      label: 'Jelajahi Belajar',
    },
  },
  // Step 3: Practice Page
  {
    id: 'practice',
    title: '✍️ Halaman Latihan',
    description: 'Uji pemahamanmu dengan quiz interaktif dan latihan PDF! Pilih subjek, jawab pertanyaan, dan lihat skor terbaikmu. Tersedia bank soal untuk persiapan ujian.',
    selector: '[data-tutorial="practice"]',
    position: 'right',
    action: {
      label: 'Mulai Latihan',
    },
  },
  // Step 4: Progress Tracking
  {
    id: 'progress',
    title: '📈 Lacak Progress',
    description: 'Lihat perkembangan belajarmu dengan visualisasi yang jelas. Statistik mingguan, ringkasan bulanan, dan analisis performa quiz ada di sini!',
    selector: '[data-tutorial="progress"]',
    position: 'right',
    action: {
      label: 'Lihat Progress',
    },
  },
  // Step 5: Focus Mode Timer
  {
    id: 'focus-mode',
    title: '⏱️ Mode Fokus (Pomodoro)',
    description: 'Gunakan timer Pomodoro untuk sesi belajar yang lebih fokus. Pilih durasi, mulai fokus, dan setiap sesi selesai dihitung untuk target harianmu!',
    selector: '[data-tutorial="focus-timer"]',
    position: 'top',
    action: {
      label: 'Coba Sekarang',
    },
  },
  // Step 6: Daily Target
  {
    id: 'daily-target',
    title: '🎯 Target Harian',
    description: 'Target default adalah 3 materi per hari. Selesaikan target ini untuk menambah streak belajarmu! Kamu bisa ubah target di halaman Profil.',
    selector: '[data-tutorial="daily-target"]',
    position: 'bottom',
  },
  // Step 7: Streak System
  {
    id: 'streak',
    title: '🔥 Daily Streak',
    description: 'Jaga streakmu dengan belajar setiap hari! Selesaikan target harian untuk menambah streak. Gunakan Streak Freeze jika butuh istirahat satu hari tanpa kehilangan streak.',
    selector: '[data-tutorial="streak"]',
    position: 'bottom',
  },
  // Step 8: Profile Settings
  {
    id: 'profile',
    title: '⚙️ Pengaturan & Profil',
    description: 'Atur target harian, ubah tema dan bahasa, lihat statistik quiz keseluruhan, dan kelola akunmu di sini.',
    selector: '[data-tutorial="profile"]',
    position: 'left',
    action: {
      label: 'Pengaturan',
    },
  },
  // Step 9: Completion
  {
    id: 'complete',
    title: '🎉 Kamu Siap!',
    description: 'Semua fitur utama sudah kamu ketahui. Mulai perjalanan belajarmu sekarang dan jaga konsistensi! 💪',
    selector: '[data-tutorial="skip"]',
    position: 'center',
  },
]

export const TUTORIAL_STEPS_EN: TutorialStep[] = [
  // Step 1: Welcome
  {
    id: 'welcome',
    title: 'Welcome to Gudy! 👋',
    description: 'A study tracker app to help you master materials more effectively. Let\'s explore its features!',
    selector: '[data-tutorial="welcome"]',
    position: 'bottom',
    skippable: true,
  },
  // Step 2: Learn Page Overview
  {
    id: 'learn',
    title: '📚 Learn Page',
    description: 'View all subjects in an interactive graph. Click each node to see details and check when understood. Filter by subject to focus!',
    selector: '[data-tutorial="learn"]',
    position: 'right',
    action: {
      label: 'Explore Learn',
    },
  },
  // Step 3: Practice Page
  {
    id: 'practice',
    title: '✍️ Practice Page',
    description: 'Test your understanding with interactive quizzes and PDF exercises! Choose a subject, answer questions, and check your best scores. Question bank available for exam prep.',
    selector: '[data-tutorial="practice"]',
    position: 'right',
    action: {
      label: 'Start Practice',
    },
  },
  // Step 4: Progress Tracking
  {
    id: 'progress',
    title: '📈 Track Progress',
    description: 'View your learning progress with clear visualizations. Weekly statistics, monthly summaries, and quiz performance analysis are all here!',
    selector: '[data-tutorial="progress"]',
    position: 'right',
    action: {
      label: 'View Progress',
    },
  },
  // Step 5: Focus Mode Timer
  {
    id: 'focus-mode',
    title: '⏱️ Focus Mode (Pomodoro)',
    description: 'Use the Pomodoro timer for more focused study sessions. Choose duration, start focusing, and each completed session counts toward your daily target!',
    selector: '[data-tutorial="focus-timer"]',
    position: 'top',
    action: {
      label: 'Try Now',
    },
  },
  // Step 6: Daily Target
  {
    id: 'daily-target',
    title: '🎯 Daily Target',
    description: 'Default target is 3 materials per day. Complete this target to build your learning streak! You can change the target in the Profile page.',
    selector: '[data-tutorial="daily-target"]',
    position: 'bottom',
  },
  // Step 7: Streak System
  {
    id: 'streak',
    title: '🔥 Daily Streak',
    description: 'Keep your streak alive by studying every day! Complete your daily target to add to your streak. Use Streak Freeze if you need a day off without losing your streak.',
    selector: '[data-tutorial="streak"]',
    position: 'bottom',
  },
  // Step 8: Profile Settings
  {
    id: 'profile',
    title: '⚙️ Settings & Profile',
    description: 'Set your daily target, change theme and language, view overall quiz statistics, and manage your account here.',
    selector: '[data-tutorial="profile"]',
    position: 'left',
    action: {
      label: 'Settings',
    },
  },
  // Step 9: Completion
  {
    id: 'complete',
    title: '🎉 You\'re Ready!',
    description: 'You now know all the main features. Start your learning journey and keep up the consistency! 💪',
    selector: '[data-tutorial="skip"]',
    position: 'center',
  },
]
