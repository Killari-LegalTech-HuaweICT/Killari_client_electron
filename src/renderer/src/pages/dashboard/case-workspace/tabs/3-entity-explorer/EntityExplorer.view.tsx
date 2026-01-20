import React from 'react'
import { entityExplorerStore } from './entity-explorer.store'

export const EntityExplorerView: React.FC = () => {
  return (
    <section>
      <h4>Entity Explorer</h4>
      <ul>
        {entityExplorerStore.entities.map((e, i) => (
          <li key={i}>{JSON.stringify(e)}</li>
        ))}
      </ul>
    </section>
  )
}

export default EntityExplorerView
