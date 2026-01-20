// src/renderer/src/app/routing/index.tsx

import { OnboardingGuard } from '../../features/onboarding-guard'
import { AuthPage } from '../../pages/auth/AuthPage'
import { DashboardRouter } from '../../pages/dashboard/_router'
import { OnboardingPage } from '../../pages/onboarding'
import { AppRoutes } from '../../shared/config/routes'
import { Navigate, Route } from 'react-router-dom'

import { PrivateGuard } from './guards/PrivateGuard'
import { PublicGuard } from './guards/PublicGuard'

/**
 * AppRouter ya NO renderiza un componente <Routes>.
 * En su lugar, simplemente DEFINE y EXPORTA la lista de componentes <Route>
 * que serán gestionados por el <Router> de electron-router-dom en App.tsx.
 */
const AppRouter = () => {
  return (
    <>
      {/* 1. Rutas Públicas */}
      <Route element={<PublicGuard />}>
        <Route path={`${AppRoutes.public.root}/*`} element={<AuthPage />} />
      </Route>

      {/* 2. Rutas Privadas */}
      <Route element={<PrivateGuard />}>
        <Route element={<OnboardingGuard />}>
          <Route path={`${AppRoutes.private.root}/*`}>{DashboardRouter()}</Route>
        </Route>
        <Route path={`${AppRoutes.private.onboarding.root}/*`} element={<OnboardingPage />} />
      </Route>

      {/* 3. Redirección Raíz y Fallback */}
      {/* Al iniciar la app llevamos al login como vista principal */}
      <Route path="/" element={<Navigate to={AppRoutes.public.login} replace />} />
      <Route path="*" element={<h1>404: Page Not Found</h1>} />
    </>
  )
}

export default AppRouter
