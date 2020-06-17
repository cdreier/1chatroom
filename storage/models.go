package storage

import (
	"time"
)

type User struct {
	ID           string    `json:"id,omitempty"`
	Name         string    `json:"name,omitempty"`
	CreatedAt    time.Time `json:"created_at,omitempty"`
	Subscription []string  `json:"-"`
}

type Message struct {
	ID        uint64 `boltholdKey:"ID"`
	CreatedAt time.Time
	Author    string
	Text      string
}

type Vapid struct {
	PrivateKey string
	PublicKey  string
}
