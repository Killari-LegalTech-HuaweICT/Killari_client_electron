/**
 * Document Main Domain
 * Types and interfaces for the document main viewer module
 */

import type { CaseDocument } from '../document-list/document-list.domain'

/**
 * Document view modes
 */
export type DocumentViewMode = 'preview' | 'fullscreen' | 'split'

/**
 * Zoom levels for document viewer
 */
export type ZoomLevel = 'fit' | 'width' | 'page' | number

/**
 * Document viewer configuration
 */
export interface DocumentViewerConfig {
  viewMode: DocumentViewMode
  zoomLevel: ZoomLevel
  showThumbnails: boolean
  showAnnotations: boolean
  currentPage: number
  totalPages: number
}

/**
 * Document annotation
 */
export interface DocumentAnnotation {
  id: string
  documentId: string
  page: number
  type: 'highlight' | 'note' | 'underline' | 'box'
  content?: string
  coordinates: {
    x: number
    y: number
    width: number
    height: number
  }
  color: string
  createdAt: string
}

/**
 * Document main state
 */
export interface DocumentMainState {
  currentDocument: CaseDocument | null
  config: DocumentViewerConfig
  annotations: DocumentAnnotation[]
  isLoading: boolean
  error: string | null
}

// Re-export for convenience
export type { CaseDocument }
