package chat

import (
	"context"

	"github.com/gorilla/websocket"

	"github.com/cdreier/chatroom/storage"
)

type Chat struct {
	db    ChatPersistence
	users map[string]ChatUser
}

type ChatUser struct {
	storage.User
	conn *websocket.Conn
}

type ChatPersistence interface {
	GetMessages(ctx context.Context, count int) ([]storage.Message, error)
	GetUser(ctx context.Context, userID string) (storage.User, error)
	VerifyUserID(ctx context.Context, userID string) bool
}

func NewChatroom(db ChatPersistence) *Chat {
	c := new(Chat)
	c.db = db
	c.users = make(map[string]ChatUser)
	return c
}
