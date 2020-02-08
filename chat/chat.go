package chat

import (
	"context"

	"github.com/cdreier/chatroom/storage"
)

type Chat struct {
	db    ChatPersistence
	users map[string]storage.User
}

type ChatPersistence interface {
	GetMessages(ctx context.Context, count int) ([]storage.Message, error)
	GetUser(ctx context.Context, userID string) (storage.User, error)
	VerifyUserID(ctx context.Context, userID string) bool
}

func NewChatroom(db ChatPersistence) *Chat {
	c := new(Chat)
	c.db = db
	c.users = make(map[string]storage.User)
	return c
}
