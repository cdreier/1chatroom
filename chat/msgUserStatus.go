package chat

import (
	"context"
)

type userStatusMessage struct {
	socketMessage
	Users []userStatusUserMessage `json:"users,omitempty"`
	Self  string                  `json:"self,omitempty"`
}

type userStatusUserMessage struct {
	Name   string `json:"name"`
	Online bool   `json:"online"`
}

func (c *Chat) broadcastUserStatus(ctx context.Context) {
	users, _ := c.db.GetAllUsers(ctx)

	msg := userStatusMessage{}
	msg.Users = make([]userStatusUserMessage, 0)
	msg.Type = msgTypeUserStatus

	ownUserID := getUserIDFrom(ctx)

	for _, u := range users {
		_, isOnline := c.users[u.ID]
		msg.Users = append(msg.Users, userStatusUserMessage{
			Name:   u.Name,
			Online: isOnline,
		})
		if u.ID == ownUserID {
			msg.Self = u.Name
		}
	}

	for _, u := range c.users {
		u.conn.WriteJSON(msg)
	}

}
