import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// No envolvemos con HashRouter aquí porque `App` ya monta el Router de
// `electron-router-dom` en su interior. Evitamos anidar routers para no
// provocar el error: "You cannot render a <Router> inside another <Router>".
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
