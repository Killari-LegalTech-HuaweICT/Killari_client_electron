import React from 'react'
import { documentViewerStore } from './document-viewer.store'

export const DocumentViewerView: React.FC = () => {
  return (
    <div>
      <h4>Document Viewer</h4>
      <p>Documento activo: {documentViewerStore.activeDocumentId ?? 'ninguno'}</p>
    </div>
  )
}

export default DocumentViewerView
