'use client'

import { useState, useMemo, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Topic } from '@/types'
import {
  GraphSimulation,
  buildGraphData,
  DEFAULT_CONFIG,
  type SimulationConfig,
} from '@/lib/graph-simulation'
import {
  GraphCanvas,
  type GraphCanvasControls,
} from './graph-canvas'
import { GraphSettingsPanel } from './graph-settings-panel'
import { TopicExplanationPanel } from './topic-explanation-panel'
import {
  MagnifyingGlassPlus,
  MagnifyingGlassMinus,
  ArrowsIn,
  TextT,
  Gear,
} from '@phosphor-icons/react'

interface TopicGraphProps {
  topics: Topic[]
  subjectId: string
  subjectColor: string
  subjectName?: string
}

export function TopicGraph({ topics, subjectId, subjectColor, subjectName }: TopicGraphProps) {
  const router = useRouter()

  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [showLabels, setShowLabels] = useState(true)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [simConfig, setSimConfig] = useState<SimulationConfig>(DEFAULT_CONFIG)

  const controlsRef = useRef<GraphCanvasControls | null>(null)

  // Initialize simulation data
  const simulation = useMemo(() => {
    const { nodes, edges } = buildGraphData(topics, subjectId, subjectName)
    return new GraphSimulation(nodes, edges, simConfig)
  }, [topics, subjectId, subjectName, simConfig])

  // Aggregate stats
  const stats = useMemo(() => {
    const leafList = topics.filter(t => t.isLeaf)
    return {
      total: leafList.length,
      mastered: leafList.filter(t => t.status === 'mastered').length,
      inProgress: leafList.filter(t => t.status === 'inProgress').length,
    }
  }, [topics])

  const selectedNodeData = useMemo(() => {
    if (!selectedNodeId) return null
    return simulation.nodes.find(n => n.id === selectedNodeId) || null
  }, [selectedNodeId, simulation])

  const handleRegisterControls = useCallback((controls: GraphCanvasControls) => {
    controlsRef.current = controls
  }, [])

  const handleOpenTopic = useCallback((topicId: string) => {
    router.push(`/learn/${subjectId}/topic/${topicId}`)
  }, [router, subjectId])

  const handleUpdateConfig = useCallback((newConfig: Partial<SimulationConfig>) => {
    setSimConfig(prev => {
      const updated = { ...prev, ...newConfig }
      simulation.updateConfig(updated)
      return updated
    })
  }, [simulation])

  const handleResetDefaults = useCallback(() => {
    setSimConfig(DEFAULT_CONFIG)
    simulation.updateConfig(DEFAULT_CONFIG)
    controlsRef.current?.resetView()
  }, [simulation])

  return (
    <div className="space-y-4">
      {/* Legend & Summary Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-surface rounded-xl border border-border text-xs shadow-card">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-success" />
            <span className="text-text-secondary">
              Dikuasai: <strong className="text-text-primary font-mono">{stats.mastered}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-warning" />
            <span className="text-text-secondary">
              Sedang Dipelajari: <strong className="text-text-primary font-mono">{stats.inProgress}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-border-hover" />
            <span className="text-text-secondary">
              Belum Mulai: <strong className="text-text-primary font-mono">{stats.total - stats.mastered - stats.inProgress}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-text-muted hidden sm:inline text-[11px]">
            {topics.length} topik terhubung
          </span>
        </div>
      </div>

      {/* Main 2-Column Split: Graph Canvas on Left, Rich Explanation Panel on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left / Center: Graph Viewport */}
        <div className="lg:col-span-7 xl:col-span-8 relative">
          <GraphCanvas
            simulation={simulation}
            subjectColor={subjectColor}
            hoveredNodeId={hoveredNodeId}
            selectedNodeId={selectedNodeId}
            showLabels={showLabels}
            onHoverNode={setHoveredNodeId}
            onSelectNode={setSelectedNodeId}
            onOpenTopic={handleOpenTopic}
            onRegisterControls={handleRegisterControls}
          />

          {/* Floating Controls Overlay */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-surface/90 backdrop-blur-md p-1 rounded-lg border border-border shadow-card z-20">
            <button
              type="button"
              title="Perbesar (Zoom In)"
              onClick={() => controlsRef.current?.zoomIn()}
              className="p-1.5 text-text-muted hover:text-text-primary hover:bg-surface-elevated rounded transition-colors"
            >
              <MagnifyingGlassPlus size={16} />
            </button>
            <button
              type="button"
              title="Perkecil (Zoom Out)"
              onClick={() => controlsRef.current?.zoomOut()}
              className="p-1.5 text-text-muted hover:text-text-primary hover:bg-surface-elevated rounded transition-colors"
            >
              <MagnifyingGlassMinus size={16} />
            </button>
            <button
              type="button"
              title="Pusatkan Tampilan (Center View)"
              onClick={() => controlsRef.current?.resetView()}
              className="p-1.5 text-text-muted hover:text-text-primary hover:bg-surface-elevated rounded transition-colors"
            >
              <ArrowsIn size={16} />
            </button>
            <div className="w-[1px] h-4 bg-border my-auto mx-0.5" />
            <button
              type="button"
              title={showLabels ? 'Sembunyikan Label' : 'Tampilkan Label'}
              onClick={() => setShowLabels(prev => !prev)}
              className={`p-1.5 rounded transition-colors ${
                showLabels ? 'text-accent bg-accent/10' : 'text-text-muted hover:text-text-primary hover:bg-surface-elevated'
              }`}
            >
              <TextT size={16} />
            </button>
            <button
              type="button"
              title="Buka Pengaturan Graf"
              onClick={() => setIsSettingsOpen(prev => !prev)}
              className={`p-1.5 rounded transition-colors ${
                isSettingsOpen ? 'text-accent bg-accent/10' : 'text-text-muted hover:text-text-primary hover:bg-surface-elevated'
              }`}
            >
              <Gear size={16} />
            </button>
          </div>

          {/* Floating Settings Panel */}
          <GraphSettingsPanel
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            currentConfig={simConfig}
            onUpdateConfig={handleUpdateConfig}
            onResetDefaults={handleResetDefaults}
            onResetView={() => controlsRef.current?.resetView()}
            showLabels={showLabels}
            onToggleLabels={() => setShowLabels(prev => !prev)}
          />
        </div>

        {/* Right: Topic Explanation Panel */}
        <div className="lg:col-span-5 xl:col-span-4 h-[620px] lg:h-[660px]">
          <TopicExplanationPanel
            selectedNode={selectedNodeData}
            subjectId={subjectId}
            subjectColor={subjectColor}
            subjectName={subjectName}
            topics={topics}
            onSelectNodeId={setSelectedNodeId}
          />
        </div>
      </div>
    </div>
  )
}
