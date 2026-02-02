/**
 * Transcription Panel View Component
 * Displays document transcription in various formats
 */

import React from 'react'
import { Paper, Text, ScrollArea, Button, Group, SegmentedControl, ActionIcon } from '@mantine/core'
import { IconCopy, IconRefresh } from '@tabler/icons-react'
import type { TranscriptionFormat } from './transcription-panel.domain'
import { useTranscriptionPanel } from './transcription-panel.store'

interface TranscriptionPanelProps {
  documentId?: string
}

/**
 * Format options for the segmented control
 */
const FORMAT_OPTIONS = [
  { label: 'JSON', value: 'json' },
  { label: 'Texto', value: 'text' },
  { label: 'SRT', value: 'srt' },
  { label: 'VTT', value: 'vtt' }
]

/**
 * Transcription Panel Component
 */
export const TranscriptionPanel: React.FC<TranscriptionPanelProps> = ({ documentId }) => {
  const {
    transcription,
    format,
    formattedOutput,
    segmentCount,
    isLoading,
    requestNewTranscription,
    setFormat,
    copyToClipboard
  } = useTranscriptionPanel()

  const handleFetchTranscription = async (): Promise<void> => {
    if (documentId) {
      await requestNewTranscription(documentId)
    }
  }

  const handleFormatChange = (value: string): void => {
    setFormat(value as TranscriptionFormat)
  }

  const handleCopy = async (): Promise<void> => {
    await copyToClipboard()
  }

  return (
    <Paper
      p="sm"
      radius="md"
      withBorder
      style={{ height: '100%', backgroundColor: '#071029', borderColor: '#334155' }}
    >
      {/* Header */}
      <Group justify="space-between" mb="sm">
        <Group gap="xs">
          <Text fw={700} c="white">
            Transcripción
          </Text>
          {transcription && (
            <Text size="xs" c="dimmed">
              ({segmentCount} segmentos • {transcription.language} •{' '}
              {Math.round(transcription.confidence * 100)}% confianza)
            </Text>
          )}
        </Group>
        <Group gap="xs">
          <SegmentedControl
            size="xs"
            value={format}
            onChange={handleFormatChange}
            data={FORMAT_OPTIONS}
          />
          <ActionIcon
            variant="subtle"
            color="gray"
            onClick={handleCopy}
            disabled={!transcription}
            title="Copiar al portapapeles"
          >
            <IconCopy size={16} />
          </ActionIcon>
          <Button
            size="xs"
            variant="light"
            onClick={handleFetchTranscription}
            loading={isLoading}
            leftSection={<IconRefresh size={14} />}
            disabled={!documentId}
          >
            Obtener
          </Button>
        </Group>
      </Group>

      {/* Content */}
      <ScrollArea style={{ height: 'calc(100% - 50px)' }}>
        <pre
          style={{
            color: '#e6eef8',
            fontSize: 12,
            whiteSpace: 'pre-wrap',
            margin: 0,
            fontFamily: 'monospace'
          }}
        >
          {formattedOutput}
        </pre>
      </ScrollArea>
    </Paper>
  )
}

export default TranscriptionPanel
