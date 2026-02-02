export type EntityType = 'Person' | 'Org' | 'Location' | 'Event'

export interface CaseEntity {
  id: string
  name: string
  type: EntityType
  role: string
  description?: string
  avatar?: string | null
}

export interface EntityRelation {
  fromIndex: number
  toIndex: number
  label: string
}

export interface GraphData {
  nodes: CaseEntity[]
  links: EntityRelation[]
}
