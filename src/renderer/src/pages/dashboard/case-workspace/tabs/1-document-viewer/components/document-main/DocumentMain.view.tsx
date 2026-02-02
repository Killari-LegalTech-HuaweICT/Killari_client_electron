/**
 * Document Main View Component
 * Displays the document preview and controls
 */

import React, { useEffect } from 'react'
import { Paper, Text, Group, ActionIcon, Button, Divider, Center, Loader } from '@mantine/core'
import {
  IconEye,
  IconDownload,
  IconFile,
  IconChevronLeft,
  IconChevronRight
} from '@tabler/icons-react'
import type { CaseDocument } from './document-main.domain'
import { useDocumentMain } from './document-main.store'

interface DocumentMainProps {
  document?: CaseDocument | null
  onOpenExternal?: () => void
}

/**
 * Document Main Component
 */
export const DocumentMain: React.FC<DocumentMainProps> = ({ document, onOpenExternal }) => {
  const {
    currentDocument,
    config,
    isLoading,
    setCurrentDocument,
    loadAnnotations,
    downloadDocument,
    setPage,
    nextPage,
    prevPage
  } = useDocumentMain()

  // Sync document from props
  useEffect(() => {
    if (document) {
      setCurrentDocument(document)
      loadAnnotations(document.id)
    }
  }, [document, setCurrentDocument, loadAnnotations])

  const activeDoc = currentDocument

  const handleDownload = async (): Promise<void> => {
    if (activeDoc) {
      console.log(`[DocumentMain] Downloading: ${activeDoc.name}`)
      await downloadDocument()
    }
  }

  const handleOpenExternal = (): void => {
    onOpenExternal?.()
  }

  if (isLoading) {
    return (
      <Paper
        h="100%"
        style={{
          backgroundColor: '#0f172a',
          borderColor: '#334155',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        withBorder
        radius="md"
      >
        <Loader size="lg" color="cyan" />
      </Paper>
    )
  }

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
      {/* Header toolbar */}
      <Group
        p="xs"
        style={{ borderBottom: '1px solid #334155', backgroundColor: '#1e293b' }}
        justify="space-between"
      >
        <Text size="sm" c="dimmed">
          Vista Previa: {activeDoc?.name ?? 'Seleccione un documento'}
        </Text>
        <Group gap="xs">
          <ActionIcon variant="subtle">
            <IconEye size={18} />
          </ActionIcon>
          <ActionIcon variant="subtle" onClick={handleDownload} disabled={!activeDoc}>
            <IconDownload size={18} />
          </ActionIcon>
        </Group>
      </Group>

      {/* Document preview area */}
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
          {activeDoc ? (
            <Center style={{ flexDirection: 'column', gap: 16 }}>
              <IconFile size={64} color="#334155" />
              <Text c="dimmed">Visor para: {activeDoc.name}</Text>
              <Text size="xs" c="dimmed">
                {activeDoc.pages} páginas • {activeDoc.type}
              </Text>
            </Center>
          ) : (
            <Text c="dimmed">No hay documento seleccionado.</Text>
          )}
        </div>

        {/* Page navigation */}
        {activeDoc && activeDoc.pages > 1 && (
          <>
            <Divider />
            <Group p="xs" justify="center" gap="md">
              <ActionIcon variant="subtle" onClick={prevPage} disabled={config.currentPage <= 1}>
                <IconChevronLeft size={18} />
              </ActionIcon>
              <Text size="sm" c="dimmed">
                Página {config.currentPage} de {config.totalPages || activeDoc.pages}
              </Text>
              <ActionIcon
                variant="subtle"
                onClick={nextPage}
                disabled={config.currentPage >= (config.totalPages || activeDoc.pages)}
              >
                <IconChevronRight size={18} />
              </ActionIcon>
            </Group>
          </>
        )}

        <Divider my="sm" />

        {/* Actions footer */}
        <Group p="sm" justify="center">
          <Button variant="outline" color="gray" disabled={!activeDoc} onClick={handleOpenExternal}>
            Abrir en ventana externa
          </Button>
        </Group>
      </div>
    </Paper>
  )
}

export default DocumentMain
