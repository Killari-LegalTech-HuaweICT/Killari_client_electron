import { createElectronRouter } from 'electron-router-dom'

// Nota: no definimos `types.ids` para evitar que el Router añada un
// `basename` basado en el id de la ventana (por ejemplo `/main`), lo cual
// provoca que la ruta raíz `/` no coincida en dev. Si necesitas scoping por
// ventana en el futuro, añade `types.ids` con cuidado y adapta las rutas.
export const { Router, registerRoute, settings } = createElectronRouter({
  port: 5173
})
