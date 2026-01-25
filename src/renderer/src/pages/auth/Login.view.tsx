import React from 'react'
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Text,
  Container,
  Group,
  Tabs,
  Stack,
  ActionIcon,
  rem,
  Title,
  Center
} from '@mantine/core'
import {
  IconFingerprint,
  IconMail,
  IconPhone,
  IconMoonStars,
  IconArrowRight
} from '@tabler/icons-react'

export const LoginView: React.FC = () => {
  return (
    // Contenedor principal con un fondo sutil inspirado en la luna
    <div
      style={{
        backgroundColor: '#0a0f1e',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundImage: 'radial-gradient(circle at 50% -20%, #1e293b 0%, #0a0f1e 80%)'
      }}
    >
      <Container size={420} my={40}>
        {/* Logo / Marca Killari */}
        <Center mb="xl">
          <Stack gap={0} align="center">
            <IconMoonStars size={48} color="#e2e8f0" stroke={1.5} />
            <Title
              order={1}
              c="white"
              style={{ fontFamily: 'Greycliff CF, sans-serif', letterSpacing: rem(2) }}
            >
              KILLARI
            </Title>
            <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
              Luz de Luna
            </Text>
          </Stack>
        </Center>

        <Paper
          radius="md"
          p="xl"
          withBorder
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: '#1e293b' }}
        >
          <Text size="lg" fw={500} c="white" mb="md" ta="center">
            Bienvenido de nuevo
          </Text>

          <Tabs color="blue" variant="pills" defaultValue="biometric">
            <Tabs.List grow mb="xl">
              <Tabs.Tab value="biometric" leftSection={<IconFingerprint size={16} />}>
                Huella
              </Tabs.Tab>
              <Tabs.Tab value="email" leftSection={<IconMail size={16} />}>
                Correo
              </Tabs.Tab>
              <Tabs.Tab value="phone" leftSection={<IconPhone size={16} />}>
                Celular
              </Tabs.Tab>
            </Tabs.List>

            {/* OPCIÓN 1: HUELLA DIGITAL (SESIÓN BIOMÉTRICA) */}
            <Tabs.Panel value="biometric">
              <Stack align="center" py="xl">
                <Text c="dimmed" size="sm" ta="center">
                  Usa tu huella digital o reconocimiento facial para entrar rápidamente.
                </Text>
                <ActionIcon
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan' }}
                  size={80}
                  radius={100}
                  onClick={() => console.log('Iniciando biometría...')}
                >
                  <IconFingerprint size={45} />
                </ActionIcon>
                <Text size="xs" c="blue" style={{ cursor: 'pointer' }}>
                  ¿Problemas con el sensor?
                </Text>
              </Stack>
            </Tabs.Panel>

            {/* OPCIÓN 2: CORREO Y CONTRASEÑA */}
            <Tabs.Panel value="email">
              <form>
                <Stack>
                  <TextInput
                    required
                    label="Correo electrónico"
                    placeholder="hola@killari.com"
                    radius="md"
                    variant="filled"
                    styles={{ input: { backgroundColor: '#1e293b', color: 'white' } }}
                  />
                  <PasswordInput
                    required
                    label="Contraseña"
                    placeholder="Tu contraseña"
                    radius="md"
                    variant="filled"
                    styles={{ input: { backgroundColor: '#1e293b', color: 'white' } }}
                  />
                </Stack>

                <Group justify="space-between" mt="xl">
                  <Text c="dimmed" size="xs" style={{ cursor: 'pointer' }}>
                    ¿Olvidaste tu contraseña?
                  </Text>
                  <Button type="submit" radius="xl" color="blue">
                    Entrar
                  </Button>
                </Group>
              </form>
            </Tabs.Panel>

            {/* OPCIÓN 3: SOLO CELULAR (OTP / CÓDIGO) */}
            <Tabs.Panel value="phone">
              <Stack>
                <TextInput
                  label="Número de celular"
                  placeholder="+51 999 999 999"
                  radius="md"
                  variant="filled"
                  leftSection={<IconPhone size={16} />}
                  styles={{ input: { backgroundColor: '#1e293b', color: 'white' } }}
                />
                <Button
                  fullWidth
                  radius="xl"
                  color="blue"
                  rightSection={<IconArrowRight size={16} />}
                >
                  Enviar código de acceso
                </Button>
                <Text size="xs" ta="center" c="dimmed">
                  Te enviaremos un SMS con un código de seguridad.
                </Text>
              </Stack>
            </Tabs.Panel>
          </Tabs>
        </Paper>

        <Text ta="center" mt="md" c="dimmed" size="sm">
          ¿No tienes cuenta?{' '}
          <Text component="span" c="blue" fw={700} style={{ cursor: 'pointer' }}>
            Regístrate
          </Text>
        </Text>
      </Container>
    </div>
  )
}

export default LoginView
