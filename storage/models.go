package storage

import (
	"time"

	"github.com/jinzhu/gorm"
)

type User struct {
	ID           string     `gorm:"primary_key" json:"id,omitempty"`
	Name         string     `json:"name,omitempty"`
	CreatedAt    time.Time  `json:"created_at,omitempty"`
	UpdatedAt    time.Time  `json:"updated_at,omitempty"`
	DeletedAt    *time.Time `sql:"index" json:"deleted_at,omitempty"`
	Subscription string     `json:"-"`
}

type Message struct {
	gorm.Model
	Author string
	Text   string
}

type Vapid struct {
	gorm.Model
	PrivateKey string
	PublicKey  string
}
