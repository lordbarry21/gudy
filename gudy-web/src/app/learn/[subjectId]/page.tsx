'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { useAppStore } from '@/lib/store'
import { calculateProgress } from '@/lib/utils'
import { useLanguage } from '@/lib/i18n/useLanguage'
import { AuthPrompt } from '@/components/auth/AuthPrompt'
import Link from 'next/link'
import {
  ArrowLeft,
  CaretRight,
  CheckCircle,
  Circle,
  Lightning,
  Graph,
  ListBullets,
  Sparkle,
} from '@phosphor-icons/react'
import { TopicGraph } from '@/components/learn/topic-graph'
import type { Topic } from '@/types'

type ViewMode = 'list' | 'graph'

export default function SubjectDetailPage() {
  const params = useParams()
  const subjectId = params.subjectId as string
  const { subjects, topics, initialize, isInitialized, toggleTopicMasteredCascade } = useAppStore()
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set())
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)
  const [pendingTopicId, setPendingTopicId] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    if (!isInitialized) {
      initialize()
    }
  }, [initialize, isInitialized])

  // Handle marking topic - will show auth prompt for guests
  const handleToggleTopic = (topicId: string) => {
    setPendingTopicId(topicId)
    setShowAuthPrompt(true)
  }

  if (!mounted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </main>
    )
  }

  const subject = subjects.find((s) => s.id === subjectId)

  if (!subject) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-text-primary mb-2">Subject Not Found</h1>
          <Link href="/learn" className="text-accent hover:underline text-sm">
            {t.subject.backToSyllabus}
          </Link>
        </div>
      </main>
    )
  }

  const allTopics = topics.filter((t) => t.subjectId === subjectId)
  const rootTopics = allTopics.filter((t) => !t.parentId)
  const getChildTopics = (parentId: string) => allTopics.filter((t) => t.parentId === parentId)

  const toggleExpanded = (topicId: string) => {
    setExpandedTopics((prev) => {
      const next = new Set(prev)
      if (next.has(topicId)) {
        next.delete(topicId)
      } else {
        next.add(topicId)
      }
      return next
    })
  }

  const progressPct = calculateProgress(subject.completedTopics, subject.totalTopics)

  const StatusIcon = ({ status }: { status: Topic['status'] }) => {
    if (status === 'mastered') return <CheckCircle size={17} weight="fill" className="text-success" />
    if (status === 'inProgress') return <Lightning size={17} weight="fill" className="text-warning" />
    return <Circle size={17} className="text-text-muted hover:text-text-secondary transition-colors" />
  }

  const getDescendantLeaves = (parentId: string): Topic[] => {
    const directChildren = allTopics.filter((t) => t.parentId === parentId)
    return [
      ...directChildren.filter((c) => c.isLeaf),
      ...directChildren.filter((c) => !c.isLeaf).flatMap((c) => getDescendantLeaves(c.id)),
    ]
  }

  const renderTopic = (topic: Topic, depth: number = 0) => {
    const children = getChildTopics(topic.id)
    const hasChildren = children.length > 0
    const isExpanded = expandedTopics.has(topic.id)

    const descendantLeaves = hasChildren ? getDescendantLeaves(topic.id) : []
    const masteredLeafCount = descendantLeaves.filter((l) => l.status === 'mastered').length
    const isFolderFullyMastered = descendantLeaves.length > 0 && masteredLeafCount === descendantLeaves.length

    return (
      <div key={topic.id}>
        {hasChildren ? (
          <div
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-surface-elevated transition-colors text-left group outline-none focus:outline-none"
            style={{ paddingLeft: `${depth * 20 + 14}px` }}
          >
            <button
              type="button"
              onClick={() => toggleExpanded(topic.id)}
              className="p-1 -m-1 text-text-muted hover:text-text-primary transition-colors outline-none focus:outline-none"
              title={isExpanded ? t.subject.closeSubtopics : t.subject.openSubtopics}
            >
              <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.15 }}>
                <CaretRight size={15} />
              </motion.div>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleToggleTopic(topic.id)
              }}
              className="p-0.5 rounded hover:scale-110 active:scale-95 transition-all outline-none focus:outline-none"
              title={
                isFolderFullyMastered
                  ? `${t.subject.unmarkComplete} ${topic.title}`
                  : `${t.subject.markAllComplete}`
              }
            >
              <StatusIcon status={isFolderFullyMastered ? 'mastered' : topic.status} />
            </button>

            <button
              type="button"
              onClick={() => toggleExpanded(topic.id)}
              className="text-text-primary text-sm font-medium flex-1 text-left hover:text-accent transition-colors flex items-center gap-2 outline-none focus:outline-none"
            >
              <span>{topic.title}</span>
            </button>

            <div className="flex items-center gap-2">
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-medium transition-colors ${
                  isFolderFullyMastered
                    ? 'bg-success/15 text-success'
                    : masteredLeafCount > 0
                    ? 'bg-warning/15 text-warning'
                    : 'bg-surface-elevated text-text-muted'
                }`}
              >
                {masteredLeafCount}/{descendantLeaves.length} {t.subject.mastered}
              </span>
              <span className="text-[11px] text-text-muted">{children.length} {t.subject.subcategories}</span>
            </div>
          </div>
        ) : (
          <div
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl hover:bg-surface-elevated transition-colors group outline-none focus:outline-none"
            style={{ paddingLeft: `${depth * 20 + 38}px` }}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleToggleTopic(topic.id)
              }}
              className="p-0.5 rounded hover:scale-110 active:scale-95 transition-all outline-none focus:outline-none"
              title={
                topic.status === 'mastered'
                  ? `${t.subject.unmarkTopic} ${topic.title}`
                  : `${t.subject.markTopicComplete}`
              }
            >
              <StatusIcon status={topic.status} />
            </button>

            <Link
              href={`/learn/${subjectId}/topic/${topic.id}`}
              className="flex-1 flex items-center justify-between text-text-primary hover:text-accent transition-colors text-sm py-0.5 outline-none focus:outline-none"
            >
              <span>{topic.title}</span>
              {topic.checklist.length > 0 && (
                <span className="text-[11px] text-text-muted font-mono">
                  {topic.checklist.filter((c) => c.isChecked).length}/{topic.checklist.length}
                </span>
              )}
            </Link>
          </div>
        )}

        <AnimatePresence>
          {isExpanded && hasChildren && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden"
            >
              {children.map((child) => renderTopic(child, depth + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background pb-24 lg:pb-12 lg:pl-64 transition-colors duration-200">
      <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-8 pt-8">
        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-accent text-sm font-medium transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            <span>{t.subject.backToSyllabus}</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="bg-surface border border-border rounded-2xl p-6 mb-6 shadow-card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-5">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shrink-0"
              style={{ background: `${subject.color}18` }}
            >
              {subject.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-text-primary tracking-tight">
                {subject.name}
              </h1>
              <p className="text-text-secondary text-xs mt-0.5">{subject.description}</p>

              {/* Progress */}
              <div className="mt-4 space-y-2 max-w-md">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-muted flex items-center gap-1.5 font-medium">
                    <Sparkle size={13} className="text-accent" weight="fill" />
                    {t.subject.learningProgress}
                  </span>
                  <span className="font-bold font-mono" style={{ color: subject.color }}>{progressPct}%</span>
                </div>
                <div className="h-2 bg-surface-elevated rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: subject.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.7 }}
                  />
                </div>
                <div className="flex items-center gap-3 text-[11px] text-text-muted">
                  <span className="flex items-center gap-1">
                    <CheckCircle size={13} className="text-success" weight="fill" />
                    {subject.completedTopics} {t.subject.mastered}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Lightning size={13} className="text-warning" weight="fill" />
                    {allTopics.filter(t => t.status === 'inProgress').length} {t.subject.inProgress}
                  </span>
                  <span>·</span>
                  <span>{subject.totalTopics} {t.subject.totalMaterials}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* View Toggle */}
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-1 bg-surface-elevated rounded-xl p-1 border border-border">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                viewMode === 'list'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <ListBullets size={15} weight={viewMode === 'list' ? 'fill' : 'regular'} />
              <span>{t.subject.subjectList}</span>
            </button>
            <button
              onClick={() => setViewMode('graph')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                viewMode === 'graph'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Graph size={15} weight={viewMode === 'graph' ? 'fill' : 'regular'} />
              <span>{t.subject.knowledgeGraph}</span>
            </button>
          </div>
          <span className="text-[11px] text-text-muted">
            {viewMode === 'list' ? t.subject.clickToOpen : t.subject.interactiveGraph}
          </span>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {viewMode === 'list' ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-4xl bg-surface border border-border rounded-2xl overflow-hidden shadow-card"
            >
              <div className="px-5 py-3.5 flex items-center justify-between">
                <h2 className="font-semibold text-text-primary text-sm flex items-center gap-2">
                  <Sparkle size={15} className="text-accent" weight="fill" />
                  <span>{t.subject.syllabusTopics}</span>
                </h2>
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1 text-success">
                    <CheckCircle size={13} weight="fill" /> {t.subject.masteredLabel}
                  </span>
                  <span className="flex items-center gap-1 text-warning">
                    <Lightning size={13} weight="fill" /> {t.subject.inProgressLabel}
                  </span>
                  <span className="flex items-center gap-1 text-text-muted">
                    <Circle size={13} /> {t.subject.notStarted}
                  </span>
                </div>
              </div>
              <div className="p-2 space-y-1">
                {rootTopics.map((topic) => renderTopic(topic))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="graph"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <TopicGraph
                topics={allTopics}
                subjectId={subjectId}
                subjectColor={subject.color}
                subjectName={subject.name}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Auth Prompt Modal */}
      <AuthPrompt
        isOpen={showAuthPrompt}
        onClose={() => {
          setShowAuthPrompt(false)
          setPendingTopicId(null)
        }}
        message="Untuk menyimpan progress, silakan login atau daftar akun dulu ya!"
      />
    </main>
  )
}
