import React from 'react'
import { caseListStore } from './case-list.store'
import CaseCard from './case-card.view'

export const CaseListView: React.FC = () => {
  return (
    <section>
      <h2>Casos</h2>
      <div>
        {caseListStore.list.map((c) => (
          <CaseCard key={c.id} c={c} />
        ))}
      </div>
    </section>
  )
}

export default CaseListView
