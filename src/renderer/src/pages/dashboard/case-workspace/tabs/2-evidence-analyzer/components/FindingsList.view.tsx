import React from 'react'
import { Card, Text, Group, Badge, Stack, Button, RingProgress } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'

export type Finding = {
  id: number
  title: string
  desc: string
  confidence: number
  type: 'high' | 'medium' | 'low'
}

export const FindingsList: React.FC<{ items: Finding[] }> = ({ items }) => {
  return (
    <Stack>
      {items.map((item) => (
        <Card
          key={item.id}
          radius="md"
          withBorder
          style={{ backgroundColor: '#1e293b', borderColor: '#334155' }}
        >
          <Group justify="space-between" mb="xs">
            <Badge color={item.type === 'high' ? 'red' : 'blue'} variant="light">
              {item.type === 'high' ? 'Crítico' : 'Relevante'}
            </Badge>
            <Text size="xs" c="dimmed">
              Confianza IA
            </Text>
          </Group>

          <Group align="flex-start" wrap="nowrap">
            <RingProgress
              size={60}
              thickness={6}
              roundCaps
              sections={[{ value: item.confidence, color: item.confidence > 90 ? 'teal' : 'blue' }]}
              label={
                <Text c="white" fw={700} ta="center" size="xs">
                  {item.confidence}%
                </Text>
              }
            />
            <div>
              <Text fw={600} c="white">
                {item.title}
              </Text>
              <Text size="sm" c="dimmed">
                {item.desc}
              </Text>
            </div>
          </Group>

          <Button fullWidth variant="subtle" size="xs" mt="md" rightSection={<IconSearch size={14} />}>
            Ver evidencia fuente
          </Button>
        </Card>
      ))}
    </Stack>
  )
}

export default FindingsList
