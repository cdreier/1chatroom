import { observable, computed } from 'mobx'

class MessageModel {
  author: string = ''
  text: string = ''
  time: Date = new Date()

  constructor(author: string, msg: string, time: string) {
    this.author = author
    this.text = msg
    this.time = new Date(time)
  }

  @computed
  get hash(): string {
    return btoa(this.author + this.text + this.time.toString())
  }

}

class UserModel {
  name: string = ''
  online: boolean = false

  static fromJSON(json: UserModel): UserModel {
    const u = new UserModel()
    u.name = json.name
    u.online = json.online
    return u
  }
}

enum MESSAGETYPES {
  USERSTATUS = 'USERSTATUS',
  MESSAGE = 'MESSAGE',
  LOADMORE = 'MORE',
}

class ChatModel {

  @observable id: string = ''
  @observable self: string = ''
  @observable messages: MessageModel[] = []
  @observable users: UserModel[] = []
  @observable connected: boolean = false

  socket: WebSocket = null

  connect(id: string) {
    this.socket = new WebSocket(`${location.protocol.replace('http', 'ws')}//${location.host}/api/ws?Authorization=${id}`)
    this.socket.onopen = (evt) => {
      this.connected = true
    }
    this.socket.onclose = (evt) => {
      this.connected = false
      this.socket = null
    }
    this.socket.onerror = (evt) => console.log('ERROR: ', evt)
    this.socket.onmessage = (evt) => this.onMessage(evt)
  }

  onMessage(evt: MessageEvent) {
    const data = JSON.parse(evt.data)
    switch (data.type) {
      case MESSAGETYPES.USERSTATUS.toString():
        this.users = data.users.map((u: UserModel) => UserModel.fromJSON(u))
        this.self = data.self
        break
      case MESSAGETYPES.MESSAGE.toString():
        this.messages.push(new MessageModel(data.author, data.text, data.date))
        const sortedMessages = this.messages.slice().sort((a: MessageModel, b: MessageModel) => {
          return a.time.getTime() - b.time.getTime()
        })
        // @ts-ignore
        this.messages.replace(sortedMessages)
        break
    }
  }

  loadMore() {
    if (this.messages.length === 0) {
      this.socket.send(JSON.stringify({
        type: MESSAGETYPES.LOADMORE,
      }))
      return 
    }
    this.socket.send(JSON.stringify({
      since: this.messages[0].time,
      type: MESSAGETYPES.LOADMORE,
    }))
  }

  sendMessage(msg: string) {
    this.socket.send(JSON.stringify({
      text: msg,
      type: MESSAGETYPES.MESSAGE,
    }))
  }

}

export default ChatModel
