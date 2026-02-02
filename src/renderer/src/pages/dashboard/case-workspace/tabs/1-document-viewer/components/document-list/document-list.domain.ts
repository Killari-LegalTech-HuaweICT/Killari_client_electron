/**
 * Document List Domain
 * Types and interfaces for the document list module
 */

/**
 * Document type options
 */
export type DocumentType = 'PDF' | 'DOCX' | 'JPG' | 'TXT'

/**
 * Document processing status
 */
export type DocumentStatus = 'Procesado' | 'Pendiente' | 'Error'

/**
 * Case document representation
 */
export interface CaseDocument {
  id: string
  name: string
  type: DocumentType
  pages: number
  status: DocumentStatus
  uploadDate: string
  url?: string
}

/**
 * Document list filter options
 */
export interface DocumentListFilter {
  searchTerm: string
  types: DocumentType[]
  statuses: DocumentStatus[]
}

/**
 * Document list state
 */
export interface DocumentListState {
  documents: CaseDocument[]
  filteredDocuments: CaseDocument[]
  activeDocumentId: string | null
  filter: DocumentListFilter
  isLoading: boolean
  isUploading: boolean
  error: string | null
}
