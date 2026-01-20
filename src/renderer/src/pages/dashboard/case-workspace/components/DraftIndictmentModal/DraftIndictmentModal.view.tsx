import React from 'react'

export const DraftIndictmentModal: React.FC<{ open?: boolean }> = ({ open = false }) => {
  if (!open) return null
  return (
    <div role="dialog">
      <h3>Borrador de Acusación</h3>
      <p>Contenido generado (placeholder)</p>
    </div>
  )
}

export default DraftIndictmentModal
