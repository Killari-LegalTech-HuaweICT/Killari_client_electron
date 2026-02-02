import React from 'react'
import { Container, Accordion, Text, Alert } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'
import { recommendationsStore } from './recommendations.store'
import RecommendationItem from './components/RecommendationItem.view'

export const RecommendationsView: React.FC = () => {
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
        del caso. ({recommendationsStore.recommendations.length} sugerencias)
      </Alert>

      <Text size="sm" c="dimmed" mb="xs" fw={700} tt="uppercase">
        Diligencias Sugeridas
      </Text>

      <Accordion variant="separated" radius="md" chevronPosition="left">
        <RecommendationItem id="item-1" title="Solicitar levantamiento del secreto de comunicaciones" priority="high">
          Se ha detectado una alta frecuencia de llamadas entre el imputado y el número desconocido +51 999***123 en los momentos previos al evento.
        </RecommendationItem>

        <RecommendationItem id="item-2" title="Citar a Testigo Clave: María Gómez" priority="medium">
          Su declaración contradice parcialmente la evidencia física encontrada en la escena. Se sugiere interrogatorio complementario.
        </RecommendationItem>
      </Accordion>
    </Container>
  )
}

export default RecommendationsView
