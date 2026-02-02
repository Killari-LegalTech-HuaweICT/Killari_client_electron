/**
 * Document Main Store
 * Manages state and actions for the document main viewer using Jotai
 */

import { atom, useAtom, useAtomValue } from 'jotai'
import { useCallback, useMemo } from 'react'
import type {
  CaseDocument,
  DocumentViewerConfig,
  DocumentAnnotation,
  DocumentViewMode,
  ZoomLevel
} from './document-main.domain'
import { documentMainRepository } from './document-main.repository'

/**
 * Default viewer configuration
 */
const defaultConfig: DocumentViewerConfig = {
  viewMode: 'preview',
  zoomLevel: 'fit',
  showThumbnails: false,
  showAnnotations: true,
  currentPage: 1,
  totalPages: 1
}

// ============================================================================
// ATOMS - Base state atoms
// ============================================================================

/** Atom for current document */
export const currentDocumentAtom = atom<CaseDocument | null>(null)

/** Atom for viewer configuration */
export const viewerConfigAtom = atom<DocumentViewerConfig>({ ...defaultConfig })

/** Atom for document annotations */
export const annotationsAtom = atom<DocumentAnnotation[]>([])

/** Atom for loading state */
export const isLoadingAtom = atom<boolean>(false)

/** Atom for error state */
export const errorAtom = atom<string | null>(null)

// ============================================================================
// DERIVED ATOMS - Computed state
// ============================================================================

/**
 * Derived atom for current page annotations
 */
export const currentPageAnnotationsAtom = atom((get) => {
  const annotations = get(annotationsAtom)
  const config = get(viewerConfigAtom)
  return annotations.filter((ann) => ann.page === config.currentPage)
})

/**
 * Derived atom for annotation count per page
 */
export const annotationCountByPageAtom = atom((get) => {
  const annotations = get(annotationsAtom)
  const counts: Record<number, number> = {}

  annotations.forEach((ann) => {
    counts[ann.page] = (counts[ann.page] || 0) + 1
  })

  return counts
})

// ============================================================================
// TYPES - Hook return types
// ============================================================================

/**
 * Return type for useDocumentMain hook
 */
export interface UseDocumentMainReturn {
  // State
  currentDocument: CaseDocument | null
  config: DocumentViewerConfig
  annotations: DocumentAnnotation[]
  currentPageAnnotations: DocumentAnnotation[]
  annotationCountByPage: Record<number, number>
  isLoading: boolean
  error: string | null
  // Actions
  setCurrentDocument: (document: CaseDocument | null) => void
  loadAnnotations: (documentId: string) => Promise<void>
  addAnnotation: (annotation: Omit<DocumentAnnotation, 'id' | 'createdAt'>) => Promise<void>
  deleteAnnotation: (annotationId: string) => Promise<void>
  setViewMode: (mode: DocumentViewMode) => void
  setZoom: (level: ZoomLevel) => void
  setPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
  toggleThumbnails: () => void
  toggleAnnotations: () => void
  downloadDocument: () => Promise<void>
  reset: () => void
}

// ============================================================================
// HOOKS - Custom hooks for document main management
// ============================================================================

/**
 * Hook for managing document main viewer state and actions
 */
export function useDocumentMain(): UseDocumentMainReturn {
  const [currentDocument, setCurrentDocument] = useAtom(currentDocumentAtom)
  const [config, setConfig] = useAtom(viewerConfigAtom)
  const [annotations, setAnnotations] = useAtom(annotationsAtom)
  const currentPageAnnotations = useAtomValue(currentPageAnnotationsAtom)
  const annotationCountByPage = useAtomValue(annotationCountByPageAtom)
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom)
  const [error, setError] = useAtom(errorAtom)

  /**
   * Loads annotations for a document
   */
  const loadAnnotations = useCallback(
    async (documentId: string): Promise<void> => {
      console.log(`[DocumentMainStore] Loading annotations for: ${documentId}`)
      setIsLoading(true)

      try {
        const anns = await documentMainRepository.getAnnotations(documentId)
        setAnnotations(anns)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error loading annotations'
        setError(message)
      } finally {
        setIsLoading(false)
      }
    },
    [setAnnotations, setError, setIsLoading]
  )

  /**
   * Adds a new annotation
   */
  const addAnnotation = useCallback(
    async (annotation: Omit<DocumentAnnotation, 'id' | 'createdAt'>): Promise<void> => {
      try {
        const newAnn = await documentMainRepository.saveAnnotation(annotation)
        setAnnotations((prev) => [...prev, newAnn])
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error saving annotation'
        setError(message)
      }
    },
    [setAnnotations, setError]
  )

  /**
   * Deletes an annotation
   */
  const deleteAnnotation = useCallback(
    async (annotationId: string): Promise<void> => {
      try {
        await documentMainRepository.deleteAnnotation(annotationId)
        setAnnotations((prev) => prev.filter((ann) => ann.id !== annotationId))
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error deleting annotation'
        setError(message)
      }
    },
    [setAnnotations, setError]
  )

  /**
   * Sets the view mode
   */
  const setViewMode = useCallback(
    (mode: DocumentViewMode): void => {
      setConfig((prev) => ({ ...prev, viewMode: mode }))
    },
    [setConfig]
  )

  /**
   * Sets the zoom level
   */
  const setZoom = useCallback(
    (level: ZoomLevel): void => {
      setConfig((prev) => ({ ...prev, zoomLevel: level }))
    },
    [setConfig]
  )

  /**
   * Sets the current page
   */
  const setPage = useCallback(
    (page: number): void => {
      setConfig((prev) => ({
        ...prev,
        currentPage: Math.max(1, Math.min(page, prev.totalPages))
      }))
    },
    [setConfig]
  )

  /**
   * Goes to next page
   */
  const nextPage = useCallback((): void => {
    setConfig((prev) => ({
      ...prev,
      currentPage: Math.min(prev.currentPage + 1, prev.totalPages)
    }))
  }, [setConfig])

  /**
   * Goes to previous page
   */
  const prevPage = useCallback((): void => {
    setConfig((prev) => ({
      ...prev,
      currentPage: Math.max(prev.currentPage - 1, 1)
    }))
  }, [setConfig])

  /**
   * Toggles thumbnail sidebar
   */
  const toggleThumbnails = useCallback((): void => {
    setConfig((prev) => ({ ...prev, showThumbnails: !prev.showThumbnails }))
  }, [setConfig])

  /**
   * Toggles annotation visibility
   */
  const toggleAnnotations = useCallback((): void => {
    setConfig((prev) => ({ ...prev, showAnnotations: !prev.showAnnotations }))
  }, [setConfig])

  /**
   * Downloads the current document
   */
  const downloadDocument = useCallback(async (): Promise<void> => {
    if (!currentDocument) return

    console.log(`[DocumentMainStore] Downloading: ${currentDocument.name}`)
    setIsLoading(true)

    try {
      const blob = await documentMainRepository.downloadDocument(currentDocument)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = currentDocument.name
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error downloading document'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [currentDocument, setError, setIsLoading])

  /**
   * Resets the store to initial state
   */
  const reset = useCallback((): void => {
    setCurrentDocument(null)
    setConfig({ ...defaultConfig })
    setAnnotations([])
    setError(null)
    setIsLoading(false)
  }, [setCurrentDocument, setConfig, setAnnotations, setError, setIsLoading])

  return useMemo(
    () => ({
      // State
      currentDocument,
      config,
      annotations,
      currentPageAnnotations,
      annotationCountByPage,
      isLoading,
      error,
      // Actions
      setCurrentDocument,
      loadAnnotations,
      addAnnotation,
      deleteAnnotation,
      setViewMode,
      setZoom,
      setPage,
      nextPage,
      prevPage,
      toggleThumbnails,
      toggleAnnotations,
      downloadDocument,
      reset
    }),
    [
      currentDocument,
      config,
      annotations,
      currentPageAnnotations,
      annotationCountByPage,
      isLoading,
      error,
      setCurrentDocument,
      loadAnnotations,
      addAnnotation,
      deleteAnnotation,
      setViewMode,
      setZoom,
      setPage,
      nextPage,
      prevPage,
      toggleThumbnails,
      toggleAnnotations,
      downloadDocument,
      reset
    ]
  )
}

/**
 * Hook for reading current document only
 */
export function useCurrentDocument(): CaseDocument | null {
  return useAtomValue(currentDocumentAtom)
}

/**
 * Hook for reading viewer config only
 */
export function useViewerConfig(): DocumentViewerConfig {
  return useAtomValue(viewerConfigAtom)
}
