import { observable, action } from 'mobx'

class User {
  name: string
  id: string
}

class AdminModel {

  @observable users: User[] = []
  @observable token: string = ''
  @observable tokenSubmitted: boolean = false
  @observable errorMessage: string = ''

  @action
  fetchUsers() {
    fetch('/api/admin/users', {
      headers: {
        Authorization: this.token,
      },
    }).then(r => {
      if (!r.ok) throw r
      return r.json()
    })
    .then(data => {
      this.users = data
    })
    .catch(e => {
      e.text().then((msg: string) => {
        this.errorMessage = msg
      })
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
    }).then(r => {
      if (!r.ok) throw r
      return r.json()
    })
    .then(u => {
      this.users.push(u)
    })
    .catch(e => {
      e.text().then((msg: string) => {
        this.errorMessage = msg
      })
    })
  }
}

export default AdminModel
