import type { Topic, MasteryStatus } from '@/types'

export interface GraphNode {
  id: string
  title: string
  status: MasteryStatus
  radius: number
  type: 'subject' | 'branch' | 'leaf'
  topicId?: string
  topic?: Topic
  x: number
  y: number
  vx: number
  vy: number
  fx?: number | null
  fy?: number | null
  depth: number
  isRootHub?: boolean
}

export interface GraphEdge {
  source: string
  target: string
  isRootEdge?: boolean
}

export interface SimulationConfig {
  repulsion: number
  springLengthRoot: number
  springLengthChild: number
  springStrength: number
  centerGravity: number
  damping: number
  alphaDecay: number
  alphaMin: number
}

export const DEFAULT_CONFIG: SimulationConfig = {
  repulsion: 850,
  springLengthRoot: 75,
  springLengthChild: 42,
  springStrength: 0.065,
  centerGravity: 0.0014,
  damping: 0.78,
  alphaDecay: 0.985,
  alphaMin: 0.001,
}

export function buildGraphData(
  topics: Topic[],
  subjectId: string,
  subjectName?: string
): { nodes: GraphNode[]; edges: GraphEdge[] } {
  if (topics.length === 0) {
    return { nodes: [], edges: [] }
  }

  const nodes: GraphNode[] = []
  const edges: GraphEdge[] = []

  const topicMap = new Map<string, Topic>()
  topics.forEach(topic => topicMap.set(topic.id, topic))

  const getTopicDepth = (topic: Topic): number => {
    let depth = 1
    let current = topic
    while (current.parentId && topicMap.has(current.parentId)) {
      depth += 1
      current = topicMap.get(current.parentId)!
    }
    return depth
  }

  const leafTopics = topics.filter(t => t.isLeaf)
  const allMastered = leafTopics.length > 0 && leafTopics.every(t => t.status === 'mastered')
  const anyInProgress = leafTopics.some(t => t.status === 'inProgress' || t.status === 'mastered')
  const subjectStatus: MasteryStatus = allMastered ? 'mastered' : anyInProgress ? 'inProgress' : 'notStarted'

  // Central Subject Hub Node (Anchor like "Importer" in Obsidian)
  const rootHubId = `__hub_${subjectId}`
  nodes.push({
    id: rootHubId,
    title: subjectName || 'Overview',
    status: subjectStatus,
    radius: 9.5,
    type: 'subject',
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    depth: 0,
    isRootHub: true,
  })

  // Primary branches (topics without parentId)
  const rootTopics = topics.filter(t => !t.parentId)
  const childTopics = topics.filter(t => Boolean(t.parentId))

  rootTopics.forEach((topic, index) => {
    const angle = (2 * Math.PI * index) / Math.max(1, rootTopics.length) - Math.PI / 2
    const distance = 75

    nodes.push({
      id: topic.id,
      title: topic.title,
      status: topic.status,
      radius: 6.5,
      type: topic.isLeaf ? 'leaf' : 'branch',
      topicId: topic.id,
      topic,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      vx: 0,
      vy: 0,
      depth: 1,
    })

    edges.push({
      source: rootHubId,
      target: topic.id,
      isRootEdge: true,
    })
  })

  // Child topics
  childTopics.forEach((topic) => {
    const depth = getTopicDepth(topic)
    const parent = nodes.find(n => n.id === topic.parentId)
    const parentAngle = parent ? Math.atan2(parent.y, parent.x) : 0
    const jitterAngle = parentAngle + (Math.random() - 0.5) * 1.1
    const distance = 50 + depth * 32 + (Math.random() - 0.5) * 12

    nodes.push({
      id: topic.id,
      title: topic.title,
      status: topic.status,
      radius: topic.isLeaf ? 4.5 : 5.5,
      type: topic.isLeaf ? 'leaf' : 'branch',
      topicId: topic.id,
      topic,
      x: Math.cos(jitterAngle) * distance,
      y: Math.sin(jitterAngle) * distance,
      vx: 0,
      vy: 0,
      depth,
    })

    if (topic.parentId) {
      edges.push({
        source: topic.parentId,
        target: topic.id,
        isRootEdge: false,
      })
    }
  })

  return { nodes, edges }
}

export class GraphSimulation {
  public nodes: GraphNode[] = []
  public edges: GraphEdge[] = []
  public alpha = 1.0
  private config: SimulationConfig

  constructor(nodes: GraphNode[], edges: GraphEdge[], config?: Partial<SimulationConfig>) {
    this.nodes = nodes
    this.edges = edges
    this.config = { ...DEFAULT_CONFIG, ...config }
  }

  public getConfig(): SimulationConfig {
    return { ...this.config }
  }

  public updateConfig(newConfig: Partial<SimulationConfig>): void {
    this.config = { ...this.config, ...newConfig }
    this.reheat(0.35)
  }

  public step(): boolean {
    if (this.alpha < this.config.alphaMin) {
      return false
    }

    const { nodes, edges, config, alpha } = this
    const nodeCount = nodes.length

    // 1. Center gravity (pulls gently toward center origin)
    for (let i = 0; i < nodeCount; i++) {
      const node = nodes[i]
      node.vx -= node.x * config.centerGravity * alpha
      node.vy -= node.y * config.centerGravity * alpha
    }

    // 2. Many-body Coulomb repulsion
    for (let i = 0; i < nodeCount; i++) {
      const nodeA = nodes[i]
      for (let j = i + 1; j < nodeCount; j++) {
        const nodeB = nodes[j]
        const deltaX = nodeB.x - nodeA.x
        const deltaY = nodeB.y - nodeA.y
        const distSq = deltaX * deltaX + deltaY * deltaY || 1

        if (distSq > 120000) continue

        const dist = Math.sqrt(distSq)
        const force = (config.repulsion / distSq) * alpha
        const fx = (deltaX / dist) * force
        const fy = (deltaY / dist) * force

        nodeA.vx -= fx
        nodeA.vy -= fy
        nodeB.vx += fx
        nodeB.vy += fy
      }
    }

    // 3. Link spring force (Hooke's Law)
    const nodeIndexMap = new Map<string, GraphNode>()
    nodes.forEach(n => nodeIndexMap.set(n.id, n))

    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i]
      const sourceNode = nodeIndexMap.get(edge.source)
      const targetNode = nodeIndexMap.get(edge.target)
      if (!sourceNode || !targetNode) continue

      const deltaX = targetNode.x - sourceNode.x
      const deltaY = targetNode.y - sourceNode.y
      const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY) || 1

      const targetDistance = edge.isRootEdge ? config.springLengthRoot : config.springLengthChild
      const displacement = dist - targetDistance
      const force = displacement * config.springStrength * alpha

      const fx = (deltaX / dist) * force
      const fy = (deltaY / dist) * force

      sourceNode.vx += fx
      sourceNode.vy += fy
      targetNode.vx -= fx
      targetNode.vy -= fy
    }

    // 4. Collision buffer (compact packing without overlap)
    for (let i = 0; i < nodeCount; i++) {
      const nodeA = nodes[i]
      for (let j = i + 1; j < nodeCount; j++) {
        const nodeB = nodes[j]
        const deltaX = nodeB.x - nodeA.x
        const deltaY = nodeB.y - nodeA.y
        const distSq = deltaX * deltaX + deltaY * deltaY || 1
        const minDistance = nodeA.radius + nodeB.radius + 12

        if (distSq < minDistance * minDistance) {
          const dist = Math.sqrt(distSq)
          const overlap = (minDistance - dist) * 0.5
          const nx = (deltaX / dist) * overlap
          const ny = (deltaY / dist) * overlap

          nodeA.vx -= nx * 0.5
          nodeA.vy -= ny * 0.5
          nodeB.vx += nx * 0.5
          nodeB.vy += ny * 0.5
        }
      }
    }

    // 5. Velocity integration & damping
    for (let i = 0; i < nodeCount; i++) {
      const node = nodes[i]
      if (node.fx != null && node.fy != null) {
        node.x = node.fx
        node.y = node.fy
        node.vx = 0
        node.vy = 0
      } else {
        node.vx *= config.damping
        node.vy *= config.damping
        node.x += node.vx
        node.y += node.vy
      }
    }

    // 6. Alpha cooling
    this.alpha *= config.alphaDecay
    return true
  }

  public reheat(amount = 0.3): void {
    this.alpha = Math.max(this.alpha, amount)
  }
}
