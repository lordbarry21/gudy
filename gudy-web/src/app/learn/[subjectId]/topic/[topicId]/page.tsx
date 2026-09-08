'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'motion/react'
import { useAppStore } from '@/lib/store'
import { calculateProgress } from '@/lib/utils'
import Link from 'next/link'
import { Check, Copy, ArrowLeft, Trophy, Star, Lightbulb, BookOpen, Sparkle } from '@phosphor-icons/react'
import { formatMathSymbols } from '@/lib/math-symbols'

export default function TopicDetailPage() {
  const params = useParams()
  const subjectId = params.subjectId as string
  const topicId = params.topicId as string
  const { topics, subjects, toggleChecklistItem, markAsMastered, resetTopicProgress, initialize, isInitialized } = useAppStore()
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)

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

  const topic = topics.find((t) => t.id === topicId)
  const subject = subjects.find((s) => s.id === subjectId)

  if (!topic || !subject) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-text-primary mb-2">
            Topik Tidak Ditemukan
          </h1>
          <Link
            href={`/learn/${subjectId}`}
            className="text-accent hover:underline text-sm"
          >
            Kembali ke Subjek
          </Link>
        </div>
      </main>
    )
  }

  const checkedCount = topic.checklist.filter((c) => c.isChecked).length
  const totalCount = topic.checklist.length
  const progressPct = calculateProgress(checkedCount, totalCount)
  const isMastered = topic.status === 'mastered'

  const activePrompt = topic.aiPrompt || `Ajarkan saya tentang "${topic.title}" secara mendalam dan terstruktur:
1. Konsep kunci dan definisi penting
2. 3 contoh soal dan solusi langkah demi langkah
3. Kesalahan umum dan cara menghindarinya
4. 5 latihan soal dengan tingkat kesulitan bertahap
5. Tips dan trik penyelesaian cepat`

  const copyPrompt = () => {
    navigator.clipboard.writeText(activePrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-background pb-24 lg:pb-12 lg:pl-64 transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4 lg:px-8 pt-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href={`/learn/${subjectId}`}
            className="inline-flex items-center gap-2 text-text-secondary hover:text-accent text-sm font-medium transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke {subject.name}</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="bg-surface border border-border rounded-2xl p-6 sm:p-8 mb-6 shadow-card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-13 h-13 rounded-xl flex items-center justify-center text-2xl shrink-0"
              style={{ background: `${subject.color}18` }}
            >
              {subject.icon}
            </div>
            <div>
              <p className="text-xs text-text-muted">{subject.name}</p>
              <h1 className="text-xl lg:text-2xl font-bold text-text-primary tracking-tight">
                {topic.title}
              </h1>
            </div>
          </div>

          {topic.description && (
            <p className="text-text-secondary text-sm mb-6 leading-relaxed">
              {topic.description}
            </p>
          )}

          {/* Progress Section */}
          <div className="flex items-center gap-6 pt-4 border-t border-border">
            <div className="relative w-16 h-16 shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  className="text-surface-elevated"
                />
                <motion.circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  className="text-accent"
                  strokeDasharray={`${2 * Math.PI * 34}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                  animate={{
                    strokeDashoffset:
                      2 * Math.PI * 34 - (progressPct / 100) * 2 * Math.PI * 34,
                  }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold font-mono text-text-primary">
                  {progressPct}%
                </span>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-text-primary mb-0.5">Target Belajar</p>
              <p className="text-xs text-text-muted">
                {checkedCount} dari {totalCount} item selesai
              </p>
            </div>

            {isMastered && (
              <div className="ml-auto flex items-center gap-1.5 text-success text-xs font-semibold px-3 py-1 bg-success/10 rounded-full border border-success/20">
                <Trophy size={16} weight="fill" />
                <span>Dikuasai</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Target 100 Criteria Banner */}
        {topic.targetCriteria && (
          <motion.div
            className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-5 mb-6 shadow-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <div className="flex items-center gap-2 mb-2 text-amber-600 dark:text-amber-400 font-semibold text-xs">
              <Star size={16} weight="fill" />
              <span className="uppercase tracking-wider">Kriteria Nilai 100 & Target Asesmen</span>
            </div>
            <p className="text-text-primary text-xs sm:text-sm leading-relaxed font-medium">
              {topic.targetCriteria}
            </p>
          </motion.div>
        )}

        {/* Scope / Cakupan Materi */}
        {topic.scope && (
          <motion.div
            className="bg-surface border border-border rounded-2xl p-5 mb-6 shadow-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            <div className="flex items-center gap-2 mb-2 text-text-primary font-semibold text-xs">
              <BookOpen size={16} className="text-accent" weight="fill" />
              <span>Cakupan Materi Silabus</span>
            </div>
            <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
              {topic.scope}
            </p>
          </motion.div>
        )}

        {/* Pemantik Ingatan / Memory Booster */}
        {topic.memoryBooster && (() => {
          const formattedFormula = formatMathSymbols(topic.memoryBooster)

          return (
            <motion.div
              className="bg-surface border border-border rounded-2xl p-5 mb-6 shadow-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2 text-text-primary font-semibold text-xs">
                  <Lightbulb size={16} className="text-warning" weight="fill" />
                  <span>Pemantik Ingatan &amp; Formula Kunci</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(formattedFormula)
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                  }}
                  className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary px-2.5 py-1 rounded-lg hover:bg-surface-elevated transition-colors"
                  title="Salin formula"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-success" weight="bold" />
                      <span className="text-success text-xs font-medium">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span className="text-xs">Salin Formula</span>
                    </>
                  )}
                </button>
              </div>
              <div className="bg-surface-elevated rounded-xl p-4 border border-border/80 dark:border-border/60 font-sans text-xs sm:text-sm text-text-primary overflow-x-auto whitespace-pre-wrap leading-relaxed tracking-normal select-all">
                {formattedFormula}
              </div>
            </motion.div>
          )
        })()}

        {/* Checklist */}
        {topic.checklist.length > 0 && (
          <motion.div
            className="bg-surface border border-border rounded-2xl overflow-hidden mb-6 shadow-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.12 }}
          >
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold text-text-primary text-sm flex items-center gap-2">
                <Sparkle size={15} className="text-accent" weight="fill" />
                <span>Checklist Penguasaan Materi</span>
              </h2>
              <span className="text-[11px] text-text-muted font-mono">{checkedCount}/{totalCount} centang</span>
            </div>
            <div className="p-4 space-y-1.5">
              {topic.checklist.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => toggleChecklistItem(topicId, item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-left ${
                    item.isChecked
                      ? 'bg-success/10 text-text-secondary'
                      : 'bg-surface-elevated hover:bg-border text-text-primary'
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.03 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-all shrink-0 ${
                      item.isChecked
                        ? 'bg-success text-white'
                        : 'border border-border'
                    }`}
                  >
                    {item.isChecked && <Check size={13} weight="bold" />}
                  </div>
                  <span
                    className={`text-xs flex-1 leading-relaxed ${
                      item.isChecked ? 'line-through text-text-muted' : 'text-text-primary'
                    }`}
                  >
                    {item.title}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* AI Prompt */}
        <motion.div
          className="bg-surface border border-border rounded-2xl overflow-hidden mb-6 shadow-card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-text-primary text-sm flex items-center gap-2">
              <Sparkle size={15} className="text-accent" weight="fill" />
              <span>Prompt Belajar AI Tutor (Claude / LLM)</span>
            </h2>
            <span className="text-[11px] text-text-muted">Siap pakai</span>
          </div>
          <div className="p-5">
            <div className="bg-surface-elevated rounded-xl p-3.5 mb-3 border border-border text-xs text-text-secondary leading-relaxed font-mono whitespace-pre-wrap">
              {activePrompt}
            </div>
            <button
              onClick={copyPrompt}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-surface-elevated hover:bg-border text-text-primary text-xs font-medium rounded-xl border border-border transition-colors"
            >
              <Copy size={15} className={copied ? 'text-success' : 'text-text-muted'} />
              <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Prompt untuk Belajar'}</span>
            </button>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {!isMastered && (
            <button
              onClick={() => markAsMastered(topicId)}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-accent hover:bg-accent-dark text-white text-xs font-medium rounded-xl shadow-sm transition-colors"
            >
              <Trophy size={16} weight="fill" />
              <span>Tandai Topik Ini Dikuasai</span>
            </button>
          )}
          <button
            onClick={() => resetTopicProgress(topicId)}
            className="px-5 py-3 bg-surface border border-border text-text-secondary hover:text-text-primary text-xs font-medium rounded-xl hover:bg-surface-elevated transition-colors"
          >
            Reset Progres
          </button>
        </motion.div>
      </div>
    </main>
  )
}
