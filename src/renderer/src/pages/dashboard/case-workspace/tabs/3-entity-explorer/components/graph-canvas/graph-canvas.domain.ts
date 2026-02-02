/**
 * Graph Canvas Domain
 * Types and interfaces for the graph canvas module
 */

/**
 * Node types in the graph
 */
export type GraphNodeType = 'Person' | 'Org' | 'Location' | 'Event'

/**
 * Graph node representation
 */
export interface GraphNode {
  id: string
  label: string
  type: GraphNodeType
  x?: number
  y?: number
  metadata?: Record<string, unknown>
}

/**
 * Edge/relationship between nodes
 */
export interface GraphEdge {
  id: string
  source: string
  target: string
  label?: string
  weight?: number
  metadata?: Record<string, unknown>
}

/**
 * Complete graph data structure
 */
export interface GraphData {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

/**
 * Graph layout options
 */
export type GraphLayout = 'force' | 'circular' | 'hierarchical' | 'grid'

/**
 * Graph canvas configuration
 */
export interface GraphConfig {
  layout: GraphLayout
  zoomLevel: number
  showLabels: boolean
  highlightConnections: boolean
}

/**
 * Graph canvas state
 */
export interface GraphCanvasState {
  data: GraphData
  config: GraphConfig
  selectedNodeId: string | null
  hoveredNodeId: string | null
  isLoading: boolean
  error: string | null
}
