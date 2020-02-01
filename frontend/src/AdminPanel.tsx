import React, { useContext, useState } from 'react'
import { AdminStore } from './store'

const AdminPanel: React.FC = () => {

  const store = useContext(AdminStore)

  const [name, setName] = useState('')

  const saveUser = () => {
    store.createUser(name)
    setName('')
  }

  return (
    <>
      <div>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <button onClick={() => saveUser()}>save</button>
      </div>
      <div>
        <ul>
          {store.users.map(u => {
            return (
              <li>
                {u.name}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default AdminPanel
