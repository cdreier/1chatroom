package storage

import (
	"time"

	"github.com/jinzhu/gorm"
)

type User struct {
	ID        string     `gorm:"primary_key" json:"id,omitempty"`
	Name      string     `json:"name,omitempty"`
	CreatedAt time.Time  `json:"created_at,omitempty"`
	UpdatedAt time.Time  `json:"updated_at,omitempty"`
	DeletedAt *time.Time `sql:"index" json:"deleted_at,omitempty"`
}

type Message struct {
	gorm.Model
	Author string
	Text   string
}
