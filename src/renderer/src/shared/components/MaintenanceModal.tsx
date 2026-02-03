import React from 'react'
import { Modal, Text, Button, Stack, ThemeIcon, Group } from '@mantine/core'
import { IconTool, IconAlertCircle } from '@tabler/icons-react'

interface MaintenanceModalProps {
  opened: boolean
  onClose: () => void
  featureName?: string
}

export const MaintenanceModal: React.FC<MaintenanceModalProps> = ({
  opened,
  onClose,
  featureName = 'esta funcionalidad'
}) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      title={
        <Group gap="xs">
          <IconAlertCircle size={18} color="var(--mantine-color-yellow-5)" />
          <Text fw={700}>Aviso del Sistema</Text>
        </Group>
      }
      styles={{
        content: {
          backgroundColor: '#1e293b', // Color de tus cards
          border: '1px solid #334155',
          color: 'white'
        },
        header: {
          backgroundColor: '#1e293b',
          borderBottom: '1px solid #334155'
        },
        close: {
          color: 'gray',
          '&:hover': { backgroundColor: '#334155' }
        }
      }}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3
      }}
    >
      <Stack align="center" gap="md" py="xl">
        <ThemeIcon size={60} radius="xl" color="yellow" variant="light">
          <IconTool size={34} />
        </ThemeIcon>

        <div style={{ textAlign: 'center' }}>
          <Text size="lg" fw={600} c="white">
            Mantenimiento en Curso
          </Text>
          <Text size="sm" c="dimmed" mt="xs">
            Estamos optimizando los módulos de IA para <b>{featureName}</b>. Esta sección estará
            disponible en la próxima actualización.
          </Text>
        </div>

        <Button fullWidth variant="light" color="yellow" onClick={onClose} mt="md">
          Entendido
        </Button>
      </Stack>
    </Modal>
  )
}
