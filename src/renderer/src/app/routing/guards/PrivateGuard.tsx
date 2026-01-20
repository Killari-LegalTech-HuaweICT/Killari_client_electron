// src/renderer/src/app/routing/guards/PrivateGuard.tsx

import { Center, Loader } from '@mantine/core'
import { isAuthenticatedAtom, isLoadingSessionAtom } from '../../../entities/session/model/auth.store'
import { AppRoutes } from '../../../shared/config/routes'
import { useAtomValue } from 'jotai'
import { Navigate, Outlet } from 'react-router-dom'

export const PrivateGuard: React.FC = () => {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom)
  const isLoading = useAtomValue(isLoadingSessionAtom)

  if (isLoading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader size="xl" />
      </Center>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to={AppRoutes.public.login} replace />
  }

  return <Outlet />
}
