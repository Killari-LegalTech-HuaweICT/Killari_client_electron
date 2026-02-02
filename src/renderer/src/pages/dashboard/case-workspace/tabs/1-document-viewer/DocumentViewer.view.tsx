import React from 'react'
import { Grid } from '@mantine/core'
import DocumentList from './components/DocumentList.view'
import DocumentMain from './components/DocumentMain.view'

// Document list and transcription logic moved to components/

export const DocumentViewerView: React.FC = () => {
  return (
    <Grid h="100%" gutter="md">
      {/* Sidebar: Lista de Documentos */}
      <Grid.Col span={3}>
        <DocumentList />
      </Grid.Col>

      {/* Main: Visor del Documento */}
      <Grid.Col span={9}>
        <DocumentMain />
      </Grid.Col>
    </Grid>
  )
}

export default DocumentViewerView
