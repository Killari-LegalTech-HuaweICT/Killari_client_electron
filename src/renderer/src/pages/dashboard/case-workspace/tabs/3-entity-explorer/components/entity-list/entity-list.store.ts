/**
 * Entity List Store
 * Manages state and actions for the entity list component using Jotai
 */

import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useMemo } from 'react'
import type { CaseEntity, EntityListFilter } from './entity-list.domain'
import { entityListRepository } from './entity-list.repository'

/**
 * Default filter state
 */
const defaultFilter: EntityListFilter = {
  searchTerm: '',
  types: [],
  roles: []
}

// ============================================================================
// ATOMS - Base state atoms
// ============================================================================

/** Atom for storing all entities */
export const entitiesAtom = atom<CaseEntity[]>([])

/** Atom for the selected entity ID */
export const selectedEntityIdAtom = atom<string | null>(null)

/** Atom for filter state */
export const filterAtom = atom<EntityListFilter>({ ...defaultFilter })

/** Atom for loading state */
export const isLoadingAtom = atom<boolean>(false)

/** Atom for error state */
export const errorAtom = atom<string | null>(null)

// ============================================================================
// DERIVED ATOMS - Computed state
// ============================================================================

/**
 * Derived atom for filtered entities based on current filter
 */
export const filteredEntitiesAtom = atom((get) => {
  const entities = get(entitiesAtom)
  const filter = get(filterAtom)

  let result = [...entities]

  // Apply search term filter
  if (filter.searchTerm) {
    const term = filter.searchTerm.toLowerCase()
    result = result.filter(
      (entity) =>
        entity.name.toLowerCase().includes(term) || entity.role.toLowerCase().includes(term)
    )
  }

  // Apply type filter
  if (filter.types.length > 0) {
    result = result.filter((entity) => filter.types.includes(entity.type))
  }

  // Apply role filter
  if (filter.roles.length > 0) {
    result = result.filter((entity) => filter.roles.includes(entity.role))
  }

  return result
})

/**
 * Derived atom for the currently selected entity
 */
export const selectedEntityAtom = atom((get) => {
  const entities = get(entitiesAtom)
  const selectedId = get(selectedEntityIdAtom)
  if (!selectedId) return null
  return entities.find((e) => e.id === selectedId) || null
})

/**
 * Derived atom for available roles
 */
export const availableRolesAtom = atom((get) => {
  const entities = get(entitiesAtom)
  return [...new Set(entities.map((e) => e.role))]
})

// ============================================================================
// TYPES - Hook return types
// ============================================================================

/**
 * Return type for useEntityList hook
 */
export interface UseEntityListReturn {
  // State
  entities: CaseEntity[]
  filteredEntities: CaseEntity[]
  selectedEntityId: string | null
  selectedEntity: CaseEntity | null
  filter: EntityListFilter
  isLoading: boolean
  error: string | null
  availableRoles: string[]
  // Actions
  setEntities: (entities: CaseEntity[]) => void
  fetchEntities: (id?: string) => Promise<void>
  updateFilter: (partialFilter: Partial<EntityListFilter>) => void
  setSearchTerm: (term: string) => void
  selectEntity: (id: string | null) => void
  clearFilter: () => void
  reset: () => void
}

/**
 * Return type for useEntitySelection hook
 */
export interface UseEntitySelectionReturn {
  selectedEntity: CaseEntity | null
  selectEntity: (id: string | null) => void
}

// ============================================================================
// HOOKS - Custom hooks for entity list management
// ============================================================================

/**
 * Hook for managing entity list state and actions
 */
export function useEntityList(caseId?: string): UseEntityListReturn {
  const [entities, setEntities] = useAtom(entitiesAtom)
  const filteredEntities = useAtomValue(filteredEntitiesAtom)
  const [selectedEntityId, setSelectedEntityId] = useAtom(selectedEntityIdAtom)
  const selectedEntity = useAtomValue(selectedEntityAtom)
  const [filter, setFilter] = useAtom(filterAtom)
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom)
  const [error, setError] = useAtom(errorAtom)
  const availableRoles = useAtomValue(availableRolesAtom)

  /**
   * Fetches entities for a case
   */
  const fetchEntities = useCallback(
    async (id: string = caseId || 'default-case'): Promise<void> => {
      console.log(`[EntityListStore] Fetching entities for case: ${id}`)
      setIsLoading(true)
      setError(null)

      try {
        const fetchedEntities = await entityListRepository.getEntities(id)
        setEntities(fetchedEntities)
        console.log(`[EntityListStore] Loaded ${fetchedEntities.length} entities`)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error fetching entities'
        setError(message)
        console.error('[EntityListStore] Error:', message)
      } finally {
        setIsLoading(false)
      }
    },
    [caseId, setEntities, setError, setIsLoading]
  )

  /**
   * Updates the filter
   */
  const updateFilter = useCallback(
    (partialFilter: Partial<EntityListFilter>): void => {
      setFilter((prev) => ({ ...prev, ...partialFilter }))
      console.log('[EntityListStore] Filter applied:', partialFilter)
    },
    [setFilter]
  )

  /**
   * Sets the search term
   */
  const setSearchTerm = useCallback(
    (term: string): void => {
      updateFilter({ searchTerm: term })
    },
    [updateFilter]
  )

  /**
   * Selects an entity
   */
  const selectEntity = useCallback(
    (id: string | null): void => {
      setSelectedEntityId(id)
      console.log(`[EntityListStore] Entity selected: ${id}`)
    },
    [setSelectedEntityId]
  )

  /**
   * Clears all filters
   */
  const clearFilter = useCallback((): void => {
    setFilter({ ...defaultFilter })
    console.log('[EntityListStore] Filters cleared')
  }, [setFilter])

  /**
   * Resets the store to initial state
   */
  const reset = useCallback((): void => {
    setEntities([])
    setSelectedEntityId(null)
    setFilter({ ...defaultFilter })
    setError(null)
    setIsLoading(false)
  }, [setEntities, setSelectedEntityId, setFilter, setError, setIsLoading])

  return useMemo(
    () => ({
      // State
      entities,
      filteredEntities,
      selectedEntityId,
      selectedEntity,
      filter,
      isLoading,
      error,
      availableRoles,
      // Actions
      setEntities,
      fetchEntities,
      updateFilter,
      setSearchTerm,
      selectEntity,
      clearFilter,
      reset
    }),
    [
      entities,
      filteredEntities,
      selectedEntityId,
      selectedEntity,
      filter,
      isLoading,
      error,
      availableRoles,
      setEntities,
      fetchEntities,
      updateFilter,
      setSearchTerm,
      selectEntity,
      clearFilter,
      reset
    ]
  )
}

/**
 * Hook for reading filtered entities only (performance optimization)
 */
export function useFilteredEntities(): CaseEntity[] {
  return useAtomValue(filteredEntitiesAtom)
}

/**
 * Hook for reading selected entity only
 */
export function useSelectedEntity(): CaseEntity | null {
  return useAtomValue(selectedEntityAtom)
}

/**
 * Hook for entity selection actions only
 */
export function useEntitySelection(): UseEntitySelectionReturn {
  const setSelectedEntityId = useSetAtom(selectedEntityIdAtom)
  const selectedEntity = useAtomValue(selectedEntityAtom)

  const selectEntity = useCallback(
    (id: string | null) => {
      setSelectedEntityId(id)
    },
    [setSelectedEntityId]
  )

  return { selectedEntity, selectEntity }
}
