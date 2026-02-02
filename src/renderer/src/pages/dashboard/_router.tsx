// src/renderer/src/pages/dashboard/_router.tsx

import { Route } from 'react-router-dom'
import type { ReactElement } from 'react'
import CaseListView from './case-list/CaseList.view'
import CaseWorkspaceView from './case-workspace/CaseWorkspace.view'

// Router sencillo para el dashboard. Devuelve rutas anidadas que serán
// insertadas en el árbol principal por AppRouter.
export const DashboardRouter = (): ReactElement => {
  return (
    <>
      <Route index element={<CaseListView />} />
      <Route path="cases" element={<CaseListView />} />
      <Route path="cases/:caseId" element={<CaseWorkspaceView />} />
    </>
  )
}

export default DashboardRouter
