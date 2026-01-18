import { useState } from 'react'

function Versions(): React.JSX.Element {
  const [versions] = useState(window.electron.process.versions)

  return (
    <ul className="versions">
      <li className="electron-version">Esta es la versión de electron v{versions.electron}</li>
      <li className="chrome-version">Esta es la versión de Chromium v{versions.chrome}</li>
      <li className="node-version">Esta es la versión de Node v{versions.node}</li>
    </ul>
  )
}

export default Versions
