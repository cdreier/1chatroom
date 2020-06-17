package chat

import (
	"context"
	"fmt"
	"time"
)

type broadcastMessage struct {
	socketMessage
	Text   string    `json:"text,omitempty"`
	Author string    `json:"author,omitempty"`
	Date   time.Time `json:"date,omitempty"`
	ID     uint64    `json:"id,omitempty"`
}

type systemMessage struct {
	socketMessage
	ID     int64     `json:"id,omitempty"`
	Text   string    `json:"text,omitempty"`
	Author string    `json:"author,omitempty"`
	Date   time.Time `json:"date,omitempty"`
}

func newSystemMessage(msg string) systemMessage {
	sm := systemMessage{
		ID:     time.Now().Unix(),
		Text:   msg,
		Author: "System",
		Date:   time.Now(),
	}
	sm.Type = msgTypeSystemMessage
	return sm
}

func (c *Chat) broadcastMessage(ctx context.Context, msg broadcastMessage) {

	msg.Type = msgTypeMessage

	for _, u := range c.users {
		u.conn.WriteJSON(msg)
	}

	allUsers, err := c.db.GetAllUsers(ctx)
	if err != nil {
		return
	}

	for _, u := range allUsers {
		if _, online := c.users[u.ID]; online {
			continue
		}
		c.notifications.SendNotification(u, fmt.Sprintf("%s: %s", msg.Author, msg.Text))
	}

}
