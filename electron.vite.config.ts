import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'

// Queremos que los bundles de main/preload/renderer se escriban en `dist/` en
// vez de `out/`. Además, evitamos que cada build vacíe completamente el
// directorio para no borrar artefactos de los otros targets estableciendo
// `emptyOutDir: false`.
export default defineConfig({
  main: {
    resolve: {
      alias: {
        '@main': resolve('src/main')
      }
    },
    build: {
      outDir: 'dist/main',
      emptyOutDir: false
    }
  },
  preload: {
    resolve: {
      alias: {
        '@preload': resolve('src/preload')
      }
    },
    build: {
      outDir: 'dist/preload',
      emptyOutDir: false,
      // Mantener compatibilidad con Node/V8 moderno en preload
      target: 'node22',
      rollupOptions: {
        output: {
          format: 'cjs'
        }
      }
    }
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()],
    build: {
      outDir: 'dist/renderer',
      emptyOutDir: false
    }
  }
})
