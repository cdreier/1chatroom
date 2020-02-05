package chat

import (
	"context"

	"github.com/cdreier/chatroom/storage"
)

type Chat struct {
	db ChatPersistence
}

type ChatPersistence interface {
	GetMessages(ctx context.Context, count int) ([]storage.Message, error)
	VerifyUserID(ctx context.Context, userID string) bool
}

func NewChatroom(db ChatPersistence) *Chat {
	c := new(Chat)
	c.db = db
	return c
}
