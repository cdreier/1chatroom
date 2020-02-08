import { observable } from 'mobx'

class MessageModel {
  author: string = ''
  text: string = ''
  time: Date = new Date()

}

class ChatModel {

  @observable id: string = ''
  @observable name: string = ''
  @observable messages: MessageModel[] = []

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
      // const data = JSON.parse(evt.data)
      console.log('RESPONSE: ', evt)
    }
    this.socket.onerror = (evt) => {
      console.log('ERROR: ', evt)
    }
  }

  loadMessages(id: string) {
    fetch('/api/messages', {
      headers: {
        Authorization: id,
      },
    })
      .then(r => r.json())
      .then(data => {
        this.messages = data
      })
  }

}

export default ChatModel
