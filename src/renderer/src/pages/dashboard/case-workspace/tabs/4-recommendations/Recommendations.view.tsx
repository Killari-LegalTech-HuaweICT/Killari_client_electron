import React, { useEffect, useState } from 'react'
import { Container, Accordion, Text, Alert, Loader, Center, Stack } from '@mantine/core'
import { IconInfoCircle, IconAlertCircle } from '@tabler/icons-react'
import { recommendationsStore, recommendationsActions } from './recommendations.store'
import type { Recommendation } from './recommendations.domain'
import RecommendationItem from './RecommendationItem.view'

export const RecommendationsView: React.FC<{ caseId?: string }> = ({ caseId = 'default-case' }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isGenerating, setIsGenerating] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadRecommendations = async (): Promise<void> => {
      setIsLoading(true)
      setError(null)
      try {
        await recommendationsActions.fetchRecommendations(caseId)
        setRecommendations([...recommendationsStore.recommendations])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading recommendations')
      } finally {
        setIsLoading(false)
      }
    }

    loadRecommendations()
  }, [caseId])

  const handleGenerateOficio = async (recommendation: Recommendation): Promise<void> => {
    console.log(`[Killari AI] Generando oficio para: "${recommendation.title}"`)
    setIsGenerating(recommendation.id)

    try {
      const oficio = await recommendationsActions.generateOficio(recommendation.id)
      if (oficio) {
        console.log('[Killari AI] Oficio generado exitosamente:', oficio.id)
        // Refresh recommendations to show updated status
        setRecommendations([...recommendationsStore.recommendations])
      }
    } catch (err) {
      console.error('[Killari AI] Error generando oficio:', err)
    } finally {
      setIsGenerating(null)
    }
  }

  const handleDismiss = (id: string): void => {
    recommendationsActions.dismissRecommendation(id)
    setRecommendations([...recommendationsStore.recommendations])
  }

  if (isLoading) {
    return (
      <Center h={200}>
        <Stack align="center" gap="md">
          <Loader size="lg" color="cyan" />
          <Text c="dimmed">Analizando caso con IA...</Text>
        </Stack>
      </Center>
    )
  }

  if (error) {
    return (
      <Alert variant="light" color="red" title="Error" icon={<IconAlertCircle />}>
        {error}
      </Alert>
    )
  }

  const pendingCount = recommendations.filter((r) => r.status === 'pending').length
  const totalCount = recommendations.length

  return (
    <Container size="lg">
      <Alert
        variant="light"
        color="cyan"
        title="Asistente Cognitivo Killari"
        icon={<IconInfoCircle />}
        mb="xl"
      >
        La IA ha analizado el caso y sugiere las siguientes diligencias para fortalecer la teoría
        del caso. ({pendingCount} pendientes de {totalCount} sugerencias)
      </Alert>

      <Text size="sm" c="dimmed" mb="xs" fw={700} tt="uppercase">
        Diligencias Sugeridas
      </Text>

      {recommendations.length === 0 ? (
        <Text c="dimmed" ta="center" py="xl">
          No hay recomendaciones disponibles para este caso.
        </Text>
      ) : (
        <Accordion variant="separated" radius="md" chevronPosition="left">
          {recommendations.map((item) => (
            <RecommendationItem
              key={item.id}
              recommendation={item}
              isGenerating={isGenerating === item.id}
              onGenerate={() => handleGenerateOficio(item)}
              onDismiss={() => handleDismiss(item.id)}
            />
          ))}
        </Accordion>
      )}
    </Container>
  )
}

export default RecommendationsView
