'use client'

import { useEffect, useRef, useCallback } from 'react'
import type { GraphSimulation, GraphNode } from '@/lib/graph-simulation'

export interface GraphCanvasControls {
  zoomIn: () => void
  zoomOut: () => void
  resetView: () => void
  getZoom: () => number
}

interface GraphCanvasProps {
  simulation: GraphSimulation | null
  subjectColor: string
  hoveredNodeId: string | null
  selectedNodeId: string | null
  showLabels: boolean
  onHoverNode: (nodeId: string | null) => void
  onSelectNode: (nodeId: string | null) => void
  onOpenTopic: (topicId: string) => void
  onRegisterControls: (controls: GraphCanvasControls) => void
}

export function GraphCanvas({
  simulation,
  subjectColor,
  hoveredNodeId,
  selectedNodeId,
  showLabels,
  onHoverNode,
  onSelectNode,
  onOpenTopic,
  onRegisterControls,
}: GraphCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | null>(null)

  const cameraRef = useRef({ panX: 0, panY: 0, zoom: 1.35 })
  const dragRef = useRef<{
    isPanning: boolean
    draggedNode: GraphNode | null
    startX: number
    startY: number
    lastPanX: number
    lastPanY: number
    hasMoved: boolean
  }>({
    isPanning: false,
    draggedNode: null,
    startX: 0,
    startY: 0,
    lastPanX: 0,
    lastPanY: 0,
    hasMoved: false,
  })

  // Synchronize state refs for canvas draw cycle
  const hoveredRef = useRef<string | null>(null)
  const selectedRef = useRef<string | null>(null)
  const showLabelsRef = useRef(true)
  const simRef = useRef<GraphSimulation | null>(null)

  hoveredRef.current = hoveredNodeId
  selectedRef.current = selectedNodeId
  showLabelsRef.current = showLabels
  simRef.current = simulation

  const screenToWorld = useCallback((screenX: number, screenY: number) => {
    const cam = cameraRef.current
    return {
      x: (screenX - cam.panX) / cam.zoom,
      y: (screenY - cam.panY) / cam.zoom,
    }
  }, [])

  const getNodeAtPoint = useCallback((worldX: number, worldY: number): GraphNode | null => {
    const sim = simRef.current
    if (!sim) return null

    for (let i = sim.nodes.length - 1; i >= 0; i--) {
      const node = sim.nodes[i]
      const deltaX = worldX - node.x
      const deltaY = worldY - node.y
      const hitRadius = node.radius + 8
      if (deltaX * deltaX + deltaY * deltaY <= hitRadius * hitRadius) {
        return node
      }
    }
    return null
  }, [])

  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current
    const sim = simRef.current
    if (!canvas || !sim) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isDark = document.documentElement.classList.contains('dark')

    const dpr = window.devicePixelRatio || 1
    const width = canvas.width / dpr
    const height = canvas.height / dpr
    const cam = cameraRef.current

    ctx.clearRect(0, 0, width, height)
    ctx.save()
    ctx.translate(cam.panX, cam.panY)
    ctx.scale(cam.zoom, cam.zoom)

    const activeId = hoveredRef.current || selectedRef.current
    const connectedNodeIds = new Set<string>()
    if (activeId) {
      connectedNodeIds.add(activeId)
      sim.edges.forEach(edge => {
        if (edge.source === activeId) connectedNodeIds.add(edge.target)
        if (edge.target === activeId) connectedNodeIds.add(edge.source)
      })
    }

    // 1. Draw Edges
    const nodeMap = new Map<string, GraphNode>()
    sim.nodes.forEach(n => nodeMap.set(n.id, n))

    for (let i = 0; i < sim.edges.length; i++) {
      const edge = sim.edges[i]
      const source = nodeMap.get(edge.source)
      const target = nodeMap.get(edge.target)
      if (!source || !target) continue

      const isConnectedToActive = activeId && (edge.source === activeId || edge.target === activeId)
      const isBothInFocus = activeId && connectedNodeIds.has(edge.source) && connectedNodeIds.has(edge.target)

      ctx.beginPath()
      ctx.moveTo(source.x, source.y)
      ctx.lineTo(target.x, target.y)

      if (isConnectedToActive || isBothInFocus) {
        ctx.strokeStyle = subjectColor || '#D97757'
        ctx.lineWidth = 1.6
      } else if (activeId) {
        ctx.strokeStyle = isDark ? 'rgba(240, 239, 234, 0.04)' : 'rgba(31, 30, 27, 0.04)'
        ctx.lineWidth = 0.8
      } else {
        ctx.strokeStyle = isDark ? 'rgba(166, 162, 154, 0.22)' : 'rgba(142, 138, 130, 0.22)'
        ctx.lineWidth = 1.0
      }
      ctx.stroke()
    }

    // 2. Draw Nodes
    for (let i = 0; i < sim.nodes.length; i++) {
      const node = sim.nodes[i]
      const isSelected = selectedRef.current === node.id
      const isHovered = hoveredRef.current === node.id
      const isNeighbor = connectedNodeIds.has(node.id)
      const isDimmed = Boolean(activeId && !isHovered && !isSelected && !isNeighbor)

      let fillColor = isDark ? '#8A867E' : '#A39F97'
      if (node.isRootHub) fillColor = subjectColor || '#D97757'
      else if (node.status === 'mastered') fillColor = '#4E9A70'
      else if (node.status === 'inProgress') fillColor = '#D99B26'

      // Focus / Selection indicator
      if (isSelected) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius + 4.5, 0, Math.PI * 2)
        ctx.strokeStyle = '#D97757'
        ctx.lineWidth = 2.0
        ctx.stroke()
      } else if (isHovered) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius + 3.0, 0, Math.PI * 2)
        ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.45)'
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      ctx.beginPath()
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
      ctx.fillStyle = isDimmed ? (isDark ? 'rgba(115, 112, 104, 0.25)' : 'rgba(190, 186, 178, 0.35)') : fillColor
      ctx.fill()
    }

    // 3. Draw Crisp Text Labels
    if (showLabelsRef.current) {
      for (let i = 0; i < sim.nodes.length; i++) {
        const node = sim.nodes[i]
        const isHovered = hoveredRef.current === node.id
        const isSelected = selectedRef.current === node.id
        const isNeighbor = connectedNodeIds.has(node.id)
        const isDimmed = Boolean(activeId && !isHovered && !isSelected && !isNeighbor)

        const labelY = node.y + node.radius + 11
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        if (node.isRootHub) {
          ctx.font = '600 12px Inter, system-ui, sans-serif'
        } else if (node.type === 'branch') {
          ctx.font = '500 11px Inter, system-ui, sans-serif'
        } else {
          ctx.font = '400 10px Inter, system-ui, sans-serif'
        }

        // Outline stroke for readability
        ctx.strokeStyle = isDark ? '#22211E' : '#FAF7F0'
        ctx.lineWidth = 3.5
        ctx.lineJoin = 'round'
        ctx.strokeText(node.title, node.x, labelY)

        if (isDimmed) {
          ctx.fillStyle = isDark ? 'rgba(115, 112, 104, 0.25)' : 'rgba(180, 176, 168, 0.35)'
        } else if (isSelected || isHovered) {
          ctx.fillStyle = '#D97757'
        } else if (node.isRootHub) {
          ctx.fillStyle = isDark ? '#F0EFEA' : '#1F1E1B'
        } else if (node.type === 'branch') {
          ctx.fillStyle = isDark ? '#D8D5CB' : '#3D3A35'
        } else {
          ctx.fillStyle = isDark ? '#A6A29A' : '#605C54'
        }

        ctx.fillText(node.title, node.x, labelY)
      }
    }

    ctx.restore()
  }, [subjectColor])

  // Precise Center View
  const resetView = useCallback(() => {
    const container = containerRef.current
    const sim = simRef.current
    if (!container || !sim) return

    const width = container.clientWidth
    const height = container.clientHeight

    cameraRef.current = {
      zoom: 1.35,
      panX: width / 2,
      panY: height / 2,
    }

    sim.reheat(0.2)
    renderFrame()
  }, [renderFrame])

  const zoomCamera = useCallback((direction: 'in' | 'out') => {
    const container = containerRef.current
    if (!container) return

    const screenX = container.clientWidth / 2
    const screenY = container.clientHeight / 2
    const cam = cameraRef.current
    const factor = direction === 'in' ? 1.25 : 0.8
    const newZoom = Math.min(Math.max(cam.zoom * factor, 0.45), 3.5)

    cam.panX = screenX - (screenX - cam.panX) * (newZoom / cam.zoom)
    cam.panY = screenY - (screenY - cam.panY) * (newZoom / cam.zoom)
    cam.zoom = newZoom

    renderFrame()
  }, [renderFrame])

  useEffect(() => {
    onRegisterControls({
      zoomIn: () => zoomCamera('in'),
      zoomOut: () => zoomCamera('out'),
      resetView,
      getZoom: () => cameraRef.current.zoom,
    })
  }, [onRegisterControls, zoomCamera, resetView])

  useEffect(() => {
    if (!simulation) return

    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current
      cameraRef.current = {
        panX: clientWidth / 2,
        panY: clientHeight / 2,
        zoom: 1.35,
      }
    }

    let isRunning = true
    const loop = () => {
      if (!isRunning) return

      if (simulation.alpha >= 0.001) {
        simulation.step()
      }

      renderFrame()
      animationFrameRef.current = requestAnimationFrame(loop)
    }

    animationFrameRef.current = requestAnimationFrame(loop)

    return () => {
      isRunning = false
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [simulation, renderFrame])

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const width = container.clientWidth
      const height = container.clientHeight

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      const ctx = canvas.getContext('2d')
      if (ctx) ctx.scale(dpr, dpr)

      renderFrame()
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(container)
    return () => observer.disconnect()
  }, [renderFrame])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleNativeWheel = (event: WheelEvent) => {
      event.preventDefault()
      event.stopPropagation()

      const rect = canvas.getBoundingClientRect()
      const screenX = event.clientX - rect.left
      const screenY = event.clientY - rect.top

      const cam = cameraRef.current
      const zoomFactor = event.deltaY < 0 ? 1.08 : 0.92
      const newZoom = Math.min(Math.max(cam.zoom * zoomFactor, 0.45), 3.5)

      cam.panX = screenX - (screenX - cam.panX) * (newZoom / cam.zoom)
      cam.panY = screenY - (screenY - cam.panY) * (newZoom / cam.zoom)
      cam.zoom = newZoom

      renderFrame()
    }

    canvas.addEventListener('wheel', handleNativeWheel, { passive: false })
    return () => canvas.removeEventListener('wheel', handleNativeWheel)
  }, [renderFrame])

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const screenX = event.clientX - rect.left
    const screenY = event.clientY - rect.top
    const world = screenToWorld(screenX, screenY)
    const clickedNode = getNodeAtPoint(world.x, world.y)

    dragRef.current = {
      isPanning: !clickedNode,
      draggedNode: clickedNode,
      startX: event.clientX,
      startY: event.clientY,
      lastPanX: cameraRef.current.panX,
      lastPanY: cameraRef.current.panY,
      hasMoved: false,
    }

    if (clickedNode) {
      clickedNode.fx = clickedNode.x
      clickedNode.fy = clickedNode.y
      simRef.current?.reheat(0.3)
    }

    canvas.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const screenX = event.clientX - rect.left
    const screenY = event.clientY - rect.top
    const world = screenToWorld(screenX, screenY)
    const state = dragRef.current

    if (state.draggedNode) {
      state.hasMoved = true
      state.draggedNode.fx = world.x
      state.draggedNode.fy = world.y
      state.draggedNode.x = world.x
      state.draggedNode.y = world.y
      simRef.current?.reheat(0.15)
      renderFrame()
      return
    }

    if (state.isPanning) {
      state.hasMoved = true
      const deltaX = event.clientX - state.startX
      const deltaY = event.clientY - state.startY
      cameraRef.current.panX = state.lastPanX + deltaX
      cameraRef.current.panY = state.lastPanY + deltaY
      renderFrame()
      return
    }

    const hoveredNode = getNodeAtPoint(world.x, world.y)
    const newHoverId = hoveredNode ? hoveredNode.id : null
    if (newHoverId !== hoveredRef.current) {
      onHoverNode(newHoverId)
    }
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const state = dragRef.current

    if (state.draggedNode) {
      if (!state.hasMoved) {
        onSelectNode(selectedRef.current === state.draggedNode.id ? null : state.draggedNode.id)
      }
      state.draggedNode.fx = null
      state.draggedNode.fy = null
      simRef.current?.reheat(0.2)
    }

    dragRef.current = {
      isPanning: false,
      draggedNode: null,
      startX: 0,
      startY: 0,
      lastPanX: 0,
      lastPanY: 0,
      hasMoved: false,
    }

    if (canvas && canvas.hasPointerCapture(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId)
    }
    renderFrame()
  }

  const handleDoubleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const world = screenToWorld(event.clientX - rect.left, event.clientY - rect.top)
    const node = getNodeAtPoint(world.x, world.y)

    if (node?.topic?.isLeaf && node.topicId) {
      onOpenTopic(node.topicId)
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[620px] lg:h-[660px] bg-surface rounded-2xl border border-border overflow-hidden select-none shadow-card"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onDoubleClick={handleDoubleClick}
      />
      <div className="absolute bottom-3 left-4 text-[11px] text-text-muted pointer-events-none bg-surface/70 backdrop-blur-sm px-2 py-1 rounded-md border border-border/50">
        Scroll untuk zoom • Drag untuk menggeser klaster • Klik materi untuk detail
      </div>
    </div>
  )
}
