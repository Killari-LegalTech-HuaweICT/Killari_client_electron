import React from 'react'
import { Grid } from '@mantine/core'
import EntityList, { Entity } from './components/EntityList.view'
import GraphCanvas from './components/GraphCanvas.view'

const entities = [
  { name: 'Juan Pérez', type: 'Person', role: 'Imputado', avatar: null },
  { name: 'Empresa X SAC', type: 'Org', role: 'Involucrado', avatar: null },
  { name: 'Av. Arequipa 505', type: 'Location', role: 'Lugar de los hechos', avatar: null },
  { name: 'María Gómez', type: 'Person', role: 'Testigo', avatar: null }
]

export const EntityExplorerView: React.FC = () => {
  const items: Entity[] = entities

  return (
    <Grid h="100%" gutter="md">
      <Grid.Col span={3}>
        <EntityList items={items} />
      </Grid.Col>

      <Grid.Col span={9}>
        <GraphCanvas />
      </Grid.Col>
    </Grid>
  )
}

export default EntityExplorerView
