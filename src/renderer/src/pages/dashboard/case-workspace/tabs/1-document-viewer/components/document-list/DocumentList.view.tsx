/**
 * Document List View Component
 * Displays the list of documents in the case
 */

import React, { useEffect, useCallback } from 'react'
import { ScrollArea, NavLink, Group, Text, Button, Badge, Paper } from '@mantine/core'
import { IconFileText, IconUpload } from '@tabler/icons-react'
import type { CaseDocument } from './document-list.domain'
import { useDocumentList } from './document-list.store'

interface DocumentListProps {
  caseId?: string
  onDocumentSelect?: (document: CaseDocument) => void
}

/**
 * Get icon color based on document type
 */
function getDocumentColor(type: CaseDocument['type']): string {
  const colors: Record<CaseDocument['type'], string> = {
    PDF: '#ef4444',
    DOCX: '#3b82f6',
    JPG: '#22c55e',
    TXT: '#a855f7'
  }
  return colors[type]
}

/**
 * Document List Component
 */
export const DocumentList: React.FC<DocumentListProps> = ({
  caseId = 'default-case',
  onDocumentSelect
}) => {
  const {
    filteredDocuments,
    activeDocumentId,
    activeDocument,
    isLoading,
    isUploading,
    fetchDocuments,
    setActiveDocument,
    uploadDocument
  } = useDocumentList(caseId)

  // Load documents on mount
  useEffect(() => {
    fetchDocuments(caseId)
  }, [caseId, fetchDocuments])

  // Handle upload click
  const handleUploadClick = useCallback((): void => {
    // TODO: Replace with actual file picker
    const mockFile = new File(['dummy content'], `Nuevo Documento ${Date.now()}.pdf`, {
      type: 'application/pdf'
    })
    uploadDocument(mockFile)
  }, [uploadDocument])

  // Handle document selection
  const handleSelect = useCallback(
    (doc: CaseDocument): void => {
      setActiveDocument(doc.id)
      onDocumentSelect?.(doc)
    },
    [setActiveDocument, onDocumentSelect]
  )

  // Notify parent when active document changes
  useEffect(() => {
    if (activeDocument && onDocumentSelect) {
      onDocumentSelect(activeDocument)
    }
  }, [activeDocument, onDocumentSelect])

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
        <Button
          size="xs"
          variant="light"
          leftSection={<IconUpload size={14} />}
          onClick={handleUploadClick}
          loading={isUploading}
        >
          Subir
        </Button>
      </Group>

      <ScrollArea h="calc(100% - 60px)">
        {isLoading ? (
          <Text c="dimmed" ta="center" py="xl" size="sm">
            Cargando documentos...
          </Text>
        ) : filteredDocuments.length === 0 ? (
          <Text c="dimmed" ta="center" py="xl" size="sm">
            No hay documentos
          </Text>
        ) : (
          filteredDocuments.map((doc) => (
            <NavLink
              key={doc.id}
              label={doc.name}
              description={`${doc.pages} páginas`}
              leftSection={<IconFileText size={20} color={getDocumentColor(doc.type)} />}
              active={activeDocumentId === doc.id}
              onClick={() => handleSelect(doc)}
              variant="subtle"
              color="cyan"
              rightSection={
                doc.status === 'Procesado' ? (
                  <Badge size="xs" color="green" variant="dot" />
                ) : doc.status === 'Error' ? (
                  <Badge size="xs" color="red" variant="dot" />
                ) : (
                  <Badge size="xs" color="yellow" variant="dot" />
                )
              }
              style={{ borderRadius: '8px', marginBottom: '4px' }}
            />
          ))
        )}
      </ScrollArea>
    </Paper>
  )
}

export default DocumentList
