import { observable } from 'mobx'

class MessageModel {
  author: string = ''
  text: string = ''
  time: Date = new Date()

}

class UserModel {
  name: string = ''
  id: string = ''
  online: boolean = false
}

enum MESSAGETYPES {
  USERSTATUS = 'USERSTATUS',
  MESSAGE = 'MESSAGE',
}

class ChatModel {

  @observable id: string = ''
  @observable name: string = ''
  @observable messages: MessageModel[] = []
  @observable users: UserModel[] = []

  socket: WebSocket = null

  connect(id: string) {
    this.socket = new WebSocket(`${location.protocol.replace('http', 'ws')}//${location.host}/api/ws?Authorization=${id}`)
    this.socket.onopen = (evt) => {
      console.log('OPEN')
    }
    this.socket.onclose = (evt) => {
      console.log('CLOSE')
      this.socket = null
    }
    this.socket.onmessage = (evt) => {
      const data = JSON.parse(evt.data)
      console.log(data.type, MESSAGETYPES.USERSTATUS.toString())
      switch (data.type) {
        case MESSAGETYPES.USERSTATUS.toString():
          this.users = data.users
          break
      }
      console.log('RESPONSE: ', data)
    }
    this.socket.onerror = (evt) => {
      console.log('ERROR: ', evt)
    }
  }

}

export default ChatModel
