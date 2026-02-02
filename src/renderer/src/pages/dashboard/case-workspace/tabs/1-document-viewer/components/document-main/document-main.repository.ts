/**
 * Document Main Repository
 * Handles data fetching for document preview and annotations
 */

import type { CaseDocument } from '../document-list/document-list.domain'
import type { DocumentAnnotation } from './document-main.domain'

/**
 * Repository interface for document main operations
 */
export interface IDocumentMainRepository {
  getDocumentContent(documentId: string): Promise<string | Blob>
  getAnnotations(documentId: string): Promise<DocumentAnnotation[]>
  saveAnnotation(
    annotation: Omit<DocumentAnnotation, 'id' | 'createdAt'>
  ): Promise<DocumentAnnotation>
  deleteAnnotation(annotationId: string): Promise<void>
  downloadDocument(document: CaseDocument): Promise<Blob>
}

/**
 * Mock annotations for development
 */
const MOCK_ANNOTATIONS: DocumentAnnotation[] = [
  {
    id: 'ann-1',
    documentId: '1',
    page: 1,
    type: 'highlight',
    content: 'Texto importante resaltado',
    coordinates: { x: 100, y: 200, width: 300, height: 20 },
    color: '#ffeb3b',
    createdAt: '2023-10-01T10:00:00Z'
  },
  {
    id: 'ann-2',
    documentId: '1',
    page: 2,
    type: 'note',
    content: 'Revisar con el fiscal',
    coordinates: { x: 400, y: 150, width: 50, height: 50 },
    color: '#2196f3',
    createdAt: '2023-10-02T14:30:00Z'
  }
]

/**
 * Implementation of document main repository
 */
class DocumentMainRepository implements IDocumentMainRepository {
  /**
   * Gets the document content for preview
   */
  async getDocumentContent(documentId: string): Promise<string | Blob> {
    console.log(`[DocumentMainRepository] Fetching content for document: ${documentId}`)

    // TODO: Replace with actual API call
    // const response = await fetch(`${API_URL}/documents/${documentId}/content`)
    // return response.blob()

    await new Promise((resolve) => setTimeout(resolve, 300))
    return `Mock content for document ${documentId}`
  }

  /**
   * Gets annotations for a document
   */
  async getAnnotations(documentId: string): Promise<DocumentAnnotation[]> {
    console.log(`[DocumentMainRepository] Fetching annotations for document: ${documentId}`)

    // TODO: Replace with actual API call

    await new Promise((resolve) => setTimeout(resolve, 200))
    return MOCK_ANNOTATIONS.filter((ann) => ann.documentId === documentId)
  }

  /**
   * Saves a new annotation
   */
  async saveAnnotation(
    annotation: Omit<DocumentAnnotation, 'id' | 'createdAt'>
  ): Promise<DocumentAnnotation> {
    console.log(`[DocumentMainRepository] Saving annotation for document: ${annotation.documentId}`)

    // TODO: Replace with actual API call

    await new Promise((resolve) => setTimeout(resolve, 200))

    const newAnnotation: DocumentAnnotation = {
      ...annotation,
      id: `ann-${Date.now()}`,
      createdAt: new Date().toISOString()
    }

    return newAnnotation
  }

  /**
   * Deletes an annotation
   */
  async deleteAnnotation(annotationId: string): Promise<void> {
    console.log(`[DocumentMainRepository] Deleting annotation: ${annotationId}`)

    // TODO: Replace with actual API call

    await new Promise((resolve) => setTimeout(resolve, 200))
  }

  /**
   * Downloads a document
   */
  async downloadDocument(document: CaseDocument): Promise<Blob> {
    console.log(`[DocumentMainRepository] Downloading document: ${document.name}`)

    // TODO: Replace with actual API call
    // const response = await fetch(`${API_URL}/documents/${document.id}/download`)
    // return response.blob()

    await new Promise((resolve) => setTimeout(resolve, 500))
    return new Blob([`Content of ${document.name}`], { type: 'application/pdf' })
  }
}

// Singleton instance
export const documentMainRepository = new DocumentMainRepository()
