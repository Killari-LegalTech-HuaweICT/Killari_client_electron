/**
 * Repository layer for Recommendations
 * Handles all API communication and data transformation
 */

import type { Recommendation, GeneratedOficio } from './recommendations.domain'

// Mock data for development
const MOCK_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'rec-1',
    title: 'Solicitar levantamiento del secreto de comunicaciones',
    content:
      'Se ha detectado una alta frecuencia de llamadas entre el imputado y el número desconocido +51 999***123 en los momentos previos al evento.',
    priority: 'high',
    status: 'pending',
    category: 'investigation',
    createdAt: '2026-02-01T10:00:00Z',
    sourceDocumentIds: ['doc-1', 'doc-2']
  },
  {
    id: 'rec-2',
    title: 'Citar a Testigo Clave: María Gómez',
    content:
      'Su declaración contradice parcialmente la evidencia física encontrada en la escena. Se sugiere interrogatorio complementario.',
    priority: 'medium',
    status: 'pending',
    category: 'witness',
    createdAt: '2026-02-01T10:15:00Z',
    sourceDocumentIds: ['doc-3']
  },
  {
    id: 'rec-3',
    title: 'Revisión de cámaras de seguridad municipales',
    content:
      'Las cámaras aledañas (C-102 y C-103) podrían haber captado la ruta de escape del sospechoso.',
    priority: 'medium',
    status: 'pending',
    category: 'evidence',
    createdAt: '2026-02-01T10:30:00Z'
  },
  {
    id: 'rec-4',
    title: 'Análisis toxicológico de la víctima',
    content: 'Protocolo estándar para descartar influencia de sustancias en el momento del suceso.',
    priority: 'low',
    status: 'pending',
    category: 'procedural',
    createdAt: '2026-02-01T10:45:00Z'
  }
]

/**
 * Simulates API delay for development
 */
const simulateDelay = (ms: number = 1000): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Repository interface for recommendations
 */
export const recommendationsRepository = {
  /**
   * Fetches recommendations for a specific case
   */
  async getRecommendations(caseId: string): Promise<Recommendation[]> {
    console.log(`[RecommendationsRepo] Fetching recommendations for case: ${caseId}`)
    await simulateDelay(800)

    // In production, this would be an API call
    // return api.invoke('recommendations:get', { caseId })
    return [...MOCK_RECOMMENDATIONS]
  },

  /**
   * Generates an automatic oficio for a recommendation
   */
  async generateOficio(recommendation: Recommendation): Promise<GeneratedOficio> {
    console.log(`[RecommendationsRepo] Generating oficio for: ${recommendation.title}`)
    await simulateDelay(1500)

    // In production, this would call the AI service
    // return api.invoke('recommendations:generate-oficio', { recommendationId })

    const oficio: GeneratedOficio = {
      id: `oficio-${Date.now()}`,
      recommendationId: recommendation.id,
      title: `Oficio - ${recommendation.title}`,
      content: generateMockOficioContent(recommendation),
      generatedAt: new Date().toISOString(),
      status: 'draft'
    }

    return oficio
  },

  /**
   * Updates the status of a recommendation
   */
  async updateStatus(id: string, status: Recommendation['status']): Promise<{ success: boolean }> {
    console.log(`[RecommendationsRepo] Updating recommendation ${id} status to: ${status}`)
    await simulateDelay(300)

    // In production: api.invoke('recommendations:update-status', { id, status })
    return { success: true }
  },

  /**
   * Dismisses a recommendation
   */
  async dismiss(id: string): Promise<{ success: boolean }> {
    console.log(`[RecommendationsRepo] Dismissing recommendation: ${id}`)
    await simulateDelay(300)

    // In production: api.invoke('recommendations:dismiss', { id })
    return { success: true }
  }
}

/**
 * Helper function to generate mock oficio content
 */
function generateMockOficioContent(recommendation: Recommendation): string {
  return `
OFICIO N° ${Math.floor(Math.random() * 1000)}-2026-MP-FN

ASUNTO: ${recommendation.title}

Mediante el presente, me dirijo a usted con la finalidad de solicitar su colaboración
en el marco de la investigación que se viene desarrollando en este Despacho Fiscal.

FUNDAMENTOS:
${recommendation.content}

Por lo expuesto, agradeceré se sirva disponer lo conveniente para la atención
del presente requerimiento, en el plazo de ley.

Atentamente,

_______________________
FISCAL PROVINCIAL
  `.trim()
}

export default recommendationsRepository
