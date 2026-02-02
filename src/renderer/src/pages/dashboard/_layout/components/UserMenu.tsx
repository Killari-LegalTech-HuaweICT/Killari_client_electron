import React from 'react'
import { Group, Menu, ActionIcon, Tooltip } from '@mantine/core'
import { IconSettings, IconLogout, IconUserCircle } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { useSetAtom } from 'jotai'
import { AppRoutes } from '../../../../shared/config/routes'
import { isAuthenticatedAtom } from '../../../../entities/session/model/auth.store'
import { clearSession } from '../../../../entities/session/session.store'

const UserMenu: React.FC = () => {
  const navigate = useNavigate()
  const setAuth = useSetAtom(isAuthenticatedAtom)

  /**
   * Cierra la sesión del usuario:
   * 1. Limpia los datos de la sesión (token, etc.).
   * 2. Actualiza el estado global de autenticación a `false`.
   * 3. Redirige al usuario a la página de inicio de sesión.
   */
  const handleLogout = (): void => {
    clearSession()
    setAuth(false)
    navigate(AppRoutes.public.login)
  }

  return (
    <Group>
      {/* El componente Menu envuelve el botón que lo activa y el menú desplegable */}
      <Menu shadow="md" width={200} position="bottom-end">
        <Menu.Target>
          {/* Este es el botón (el engranaje) que el usuario presionará. */}
          {/* Usamos ActionIcon para un botón de solo ícono. */}
          <Tooltip label="Opciones">
            <ActionIcon variant="light" color="gray" size="lg" radius="xl">
              <IconSettings size={20} />
            </ActionIcon>
          </Tooltip>
        </Menu.Target>

        {/* Este es el contenido del menú que aparece al hacer clic */}
        <Menu.Dropdown>
          <Menu.Label>Aplicación</Menu.Label>
          <Menu.Item leftSection={<IconUserCircle size={14} />}>Mi Perfil</Menu.Item>
          <Menu.Item leftSection={<IconSettings size={14} />}>Configuración</Menu.Item>
          <Menu.Divider />
          <Menu.Item color="red" leftSection={<IconLogout size={14} />} onClick={handleLogout}>
            Cerrar Sesión
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  )
}

export default UserMenu
