import { CaseFile } from '../../../entities/case-file/model/case-file.domain'

// Definimos la interfaz que coincide con tus datos Mock
export interface CaseItem {
  id: string
  title: string
  type: string
  status: string
  updated: string
  image: string
}

// Definimos los datos mock aquí (simulando una respuesta de base de datos)
const MOCK_CASES: CaseItem[] = [
  {
    id: 'CAS-2025-001',
    title: 'Caso: La Rinconada',
    type: 'Homicidio Calificado',
    status: 'En Proceso',
    updated: 'Hace 2 horas',
    image:
      'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'CAS-2025-004',
    title: 'Op. Mercurio Rojo',
    type: 'Lavado de Activos',
    status: 'Análisis IA',
    updated: 'Hace 5 horas',
    image:
      'https://images.unsplash.com/photo-1555881400-74d7acaacd81?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'CAS-2025-009',
    title: 'Expediente Vallejo',
    type: 'Corrupción',
    status: 'Cerrado',
    updated: 'Ayer',
    image:
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80'
  }
]

// El store mantiene la lista
// Nota: Hacemos un cast compatible o usamos la interfaz CaseItem directamente si CaseFile es muy distinto
export const caseListStore = {
  list: MOCK_CASES as unknown as CaseFile[], // Mantenemos compatibilidad con tu dominio
  rawList: MOCK_CASES // Acceso directo tipado para UI components simples
}

export function setCaseList(list: CaseFile[]): void {
  caseListStore.list = list
}
