import React from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { AppShell, Group, ActionIcon, Tooltip, Text, Badge, Paper } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import UserMenu from './components/UserMenu'
import { AppRoutes } from '../../../shared/config/routes'

// --- La Cabecera Unificada ---
const UnifiedHeader: React.FC = () => {
  const navigate = useNavigate()
  const { caseId } = useParams<{ caseId: string }>()
  const isCaseWorkspace = !!caseId

  const caseDetails = {
    name: 'Caso: La Rinconada',
    type: 'Homicidio'
  }

  return (
    <Paper
      component={Group}
      justify="space-between"
      h="100%"
      px="md"
      radius={0}
      style={{ backgroundColor: '#1e293b', borderBottom: '1px solid #334155' }}
    >
      <Group>
        {isCaseWorkspace ? (
          <>
            <Tooltip label="Volver a la lista de casos">
              <ActionIcon
                variant="subtle"
                color="gray"
                onClick={() => navigate(AppRoutes.private.cases)}
              >
                <IconArrowLeft size={20} />
              </ActionIcon>
            </Tooltip>
            <div>
              <Group gap="xs">
                <Text fw={700} c="white">
                  {caseDetails.name}
                </Text>
                <Badge variant="outline" color="yellow">
                  {caseDetails.type}
                </Badge>
              </Group>
              <Text size="xs" c="dimmed">
                ID: {caseId}
              </Text>
            </div>
          </>
        ) : (
          <Text fw={700} c="white">
            KILLARI | Mis Casos
          </Text>
        )}
      </Group>
      <UserMenu />
    </Paper>
  )
}

// --- El Layout Principal ---
export const DashboardLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <AppShell
      header={{ height: 65 }}
      padding={0}
      styles={{
        root: {
          height: '100%', // El AppShell debe ocupar el 100% del #root
          display: 'flex',
          flexDirection: 'column'
        },
        main: {
          backgroundColor: '#0f172a',
          height: '100vh', // Forza al main a ocupar la ventana
          display: 'flex', // Habilita flexbox para los hijos directos
          flexDirection: 'column',
          paddingTop: 'var(--app-shell-header-height)' // Asegura que no quede oculto tras el header
        }
      }}
    >
      <AppShell.Header>
        <UnifiedHeader />
      </AppShell.Header>

      <AppShell.Main>
        {/*
            Contenedor Flex que obliga al contenido (Outlet)
            a expandirse y ocupar todo el espacio restante
        */}
        <div
          style={{
            flex: 1, // Ocupa el espacio restante verticalmente
            display: 'flex', // Contexto flex para los hijos (vistas)
            flexDirection: 'column',
            overflow: 'hidden', // Previene scroll doble global
            width: '100%'
          }}
        >
          {children ?? <Outlet />}
        </div>
      </AppShell.Main>
    </AppShell>
  )
}

export default DashboardLayout
