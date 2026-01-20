import React from 'react'
import { evidenceAnalyzerStore } from './evidence-analyzer.store'

export const EvidenceAnalyzerView: React.FC = () => {
  return (
    <section>
      <h4>Evidence Analyzer</h4>
      <ul>
        {evidenceAnalyzerStore.analyses.map((a) => (
          <li key={a.id}>{a.summary}</li>
        ))}
      </ul>
    </section>
  )
}

export default EvidenceAnalyzerView
