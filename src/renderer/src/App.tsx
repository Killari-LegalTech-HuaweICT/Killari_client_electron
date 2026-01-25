import type { ReactElement } from 'react'
import { Router } from '../../lib/electron-router-dom'
import { withProviders } from './app/providers'
import AppRouter from './app/routing'

// 1. IMPORTA LOS ESTILOS DE MANTINE (OBLIGATORIO)
import '@mantine/core/styles.css'
import { MantineProvider, createTheme } from '@mantine/core'

// 2. DEFINE EL TEMA DE KILLARI (OPCIONAL PERO RECOMENDADO)
const killariTheme = createTheme({
  primaryColor: 'indigo',
  fontFamily: 'Inter, sans-serif'
})

/**
 * El componente raíz de la aplicación.
 */
export function App(): ReactElement {
  return (
    // 3. ENVUELVE CON EL PROVIDER
    <MantineProvider theme={killariTheme} defaultColorScheme="dark">
      <Router main={AppRouter()} />
    </MantineProvider>
  )
}

// Named wrapper so fast-refresh can identify the exported component
export const AppWithProviders = withProviders(App)

export default AppWithProviders
