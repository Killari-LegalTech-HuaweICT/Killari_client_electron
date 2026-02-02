import React from 'react'
import { Paper, Text, Group, ActionIcon, Button, Divider } from '@mantine/core'
import { IconEye, IconDownload, IconFile } from '@tabler/icons-react'
import TranscriptionPanel from './TranscriptionPanel.view'
import { documentViewerStore } from '../document-viewer.store'

export const DocumentMain: React.FC = () => {
  return (
    <Paper
      h="100%"
      style={{
        backgroundColor: '#0f172a',
        borderColor: '#334155',
        display: 'flex',
        flexDirection: 'column'
      }}
      withBorder
      radius="md"
    >
      <Group
        p="xs"
        style={{ borderBottom: '1px solid #334155', backgroundColor: '#1e293b' }}
        justify="space-between"
      >
        <Text size="sm" c="dimmed">
          Vista Previa: {documentViewerStore.activeDocumentId ?? 'Denuncia Policial.pdf'}
        </Text>
        <Group gap="xs">
          <ActionIcon variant="subtle">
            <IconEye size={18} />
          </ActionIcon>
          <ActionIcon variant="subtle">
            <IconDownload size={18} />
          </ActionIcon>
        </Group>
      </Group>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20
          }}
        >
          <IconFile size={64} color="#334155" />
          <Text c="dimmed">El visor de documentos se cargará aquí.</Text>
          <Button variant="outline" color="gray">
            Abrir en ventana externa
          </Button>
        </div>

        <Divider my="sm" />

        <div style={{ height: 300, padding: 8 }}>
          <TranscriptionPanel />
        </div>
      </div>
    </Paper>
  )
}

export default DocumentMain
