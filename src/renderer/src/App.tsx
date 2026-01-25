import type { ReactElement } from 'react'
import { Router } from '../../lib/electron-router-dom'
import { withProviders } from './app/providers'
import AppRouter from './app/routing'

/**
 * El componente raíz de la aplicación.
 * 1. Establece el contexto del Router de 'electron-router-dom'.
 * 2. Renderiza el AppRouter, que contiene todas las definiciones de <Routes>.
 * 3. Es envuelto por el HOC 'withProviders' para obtener todos los demás contextos.
 */
export function App(): ReactElement {
  return <Router main={AppRouter()} basename="/" />
}

// Named wrapper so fast-refresh can identify the exported component
export const AppWithProviders = withProviders(App)

export default AppWithProviders
