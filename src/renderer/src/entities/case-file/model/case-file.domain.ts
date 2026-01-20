export interface Evidence {
  id: string
  type: string
  description?: string
}

export interface CaseFile {
  id: string
  title: string
  description?: string
  createdAt: string
  evidences?: Evidence[]
}
