import React from 'react'
import { Card, Text, Timeline } from '@mantine/core'
import { IconAlertTriangle, IconCheck } from '@tabler/icons-react'

export const TimelineCard: React.FC = () => {
  return (
    <Card radius="md" p="xl" style={{ backgroundColor: '#1e293b', borderColor: '#334155' }} withBorder>
      <Timeline active={1} bulletSize={24} lineWidth={2}>
        <Timeline.Item bullet={<IconAlertTriangle size={12} />} title="Inicio del Incidente">
          <Text c="dimmed" size="sm">
            21:15 - Cámara de seguridad capta vehículo.
          </Text>
        </Timeline.Item>
        <Timeline.Item bullet={<IconCheck size={12} />} title="Ingreso de Sospechoso">
          <Text c="dimmed" size="sm">
            21:20 - Registro de ingreso en portería.
          </Text>
        </Timeline.Item>
        <Timeline.Item title="Evento Crítico" lineVariant="dashed">
          <Text c="dimmed" size="sm">
            21:45 - Ventana de tiempo no corroborada.
          </Text>
        </Timeline.Item>
        <Timeline.Item title="Salida">
          <Text c="dimmed" size="sm">
            22:10 - Vehículo abandona la zona.
          </Text>
        </Timeline.Item>
      </Timeline>
    </Card>
  )
}

export default TimelineCard
