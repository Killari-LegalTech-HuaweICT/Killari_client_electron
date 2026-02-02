import React, { useState } from 'react'
import { Card, Text, Group, SimpleGrid, ThemeIcon, Stack, Button, Loader } from '@mantine/core'
import { IconBrain, IconRefresh } from '@tabler/icons-react'
import { evidenceAnalyzerStore, evidenceActions } from './evidence-analyzer.store'
import FindingsList from './components/FindingsList.view'
import TimelineCard from './components/TimelineCard.view'

export const EvidenceAnalyzerView: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [findings, setFindings] = useState(evidenceAnalyzerStore.currentAnalysis.findings)

  const handleRunAnalysis = async (): Promise<void> => {
    setLoading(true)
    await evidenceActions.runAnalysis()
    setFindings([...evidenceAnalyzerStore.currentAnalysis.findings])
    setLoading(false)
  }

  return (
    <Stack gap="lg">
      <Card
        radius="md"
        p="lg"
        style={{ backgroundColor: 'rgba(34, 211, 238, 0.1)', borderColor: '#22d3ee' }}
        withBorder
      >
        <Group justify="space-between">
          <Group>
            <ThemeIcon size="lg" radius="xl" color="cyan" variant="light">
              <IconBrain size={20} />
            </ThemeIcon>
            <div>
              <Text fw={700} c="cyan.1">
                Análisis de Inteligencia Artificial
              </Text>
              <Text size="sm" c="dimmed">
                {findings.length} anomalías detectadas en documentos y multimedia.
              </Text>
            </div>
          </Group>
          <Button
            variant="light"
            color="cyan"
            leftSection={loading ? <Loader size={12} color="white" /> : <IconRefresh size={16} />}
            onClick={handleRunAnalysis}
            disabled={loading}
          >
            {loading ? 'Analizando...' : 'Re-ejecutar Análisis'}
          </Button>
        </Group>
      </Card>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
        <div>
          <Text size="lg" fw={600} c="white" mb="md">
            Hallazgos Detectados
          </Text>
          <FindingsList items={findings} />
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
