package chat

import (
	"context"
	"time"

	"github.com/gorilla/websocket"

	"github.com/cdreier/chatroom/storage"
)

const (
	msgTypeUserStatus    = "USERSTATUS"
	msgTypeMessage       = "MESSAGE"
	msgTypeSystemMessage = "MESSAGE"
	msgTypeLoadMore      = "MORE"
)

type Chat struct {
	db             ChatPersistence
	notifications  NotificationSender
	users          map[string]*chatUser
	WelcomeMessage string
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
	GetMessagesSince(ctx context.Context, since time.Time, count int) ([]storage.Message, error)
	GetUser(ctx context.Context, userID string) (storage.User, error)
	GetAllUsers(ctx context.Context) ([]storage.User, error)
	VerifyUserID(ctx context.Context, userID string) bool
	StoreMessage(ctx context.Context, msg *storage.Message) error
}

type NotificationSender interface {
	SendNotification(user storage.User, message string) error
}

func NewChatroom(db ChatPersistence, sender NotificationSender) *Chat {
	c := new(Chat)
	c.db = db
	c.notifications = sender
	c.users = make(map[string]*chatUser)
	return c
}
