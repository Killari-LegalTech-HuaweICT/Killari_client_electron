import React from 'react'
import { Card, Text, Group, SimpleGrid, ThemeIcon, Stack } from '@mantine/core'
import { IconBrain } from '@tabler/icons-react'
import { evidenceAnalyzerStore } from './evidence-analyzer.store'
import FindingsList, { Finding } from './components/FindingsList.view'
import TimelineCard from './components/TimelineCard.view'

// Mock data para UI
const analysisResults = [
  {
    id: 1,
    title: 'Inconsistencia en Hora',
    desc: 'La hora declarada por el testigo (22:00) no coincide con el video de seguridad (21:15).',
    confidence: 92,
    type: 'high'
  },
  {
    id: 2,
    title: 'Coincidencia Biométrica',
    desc: 'Huella parcial en el arma coincide con el sospechoso Juan Pérez.',
    confidence: 88,
    type: 'medium'
  },
  {
    id: 3,
    title: 'Vehículo Identificado',
    desc: 'Placa ABC-123 registrada en pórtico de peaje a las 23:00.',
    confidence: 99,
    type: 'high'
  }
]

export const EvidenceAnalyzerView: React.FC = () => {
  return (
    <Stack gap="lg">
      <Card radius="md" p="lg" style={{ backgroundColor: 'rgba(34, 211, 238, 0.1)', borderColor: '#22d3ee' }} withBorder>
        <Group>
          <ThemeIcon size="lg" radius="xl" color="cyan" variant="light">
            <IconBrain size={20} />
          </ThemeIcon>
          <div>
            <Text fw={700} c="cyan.1">
              Análisis de Inteligencia Artificial Completado
            </Text>
            <Text size="sm" c="dimmed">
              Se han procesado {analysisResults.length + (evidenceAnalyzerStore.analyses?.length ?? 0)} items. Se detectaron {analysisResults.length} anomalías críticas.
            </Text>
          </div>
        </Group>
      </Card>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
        <div>
          <Text size="lg" fw={600} c="white" mb="md">
            Hallazgos Detectados
          </Text>
          <FindingsList items={analysisResults as Finding[]} />
        </div>

        <div>
          <Text size="lg" fw={600} c="white" mb="md">
            Reconstrucción de Hechos
          </Text>
          <TimelineCard />
        </div>
      </SimpleGrid>
    </Stack>
  )
}

export default EvidenceAnalyzerView
