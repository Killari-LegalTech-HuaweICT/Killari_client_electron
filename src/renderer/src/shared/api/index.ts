// Placeholder API facade for communication with Electron main process
export const api = {
  send: (channel: string, payload?: any) => {
    // window.electron?.send(channel, payload)
  },
  invoke: async (channel: string, payload?: any) => {
    // return window.electron?.invoke(channel, payload)
    return null
  }
}
