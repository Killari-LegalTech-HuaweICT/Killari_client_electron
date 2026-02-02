import React from 'react'
import {
  Accordion,
  ThemeIcon,
  Text,
  Group,
  Badge,
  Button,
  Stack,
  Loader,
  ActionIcon,
  Tooltip
} from '@mantine/core'
import { IconBulb, IconFileAnalytics, IconX, IconCheck } from '@tabler/icons-react'
import type { Recommendation } from './recommendations.domain'

interface RecommendationItemProps {
  recommendation: Recommendation
  isGenerating?: boolean
  onGenerate?: () => void
  onDismiss?: () => void
}

const priorityConfig = {
  high: { color: 'red', label: 'Alta Prioridad' },
  medium: { color: 'blue', label: 'Media Prioridad' },
  low: { color: 'gray', label: 'Baja Prioridad' }
} as const

const statusConfig = {
  pending: { color: 'yellow', label: 'Pendiente' },
  in_progress: { color: 'blue', label: 'En Progreso' },
  completed: { color: 'green', label: 'Completado' },
  dismissed: { color: 'gray', label: 'Descartado' }
} as const

export const RecommendationItem: React.FC<RecommendationItemProps> = ({
  recommendation,
  isGenerating = false,
  onGenerate,
  onDismiss
}) => {
  const { id, title, content, priority, status } = recommendation
  const priorityInfo = priorityConfig[priority]
  const statusInfo = statusConfig[status]

  const isActionable = status === 'pending'

  return (
    <Accordion.Item value={id} style={{ backgroundColor: '#1e293b', borderColor: '#334155' }}>
      <Accordion.Control
        icon={
          <ThemeIcon color={priorityInfo.color} variant="light">
            {status === 'completed' ? <IconCheck size={16} /> : <IconBulb size={16} />}
          </ThemeIcon>
        }
      >
        <Group justify="space-between" pr="md">
          <Text c="white" style={{ opacity: status === 'dismissed' ? 0.5 : 1 }}>
            {title}
          </Text>
          <Group gap="xs">
            <Badge color={priorityInfo.color} size="sm">
              {priorityInfo.label}
            </Badge>
            <Badge color={statusInfo.color} size="sm" variant="outline">
              {statusInfo.label}
            </Badge>
          </Group>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <Stack gap="md">
          <Text size="sm" c="dimmed">
            {content}
          </Text>

          {isActionable && (
            <Group gap="sm">
              <Button
                size="xs"
                variant="light"
                color="cyan"
                rightSection={isGenerating ? <Loader size={14} /> : <IconFileAnalytics size={14} />}
                onClick={onGenerate}
                disabled={isGenerating}
                loading={isGenerating}
              >
                {isGenerating ? 'Generando...' : 'Generar Oficio Automático'}
              </Button>

              <Tooltip label="Descartar sugerencia">
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  size="sm"
                  onClick={onDismiss}
                  disabled={isGenerating}
                >
                  <IconX size={14} />
                </ActionIcon>
              </Tooltip>
            </Group>
          )}

          {status === 'completed' && (
            <Text size="xs" c="green">
              ✓ Oficio generado exitosamente
            </Text>
          )}
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  )
}

export default RecommendationItem
