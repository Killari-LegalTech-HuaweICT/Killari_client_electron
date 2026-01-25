import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { registerRoute } from '../lib/electron-router-dom'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow(): void {
  // 1. Crear la instancia de la ventana
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: app.isPackaged
        ? join(process.resourcesPath, 'preload', 'index.js')
        : join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  // 2. REGISTRAR LA RUTA
  // Esto vincula la ventana con un "id" que luego usarás en tu Router de React/Vue
  registerRoute({
    id: 'main',
    browserWindow: mainWindow,
    htmlFile: join(__dirname, '../renderer/index.html')
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // 3. CARGAR LA URL O ARCHIVO
  // electron-router-dom maneja internamente la carga si usas registerRoute correctamente,
  // pero para electron-vite es mejor ser explícito:
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    // En desarrollo, apuntamos a la URL del servidor de vite + el id de la ruta
    mainWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/index.html#main`)
  } else {
    // En producción, cargamos el archivo local
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'), { hash: 'main' })
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
