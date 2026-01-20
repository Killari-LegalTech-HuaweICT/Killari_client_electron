import React from 'react'
import { caseWorkspaceStore } from './case-workspace.store'

export const CaseWorkspaceView: React.FC = () => {
  return (
    <section>
      <header>
        <h2>Case Workspace</h2>
        <p>Tab activa: {caseWorkspaceStore.activeTab}</p>
      </header>
    </section>
  )
}

export default CaseWorkspaceView
