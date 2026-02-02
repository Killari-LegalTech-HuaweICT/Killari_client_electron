import React from 'react'
import { ScrollArea, NavLink, Group, Text, Button, Badge, Paper } from '@mantine/core'
import { IconFileText, IconUpload } from '@tabler/icons-react'
import { documentViewerStore, setActiveDocument } from '../document-viewer.store'

const mockDocs = [
  { id: 1, name: 'Denuncia Policial.pdf', type: 'PDF', pages: 12, status: 'Procesado' },
  { id: 2, name: 'Informe Balístico.pdf', type: 'PDF', pages: 45, status: 'Procesado' },
  { id: 3, name: 'Declaración Testigo A.docx', type: 'DOCX', pages: 3, status: 'Pendiente' },
  { id: 4, name: 'Registro Fotográfico.pdf', type: 'PDF', pages: 8, status: 'Procesado' }
]

export const DocumentList: React.FC = () => {
  return (
    <Paper
      h="100%"
      p="md"
      style={{ backgroundColor: '#1e293b', borderColor: '#334155' }}
      withBorder
      radius="md"
    >
      <Group justify="space-between" mb="md">
        <Text fw={600} c="white">
          Archivos
        </Text>
        <Button size="xs" variant="light" leftSection={<IconUpload size={14} />}>
          Subir
        </Button>
      </Group>
      <ScrollArea h="calc(100% - 60px)">
        {mockDocs.map((doc, index) => (
          <NavLink
            key={doc.id}
            label={doc.name}
            description={`${doc.pages} páginas`}
            leftSection={
              <IconFileText size={20} color={doc.type === 'PDF' ? '#ef4444' : '#3b82f6'} />
            }
            active={documentViewerStore.activeDocumentId === doc.name || index === 0}
            onClick={() => setActiveDocument(doc.name)}
            variant="subtle"
            color="cyan"
            rightSection={
              doc.status === 'Procesado' ? (
                <Badge size="xs" color="green" variant="dot" />
              ) : (
                <Badge size="xs" color="yellow" variant="dot" />
              )
            }
            style={{ borderRadius: '8px', marginBottom: '4px' }}
          />
        ))}
      </ScrollArea>
    </Paper>
  )
}

export default DocumentList
