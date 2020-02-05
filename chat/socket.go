package chat

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func (c *Chat) RealtimeHandler(w http.ResponseWriter, r *http.Request) {
	connection, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("could not start dev-websocket:", err)
		return
	}
	defer connection.Close()

	for {
		// mt, message, err := connection.ReadMessage()
		_, message, err := connection.ReadMessage()
		if err != nil {
			break
		}
		log.Printf("recv: %s", message)
		// err = connection.WriteMessage(mt, message)
		// if err != nil {
		// 	log.Println("write:", err)
		// 	break
		// }
	}
}
