package chat

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/cdreier/chatroom/storage"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

type incommingMessage struct {
	Text string
	Type string
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
	c.users[userID] = &chatUser{
		User: user,
		conn: connection,
	}

	// send to new user the least few messages
	history, _ := c.db.GetMessages(r.Context(), 15)
	for _, m := range history {
		bm := broadcastMessage{
			Author: m.Author,
			Text:   m.Text,
			Date:   m.CreatedAt,
		}
		bm.Type = msgTypeMessage
		connection.WriteJSON(bm)
	}

	// broadcast to all, current user state
	c.broadcastUserStatus(r.Context())

	for {
		_, message, err := connection.ReadMessage()
		if err != nil {
			// log.Println("err: ", userID, message, mt, err)
			if websocket.IsCloseError(err, websocket.CloseGoingAway) {
				log.Println("DC", userID)
				delete(c.users, userID)
				// broadcast to all, user left
				c.broadcastUserStatus(r.Context())
			}
			break
		}

		msg := incommingMessage{}
		err = json.Unmarshal(message, &msg)
		if err != nil {
			log.Println("error while parsing incomming message", err)
			continue
		}

		switch msg.Type {
		case msgTypeMessage:
			c.broadcastMessage(r.Context(), broadcastMessage{
				Author: user.Name,
				Text:   msg.Text,
				Date:   time.Now(),
			})

			c.db.StoreMessage(r.Context(), storage.Message{
				Author: user.Name,
				Text:   msg.Text,
			})
			break
		case msgTypeLoadMore:
			log.Println("LOADMORE")
		}

	}
}
