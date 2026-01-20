// src/renderer/src/pages/dashboard/_router.tsx

import { Route } from 'react-router-dom'

// Router sencillo para el dashboard. Devuelve rutas anidadas que serán
// insertadas en el árbol principal por AppRouter.
export const DashboardRouter = () => {
  return (
    <>
      <Route index element={<div>Dashboard Home (placeholder)</div>} />
      <Route path="cases" element={<div>Case List (placeholder)</div>} />
    </>
  )
}

export default DashboardRouter
