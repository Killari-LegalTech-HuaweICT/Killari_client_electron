import React from 'react'
import { Paper, Text, Group, Avatar, Badge, ScrollArea, TextInput } from '@mantine/core'
import { IconSearch, IconUser, IconBuilding, IconMapPin } from '@tabler/icons-react'

export type Entity = { name: string; type: string; role: string; avatar?: string | null }

export const EntityList: React.FC<{ items: Entity[] }> = ({ items }) => {
  return (
    <Paper
      h="100%"
      p="md"
      style={{ backgroundColor: '#1e293b', borderColor: '#334155' }}
      withBorder
      radius="md"
    >
      <TextInput placeholder="Filtrar entidades..." leftSection={<IconSearch size={16} />} mb="md" />
      <ScrollArea h="calc(100% - 60px)">
        <Text size="xs" c="dimmed" mb="xs">
          {items.length} entidades
        </Text>
        {items.map((e, i) => (
          <Paper key={i} p="sm" mb="sm" style={{ backgroundColor: '#0f172a', cursor: 'pointer' }} radius="md">
            <Group>
              <Avatar color="blue" radius="xl">
                {e.type === 'Person' ? <IconUser size={16} /> : e.type === 'Location' ? <IconMapPin size={16} /> : <IconBuilding size={16} />}
              </Avatar>
              <div style={{ flex: 1 }}>
                <Text size="sm" fw={500} c="white">
                  {e.name}
                </Text>
                <Badge size="xs" variant="outline" color="gray">
                  {e.role}
                </Badge>
              </div>
            </Group>
          </Paper>
        ))}
      </ScrollArea>
    </Paper>
  )
}

export default EntityList
