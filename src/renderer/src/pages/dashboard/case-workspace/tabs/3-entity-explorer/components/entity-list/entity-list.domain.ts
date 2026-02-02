/**
 * Entity List Domain
 * Types and interfaces for the entity list module
 */

import type { CaseEntity, EntityType } from '../../entity-explorer.domain'

/**
 * Filter criteria for entity list
 */
export interface EntityListFilter {
  searchTerm: string
  types: EntityType[]
  roles: string[]
}

/**
 * Entity list state
 */
export interface EntityListState {
  entities: CaseEntity[]
  filteredEntities: CaseEntity[]
  selectedEntityId: string | null
  filter: EntityListFilter
  isLoading: boolean
  error: string | null
}

/**
 * Entity list actions interface
 */
export interface EntityListActions {
  setEntities: (entities: CaseEntity[]) => void
  setFilter: (filter: Partial<EntityListFilter>) => void
  selectEntity: (id: string | null) => void
  clearFilter: () => void
}

// Re-export for convenience
export type { CaseEntity, EntityType }
