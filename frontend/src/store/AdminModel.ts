import { observable, action } from 'mobx'

class User {
  name: string
  id: string
}

class AdminModel {

  @observable users: User[] = []
  @observable token: string = ''
  @observable tokenSubmitted: boolean = false

  @action
  fetchUsers() {
    fetch('/api/admin/users', {
      headers: {
        Authorization: this.token,
      },
    })
      .then(r => r.json())
      .then(data => {
        this.users = data
      })
  }

  @action
  createUser(userName: string) {
    // fetch
    fetch('/api/admin/users', {
      method: 'POST',
      headers: {
        Authorization: this.token,
      },
      body: JSON.stringify({
        name: userName,
      }),
    }).then(r => r.json())
      .then(u => {
        console.log(u)
        this.users.push(u)
      })
  }
}

export default AdminModel
