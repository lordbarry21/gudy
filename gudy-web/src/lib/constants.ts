// Subject IDs
export const SUBJECT_IDS = {
  MATEMATIKA_OSN: 'matematika_osn',
  TKA_MATEMATIKA: 'tka_matematika',
  BAHASA_INDONESIA: 'bahasa_indonesia',
  BAHASA_INGGRIS: 'bahasa_inggris',
  SERKOM: 'serkom',
} as const

// Subject Data - Claude-harmonized palette
export const SUBJECTS_DATA = [
  {
    id: SUBJECT_IDS.MATEMATIKA_OSN,
    name: 'Matematika OSN & Sinarmas Math Genius',
    icon: '📐',
    description: 'Olimpiade Sains Nasional, Sinarmas Math Genius, SEAMO & IMO',
    color: '#3A92A6',
  },
  {
    id: SUBJECT_IDS.TKA_MATEMATIKA,
    name: 'TKA Wajib: Matematika',
    icon: '📊',
    description: 'Kerangka Asesmen Pusmendik Kemendikdasmen & Seleksi PTN',
    color: '#D97757',
  },
  {
    id: SUBJECT_IDS.BAHASA_INDONESIA,
    name: 'TKA Wajib: Bahasa Indonesia',
    icon: '📝',
    description: 'Literasi Membaca Pusmendik, PUEBI & Standar EYD V',
    color: '#D9943B',
  },
  {
    id: SUBJECT_IDS.BAHASA_INGGRIS,
    name: 'TKA Wajib: Bahasa Inggris',
    icon: '🌐',
    description: 'Standar CEFR Level B1/A2, Academic & Vocational Reading',
    color: '#B86877',
  },
  {
    id: SUBJECT_IDS.SERKOM,
    name: 'Serkom JWD & LKS RPL Laravel',
    icon: '💻',
    description: 'SKKNI J.620100 BNSP Junior Web Dev & LKS Web Technologies',
    color: '#459A72',
  },
] as const

// Default Checklist Items
export const DEFAULT_CHECKLIST = [
  'Read theory',
  'Watch video (optional)',
  'Practice problems',
  'Review mistakes',
  'Self-quiz',
] as const

// App Info
export const APP_INFO = {
  name: 'Gudy',
  tagline: 'Map Your Mastery. Master Your Goals.',
  version: '1.0.0',
} as const

// Achievement Definitions
export const ACHIEVEMENTS_DATA: Array<{
  id: string
  title: string
  description: string
  icon: string
  requiredValue: number
  type: 'general' | 'streak' | 'progress' | 'subject'
}> = [
  { id: 'first_step', title: 'First Step', description: 'Complete your first topic', icon: '🎯', requiredValue: 1, type: 'progress' },
  { id: 'consistent', title: 'Consistent', description: 'Complete 7 topics', icon: '🔥', requiredValue: 7, type: 'progress' },
  { id: 'dedicated', title: 'Dedicated', description: 'Complete 30 topics', icon: '💪', requiredValue: 30, type: 'progress' },
  { id: 'master', title: 'Master', description: 'Complete 100 topics', icon: '🏆', requiredValue: 100, type: 'progress' },
  { id: 'week_streak', title: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥', requiredValue: 7, type: 'streak' },
  { id: 'month_streak', title: 'Month Champion', description: 'Maintain a 30-day streak', icon: '👑', requiredValue: 30, type: 'streak' },
  { id: 'hundred_streak', title: 'Legend', description: 'Maintain a 100-day streak', icon: '⭐', requiredValue: 100, type: 'streak' },
  { id: 'math_osn_ready', title: 'OSN Ready', description: 'Complete all Matematika OSN', icon: '📐', requiredValue: 1, type: 'subject' },
  { id: 'math_tka_ready', title: 'TKA Expert', description: 'Complete all TKA Matematika', icon: '📊', requiredValue: 1, type: 'subject' },
  { id: 'language_master', title: 'Polyglot', description: 'Complete Bahasa Indonesia & Inggris', icon: '🌐', requiredValue: 2, type: 'subject' },
  { id: 'serkom_ready', title: 'Serkom Champion', description: 'Complete all Serkom Laravel', icon: '💻', requiredValue: 1, type: 'subject' },
]

// Storage Keys
export const STORAGE_KEYS = {
  PROGRESS: 'gudy_progress',
  SUBJECTS: 'gudy_subjects',
  TOPICS: 'gudy_topics',
  ACHIEVEMENTS: 'gudy_achievements',
  CURRICULUM_VERSION: 'gudy_curriculum_version',
  STUDY_SESSIONS: 'gudy_study_sessions',
} as const

// Pomodoro Timer Presets (in minutes)
export const POMODORO_PRESETS = {
  FOCUS_25: 25,
  FOCUS_45: 45,
  FOCUS_60: 60,
  FOCUS_90: 90,
} as const

// Break Durations (in minutes)
export const BREAK_PRESETS = {
  SHORT: 5,
  LONG: 10,
  EXTENDED: 15,
} as const

// Break Messages & Quotes
export const BREAK_MESSAGES = [
  "Waktu istirahat! Otakmu butuh refresh.",
  "Istirahat sebentar, nanti lanjut lebih fokus!",
  "Great work! Saatnya recharge.",
  "Kamu sudah hebat! Beri waktu untuk dirimu.",
]

export const MOTIVATIONAL_QUOTES = [
  { text: "Konsistensi mengalahkan bakat.", author: "Unknown" },
  { text: "Progress, bukan sempurna.", author: "Unknown" },
  { text: "Setiap menit belajat berarti.", author: "Unknown" },
  { text: "Kamu lebih kuat dari yang kau kira.", author: "Unknown" },
  { text: "Sedikit-sedikit, lama-lama menjadi bukit.", author: "Pepatah" },
  { text: "Gagal adalah bumbu успеха.", author: "Unknown" },
  { text: "Hari ini sulit, besok lebih mudah.", author: "Unknown" },
  { text: "Fokus pada proses, bukan hasil.", author: "Unknown" },
  { text: "Belajar hari ini untuk masa depan yang lebih baik.", author: "Unknown" },
  { text: "Setiap usaha akan berbuah hasil.", author: "Unknown" },
]

// Daily Goal Targets (in minutes)
export const DAILY_STUDY_TARGETS = {
  MINIMUM: 30,
  MODERATE: 60,
  INTENSIVE: 90,
  EXTREME: 120,
} as const
