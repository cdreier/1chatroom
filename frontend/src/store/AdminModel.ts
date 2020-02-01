import { observable, action } from 'mobx'

class User {
  name: string
  hash: string
}

class AdminModel {

  @observable users: User[] = []

  @action
  fetchUsers() {
    fetch('/admin/users')
      .then(r => r.json())
      .then(data => {
        this.users = data
      })
  }

  @action
  createUser(userName: string) {
    // fetch
    fetch('/admin/users', {
      method: 'POST',
      body: JSON.stringify({
        name: userName,
      }),
    }).then(r => r.json())
      .then(u => {
        this.users.push(u)
      })
  }
}

export default AdminModel
