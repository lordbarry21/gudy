'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { loadQuizData } from '@/lib/quiz-data'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { AuthModal } from '@/components/auth/AuthModal'
import {
  QuizCard,
} from '@/components/quiz'
import {
  MagnifyingGlass,
  Books,
  Sparkle,
  Lightning,
  User,
  SignIn,
  Trophy,
  CheckCircle,
} from '@phosphor-icons/react'
import { useAuth } from '@/contexts/AuthContext'
import { QuizData } from '@/types'

type PracticeExam = {
  subjectId: string
  subjectName: string
  subcategoryId: string
  title: string
  description: string
  questionCount: number
  pdfUrl: string
  icon: string
  color: string
}

export default function PracticePage() {
  const router = useRouter()
  const { subjects, initialize, isInitialized } = useAppStore()
  const { t } = useLanguage()
  const { user, loading: authLoading } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [quizData, setQuizData] = useState<Record<string, QuizData>>({})
  const [practiceList, setPracticeList] = useState<PracticeExam[]>([])
  const [quizStats, setQuizStats] = useState({
    averageScore: 0,
    totalQuizzesTaken: 0,
    categoriesPlayed: 0,
  })

  useEffect(() => {
    setMounted(true)
    if (!isInitialized) {
      initialize()
    }
  }, [initialize, isInitialized])

  // Load quiz data and stats
  useEffect(() => {
    const loadData = async () => {
      const subjectIds = [
        'bahasa_indonesia',
        'bahasa_inggris',
        'matematika_osn',
        'tka_matematika',
        'serkom',
      ]

      const loadedData: Record<string, QuizData> = {}
      const list: PracticeExam[] = []

      for (const subjectId of subjectIds) {
        const data = await loadQuizData(subjectId)
        if (data) {
          loadedData[subjectId] = data

          // Build practice list from subcategories
          for (const subcat of data.subcategories) {
            list.push({
              subjectId: data.subject_id,
              subjectName: data.subject_name,
              subcategoryId: subcat.id,
              title: subcat.title,
              description: subcat.description || '',
              questionCount: subcat.questions.length,
              pdfUrl: `/practice/${data.subject_id}/${subcat.id}.pdf`,
              icon: data.icon,
              color: data.color,
            })
          }
        }
      }

      setQuizData(loadedData)
      setPracticeList(list)
    }

    loadData()
  }, [])

  // Load quiz progress stats from localStorage
  useEffect(() => {
    if (!user) return

    try {
      const stored = localStorage.getItem('gudy_quiz_progress')
      if (stored) {
        const parsed = JSON.parse(stored)
        const progress = parsed.state?.progress
        if (progress) {
          setQuizStats({
            averageScore: progress.averageScore || 0,
            totalQuizzesTaken: progress.totalQuizzesTaken || 0,
            categoriesPlayed: Object.keys(progress.bestScores || {}).length,
          })
        }
      }
    } catch {
      // Ignore errors
    }
  }, [user])

  // Filter exams based on subject & search query
  const filteredExams = practiceList.filter((exam) => {
    const matchesSubject =
      selectedSubject === 'all' || exam.subjectId === selectedSubject
    const matchesSearch =
      searchQuery.trim() === '' ||
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.subjectName.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesSubject && matchesSearch
  })

  // Subject color lookup
  const getSubjectColor = (subjectId: string): string => {
    const s = subjects.find((sub) => sub.id === subjectId)
    return s ? s.color : '#D97757'
  }

  // Subject icon lookup
  const getSubjectIcon = (subjectId: string): string => {
    const s = subjects.find((sub) => sub.id === subjectId)
    return s ? s.icon : '📝'
  }

  // Get best score for a subcategory
  const getBestScore = (subcategoryId: string) => {
    if (!user) return null
    try {
      const stored = localStorage.getItem('gudy_quiz_progress')
      if (stored) {
        const parsed = JSON.parse(stored)
        const bestScores = parsed.state?.progress?.bestScores
        return bestScores?.[subcategoryId]?.bestScore || null
      }
    } catch {
      // Ignore
    }
    return null
  }

  // Get total attempts for a subcategory
  const getBestAttempts = (subcategoryId: string) => {
    if (!user) return 0
    try {
      const stored = localStorage.getItem('gudy_quiz_progress')
      if (stored) {
        const parsed = JSON.parse(stored)
        const bestScores = parsed.state?.progress?.bestScores
        return bestScores?.[subcategoryId]?.totalAttempts || 0
      }
    } catch {
      // Ignore
    }
    return 0
  }

  // Handle starting a quiz - navigate to dedicated quiz page
  const handleStartQuiz = (exam: PracticeExam) => {
    if (!user) {
      setShowAuthModal(true)
      return
    }
    router.push(`/quiz/${exam.subjectId}/${exam.subcategoryId}`)
  }

  if (!mounted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background pb-24 lg:pb-12 lg:pl-64 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 lg:px-8 pt-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              {/* Label Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-semibold tracking-wide bg-accent/10 text-accent mb-3">
                <Sparkle size={12} weight="fill" />
                <span>{t.practice.questionBank}</span>
              </div>
              {/* Main Title - Fraunces Display */}
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-text-primary tracking-tight leading-tight mb-2 text-shadow-soft">
                {t.practice.title}
              </h1>
              {/* Subtitle - Source Serif for reading */}
              <p className="font-serif text-lg text-text-secondary leading-relaxed max-w-xl">
                {t.practice.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* User Status */}
              {user ? (
                <div className="flex items-center gap-2 font-sans text-xs font-medium text-text-muted bg-surface border border-border rounded-xl px-3.5 py-2.5">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                    <User size={14} className="text-accent" />
                  </div>
                  <span>{user.displayName || user.email?.split('@')[0]}</span>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-2 font-sans text-xs font-medium text-text-muted bg-surface border border-border rounded-xl px-3.5 py-2.5 hover:text-accent hover:border-accent transition-colors"
                >
                  <SignIn size={14} />
                  <span>{t.practice.loginToSave}</span>
                </button>
              )}

              {/* Stats */}
              <div className="flex items-center gap-2 font-sans text-xs font-medium text-text-muted bg-surface border border-border rounded-xl px-3.5 py-2.5">
                <Books size={16} className="text-accent" />
                <span>{practiceList.length} {t.practice.packagesAvailable}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards (for logged in users) */}
        {user && quizStats.totalQuizzesTaken > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-3 gap-4 mb-8"
          >
            <div className="bg-surface border border-border rounded-xl p-5 text-center">
              <Trophy size={22} className="text-warning mx-auto mb-2" />
              <p className="font-display text-2xl font-bold text-text-primary tracking-tight">
                {quizStats.averageScore}%
              </p>
              <p className="font-sans text-xs text-text-muted mt-1 font-medium">{t.practice.averageScore}</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5 text-center">
              <CheckCircle size={22} className="text-success mx-auto mb-2" />
              <p className="font-display text-2xl font-bold text-text-primary tracking-tight">
                {quizStats.totalQuizzesTaken}
              </p>
              <p className="font-sans text-xs text-text-muted mt-1 font-medium">{t.practice.quizzesCompleted}</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5 text-center">
              <Sparkle size={22} className="text-accent mx-auto mb-2" />
              <p className="font-display text-2xl font-bold text-text-primary tracking-tight">
                {quizStats.categoriesPlayed}
              </p>
              <p className="font-sans text-xs text-text-muted mt-1 font-medium">{t.practice.categoriesPlayed}</p>
            </div>
          </motion.div>
        )}

        {/* Search Bar */}
        <div className="relative mb-8">
          <MagnifyingGlass
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            placeholder={t.practice.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-surface border border-border font-sans text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 font-sans text-xs font-medium text-text-muted hover:text-text-primary transition-colors"
            >
              {t.practice.delete}
            </button>
          )}
        </div>

        {/* Filter Chips */}
        <motion.div
          className="flex gap-2 mb-8 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 custom-scrollbar"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <button
            onClick={() => setSelectedSubject('all')}
            className={`flex-shrink-0 px-4 py-2.5 rounded-xl font-sans text-xs font-semibold tracking-wide transition-all ${
              selectedSubject === 'all'
                ? 'bg-accent text-white shadow-md'
                : 'bg-surface border border-border text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
            }`}
          >
            {t.practice.all} ({practiceList.length})
          </button>
          {subjects.map((subject) => {
            const count = practiceList.filter((e) => e.subjectId === subject.id).length
            return (
              <button
                key={subject.id}
                onClick={() => setSelectedSubject(subject.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-semibold tracking-wide transition-all border ${
                  selectedSubject === subject.id
                    ? 'border-transparent text-white shadow-md'
                    : 'bg-surface border-border text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                }`}
                style={
                  selectedSubject === subject.id
                    ? { backgroundColor: subject.color }
                    : undefined
                }
              >
                <span>{subject.icon}</span>
                <span>
                  {subject.name} ({count})
                </span>
              </button>
            )
          })}
        </motion.div>

        {/* Practice Cards Grid */}
        <motion.div
          className="grid gap-4 sm:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          {filteredExams.map((exam, index) => {
            const color = getSubjectColor(exam.subjectId)
            const icon = getSubjectIcon(exam.subjectId)

            return (
              <QuizCard
                key={`${exam.subjectId}_${exam.subcategoryId}`}
                title={exam.title}
                description={exam.description}
                questionCount={exam.questionCount}
                duration={exam.questionCount <= 15 ? 45 : 60}
                subjectColor={color}
                subjectIcon={icon}
                subjectName={exam.subjectName}
                bestScore={getBestScore(exam.subcategoryId)}
                bestAttempts={getBestAttempts(exam.subcategoryId)}
                onStartQuiz={() => handleStartQuiz(exam)}
                onOpenPdf={() => window.open(exam.pdfUrl, '_blank')}
                index={index}
              />
            )
          })}
        </motion.div>

        {filteredExams.length === 0 && (
          <div className="text-center py-16 bg-surface border border-border rounded-2xl p-8">
            <Lightning size={40} className="mx-auto text-text-muted mb-3" />
            <h3 className="font-semibold text-text-primary text-base mb-1">
              {t.practice.noPackagesFound}
            </h3>
            <p className="text-text-secondary text-xs">
              {t.practice.tryDifferentKeywords}
            </p>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialTab="login"
      />
    </main>
  )
}
