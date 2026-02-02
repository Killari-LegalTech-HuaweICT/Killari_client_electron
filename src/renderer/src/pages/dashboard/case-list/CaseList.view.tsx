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

// Mock Data
const cases = [
  {
    id: 'CAS-2025-001',
    title: 'Caso: La Rinconada',
    type: 'Homicidio Calificado',
    status: 'En Proceso',
    updated: 'Hace 2 horas',
    image:
      'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'CAS-2025-004',
    title: 'Op. Mercurio Rojo',
    type: 'Lavado de Activos',
    status: 'Análisis IA',
    updated: 'Hace 5 horas',
    image:
      'https://images.unsplash.com/photo-1555881400-74d7acaacd81?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'CAS-2025-009',
    title: 'Expediente Vallejo',
    type: 'Corrupción',
    status: 'Cerrado',
    updated: 'Ayer',
    image:
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80'
  }
]

export const CaseListView: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: 'var(--mantine-spacing-xl)',
        boxSizing: 'border-box',
        backgroundColor: '#0f172a'
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

      {/* Grid de Casos */}
      {/* Agregado breakpoint 'xl' para pantallas muy anchas ya que quitamos el max-width */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing="lg">
        {cases.map((c) => (
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
                color={
                  c.status === 'En Proceso' ? 'blue' : c.status === 'Cerrado' ? 'gray' : 'grape'
                }
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
              onClick={() => navigate(`${AppRoutes.private.root}/cases/${c.id}`)}
            >
              Abrir Workspace
            </Button>
          </Card>
        ))}
      </SimpleGrid>
    </div>
  )
}

export default CaseListView
