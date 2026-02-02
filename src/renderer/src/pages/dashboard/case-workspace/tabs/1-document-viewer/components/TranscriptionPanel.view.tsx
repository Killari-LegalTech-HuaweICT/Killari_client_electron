import React from 'react'
import { Paper, Text, ScrollArea, Button } from '@mantine/core'

export const TranscriptionPanel: React.FC = () => {
  const [transcription, setTranscription] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)

  async function fetchTranscription(): Promise<void> {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    const mock = {
      transcript: '...Transcripción automática del documento: "Se encontró evidencia..."',
      language: 'es-PE',
      confidence: 0.92,
      segments: [
        { start: 0, end: 3.5, text: 'Se encontró evidencia' },
        { start: 3.5, end: 7.2, text: 'en la escena del hecho' }
      ]
    }
    setTranscription(JSON.stringify(mock, null, 2))
    setLoading(false)
  }

  return (
    <Paper
      p="sm"
      radius="md"
      withBorder
      style={{ height: '100%', backgroundColor: '#071029', borderColor: '#334155' }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8
        }}
      >
        <Text fw={700} c="white">
          Transcripción (JSON)
        </Text>
        <Button size="xs" variant="light" onClick={fetchTranscription} loading={loading}>
          Obtener Transcripción
        </Button>
      </div>

      <ScrollArea style={{ height: 'calc(100% - 40px)' }}>
        <pre style={{ color: '#e6eef8', fontSize: 12, whiteSpace: 'pre-wrap' }}>
          {transcription || '{\n  "message": "Sin transcripción"\n}'}
        </pre>
      </ScrollArea>
    </Paper>
  )
}

export default TranscriptionPanel
