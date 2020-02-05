import React, { useState } from 'react'

interface LoginProps {
  onLogin: (token: string) => void
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {

  const [token, setToken] = useState('')

  const submit = () => {
    onLogin(token)
  }

  return (
    <div>
      <input value={token} onChange={e => setToken(e.target.value)} />
      <button onClick={() => submit()}>login</button>
    </div>
  )
}

export default Login
