/**
 * Graph Canvas Repository
 * Handles data fetching and persistence for graph canvas
 */

import type { GraphData, GraphNode, GraphEdge } from './graph-canvas.domain'

/**
 * Repository interface for graph canvas operations
 */
export interface IGraphCanvasRepository {
  getGraphData(caseId: string): Promise<GraphData>
  getNodeConnections(nodeId: string): Promise<GraphEdge[]>
}

/**
 * Implementation of graph canvas repository
 */
class GraphCanvasRepository implements IGraphCanvasRepository {
  /**
   * Fetches graph data for a case
   */
  async getGraphData(caseId: string): Promise<GraphData> {
    console.log(`[GraphCanvasRepository] Fetching graph data for case: ${caseId}`)

    // TODO: Replace with actual API call to Huawei GES
    // const response = await fetch(`${this.baseUrl}/graph?caseId=${caseId}`)
    // return response.json()

    // Simulated delay for mock data
    await new Promise((resolve) => setTimeout(resolve, 500))

    return this.getMockGraphData()
  }

  /**
   * Fetches connections for a specific node
   */
  async getNodeConnections(nodeId: string): Promise<GraphEdge[]> {
    console.log(`[GraphCanvasRepository] Fetching connections for node: ${nodeId}`)

    const data = await this.getMockGraphData()
    return data.edges.filter((edge) => edge.source === nodeId || edge.target === nodeId)
  }

  /**
   * Mock graph data for development
   */
  private getMockGraphData(): GraphData {
    const nodes: GraphNode[] = [
      { id: '1', label: 'Juan Pérez', type: 'Person', x: 100, y: 100 },
      { id: '2', label: 'Empresa X SAC', type: 'Org', x: 250, y: 50 },
      { id: '3', label: 'Av. Arequipa 505', type: 'Location', x: 400, y: 100 },
      { id: '4', label: 'María Gómez', type: 'Person', x: 150, y: 250 },
      { id: '5', label: 'Robo Agravado', type: 'Event', x: 300, y: 200 },
      { id: '6', label: 'Carlos Rodríguez', type: 'Person', x: 450, y: 250 },
      { id: '7', label: 'Banco Nacional', type: 'Org', x: 350, y: 350 }
    ]

    const edges: GraphEdge[] = [
      { id: 'e1', source: '1', target: '2', label: 'empleado de' },
      { id: 'e2', source: '1', target: '5', label: 'imputado en' },
      { id: 'e3', source: '5', target: '3', label: 'ocurrió en' },
      { id: 'e4', source: '4', target: '5', label: 'testigo de' },
      { id: 'e5', source: '6', target: '5', label: 'víctima de' },
      { id: 'e6', source: '7', target: '5', label: 'afectado por' },
      { id: 'e7', source: '2', target: '7', label: 'cliente de' }
    ]

    return { nodes, edges }
  }
}

// Singleton instance
export const graphCanvasRepository = new GraphCanvasRepository()
