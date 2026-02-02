/**
 * Document List Store
 * Manages state and actions for the document list component using Jotai
 */

import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useMemo } from 'react'
import type {
  CaseDocument,
  DocumentListFilter,
  DocumentType,
  DocumentStatus
} from './document-list.domain'
import { documentListRepository } from './document-list.repository'

/**
 * Default filter state
 */
const defaultFilter: DocumentListFilter = {
  searchTerm: '',
  types: [],
  statuses: []
}

// ============================================================================
// ATOMS - Base state atoms
// ============================================================================

/** Atom for storing all documents */
export const documentsAtom = atom<CaseDocument[]>([])

/** Atom for active document ID */
export const activeDocumentIdAtom = atom<string | null>(null)

/** Atom for filter state */
export const filterAtom = atom<DocumentListFilter>({ ...defaultFilter })

/** Atom for loading state */
export const isLoadingAtom = atom<boolean>(false)

/** Atom for uploading state */
export const isUploadingAtom = atom<boolean>(false)

/** Atom for error state */
export const errorAtom = atom<string | null>(null)

// ============================================================================
// DERIVED ATOMS - Computed state
// ============================================================================

/**
 * Derived atom for filtered documents
 */
export const filteredDocumentsAtom = atom((get) => {
  const documents = get(documentsAtom)
  const filter = get(filterAtom)

  let result = [...documents]

  // Apply search term filter
  if (filter.searchTerm) {
    const term = filter.searchTerm.toLowerCase()
    result = result.filter((doc) => doc.name.toLowerCase().includes(term))
  }

  // Apply type filter
  if (filter.types.length > 0) {
    result = result.filter((doc) => filter.types.includes(doc.type))
  }

  // Apply status filter
  if (filter.statuses.length > 0) {
    result = result.filter((doc) => filter.statuses.includes(doc.status))
  }

  return result
})

/**
 * Derived atom for currently active document
 */
export const activeDocumentAtom = atom((get) => {
  const documents = get(documentsAtom)
  const activeId = get(activeDocumentIdAtom)
  if (!activeId) return null
  return documents.find((doc) => doc.id === activeId) || null
})

/**
 * Derived atom for document count by status
 */
export const documentCountByStatusAtom = atom((get) => {
  const documents = get(documentsAtom)
  const counts: Record<DocumentStatus, number> = {
    Procesado: 0,
    Pendiente: 0,
    Error: 0
  }

  documents.forEach((doc) => {
    counts[doc.status]++
  })

  return counts
})

/**
 * Derived atom for document count by type
 */
export const documentCountByTypeAtom = atom((get) => {
  const documents = get(documentsAtom)
  const counts: Record<DocumentType, number> = {
    PDF: 0,
    DOCX: 0,
    JPG: 0,
    TXT: 0
  }

  documents.forEach((doc) => {
    counts[doc.type]++
  })

  return counts
})

// ============================================================================
// TYPES - Hook return types
// ============================================================================

/**
 * Return type for useDocumentList hook
 */
export interface UseDocumentListReturn {
  // State
  documents: CaseDocument[]
  filteredDocuments: CaseDocument[]
  activeDocumentId: string | null
  activeDocument: CaseDocument | null
  filter: DocumentListFilter
  isLoading: boolean
  isUploading: boolean
  error: string | null
  documentCountByStatus: Record<DocumentStatus, number>
  documentCountByType: Record<DocumentType, number>
  // Actions
  fetchDocuments: (caseId?: string) => Promise<void>
  setActiveDocument: (id: string | null) => void
  uploadDocument: (file: File) => Promise<void>
  deleteDocument: (id: string) => Promise<void>
  updateFilter: (filter: Partial<DocumentListFilter>) => void
  setSearchTerm: (term: string) => void
  clearFilter: () => void
  reset: () => void
}

// ============================================================================
// HOOKS - Custom hooks for document list management
// ============================================================================

/**
 * Hook for managing document list state and actions
 */
export function useDocumentList(caseId?: string): UseDocumentListReturn {
  const [documents, setDocuments] = useAtom(documentsAtom)
  const filteredDocuments = useAtomValue(filteredDocumentsAtom)
  const [activeDocumentId, setActiveDocumentId] = useAtom(activeDocumentIdAtom)
  const activeDocument = useAtomValue(activeDocumentAtom)
  const [filter, setFilter] = useAtom(filterAtom)
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom)
  const [isUploading, setIsUploading] = useAtom(isUploadingAtom)
  const [error, setError] = useAtom(errorAtom)
  const documentCountByStatus = useAtomValue(documentCountByStatusAtom)
  const documentCountByType = useAtomValue(documentCountByTypeAtom)

  /**
   * Fetches documents for a case
   */
  const fetchDocuments = useCallback(
    async (id: string = caseId || 'default-case'): Promise<void> => {
      console.log(`[DocumentListStore] Fetching documents for case: ${id}`)
      setIsLoading(true)
      setError(null)

      try {
        const docs = await documentListRepository.getDocuments(id)
        setDocuments(docs)
        // Set first document as active if none selected
        if (docs.length > 0 && !activeDocumentId) {
          setActiveDocumentId(docs[0].id)
        }
        console.log(`[DocumentListStore] Loaded ${docs.length} documents`)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error fetching documents'
        setError(message)
        console.error('[DocumentListStore] Error:', message)
      } finally {
        setIsLoading(false)
      }
    },
    [caseId, setDocuments, setError, setIsLoading, activeDocumentId, setActiveDocumentId]
  )

  /**
   * Sets the active document
   */
  const setActiveDocument = useCallback(
    (id: string | null): void => {
      setActiveDocumentId(id)
      console.log(`[DocumentListStore] Active document: ${id}`)
    },
    [setActiveDocumentId]
  )

  /**
   * Uploads a new document
   */
  const uploadDocument = useCallback(
    async (file: File): Promise<void> => {
      console.log(`[DocumentListStore] Uploading: ${file.name}`)
      setIsUploading(true)
      setError(null)

      try {
        const newDoc = await documentListRepository.uploadDocument(file)
        setDocuments((prev) => [...prev, newDoc])
        console.log(`[DocumentListStore] Uploaded: ${newDoc.name}`)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error uploading document'
        setError(message)
        console.error('[DocumentListStore] Upload error:', message)
      } finally {
        setIsUploading(false)
      }
    },
    [setDocuments, setError, setIsUploading]
  )

  /**
   * Deletes a document
   */
  const deleteDocument = useCallback(
    async (id: string): Promise<void> => {
      console.log(`[DocumentListStore] Deleting document: ${id}`)

      try {
        await documentListRepository.deleteDocument(id)
        setDocuments((prev) => prev.filter((doc) => doc.id !== id))

        // Clear active if deleted
        if (activeDocumentId === id) {
          setActiveDocumentId(null)
        }
        console.log(`[DocumentListStore] Deleted document: ${id}`)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error deleting document'
        setError(message)
        console.error('[DocumentListStore] Delete error:', message)
      }
    },
    [setDocuments, activeDocumentId, setActiveDocumentId, setError]
  )

  /**
   * Updates the filter
   */
  const updateFilter = useCallback(
    (partialFilter: Partial<DocumentListFilter>): void => {
      setFilter((prev) => ({ ...prev, ...partialFilter }))
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
   * Clears all filters
   */
  const clearFilter = useCallback((): void => {
    setFilter({ ...defaultFilter })
  }, [setFilter])

  /**
   * Resets the store to initial state
   */
  const reset = useCallback((): void => {
    setDocuments([])
    setActiveDocumentId(null)
    setFilter({ ...defaultFilter })
    setError(null)
    setIsLoading(false)
    setIsUploading(false)
  }, [setDocuments, setActiveDocumentId, setFilter, setError, setIsLoading, setIsUploading])

  return useMemo(
    () => ({
      // State
      documents,
      filteredDocuments,
      activeDocumentId,
      activeDocument,
      filter,
      isLoading,
      isUploading,
      error,
      documentCountByStatus,
      documentCountByType,
      // Actions
      fetchDocuments,
      setActiveDocument,
      uploadDocument,
      deleteDocument,
      updateFilter,
      setSearchTerm,
      clearFilter,
      reset
    }),
    [
      documents,
      filteredDocuments,
      activeDocumentId,
      activeDocument,
      filter,
      isLoading,
      isUploading,
      error,
      documentCountByStatus,
      documentCountByType,
      fetchDocuments,
      setActiveDocument,
      uploadDocument,
      deleteDocument,
      updateFilter,
      setSearchTerm,
      clearFilter,
      reset
    ]
  )
}

/**
 * Hook for reading active document only
 */
export function useActiveDocument(): CaseDocument | null {
  return useAtomValue(activeDocumentAtom)
}

/**
 * Hook for document selection actions only
 */
export function useDocumentSelection(): {
  activeDocument: CaseDocument | null
  setActiveDocument: (id: string | null) => void
} {
  const setActiveDocumentId = useSetAtom(activeDocumentIdAtom)
  const activeDocument = useAtomValue(activeDocumentAtom)

  const setActiveDocument = useCallback(
    (id: string | null): void => {
      setActiveDocumentId(id)
    },
    [setActiveDocumentId]
  )

  return { activeDocument, setActiveDocument }
}
