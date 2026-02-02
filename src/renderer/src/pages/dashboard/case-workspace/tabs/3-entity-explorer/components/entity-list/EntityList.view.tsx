import React, { useEffect, useCallback } from 'react'
import {
  Paper,
  Text,
  Group,
  Avatar,
  Badge,
  ScrollArea,
  TextInput,
  Loader,
  Center
} from '@mantine/core'
import { IconSearch, IconUser, IconBuilding, IconMapPin, IconActivity } from '@tabler/icons-react'
import type { CaseEntity, EntityType } from './entity-list.domain'
import { useEntityList } from './entity-list.store'

interface EntityListProps {
  items?: CaseEntity[]
  caseId?: string
  onEntitySelect?: (entity: CaseEntity) => void
}

/**
 * Icon mapping for entity types
 */
const entityTypeIcons: Record<EntityType, React.ReactNode> = {
  Person: <IconUser size={16} />,
  Org: <IconBuilding size={16} />,
  Location: <IconMapPin size={16} />,
  Event: <IconActivity size={16} />
}

/**
 * Color mapping for entity types
 */
const entityTypeColors: Record<EntityType, string> = {
  Person: 'blue',
  Org: 'violet',
  Location: 'green',
  Event: 'orange'
}

/**
 * Entity List Component
 */
export const EntityList: React.FC<EntityListProps> = ({
  items,
  caseId = 'default-case',
  onEntitySelect
}) => {
  const {
    filteredEntities,
    selectedEntityId,
    filter,
    isLoading,
    setEntities,
    fetchEntities,
    setSearchTerm,
    selectEntity
  } = useEntityList(caseId)

  // Load entities on mount or when items prop changes
  useEffect(() => {
    if (items) {
      setEntities(items)
    } else {
      fetchEntities(caseId)
    }
  }, [items, caseId, setEntities, fetchEntities])

  // Handle search
  const handleSearch = useCallback(
    (value: string): void => {
      setSearchTerm(value)
    },
    [setSearchTerm]
  )

  // Handle entity selection
  const handleSelect = useCallback(
    (entity: CaseEntity): void => {
      selectEntity(entity.id)
      onEntitySelect?.(entity)
    },
    [selectEntity, onEntitySelect]
  )

  if (isLoading) {
    return (
      <Paper
        h="100%"
        p="md"
        style={{ backgroundColor: '#1e293b', borderColor: '#334155' }}
        withBorder
        radius="md"
      >
        <Center h="100%">
          <Loader size="md" color="cyan" />
        </Center>
      </Paper>
    )
  }

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
        value={filter.searchTerm}
        onChange={(e) => handleSearch(e.currentTarget.value)}
      />

      <ScrollArea h="calc(100% - 60px)">
        <Text size="xs" c="dimmed" mb="xs">
          {filteredEntities.length} entidades
        </Text>

        {filteredEntities.length === 0 ? (
          <Text c="dimmed" ta="center" py="xl" size="sm">
            No se encontraron entidades
          </Text>
        ) : (
          filteredEntities.map((entity) => (
            <Paper
              key={entity.id}
              p="sm"
              mb="sm"
              style={{
                backgroundColor: selectedEntityId === entity.id ? '#1e3a5f' : '#0f172a',
                cursor: 'pointer',
                border:
                  selectedEntityId === entity.id ? '1px solid #3b82f6' : '1px solid transparent'
              }}
              radius="md"
              onClick={() => handleSelect(entity)}
            >
              <Group>
                <Avatar color={entityTypeColors[entity.type]} radius="xl">
                  {entityTypeIcons[entity.type]}
                </Avatar>
                <div style={{ flex: 1 }}>
                  <Text size="sm" fw={500} c="white">
                    {entity.name}
                  </Text>
                  <Group gap="xs" mt={4}>
                    <Badge size="xs" variant="light" color={entityTypeColors[entity.type]}>
                      {entity.type}
                    </Badge>
                    <Badge size="xs" variant="outline" color="gray">
                      {entity.role}
                    </Badge>
                  </Group>
                </div>
              </Group>
            </Paper>
          ))
        )}
      </ScrollArea>
    </Paper>
  )
}

export default EntityList
