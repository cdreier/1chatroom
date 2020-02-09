package chat

import (
	"context"

	"github.com/gorilla/websocket"

	"github.com/cdreier/chatroom/storage"
)

const (
	msgTypeUserStatus       = "USERSTATUS"
	msgTypeBroadcastMessage = "MESSAGE"
)

type Chat struct {
	db    ChatPersistence
	users map[string]*chatUser
}

type chatUser struct {
	storage.User
	conn *websocket.Conn
}

type socketMessage struct {
	Type string `json:"type,omitempty"`
}

type ChatPersistence interface {
	GetMessages(ctx context.Context, count int) ([]storage.Message, error)
	GetUser(ctx context.Context, userID string) (storage.User, error)
	GetAllUsers(ctx context.Context) ([]storage.User, error)
	VerifyUserID(ctx context.Context, userID string) bool
}

func NewChatroom(db ChatPersistence) *Chat {
	c := new(Chat)
	c.db = db
	c.users = make(map[string]*chatUser)
	return c
}
