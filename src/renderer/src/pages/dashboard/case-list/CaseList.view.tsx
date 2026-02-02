import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppRoutes } from '../../../shared/config/routes'
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  TextInput,
  Title,
  SimpleGrid
} from '@mantine/core'
import { IconSearch, IconPlus, IconClock, IconFilter } from '@tabler/icons-react'
import { caseListStore, CaseItem } from './case-list.store'

export const CaseListView: React.FC = () => {
  const navigate = useNavigate()
  const cases: CaseItem[] = caseListStore.rawList

  const renderCase = (c: CaseItem): React.ReactElement => (
    <Card
      key={c.id}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ backgroundColor: '#1e293b', borderColor: '#334155' }}
    >
      <Card.Section>
        <Image src={c.image} height={140} alt={c.title} />
      </Card.Section>
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500} c="white">
          {c.title}
        </Text>
        <Badge
          color={c.status === 'En Proceso' ? 'blue' : c.status === 'Cerrado' ? 'gray' : 'grape'}
        >
          {c.status}
        </Badge>
      </Group>
      <Text size="sm" c="dimmed" mb="md">
        {c.type} • ID: {c.id}
      </Text>
      <Group gap="xs" mb="md">
        <IconClock size={14} color="gray" />
        <Text size="xs" c="dimmed">
          Actualizado: {c.updated}
        </Text>
      </Group>
      <Button
        fullWidth
        variant="light"
        color="blue"
        mt="md"
        onClick={() => navigate(AppRoutes.private.caseById(c.id))}
      >
        Abrir Workspace
      </Button>
    </Card>
  )

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: 'var(--mantine-spacing-xl)',
        boxSizing: 'border-box',
        backgroundColor: '#0f172a',
        overflowY: 'auto'
      }}
    >
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2} c="white">
            Mis Casos
          </Title>
          <Text c="dimmed" size="sm">
            Gestión de expedientes y análisis forense
          </Text>
        </div>
        <Button
          leftSection={<IconPlus size={16} />}
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan' }}
        >
          Nuevo Caso
        </Button>
      </Group>

      {/* Barra de Búsqueda */}
      {/* Se expandirá al 100% del ancho disponible del contenedor padre */}
      <Card
        radius="md"
        mb="xl"
        style={{ backgroundColor: '#1e293b', borderColor: '#334155' }}
        withBorder
      >
        <Group>
          <TextInput
            placeholder="Buscar..."
            leftSection={<IconSearch size={16} />}
            style={{ flex: 1 }}
            variant="filled"
            styles={{ input: { backgroundColor: '#0f172a' } }}
          />
          <Button variant="light" leftSection={<IconFilter size={16} />}>
            Filtros
          </Button>
        </Group>
      </Card>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing="lg">
        {cases.map(renderCase)}
      </SimpleGrid>
    </div>
  )
}

export default CaseListView
