'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useAppStore } from '@/lib/store'
import { PRACTICE_EXAMS } from '@/lib/practice-manifest'
import {
  FilePdf,
  DownloadSimple,
  ArrowSquareOut,
  X,
  MagnifyingGlass,
  Clock,
  CheckCircle,
  Books,
  Sparkle,
  Lightning,
} from '@phosphor-icons/react'

type PracticeExam = (typeof PRACTICE_EXAMS)[number]

export default function PracticePage() {
  const { subjects, initialize, isInitialized } = useAppStore()
  const [mounted, setMounted] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [previewExam, setPreviewExam] = useState<PracticeExam | null>(null)

  useEffect(() => {
    setMounted(true)
    if (!isInitialized) {
      initialize()
    }
  }, [initialize, isInitialized])

  if (!mounted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </main>
    )
  }

  // Filter exams based on subject & search query
  const filteredExams = PRACTICE_EXAMS.filter((exam) => {
    const matchesSubject =
      selectedSubject === 'all' || exam.subject_id === selectedSubject
    const matchesSearch =
      searchQuery.trim() === '' ||
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.subject_name.toLowerCase().includes(searchQuery.toLowerCase())

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

  return (
    <main className="min-h-screen bg-background pb-24 lg:pb-12 lg:pl-64 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 lg:px-8 pt-8">
        {/* Header */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent mb-2">
                <Sparkle size={13} weight="fill" />
                <span>Bank Soal & Ujian Mandiri Resmi (Target 100)</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-text-primary tracking-tight">
                Latihan Soal & Ujian PDF
              </h1>
              <p className="text-text-secondary text-sm mt-1">
                Kumpulan lengkap paket ujian mandiri per subkategori (15-20 soal acak + kunci jawaban & pembahasan detail)
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-text-muted bg-surface border border-border rounded-xl px-3.5 py-2">
              <Books size={16} className="text-accent" />
              <span>{PRACTICE_EXAMS.length} Paket Ujian Tersedia</span>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <MagnifyingGlass
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            placeholder="Cari paket latihan soal (misal: Aljabar, Vieta, Sanctum, Limit, Reading)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary text-xs"
            >
              Hapus
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
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
              selectedSubject === 'all'
                ? 'bg-accent text-white shadow-sm'
                : 'bg-surface border border-border text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
            }`}
          >
            Semua Subjek ({PRACTICE_EXAMS.length})
          </button>
          {subjects.map((subject) => {
            const count = PRACTICE_EXAMS.filter(
              (e) => e.subject_id === subject.id
            ).length
            return (
              <button
                key={subject.id}
                onClick={() => setSelectedSubject(subject.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-colors border ${
                  selectedSubject === subject.id
                    ? 'border-transparent text-white shadow-sm'
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
            const color = getSubjectColor(exam.subject_id)
            const icon = getSubjectIcon(exam.subject_id)
            const duration = exam.question_count <= 15 ? 45 : 60

            return (
              <motion.div
                key={`${exam.subject_id}_${exam.subcategory_id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.03 * (index % 10) }}
                className="bg-surface border border-border rounded-2xl p-5 hover:border-border-hover transition-all shadow-card flex flex-col justify-between group"
              >
                <div>
                  {/* Top Meta */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                        style={{ background: `${color}18` }}
                      >
                        {icon}
                      </div>
                      <div>
                        <span
                          className="text-[11px] font-semibold tracking-wide uppercase block"
                          style={{ color }}
                        >
                          {exam.subject_name}
                        </span>
                        <h3 className="font-bold text-text-primary text-base group-hover:text-accent transition-colors leading-snug">
                          {exam.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-text-secondary line-clamp-2 mb-4">
                    {exam.description}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-surface-elevated text-text-secondary px-2.5 py-1 rounded-lg border border-border">
                      <Books size={12} className="text-accent" />
                      {exam.question_count} Soal PG
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-surface-elevated text-text-secondary px-2.5 py-1 rounded-lg border border-border">
                      <Clock size={12} className="text-warning" />
                      {duration} Menit
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-success/10 text-success px-2.5 py-1 rounded-lg">
                      <CheckCircle size={12} weight="fill" />
                      Kunci & Bahas
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-border/60 flex items-center gap-2">
                  <button
                    onClick={() => setPreviewExam(exam)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-accent text-white hover:bg-accent-hover transition-colors shadow-sm"
                  >
                    <FilePdf size={15} weight="fill" />
                    <span>Buka Ujian</span>
                  </button>

                  <a
                    href={exam.pdf_url}
                    download
                    className="inline-flex items-center justify-center gap-1 p-2 rounded-xl text-xs font-medium bg-surface-elevated text-text-secondary hover:text-text-primary border border-border hover:border-border-hover transition-colors"
                    title="Unduh file PDF"
                  >
                    <DownloadSimple size={16} />
                  </a>

                  <a
                    href={exam.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1 p-2 rounded-xl text-xs font-medium bg-surface-elevated text-text-secondary hover:text-text-primary border border-border hover:border-border-hover transition-colors"
                    title="Buka di tab baru"
                  >
                    <ArrowSquareOut size={16} />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {filteredExams.length === 0 && (
          <div className="text-center py-16 bg-surface border border-border rounded-2xl p-8">
            <Lightning size={40} className="mx-auto text-text-muted mb-3" />
            <h3 className="font-semibold text-text-primary text-base mb-1">
              Tidak Ada Paket Soal Ditemukan
            </h3>
            <p className="text-text-secondary text-xs">
              Coba sesuaikan kata kunci pencarian atau pilih subjek yang lain.
            </p>
          </div>
        )}
      </div>

      {/* PDF Modal Viewer */}
      <AnimatePresence>
        {previewExam && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-surface border border-border rounded-2xl shadow-2xl w-full max-w-5xl h-[92vh] flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="px-5 py-3.5 border-b border-border flex items-center justify-between bg-surface-elevated">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent">
                    <FilePdf size={20} weight="fill" />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary text-sm sm:text-base leading-tight">
                      {previewExam.title}
                    </h3>
                    <p className="text-[11px] text-text-muted">
                      {previewExam.subject_name} &bull; {previewExam.question_count} Soal &bull; Target Nilai 100
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={previewExam.pdf_url}
                    download
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-accent text-white hover:bg-accent-hover transition-colors"
                  >
                    <DownloadSimple size={14} weight="bold" />
                    <span className="hidden sm:inline">Unduh PDF</span>
                  </a>

                  <a
                    href={previewExam.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 p-2 rounded-xl text-xs text-text-secondary hover:text-text-primary hover:bg-surface border border-border transition-colors"
                    title="Buka Tab Baru"
                  >
                    <ArrowSquareOut size={16} />
                  </a>

                  <button
                    onClick={() => setPreviewExam(null)}
                    className="p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface border border-border transition-colors"
                    title="Tutup"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Embedded PDF iframe */}
              <div className="flex-1 bg-[#2b2b2b] relative">
                <iframe
                  src={previewExam.pdf_url}
                  className="w-full h-full border-none"
                  title={previewExam.title}
                />
              </div>

              {/* Modal Footer */}
              <div className="px-5 py-2.5 border-t border-border bg-surface flex items-center justify-between text-xs text-text-muted">
                <span>Dokumen Resmi Bank Soal Gudy Examination Series</span>
                <span className="font-mono text-[11px]">{previewExam.pdf_url}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  )
}
