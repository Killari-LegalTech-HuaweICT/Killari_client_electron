/**
 * Graph Canvas Store
 * Manages state and actions for the graph canvas component using Jotai
 */

import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useMemo } from 'react'
import type {
  GraphData,
  GraphNode,
  GraphEdge,
  GraphConfig,
  GraphLayout
} from './graph-canvas.domain'
import { graphCanvasRepository } from './graph-canvas.repository'

/**
 * Default graph configuration
 */
const defaultConfig: GraphConfig = {
  layout: 'force',
  zoomLevel: 1,
  showLabels: true,
  highlightConnections: true
}

/**
 * Empty graph data
 */
const emptyGraphData: GraphData = {
  nodes: [],
  edges: []
}

// ============================================================================
// ATOMS - Base state atoms
// ============================================================================

/** Atom for graph data */
export const graphDataAtom = atom<GraphData>(emptyGraphData)

/** Atom for graph configuration */
export const graphConfigAtom = atom<GraphConfig>({ ...defaultConfig })

/** Atom for selected node ID */
export const selectedNodeIdAtom = atom<string | null>(null)

/** Atom for hovered node ID */
export const hoveredNodeIdAtom = atom<string | null>(null)

/** Atom for loading state */
export const isLoadingAtom = atom<boolean>(false)

/** Atom for error state */
export const errorAtom = atom<string | null>(null)

// ============================================================================
// DERIVED ATOMS - Computed state
// ============================================================================

/**
 * Derived atom for the currently selected node
 */
export const selectedNodeAtom = atom((get) => {
  const data = get(graphDataAtom)
  const selectedId = get(selectedNodeIdAtom)
  if (!selectedId) return null
  return data.nodes.find((node) => node.id === selectedId) || null
})

/**
 * Derived atom for edges connected to selected node
 */
export const selectedNodeEdgesAtom = atom((get) => {
  const data = get(graphDataAtom)
  const selectedId = get(selectedNodeIdAtom)
  if (!selectedId) return []
  return data.edges.filter((edge) => edge.source === selectedId || edge.target === selectedId)
})

/**
 * Derived atom for nodes connected to selected node
 */
export const connectedNodesAtom = atom((get) => {
  const data = get(graphDataAtom)
  const selectedEdges = get(selectedNodeEdgesAtom)
  const selectedId = get(selectedNodeIdAtom)

  if (!selectedId) return []

  const connectedIds = new Set<string>()
  selectedEdges.forEach((edge) => {
    if (edge.source !== selectedId) connectedIds.add(edge.source)
    if (edge.target !== selectedId) connectedIds.add(edge.target)
  })

  return data.nodes.filter((node) => connectedIds.has(node.id))
})

/**
 * Derived atom for node count by type
 */
export const nodeCountByTypeAtom = atom((get) => {
  const data = get(graphDataAtom)
  const counts: Record<string, number> = {}

  data.nodes.forEach((node) => {
    counts[node.type] = (counts[node.type] || 0) + 1
  })

  return counts
})

// ============================================================================
// TYPES - Hook return types
// ============================================================================

/**
 * Return type for useGraphCanvas hook
 */
export interface UseGraphCanvasReturn {
  // State
  data: GraphData
  nodes: GraphNode[]
  edges: GraphEdge[]
  config: GraphConfig
  selectedNodeId: string | null
  selectedNode: GraphNode | null
  selectedNodeEdges: GraphEdge[]
  connectedNodes: GraphNode[]
  hoveredNodeId: string | null
  isLoading: boolean
  error: string | null
  nodeCountByType: Record<string, number>
  // Actions
  fetchGraphData: (caseId?: string) => Promise<void>
  setGraphData: (data: GraphData) => void
  selectNode: (id: string | null) => void
  hoverNode: (id: string | null) => void
  updateConfig: (config: Partial<GraphConfig>) => void
  setLayout: (layout: GraphLayout) => void
  setZoom: (level: number) => void
  toggleLabels: () => void
  reset: () => void
}

/**
 * Return type for useGraphSelection hook
 */
export interface UseGraphSelectionReturn {
  selectedNode: GraphNode | null
  selectedNodeEdges: GraphEdge[]
  connectedNodes: GraphNode[]
  selectNode: (id: string | null) => void
}

// ============================================================================
// HOOKS - Custom hooks for graph canvas management
// ============================================================================

/**
 * Hook for managing graph canvas state and actions
 */
export function useGraphCanvas(caseId?: string): UseGraphCanvasReturn {
  const [data, setGraphData] = useAtom(graphDataAtom)
  const [config, setConfig] = useAtom(graphConfigAtom)
  const [selectedNodeId, setSelectedNodeId] = useAtom(selectedNodeIdAtom)
  const selectedNode = useAtomValue(selectedNodeAtom)
  const selectedNodeEdges = useAtomValue(selectedNodeEdgesAtom)
  const connectedNodes = useAtomValue(connectedNodesAtom)
  const [hoveredNodeId, setHoveredNodeId] = useAtom(hoveredNodeIdAtom)
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom)
  const [error, setError] = useAtom(errorAtom)
  const nodeCountByType = useAtomValue(nodeCountByTypeAtom)

  /**
   * Fetches graph data for a case
   */
  const fetchGraphData = useCallback(
    async (id: string = caseId || 'default-case'): Promise<void> => {
      console.log(`[GraphCanvasStore] Fetching graph data for case: ${id}`)
      setIsLoading(true)
      setError(null)

      try {
        const graphData = await graphCanvasRepository.getGraphData(id)
        setGraphData(graphData)
        console.log(
          `[GraphCanvasStore] Loaded ${graphData.nodes.length} nodes and ${graphData.edges.length} edges`
        )
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error fetching graph data'
        setError(message)
        console.error('[GraphCanvasStore] Error:', message)
      } finally {
        setIsLoading(false)
      }
    },
    [caseId, setGraphData, setError, setIsLoading]
  )

  /**
   * Selects a node
   */
  const selectNode = useCallback(
    (id: string | null): void => {
      setSelectedNodeId(id)
      console.log(`[GraphCanvasStore] Node selected: ${id}`)
    },
    [setSelectedNodeId]
  )

  /**
   * Hovers a node
   */
  const hoverNode = useCallback(
    (id: string | null): void => {
      setHoveredNodeId(id)
    },
    [setHoveredNodeId]
  )

  /**
   * Updates graph configuration
   */
  const updateConfig = useCallback(
    (partialConfig: Partial<GraphConfig>): void => {
      setConfig((prev) => ({ ...prev, ...partialConfig }))
      console.log('[GraphCanvasStore] Config updated:', partialConfig)
    },
    [setConfig]
  )

  /**
   * Sets the layout type
   */
  const setLayout = useCallback(
    (layout: GraphLayout): void => {
      updateConfig({ layout })
    },
    [updateConfig]
  )

  /**
   * Sets the zoom level
   */
  const setZoom = useCallback(
    (level: number): void => {
      updateConfig({ zoomLevel: Math.max(0.1, Math.min(3, level)) })
    },
    [updateConfig]
  )

  /**
   * Toggles label visibility
   */
  const toggleLabels = useCallback((): void => {
    setConfig((prev) => ({ ...prev, showLabels: !prev.showLabels }))
  }, [setConfig])

  /**
   * Resets the store to initial state
   */
  const reset = useCallback((): void => {
    setGraphData(emptyGraphData)
    setConfig({ ...defaultConfig })
    setSelectedNodeId(null)
    setHoveredNodeId(null)
    setError(null)
    setIsLoading(false)
  }, [setGraphData, setConfig, setSelectedNodeId, setHoveredNodeId, setError, setIsLoading])

  return useMemo(
    () => ({
      // State
      data,
      nodes: data.nodes,
      edges: data.edges,
      config,
      selectedNodeId,
      selectedNode,
      selectedNodeEdges,
      connectedNodes,
      hoveredNodeId,
      isLoading,
      error,
      nodeCountByType,
      // Actions
      fetchGraphData,
      setGraphData,
      selectNode,
      hoverNode,
      updateConfig,
      setLayout,
      setZoom,
      toggleLabels,
      reset
    }),
    [
      data,
      config,
      selectedNodeId,
      selectedNode,
      selectedNodeEdges,
      connectedNodes,
      hoveredNodeId,
      isLoading,
      error,
      nodeCountByType,
      fetchGraphData,
      setGraphData,
      selectNode,
      hoverNode,
      updateConfig,
      setLayout,
      setZoom,
      toggleLabels,
      reset
    ]
  )
}

/**
 * Hook for graph selection only (performance optimization)
 */
export function useGraphSelection(): UseGraphSelectionReturn {
  const setSelectedNodeId = useSetAtom(selectedNodeIdAtom)
  const selectedNode = useAtomValue(selectedNodeAtom)
  const selectedNodeEdges = useAtomValue(selectedNodeEdgesAtom)
  const connectedNodes = useAtomValue(connectedNodesAtom)

  const selectNode = useCallback(
    (id: string | null): void => {
      setSelectedNodeId(id)
    },
    [setSelectedNodeId]
  )

  return { selectedNode, selectedNodeEdges, connectedNodes, selectNode }
}

/**
 * Hook for reading graph data only
 */
export function useGraphData(): GraphData {
  return useAtomValue(graphDataAtom)
}

/**
 * Hook for reading graph config only
 */
export function useGraphConfig(): GraphConfig {
  return useAtomValue(graphConfigAtom)
}
