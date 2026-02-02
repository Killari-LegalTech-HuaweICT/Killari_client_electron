import { CaseDocument } from './document-viewer.domain'

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

export const documentViewerStore = {
  documents: [...MOCK_DOCUMENTS],
  activeDocumentId: '1' // ID, not name
}

export const documentActions = {
  loadDocuments: async (): Promise<void> => {
    console.log('[DocumentViewer] Cargando documentos...')
    // Simulating API call
    return new Promise((resolve) => {
      setTimeout(() => {
        documentViewerStore.documents = [...MOCK_DOCUMENTS]
        console.log('[DocumentViewer] Documentos cargados:', documentViewerStore.documents.length)
        resolve()
      }, 500)
    })
  },

  setActiveDocument: (id: string): void => {
    console.log(`[DocumentViewer] Estableciendo documento activo: ${id}`)
    documentViewerStore.activeDocumentId = id
  },

  uploadDocument: (file: File): void => {
    console.log(`[DocumentViewer] Subiendo archivo: ${file.name}`)
    // Mock upload logic
    const newDoc: CaseDocument = {
      id: Date.now().toString(),
      name: file.name,
      type: 'PDF', // Mock type
      pages: 1,
      status: 'Pendiente',
      uploadDate: new Date().toISOString()
    }
    documentViewerStore.documents.push(newDoc)
    console.log('[DocumentViewer] Archivo añadido a la cola de procesamiento.')
  },

  deleteDocument: (id: string): void => {
    console.log(`[DocumentViewer] Eliminando documento: ${id}`)
    documentViewerStore.documents = documentViewerStore.documents.filter((d) => d.id !== id)
  }
}
