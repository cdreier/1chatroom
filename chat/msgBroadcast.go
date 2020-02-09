package chat

import (
	"context"
	"time"
)

type broadcastMessage struct {
	socketMessage
	Text   string    `json:"text,omitempty"`
	Author string    `json:"author,omitempty"`
	Date   time.Time `json:"date,omitempty"`
}

func (c *Chat) broadcastMessage(ctx context.Context, msg broadcastMessage) {

	msg.Type = msgTypeBroadcastMessage

	for _, u := range c.users {
		u.conn.WriteJSON(msg)
	}

}
