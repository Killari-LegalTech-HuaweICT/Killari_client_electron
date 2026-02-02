/**
 * Domain types for the Recommendations module
 * Defines the core entities and value objects
 */

export type RecommendationPriority = 'high' | 'medium' | 'low'

export type RecommendationStatus = 'pending' | 'in_progress' | 'completed' | 'dismissed'

export type RecommendationCategory =
  | 'investigation'
  | 'witness'
  | 'evidence'
  | 'documentation'
  | 'procedural'

export interface Recommendation {
  id: string
  title: string
  content: string
  priority: RecommendationPriority
  status: RecommendationStatus
  category: RecommendationCategory
  createdAt: string
  updatedAt?: string
  sourceDocumentIds?: string[]
  assignedTo?: string
}

export interface GeneratedOficio {
  id: string
  recommendationId: string
  title: string
  content: string
  generatedAt: string
  status: 'draft' | 'reviewed' | 'sent'
}

export interface RecommendationsState {
  recommendations: Recommendation[]
  generatedOficios: GeneratedOficio[]
  isLoading: boolean
  isGeneratingOficio: boolean
  error: string | null
  selectedRecommendationId: string | null
}

export interface RecommendationsActions {
  fetchRecommendations: (caseId: string) => Promise<void>
  generateOficio: (recommendationId: string) => Promise<GeneratedOficio | null>
  updateRecommendationStatus: (id: string, status: RecommendationStatus) => void
  dismissRecommendation: (id: string) => void
  selectRecommendation: (id: string | null) => void
  clearError: () => void
}

export type RecommendationsStore = RecommendationsState & RecommendationsActions
