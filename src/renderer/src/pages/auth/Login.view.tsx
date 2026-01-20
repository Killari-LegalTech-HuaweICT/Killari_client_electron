import React from 'react'

export const LoginView: React.FC = () => {
  return (
    <div>
      <h2>Login</h2>
      <form>
        <input placeholder="email" />
        <input placeholder="password" type="password" />
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}

export default LoginView
