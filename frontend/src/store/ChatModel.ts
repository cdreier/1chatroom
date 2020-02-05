import { observable } from 'mobx'

class MessageModel {
  author: string = ''
  text: string = ''
  time: Date = new Date()

}

class ChatModel {

  @observable self: string = ''
  @observable messages: MessageModel[] = []

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
