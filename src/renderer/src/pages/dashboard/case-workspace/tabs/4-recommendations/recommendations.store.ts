/**
 * Recommendations Store
 * Manages state and actions for the recommendations module
 */

import type {
  Recommendation,
  GeneratedOficio,
  RecommendationsState,
  RecommendationStatus
} from './recommendations.domain'
import recommendationsRepository from './recommendations.repository'

// Initial state
const initialState: RecommendationsState = {
  recommendations: [],
  generatedOficios: [],
  isLoading: false,
  isGeneratingOficio: false,
  error: null,
  selectedRecommendationId: null
}

// Store state (using simple reactive pattern - can be migrated to Zustand/Jotai)
export const recommendationsStore: RecommendationsState = { ...initialState }

/**
 * Store actions for recommendations management
 */
export const recommendationsActions = {
  /**
   * Fetches recommendations for a case from the repository
   */
  async fetchRecommendations(caseId: string): Promise<void> {
    console.log(`[RecommendationsStore] Fetching recommendations for case: ${caseId}`)
    recommendationsStore.isLoading = true
    recommendationsStore.error = null

    try {
      const recommendations = await recommendationsRepository.getRecommendations(caseId)
      recommendationsStore.recommendations = recommendations
      console.log(`[RecommendationsStore] Loaded ${recommendations.length} recommendations`)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error fetching recommendations'
      recommendationsStore.error = message
      console.error('[RecommendationsStore] Error:', message)
    } finally {
      recommendationsStore.isLoading = false
    }
  },

  /**
   * Generates an automatic oficio for a recommendation
   */
  async generateOficio(recommendationId: string): Promise<GeneratedOficio | null> {
    const recommendation = recommendationsStore.recommendations.find(
      (r) => r.id === recommendationId
    )
    if (!recommendation) {
      console.error(`[RecommendationsStore] Recommendation not found: ${recommendationId}`)
      return null
    }

    console.log(`[RecommendationsStore] Generating oficio for: ${recommendation.title}`)
    recommendationsStore.isGeneratingOficio = true

    try {
      const oficio = await recommendationsRepository.generateOficio(recommendation)
      recommendationsStore.generatedOficios.push(oficio)

      // Update recommendation status
      this.updateRecommendationStatus(recommendationId, 'in_progress')

      console.log(`[RecommendationsStore] Oficio generated: ${oficio.id}`)
      return oficio
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error generating oficio'
      recommendationsStore.error = message
      console.error('[RecommendationsStore] Error:', message)
      return null
    } finally {
      recommendationsStore.isGeneratingOficio = false
    }
  },

  /**
   * Updates the status of a recommendation
   */
  updateRecommendationStatus(id: string, status: RecommendationStatus): void {
    const index = recommendationsStore.recommendations.findIndex((r) => r.id === id)
    if (index !== -1) {
      recommendationsStore.recommendations[index] = {
        ...recommendationsStore.recommendations[index],
        status,
        updatedAt: new Date().toISOString()
      }
      console.log(`[RecommendationsStore] Updated recommendation ${id} status to: ${status}`)

      // Sync with backend
      recommendationsRepository.updateStatus(id, status).catch(console.error)
    }
  },

  /**
   * Dismisses a recommendation
   */
  dismissRecommendation(id: string): void {
    this.updateRecommendationStatus(id, 'dismissed')
    recommendationsRepository.dismiss(id).catch(console.error)
  },

  /**
   * Selects a recommendation for detail view
   */
  selectRecommendation(id: string | null): void {
    recommendationsStore.selectedRecommendationId = id
  },

  /**
   * Clears any error state
   */
  clearError(): void {
    recommendationsStore.error = null
  },

  /**
   * Gets recommendations filtered by status
   */
  getRecommendationsByStatus(status: RecommendationStatus): Recommendation[] {
    return recommendationsStore.recommendations.filter((r) => r.status === status)
  },

  /**
   * Gets pending recommendations count
   */
  getPendingCount(): number {
    return recommendationsStore.recommendations.filter((r) => r.status === 'pending').length
  },

  /**
   * Gets recommendations grouped by priority
   */
  getGroupedByPriority(): Record<Recommendation['priority'], Recommendation[]> {
    return {
      high: recommendationsStore.recommendations.filter((r) => r.priority === 'high'),
      medium: recommendationsStore.recommendations.filter((r) => r.priority === 'medium'),
      low: recommendationsStore.recommendations.filter((r) => r.priority === 'low')
    }
  }
}

// Legacy export for backward compatibility
export function addRecommendation(r: Recommendation): void {
  recommendationsStore.recommendations.push(r)
}
