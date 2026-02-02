import React, { useState } from 'react'
import { Tabs } from '@mantine/core'
import DocumentViewerView from './tabs/1-document-viewer/DocumentViewer.view'
import EvidenceAnalyzerView from './tabs/2-evidence-analyzer/EvidenceAnalyzer.view'
import EntityExplorerView from './tabs/3-entity-explorer/EntityExplorer.view'
import RecommendationsView from './tabs/4-recommendations/Recommendations.view'
import ChatView from './components/Chat/Chat.view'

export const CaseWorkspaceView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>('documents')

  // El componente Tabs ahora es el contenedor principal y debe expandirse.
  return (
    <Tabs
      value={activeTab}
      onChange={setActiveTab}
      variant="outline"
      color="cyan"
      radius={0}
      style={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        overflow: 'hidden'
      }}
      styles={{
        // No forzamos altura en los panels; el contenedor padre gestionará el scroll
        panel: { padding: 0 },
        list: {
          backgroundColor: '#1e293b',
          borderBottom: '1px solid #334155',
          borderTop: 'none',
          borderLeft: 'none',
          borderRight: 'none'
        },
        tab: { color: '#94a3b8', '&[data-active]': { color: '#22d3ee', borderColor: '#22d3ee' } }
      }}
    >
      <Tabs.List>
        <Tabs.Tab value="documents">Expediente Digital</Tabs.Tab>
        <Tabs.Tab value="evidence">Análisis de Evidencia</Tabs.Tab>
        <Tabs.Tab value="entities">Grafo de Entidades</Tabs.Tab>
        <Tabs.Tab value="recommendations">Recomendaciones IA</Tabs.Tab>
      </Tabs.List>

      {/* Contenedor para el panel y el chat */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', width: '100%' }}>
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', minWidth: 0 }}>
          <Tabs.Panel value="documents" style={{ padding: 20 }}>
            <DocumentViewerView />
          </Tabs.Panel>
          <Tabs.Panel value="evidence" style={{ padding: 20 }}>
            <EvidenceAnalyzerView />
          </Tabs.Panel>
          <Tabs.Panel value="entities" style={{ padding: 20 }}>
            <EntityExplorerView />
          </Tabs.Panel>
          <Tabs.Panel value="recommendations" style={{ padding: 20 }}>
            <RecommendationsView />
          </Tabs.Panel>
        </div>

        {/* Columna de Chat */}
        <div
          style={{
            flex: '0 0 320px',
            borderLeft: '1px solid #334155',
            padding: 12,
            minWidth: 260
          }}
        >
          <ChatView />
        </div>
      </div>
    </Tabs>
  )
}

export default CaseWorkspaceView
