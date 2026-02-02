import React from 'react'
import { Card, Text, Timeline } from '@mantine/core'
import { IconAlertTriangle, IconCheck, IconInfoCircle } from '@tabler/icons-react'
import { evidenceAnalyzerStore } from '../evidence-analyzer.store'

export const TimelineCard: React.FC = () => {
  const events = evidenceAnalyzerStore.currentAnalysis.timeline

  return (
    <Card
      radius="md"
      p="xl"
      style={{ backgroundColor: '#1e293b', borderColor: '#334155' }}
      withBorder
    >
      <Timeline active={events.length - 1} bulletSize={24} lineWidth={2}>
        {events.map((evt) => (
          <Timeline.Item
            key={evt.id}
            bullet={
              evt.type === 'critical' ? (
                <IconAlertTriangle size={12} />
              ) : evt.type === 'verified' ? (
                <IconCheck size={12} />
              ) : (
                <IconInfoCircle size={12} />
              )
            }
            title={evt.title}
            color={evt.type === 'critical' ? 'red' : evt.type === 'verified' ? 'teal' : 'blue'}
            lineVariant={evt.status === 'unconfirmed' ? 'dashed' : 'solid'}
          >
            <Text c="dimmed" size="sm">
              {evt.time} - {evt.description}
            </Text>
          </Timeline.Item>
        ))}
      </Timeline>
    </Card>
  )
}

export default TimelineCard
