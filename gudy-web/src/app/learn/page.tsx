'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { useAppStore } from '@/lib/store'
import { calculateProgress } from '@/lib/utils'
import { useLanguage } from '@/lib/i18n/useLanguage'
import Link from 'next/link'
import { ArrowRight, Trophy, CalendarCheck, Sparkle, CaretDown } from '@phosphor-icons/react'

export default function LearnPage() {
  const { subjects, topics, initialize, isInitialized } = useAppStore()
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [showRoadmap, setShowRoadmap] = useState(false)

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

  const leafTopics = topics.filter((t) => t.isLeaf)
  const totalMastered = leafTopics.filter((t) => t.status === 'mastered').length
  const totalLeafCount = leafTopics.length

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const roadmapPhases = [
    {
      period: 'Bulan 1 - 2',
      title: 'Fondasi Teori & Standar Ujian',
      color: '#3A92A6',
      items: [
        'Kuasai Teori Bilangan & Aljabar Dasar OSN (Vieta, AM-GM, Modulo)',
        'Review Menyeluruh Kaidah EYD V & TKA Matematika (SPL, Matriks, Fungsi)',
        'Praktik Mandiri CRUD Dasar Laravel 11 + Autentikasi Breeze/Sanctum',
      ],
    },
    {
      period: 'Bulan 3 - 4',
      title: 'Pemantapan HOTS & Pemrograman Arsitektural',
      color: '#D97757',
      items: [
        'Geometri Tingkat Lanjut (Power of a Point, Ceva/Menelaus) & Kombinatorika (PHP, Invarian)',
        'Bedah Teks Panjang TKA Bahasa Indonesia & Bahasa Inggris (Reading Comprehension)',
        'Implementasi RESTful API Berstandar LKS + Middleware Otorisasi & Unit Testing',
      ],
    },
    {
      period: 'Bulan 5',
      title: 'Simulasi Ujian Berbatas Waktu & Speed Drills',
      color: '#D9943B',
      items: [
        'Tryout Mandiri TKA Wajib (Target: 50 soal dalam 60 menit, akurasi 100%)',
        'Speed Run Live Coding Laravel: Aplikasi Full Stack selesai dalam < 120 menit',
        'Analisis Error Log: Catat setiap kesalahan kecil ke dalam jurnal belajar',
      ],
    },
    {
      period: 'Bulan 6',
      title: 'Final Polish & Uji Asesmen',
      color: '#459A72',
      items: [
        'Simulasi Uji Kompetensi Asesor BNSP (Simulasi Wawancara Portofolio + Praktik)',
        'Pengerjaan Paket Soal OSN-P Tahun Sebelumnya dengan Pembuktian Formal',
        'Hari-H: Eksekusi dengan tenang, presisi tinggi, dan zero-drift!',
      ],
    },
  ]

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
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-accent/15 text-accent flex items-center gap-1.5">
              <Trophy size={13} weight="fill" />
              <span>{t.learn.targetScore}</span>
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-surface-elevated text-text-muted border border-border">
              {totalMastered}/{totalLeafCount} {t.learn.unitsMastered}
            </span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-text-primary tracking-tight mb-2">
            {t.learn.title}
          </h1>
          <p className="text-text-secondary text-sm">
            {t.learn.subtitle}
          </p>
        </motion.div>

        {/* Subject Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-5 mb-8"
        >
          {subjects.map((subject) => {
            const progressPct = calculateProgress(
              subject.completedTopics,
              subject.totalTopics
            )
            return (
              <motion.div key={subject.id} variants={itemVariants}>
                <Link href={`/learn/${subject.id}`} className="group block h-full">
                  <div className="relative bg-surface border border-border rounded-2xl p-6 hover:border-border-hover transition-all duration-200 card-hover h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                          style={{ background: `${subject.color}18` }}
                        >
                          {subject.icon}
                        </div>
                        <ArrowRight
                          size={18}
                          className="text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all"
                        />
                      </div>

                      <h3 className="text-lg font-semibold text-text-primary mb-1 group-hover:text-accent transition-colors">
                        {subject.name}
                      </h3>
                      <p className="text-xs text-text-secondary mb-6 leading-relaxed">
                        {subject.description}
                      </p>
                    </div>

                    {/* Progress Section */}
                    <div className="space-y-2.5 pt-4 border-t border-border">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-text-muted font-medium">{t.learn.materialProgress}</span>
                        <span
                          className="font-bold font-mono"
                          style={{ color: subject.color }}
                        >
                          {progressPct}%
                        </span>
                      </div>
                      <div className="h-2 bg-surface-elevated rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: subject.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPct}%` }}
                          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-text-muted">
                        <span>{subject.completedTopics} {t.learn.mastered}</span>
                        <span>{subject.totalTopics} {t.learn.units}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* 6-Month Roadmap Accordion */}
        <motion.div
          className="bg-surface border border-border rounded-2xl overflow-hidden shadow-card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <button
            type="button"
            onClick={() => setShowRoadmap((prev) => !prev)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-surface-elevated/50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
                <CalendarCheck size={20} weight="fill" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                  <span>{t.learn.sixMonthRoadmap}</span>
                  <Sparkle size={14} className="text-accent" weight="fill" />
                </h3>
                <p className="text-[11px] text-text-muted">
                  {t.learn.roadmapGuide}
                </p>
              </div>
            </div>
            <motion.div animate={{ rotate: showRoadmap ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <CaretDown size={18} className="text-text-muted" />
            </motion.div>
          </button>

          {showRoadmap && (
            <div className="px-6 pb-6 pt-2 border-t border-border space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {roadmapPhases.map((phase) => (
                  <div
                    key={phase.period}
                    className="p-4 rounded-xl bg-surface-elevated border border-border space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[11px] font-bold px-2 py-0.5 rounded"
                        style={{ backgroundColor: `${phase.color}20`, color: phase.color }}
                      >
                        {phase.period}
                      </span>
                      <span className="text-xs font-semibold text-text-primary">
                        {phase.title}
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-text-secondary">
                      {phase.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[11px]">
                          <span className="text-accent font-bold mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  )
}
