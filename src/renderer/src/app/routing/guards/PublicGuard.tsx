// src/renderer/src/app/routing/guards/PublicGuard.tsx

import { Center, Loader } from '@mantine/core'
import {
  isAuthenticatedAtom,
  isLoadingSessionAtom
} from '../../../entities/session/model/auth.store'
import { AppRoutes } from '../../../shared/config/routes'
import { useAtomValue } from 'jotai'
import { Navigate, Outlet } from 'react-router-dom'

export const PublicGuard: React.FC = () => {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom)
  const isLoading = useAtomValue(isLoadingSessionAtom)

  if (isLoading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader size="xl" />
      </Center>
    )
  }

  if (isAuthenticated) {
    // <-- Usamos la constante en lugar de '/dashboard'
    return <Navigate to={AppRoutes.private.root} replace />
  }

  return <Outlet />
}
