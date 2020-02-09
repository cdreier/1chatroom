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

	userID := getUserIDFrom(r.Context())
	user, _ := c.db.GetUser(r.Context(), userID)

	connection, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("could not start websocket:", err)
		return
	}
	defer connection.Close()

	log.Println("connected", userID, user.Name)
	c.users[userID] = ChatUser{
		User: user,
		conn: connection,
	}

	for {
		mt, message, err := connection.ReadMessage()
		// _, message, err := connection.ReadMessage()
		if err != nil {
			log.Println("err: ", message, mt, err)
			if websocket.IsCloseError(err, websocket.CloseGoingAway) {
				log.Println("DC")
			}
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
