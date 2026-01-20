import React from 'react'
import { recommendationsStore } from './recommendations.store'

export const RecommendationsView: React.FC = () => {
  return (
    <section>
      <h4>Recomendaciones</h4>
      <ul>
        {recommendationsStore.recommendations.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </section>
  )
}

export default RecommendationsView
