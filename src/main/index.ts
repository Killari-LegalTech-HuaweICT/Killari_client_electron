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
    // --- CAMBIOS AQUÍ ---
    minWidth: 800,
    minHeight: 600,
    // --------------------
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
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/index.html#main`)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'), { hash: 'main' })
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

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
