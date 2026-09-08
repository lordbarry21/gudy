'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Topic } from '@/types'
import type { GraphNode } from '@/lib/graph-simulation'
import { useAppStore } from '@/lib/store'
import {
  BookOpen,
  CheckCircle,
  Copy,
  Check,
  ArrowRight,
  Sparkle,
  Target,
  X,
  CaretRight,
  Star,
  Lightbulb,
} from '@phosphor-icons/react'

interface TopicExplanationPanelProps {
  selectedNode: GraphNode | null
  subjectId: string
  subjectColor: string
  subjectName?: string
  topics: Topic[]
  onSelectNodeId: (nodeId: string | null) => void
}

export function TopicExplanationPanel({
  selectedNode,
  subjectId,
  subjectColor,
  subjectName,
  topics,
  onSelectNodeId,
}: TopicExplanationPanelProps) {
  const router = useRouter()
  const { toggleChecklistItem, markAsMastered, toggleTopicMasteredCascade, subjects } = useAppStore()
  const [copied, setCopied] = useState(false)

  const currentSubject = subjects.find(s => s.id === subjectId)
  const leafTopics = topics.filter(t => t.isLeaf)
  const masteredCount = leafTopics.filter(t => t.status === 'mastered').length
  const inProgressCount = leafTopics.filter(t => t.status === 'inProgress').length
  const progressPercent = leafTopics.length > 0 ? Math.round((masteredCount / leafTopics.length) * 100) : 0

  const handleCopyPrompt = (topicTitle: string, customPrompt?: string) => {
    const prompt = customPrompt || `Ajarkan saya tentang materi "${topicTitle}" secara mendalam dan terstruktur untuk persiapan Ujian/Kompetisi:
1. Konsep dasar, definisi, dan intuisi di balik rumus.
2. Rumus dan teorema penting serta pembuktian ringkasnya.
3. 3 contoh soal bertingkat (mudah, sedang, mahir) beserta solusi langkah demi langkah.
4. Kesalahan umum (common pitfalls) yang sering dilakukan siswa dan cara menghindarinya.
5. 3 latihan soal mandiri beserta kunci jawaban.`
    navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Branch category data
  const branchChildren = selectedNode && selectedNode.type === 'branch'
    ? topics.filter(t => t.parentId === selectedNode.id)
    : []

  // Active topic data
  const currentTopic = selectedNode?.topic
    ? topics.find(t => t.id === selectedNode.topic?.id) || selectedNode.topic
    : null

  const isSubjectHub = !selectedNode || selectedNode.isRootHub

  return (
    <div className="flex flex-col h-full bg-surface border border-border rounded-2xl overflow-hidden shadow-card">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-border flex items-center justify-between bg-surface-elevated/40">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
            style={{ backgroundColor: `${subjectColor}20`, color: subjectColor }}
          >
            {isSubjectHub ? '★' : selectedNode.type === 'branch' ? '📁' : '📝'}
          </div>
          <div>
            <span className="text-[10px] font-medium text-text-muted block leading-tight uppercase tracking-wider">
              {isSubjectHub ? 'Ringkasan Subjek' : selectedNode.type === 'branch' ? 'Kategori Silabus' : 'Detail Materi'}
            </span>
            <h2 className="text-sm font-semibold text-text-primary leading-tight truncate max-w-[200px]">
              {isSubjectHub ? (subjectName || 'Matematika OSN') : selectedNode.title}
            </h2>
          </div>
        </div>

        {!isSubjectHub && (
          <button
            type="button"
            onClick={() => onSelectNodeId(null)}
            className="p-1.5 text-text-muted hover:text-text-primary hover:bg-surface-elevated rounded-lg transition-colors"
            title="Kembali ke Ringkasan"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 text-text-secondary text-xs custom-scrollbar">
        {/* CASE 1: Subject Overview */}
        {isSubjectHub && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Subject Card Banner */}
            <div className="p-4 rounded-xl bg-surface-elevated border border-border space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-semibold tracking-wide uppercase text-text-muted">
                  Kemajuan Pembelajaran
                </span>
                <span className="text-sm font-bold font-mono text-text-primary">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%`, backgroundColor: subjectColor }}
                />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                <div className="bg-surface p-2 rounded-lg border border-border">
                  <span className="text-success font-bold font-mono block text-sm">{masteredCount}</span>
                  <span className="text-text-muted text-[10px]">Dikuasai</span>
                </div>
                <div className="bg-surface p-2 rounded-lg border border-border">
                  <span className="text-warning font-bold font-mono block text-sm">{inProgressCount}</span>
                  <span className="text-text-muted text-[10px]">Diproses</span>
                </div>
                <div className="bg-surface p-2 rounded-lg border border-border">
                  <span className="text-text-secondary font-bold font-mono block text-sm">
                    {leafTopics.length - masteredCount - inProgressCount}
                  </span>
                  <span className="text-text-muted text-[10px]">Belum Mulai</span>
                </div>
              </div>
            </div>

            {/* Comprehensive Explanation */}
            <div className="space-y-2">
              <h3 className="font-semibold text-text-primary text-xs flex items-center gap-1.5">
                <BookOpen size={14} className="text-accent" />
                <span>Struktur Kurikulum & Panduan Silabus</span>
              </h3>
              <p className="text-text-secondary leading-relaxed text-[11px]">
                {currentSubject?.description || 'Silabus dirancang untuk mengasah kemampuan penalaran konseptual dan pemecahan masalah (problem solving).'}
              </p>
              <p className="text-text-muted leading-relaxed text-[11px]">
                Materi di dalam knowledge graph ini terhubung secara logis. Klik setiap gelembung di graf sebelah kiri untuk membuka detail materi spesifik.
              </p>
            </div>

            {/* Pillars Overview */}
            <div className="space-y-2">
              <div className="p-3 bg-surface-elevated border border-border rounded-xl">
                <div className="font-semibold text-text-primary text-[11px] mb-0.5 text-success">
                  1. Aljabar (Algebra)
                </div>
                <p className="text-text-muted text-[10px] leading-relaxed">
                  Persamaan, pertidaksamaan kuadrat/polinomial, fungsi, serta barisan dan deret.
                </p>
              </div>

              <div className="p-3 bg-surface-elevated border border-border rounded-xl">
                <div className="font-semibold text-text-primary text-[11px] mb-0.5 text-accent">
                  2. Geometri (Geometry)
                </div>
                <p className="text-text-muted text-[10px] leading-relaxed">
                  Sifat segitiga, lingkaran, kesebangunan, dan dasar trigonometri.
                </p>
              </div>

              <div className="p-3 bg-surface-elevated border border-border rounded-xl">
                <div className="font-semibold text-text-primary text-[11px] mb-0.5 text-warning">
                  3. Teori Bilangan (Number Theory)
                </div>
                <p className="text-text-muted text-[10px] leading-relaxed">
                  Keterbagian bilangan bulat, FPB, KPK, sifat bilangan prima, dan aritmetika modulo.
                </p>
              </div>

              <div className="p-3 bg-surface-elevated border border-border rounded-xl">
                <div className="font-semibold text-text-primary text-[11px] mb-0.5 text-text-primary">
                  4. Analisis & Kalkulus
                </div>
                <p className="text-text-muted text-[10px] leading-relaxed">
                  Konsep limit fungsi, turunan aljabar/trigonometri, dan dasar integral.
                </p>
              </div>
            </div>

            {/* Navigation Tip */}
            <div className="p-3 bg-accent/10 border border-accent/20 rounded-xl text-[11px] text-accent flex items-start gap-2">
              <Sparkle size={15} className="shrink-0 mt-0.5" />
              <span>
                <strong>Tips:</strong> Drag bubble mana pun untuk mengatur posisinya di canvas, scroll untuk zoom, dan klik materi untuk mencentang target belajar!
              </span>
            </div>
          </div>
        )}

        {/* CASE 2: Category Branch Overview */}
        {!isSubjectHub && selectedNode.type === 'branch' && (() => {
          const branchLeaves = topics.filter((t) => {
            if (!t.isLeaf) return false
            let curr = t
            while (curr.parentId) {
              if (curr.parentId === selectedNode.id) return true
              const parent = topics.find((p) => p.id === curr.parentId)
              if (!parent) break
              curr = parent
            }
            return false
          })
          const branchMasteredCount = branchLeaves.filter((l) => l.status === 'mastered').length
          const isBranchFullyMastered = branchLeaves.length > 0 && branchMasteredCount === branchLeaves.length

          return (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-surface-elevated border border-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-accent/15 text-accent">
                    Cabang Silabus
                  </span>
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      isBranchFullyMastered
                        ? 'bg-success/15 text-success'
                        : branchMasteredCount > 0
                        ? 'bg-warning/15 text-warning'
                        : 'bg-surface text-text-muted border border-border'
                    }`}
                  >
                    {branchMasteredCount}/{branchLeaves.length} Dikuasai
                  </span>
                </div>
                <p className="text-text-secondary text-[11px] leading-relaxed">
                  {currentTopic?.description || `Bagian cabang materi ${selectedNode.title} yang memuat topik-topik esensial untuk dipelajari secara bertahap.`}
                </p>

                {/* Instant 1-Click Master All Branch Topics Button */}
                <button
                  type="button"
                  onClick={() => toggleTopicMasteredCascade(selectedNode.id)}
                  className={`w-full py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-colors ${
                    isBranchFullyMastered
                      ? 'bg-surface hover:bg-surface-elevated border-border text-text-secondary'
                      : 'bg-success/15 hover:bg-success/25 border-success/30 text-success'
                  }`}
                >
                  <CheckCircle size={15} weight="fill" />
                  <span>
                    {isBranchFullyMastered
                      ? `Batalkan Selesai Semua Materi ${selectedNode.title}`
                      : `Tandai Semua Materi Dikuasai (${branchLeaves.length} Topik)`}
                  </span>
                </button>
              </div>

              {/* List of Subtopics */}
              <div className="space-y-2">
                <h4 className="font-semibold text-text-primary text-xs flex items-center justify-between">
                  <span>Daftar Materi dalam Cabang Ini</span>
                  <span className="text-[10px] text-text-muted font-normal">Klik untuk centang</span>
                </h4>

                <div className="space-y-1.5">
                  {branchChildren.map((child) => (
                    <div
                      key={child.id}
                      className="w-full p-2.5 rounded-xl bg-surface-elevated/50 hover:bg-surface-elevated transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleTopicMasteredCascade(child.id)
                          }}
                          className="p-1 -m-1 rounded hover:scale-110 active:scale-95 transition-transform"
                          title={
                            child.status === 'mastered'
                              ? `Batalkan status selesai untuk ${child.title}`
                              : `Tandai ${child.title} selesai dikuasai`
                          }
                        >
                          <span
                            className={`w-2.5 h-2.5 rounded-full block transition-colors ${
                              child.status === 'mastered'
                                ? 'bg-success ring-2 ring-success/30'
                                : child.status === 'inProgress'
                                ? 'bg-warning ring-2 ring-warning/30'
                                : 'bg-border-hover hover:bg-text-muted'
                            }`}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() => onSelectNodeId(child.id)}
                          className="text-text-primary text-[11px] font-medium truncate group-hover:text-accent transition-colors text-left flex-1"
                        >
                          {child.title}
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-text-muted shrink-0">
                        {child.checklist.length > 0 && (
                          <span className="font-mono">
                            {child.checklist.filter((c) => c.isChecked).length}/{child.checklist.length}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => onSelectNodeId(child.id)}
                          className="p-0.5 text-text-muted group-hover:text-text-primary transition-colors"
                        >
                          <CaretRight size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })()}

        {/* CASE 3: Leaf Topic Detail */}
        {!isSubjectHub && selectedNode.type === 'leaf' && currentTopic && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Status & Description */}
            <div className="p-4 rounded-xl bg-surface-elevated border border-border space-y-2.5">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                  currentTopic.status === 'mastered' ? 'bg-success/15 text-success' :
                  currentTopic.status === 'inProgress' ? 'bg-warning/15 text-warning' :
                  'bg-surface text-text-muted border border-border'
                }`}>
                  {currentTopic.status === 'mastered' ? '✨ Dikuasai' :
                   currentTopic.status === 'inProgress' ? '⚡ Sedang Dipelajari' : '○ Belum Mulai'}
                </span>

                {currentTopic.status !== 'mastered' && (
                  <button
                    type="button"
                    onClick={() => markAsMastered(currentTopic.id)}
                    className="text-[11px] font-medium text-success hover:underline transition-colors flex items-center gap-1"
                  >
                    <CheckCircle size={13} weight="bold" />
                    <span>Tandai Kuasai</span>
                  </button>
                )}
              </div>

              <p className="text-text-secondary text-[11px] leading-relaxed">
                {currentTopic.description || 'Pahami konsep dasar, teorema kunci, serta latihan pemecahan masalah untuk topik ini.'}
              </p>

              {currentTopic.targetCriteria && (
                <div className="mt-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-text-primary">
                  <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-semibold text-[10px] mb-1">
                    <Star size={12} weight="fill" />
                    <span>Target Nilai 100</span>
                  </div>
                  <p className="leading-snug">{currentTopic.targetCriteria}</p>
                </div>
              )}

              {currentTopic.memoryBooster && (
                <div className="mt-2 p-2 rounded-lg bg-surface border border-border text-[10px] font-mono text-text-secondary overflow-x-auto whitespace-pre-wrap">
                  <div className="flex items-center gap-1 text-warning font-sans font-semibold text-[10px] mb-1">
                    <Lightbulb size={12} weight="fill" />
                    <span>Pemantik Ingatan</span>
                  </div>
                  {currentTopic.memoryBooster}
                </div>
              )}
            </div>

            {/* Interactive Checklist */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-text-primary text-xs flex items-center gap-1.5">
                  <Target size={14} className="text-accent" />
                  <span>Target Belajar (Checklist)</span>
                </h4>
                <span className="text-[10px] text-text-muted font-mono">
                  {currentTopic.checklist.filter(c => c.isChecked).length} / {currentTopic.checklist.length} Selesai
                </span>
              </div>

              <div className="space-y-1 bg-surface-elevated/40 p-2 rounded-xl border border-border">
                {currentTopic.checklist.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-surface-elevated cursor-pointer transition-colors text-[11px]"
                  >
                    <input
                      type="checkbox"
                      checked={item.isChecked}
                      onChange={() => toggleChecklistItem(currentTopic.id, item.id)}
                      className="accent-accent w-4 h-4 rounded cursor-pointer shrink-0"
                    />
                    <span className={item.isChecked ? 'line-through text-text-muted' : 'text-text-primary'}>
                      {item.title}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2 border-t border-border">
              <button
                type="button"
                onClick={() => router.push(`/learn/${subjectId}/topic/${currentTopic.id}`)}
                className="w-full py-2.5 px-3 bg-accent hover:bg-accent-dark text-white font-medium text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Buka Halaman Materi Penuh</span>
                <ArrowRight size={13} />
              </button>

              <button
                type="button"
                onClick={() => handleCopyPrompt(currentTopic.title, currentTopic.aiPrompt)}
                className="w-full py-2 px-3 bg-surface-elevated hover:bg-border text-text-secondary text-xs rounded-xl border border-border flex items-center justify-center gap-1.5 transition-colors"
              >
                {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Prompt AI Tutor'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
