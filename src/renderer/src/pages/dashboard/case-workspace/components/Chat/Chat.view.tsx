import React from 'react'
import { Paper, Text, ScrollArea, TextInput, Button, Divider, Group } from '@mantine/core'
import { IconSend } from '@tabler/icons-react'

export const ChatView: React.FC = () => {
  const [input, setInput] = React.useState<string>('')
  const [messages, setMessages] = React.useState<
    Array<{ role: 'user' | 'assistant'; text: string }>
  >([])

  function send(): void {
    const trimmed = input.trim()
    if (!trimmed) return
    setMessages((m) => [...m, { role: 'user', text: trimmed }])
    setInput('')
    // Respuesta simulada
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'assistant', text: 'Respuesta rápida de IA (simulada).' }])
    }, 600)
  }

  return (
    <Paper
      p="sm"
      withBorder
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#071029',
        borderColor: '#334155'
      }}
      radius="md"
    >
      <Text fw={700} c="white" mb="xs">
        Asistente IA
      </Text>

      <Divider />

      <ScrollArea style={{ flex: 1, minHeight: 0, marginTop: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {messages.length === 0 && (
            <Text c="dimmed" size="sm">
              Consulta la transcripción o haz una pregunta.
            </Text>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div
                style={{
                  maxWidth: '80%',
                  padding: '8px 12px',
                  borderRadius: 12,
                  backgroundColor: m.role === 'user' ? '#0ea5b7' : '#1e293b',
                  color: m.role === 'user' ? 'black' : 'white'
                }}
              >
                <Text size="sm">{m.text}</Text>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <Group mt="sm">
        <TextInput
          placeholder="Preguntar a la IA"
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <Button onClick={send} leftSection={<IconSend size={16} />}>
          Enviar
        </Button>
      </Group>
    </Paper>
  )
}

export default ChatView
