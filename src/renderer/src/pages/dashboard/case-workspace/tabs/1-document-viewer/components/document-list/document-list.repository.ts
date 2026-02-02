/**
 * Document List Repository
 * Handles data fetching and persistence for document list
 */

import type { CaseDocument, DocumentType } from './document-list.domain'

/**
 * Repository interface for document list operations
 */
export interface IDocumentListRepository {
  getDocuments(caseId: string): Promise<CaseDocument[]>
  getDocumentById(id: string): Promise<CaseDocument | null>
  uploadDocument(file: File): Promise<CaseDocument>
  deleteDocument(id: string): Promise<void>
}

/**
 * Mock documents for development
 */
const MOCK_DOCUMENTS: CaseDocument[] = [
  {
    id: '1',
    name: 'Denuncia Policial.pdf',
    type: 'PDF',
    pages: 12,
    status: 'Procesado',
    uploadDate: '2023-10-01'
  },
  {
    id: '2',
    name: 'Informe Balístico.pdf',
    type: 'PDF',
    pages: 45,
    status: 'Procesado',
    uploadDate: '2023-10-02'
  },
  {
    id: '3',
    name: 'Declaración Testigo A.docx',
    type: 'DOCX',
    pages: 3,
    status: 'Pendiente',
    uploadDate: '2023-10-05'
  },
  {
    id: '4',
    name: 'Registro Fotográfico.pdf',
    type: 'PDF',
    pages: 8,
    status: 'Procesado',
    uploadDate: '2023-10-06'
  }
]

/**
 * Implementation of document list repository
 */
class DocumentListRepository implements IDocumentListRepository {
  /**
   * Fetches all documents for a case
   */
  async getDocuments(caseId: string): Promise<CaseDocument[]> {
    console.log(`[DocumentListRepository] Fetching documents for case: ${caseId}`)

    // TODO: Replace with actual API call
    // const response = await fetch(`${API_URL}/cases/${caseId}/documents`)
    // return response.json()

    await new Promise((resolve) => setTimeout(resolve, 500))
    return [...MOCK_DOCUMENTS]
  }

  /**
   * Gets a single document by ID
   */
  async getDocumentById(id: string): Promise<CaseDocument | null> {
    console.log(`[DocumentListRepository] Fetching document: ${id}`)

    await new Promise((resolve) => setTimeout(resolve, 200))
    return MOCK_DOCUMENTS.find((doc) => doc.id === id) || null
  }

  /**
   * Uploads a new document
   */
  async uploadDocument(file: File): Promise<CaseDocument> {
    console.log(`[DocumentListRepository] Uploading file: ${file.name}`)

    // TODO: Replace with actual API call
    // const formData = new FormData()
    // formData.append('file', file)
    // const response = await fetch(`${API_URL}/documents/upload`, { method: 'POST', body: formData })
    // return response.json()

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const extension = file.name.split('.').pop()?.toUpperCase() || 'PDF'
    const type: DocumentType = ['PDF', 'DOCX', 'JPG', 'TXT'].includes(extension)
      ? (extension as DocumentType)
      : 'PDF'

    const newDoc: CaseDocument = {
      id: Date.now().toString(),
      name: file.name,
      type,
      pages: 1,
      status: 'Pendiente',
      uploadDate: new Date().toISOString().split('T')[0]
    }

    return newDoc
  }

  /**
   * Deletes a document by ID
   */
  async deleteDocument(id: string): Promise<void> {
    console.log(`[DocumentListRepository] Deleting document: ${id}`)

    // TODO: Replace with actual API call
    // await fetch(`${API_URL}/documents/${id}`, { method: 'DELETE' })

    await new Promise((resolve) => setTimeout(resolve, 300))
  }
}

// Singleton instance
export const documentListRepository = new DocumentListRepository()
