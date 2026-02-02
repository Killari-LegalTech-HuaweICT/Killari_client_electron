/**
 * Entity List Repository
 * Handles data fetching and persistence for entity list
 */

import type { CaseEntity } from './entity-list.domain'

/**
 * Repository interface for entity list operations
 */
export interface IEntityListRepository {
  getEntities(caseId: string): Promise<CaseEntity[]>
  searchEntities(caseId: string, query: string): Promise<CaseEntity[]>
  getEntityById(id: string): Promise<CaseEntity | null>
}

/**
 * Implementation of entity list repository
 */
class EntityListRepository implements IEntityListRepository {
  /**
   * Fetches all entities for a case
   */
  async getEntities(caseId: string): Promise<CaseEntity[]> {
    console.log(`[EntityListRepository] Fetching entities for case: ${caseId}`)

    // TODO: Replace with actual API call
    // const response = await fetch(`${this.baseUrl}?caseId=${caseId}`)
    // return response.json()

    // Simulated delay for mock data
    await new Promise((resolve) => setTimeout(resolve, 500))

    return this.getMockEntities()
  }

  /**
   * Searches entities by query
   */
  async searchEntities(caseId: string, query: string): Promise<CaseEntity[]> {
    console.log(`[EntityListRepository] Searching entities: "${query}" in case: ${caseId}`)

    const entities = await this.getEntities(caseId)
    const lowerQuery = query.toLowerCase()

    return entities.filter(
      (entity) =>
        entity.name.toLowerCase().includes(lowerQuery) ||
        entity.role.toLowerCase().includes(lowerQuery)
    )
  }

  /**
   * Gets a single entity by ID
   */
  async getEntityById(id: string): Promise<CaseEntity | null> {
    console.log(`[EntityListRepository] Fetching entity: ${id}`)

    const entities = await this.getMockEntities()
    return entities.find((e) => e.id === id) || null
  }

  /**
   * Mock data for development
   */
  private getMockEntities(): CaseEntity[] {
    return [
      { id: '1', name: 'Juan Pérez', type: 'Person', role: 'Imputado' },
      { id: '2', name: 'Empresa X SAC', type: 'Org', role: 'Involucrado' },
      { id: '3', name: 'Av. Arequipa 505', type: 'Location', role: 'Lugar de los hechos' },
      { id: '4', name: 'María Gómez', type: 'Person', role: 'Testigo' },
      { id: '5', name: 'Robo Agravado', type: 'Event', role: 'Delito imputado' },
      { id: '6', name: 'Carlos Rodríguez', type: 'Person', role: 'Víctima' },
      { id: '7', name: 'Banco Nacional', type: 'Org', role: 'Afectado' }
    ]
  }
}

// Singleton instance
export const entityListRepository = new EntityListRepository()
