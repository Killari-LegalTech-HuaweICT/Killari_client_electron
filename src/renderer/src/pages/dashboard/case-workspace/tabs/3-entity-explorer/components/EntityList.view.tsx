import React from 'react'
import { Paper, Text, Group, Avatar, Badge, ScrollArea, TextInput } from '@mantine/core'
import { IconSearch, IconUser, IconBuilding, IconMapPin, IconActivity } from '@tabler/icons-react'
import { CaseEntity } from '../entity-explorer.domain'
import { entityActions } from '../entity-explorer.store'

export const EntityList: React.FC<{ items: CaseEntity[] }> = ({ items }) => {
  return (
    <Paper
      h="100%"
      p="md"
      style={{ backgroundColor: '#1e293b', borderColor: '#334155' }}
      withBorder
      radius="md"
    >
      <TextInput
        placeholder="Filtrar entidades..."
        leftSection={<IconSearch size={16} />}
        mb="md"
      />
      <ScrollArea h="calc(100% - 60px)">
        <Text size="xs" c="dimmed" mb="xs">
          {items.length} entidades
        </Text>
        {items.map((e) => (
          <Paper
            key={e.id}
            p="sm"
            mb="sm"
            style={{ backgroundColor: '#0f172a', cursor: 'pointer' }}
            radius="md"
            onClick={() => entityActions.selectEntity(e.id)}
          >
            <Group>
              <Avatar color="blue" radius="xl">
                {e.type === 'Person' ? (
                  <IconUser size={16} />
                ) : e.type === 'Location' ? (
                  <IconMapPin size={16} />
                ) : e.type === 'Org' ? (
                  <IconBuilding size={16} />
                ) : (
                  <IconActivity size={16} />
                )}
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
