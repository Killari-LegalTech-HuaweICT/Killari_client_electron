import { CaseEntity, GraphData } from './entity-explorer.domain'

const MOCK_ENTITIES: CaseEntity[] = [
  { id: '1', name: 'Juan Pérez', type: 'Person', role: 'Imputado' },
  { id: '2', name: 'Empresa X SAC', type: 'Org', role: 'Involucrado' },
  { id: '3', name: 'Av. Arequipa 505', type: 'Location', role: 'Lugar de los hechos' },
  { id: '4', name: 'María Gómez', type: 'Person', role: 'Testigo' },
  { id: '5', name: 'Robo Agravado', type: 'Event', role: 'Delito imputado' }
]

const MOCK_GRAPH: GraphData = {
  nodes: MOCK_ENTITIES,
  links: [
    { fromIndex: 0, toIndex: 1, label: 'Trabaja en' },
    { fromIndex: 0, toIndex: 2, label: 'Visto en' },
    { fromIndex: 3, toIndex: 0, label: 'Identificó a' },
    { fromIndex: 0, toIndex: 4, label: 'Acusado de' }
  ]
}

export const entityExplorerStore = {
  data: { ...MOCK_GRAPH }
}

export const entityActions = {
  loadGraph: async (): Promise<void> => {
    console.log('[EntityExplorer] Cargando grafo de relaciones (Huawei GES)...')
    await new Promise((r) => setTimeout(r, 800))
    console.log('[EntityExplorer] Grafo cargado con éxito.')
  },

  selectEntity: (id: string): void => {
    console.log(`[EntityExplorer] Entidad seleccionada: ${id}. Buscando relaciones...`)
  },

  addEntity: (entity: Omit<CaseEntity, 'id'>): void => {
    console.log(`[EntityExplorer] Añadiendo entidad manual: ${entity.name}`)
    const newEntity = { ...entity, id: Date.now().toString() }
    entityExplorerStore.data.nodes.push(newEntity)
  }
}
