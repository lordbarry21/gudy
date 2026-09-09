'use client'

import {
  type SimulationConfig,
} from '@/lib/graph-simulation'
import {
  X,
  Sliders,
  ArrowCounterClockwise,
  Crosshair,
} from '@phosphor-icons/react'

interface GraphSettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  currentConfig: SimulationConfig
  onUpdateConfig: (config: Partial<SimulationConfig>) => void
  onResetDefaults: () => void
  onResetView: () => void
  showLabels: boolean
  onToggleLabels: () => void
}

export function GraphSettingsPanel({
  isOpen,
  onClose,
  currentConfig,
  onUpdateConfig,
  onResetDefaults,
  onResetView,
  showLabels,
  onToggleLabels,
}: GraphSettingsPanelProps) {
  if (!isOpen) return null

  return (
    <div className="absolute top-12 right-3 z-30 w-80 bg-[#FAF7F0]/95 dark:bg-[#22211E]/95 backdrop-blur-xl border border-border rounded-2xl shadow-card p-4 text-xs text-text-secondary animate-in fade-in zoom-in-95 duration-150">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-border">
        <div className="flex items-center gap-2 font-semibold text-text-primary">
          <Sliders size={15} className="text-accent" />
          <span>Pengaturan Graf (Forces)</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 text-text-muted hover:text-text-primary hover:bg-surface-elevated rounded-md transition-colors"
        >
          <X size={15} />
        </button>
      </div>

      <div className="space-y-4">
        {/* Link Distance Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-text-secondary font-medium">Jarak Link (Link Distance)</span>
            <span className="text-text-primary font-mono">{currentConfig.springLengthRoot}px</span>
          </div>
          <input
            type="range"
            min={35}
            max={140}
            step={5}
            value={currentConfig.springLengthRoot}
            onChange={(e) => {
              const rootLen = Number(e.target.value)
              onUpdateConfig({
                springLengthRoot: rootLen,
                springLengthChild: Math.round(rootLen * 0.56),
              })
            }}
            className="w-full accent-accent h-1.5 bg-surface-elevated rounded-lg appearance-none cursor-pointer border border-border"
          />
          <div className="flex justify-between text-[10px] text-text-muted">
            <span>Rapat (35px)</span>
            <span>Renggang (140px)</span>
          </div>
        </div>

        {/* Repulsion Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-text-secondary font-medium">Gaya Tolak (Repulsion)</span>
            <span className="text-text-primary font-mono">{currentConfig.repulsion}</span>
          </div>
          <input
            type="range"
            min={300}
            max={1800}
            step={50}
            value={currentConfig.repulsion}
            onChange={(e) => onUpdateConfig({ repulsion: Number(e.target.value) })}
            className="w-full accent-accent h-1.5 bg-surface-elevated rounded-lg appearance-none cursor-pointer border border-border"
          />
          <div className="flex justify-between text-[10px] text-text-muted">
            <span>Halus</span>
            <span>Kuat</span>
          </div>
        </div>

        {/* Center Gravity Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-text-secondary font-medium">Gravitasi Pusat (Center Force)</span>
            <span className="text-text-primary font-mono">
              {(currentConfig.centerGravity * 1000).toFixed(1)}
            </span>
          </div>
          <input
            type="range"
            min={0.0004}
            max={0.0035}
            step={0.0001}
            value={currentConfig.centerGravity}
            onChange={(e) => onUpdateConfig({ centerGravity: Number(e.target.value) })}
            className="w-full accent-accent h-1.5 bg-surface-elevated rounded-lg appearance-none cursor-pointer border border-border"
          />
          <div className="flex justify-between text-[10px] text-text-muted">
            <span>Bebas</span>
            <span>Terkonsentrasi</span>
          </div>
        </div>

        {/* Quick Toggles */}
        <div className="pt-2 border-t border-border space-y-2">
          <label className="flex items-center justify-between cursor-pointer py-1">
            <span className="text-text-secondary text-[11px]">Tampilkan Label Teks</span>
            <input
              type="checkbox"
              checked={showLabels}
              onChange={onToggleLabels}
              className="accent-accent w-4 h-4 rounded cursor-pointer"
            />
          </label>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-border flex gap-2">
          <button
            type="button"
            onClick={onResetView}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 bg-surface-elevated hover:bg-border text-text-primary rounded-lg text-[11px] font-medium transition-colors border border-border"
          >
            <Crosshair size={13} className="text-accent" />
            <span>Pusatkan Graf</span>
          </button>
          <button
            type="button"
            onClick={onResetDefaults}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 bg-surface-elevated/50 hover:bg-surface-elevated text-text-muted hover:text-text-primary rounded-lg text-[11px] font-medium transition-colors border border-border"
          >
            <ArrowCounterClockwise size={13} />
            <span>Reset Standar</span>
          </button>
        </div>
      </div>
    </div>
  )
}
