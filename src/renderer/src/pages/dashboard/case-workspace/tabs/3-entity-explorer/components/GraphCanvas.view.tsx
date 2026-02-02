import React from 'react'
import { Paper, Text, Group, ActionIcon } from '@mantine/core'
import { IconSearch, IconMaximize, IconShare } from '@tabler/icons-react'

export const GraphCanvas: React.FC = () => {
  return (
    <Paper
      h="100%"
      p="md"
      style={{ backgroundColor: '#020617', borderColor: '#334155', position: 'relative', overflow: 'hidden' }}
      withBorder
      radius="md"
    >
      <Group style={{ position: 'absolute', top: 20, right: 20, zIndex: 10 }}>
        <ActionIcon variant="light" color="gray">
          <IconSearch size={18} />
        </ActionIcon>
        <ActionIcon variant="light" color="gray">
          <IconMaximize size={18} />
        </ActionIcon>
        <ActionIcon variant="light" color="blue">
          <IconShare size={18} />
        </ActionIcon>
      </Group>

      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.3 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 200, height: 200, borderRadius: '50%', border: '2px dashed #3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
            <Text c="blue" fw={700}>
              GRAPH ENGINE
            </Text>
          </div>
          <Text mt="md" c="dimmed">
            Visualización de relaciones generada por Huawei GES
          </Text>
        </div>
      </div>
    </Paper>
  )
}

export default GraphCanvas
