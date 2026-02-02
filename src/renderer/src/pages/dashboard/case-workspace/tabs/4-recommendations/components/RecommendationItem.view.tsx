import React from 'react'
import { Accordion, ThemeIcon, Text, Group, Badge, Button } from '@mantine/core'
import { IconBulb, IconFileAnalytics } from '@tabler/icons-react'

export const RecommendationItem: React.FC<{
  id: string
  title: string
  priority: 'high' | 'medium' | 'low'
  children?: React.ReactNode
}> = ({ id, title, priority, children }) => {
  const color = priority === 'high' ? 'red' : priority === 'medium' ? 'blue' : 'gray'
  return (
    <Accordion.Item value={id} style={{ backgroundColor: '#1e293b', borderColor: '#334155' }}>
      <Accordion.Control
        icon={
          <ThemeIcon color={color} variant="light">
            <IconBulb size={16} />
          </ThemeIcon>
        }
      >
        <Group justify="space-between" pr="md">
          <Text c="white">{title}</Text>
          <Badge color={color}>{priority === 'high' ? 'Alta Prioridad' : 'Media Prioridad'}</Badge>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <Text size="sm" c="dimmed" mb="md">
          {children}
        </Text>
        <Button size="xs" variant="light" rightSection={<IconFileAnalytics size={14} />}>
          Generar Oficio Automático
        </Button>
      </Accordion.Panel>
    </Accordion.Item>
  )
}

export default RecommendationItem
