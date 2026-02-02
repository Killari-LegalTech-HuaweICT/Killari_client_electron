import React from 'react'
import { Grid } from '@mantine/core'
import { EntityList } from './components/EntityList.view'
import GraphCanvas from './components/GraphCanvas.view'
import { entityExplorerStore } from './entity-explorer.store'

export const EntityExplorerView: React.FC = () => {
  // Direct store usage for mock purposes, in real app usage selector/hook
  const items = entityExplorerStore.data.nodes

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
