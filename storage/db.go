package storage

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/cdreier/golang-snippets/snippets"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

type DB struct {
	conn *gorm.DB
}

func NewDB() *DB {
	snippets.EnsureDir("./data")
	conn, err := gorm.Open("sqlite3", "./data/chatroom.db")
	if err != nil {
		log.Fatal("failed to connect database", err.Error())
	}

	db := new(DB)
	db.conn = conn
	db.conn.AutoMigrate(&User{})
	db.conn.AutoMigrate(&Message{})
	db.conn.AutoMigrate(&Vapid{})

	return db
}

func (d *DB) Close() {
	defer d.conn.Close()
}

func (d *DB) GetAllUsers(ctx context.Context) ([]User, error) {
	users := make([]User, 0)
	d.conn.Find(&users)
	return users, nil
}

func (d *DB) GetUser(ctx context.Context, userID string) (User, error) {
	u := User{}
	d.conn.Where("ID = ?", userID).First(&u)
	return u, nil
}

func (d *DB) StoreUser(ctx context.Context, u *User) error {
	return d.conn.Create(&u).Error
}

func (d *DB) DeleteUser(ctx context.Context, userID string) error {
	return d.conn.Delete(&User{
		ID: userID,
	}).Error
}

func (d *DB) GetMessages(ctx context.Context, count int) ([]Message, error) {
	var result []Message
	d.conn.Order("CreatedAT DESC").Limit(count).Find(&result, new(Message))
	return result, nil
}

func (d *DB) GetMessagesSince(ctx context.Context, since time.Time, count int) ([]Message, error) {
	var result []Message
	d.conn.Where("created_at < ?", since).Order("created_at DESC").Limit(count).Find(&result)
	return result, nil
}

func (d *DB) VerifyUserID(ctx context.Context, userID string) bool {
	if userID == "" {
		return false
	}
	u := User{}
	d.conn.Where("ID = ?", userID).First(&u)
	return u.ID == userID
}

func (d *DB) StoreMessage(ctx context.Context, msg *Message) error {
	return d.conn.Create(msg).Error
}

func (d *DB) StoreKeypair(ctx context.Context, pair *Vapid) error {
	return d.conn.Create(pair).Error
}

func (d *DB) GetKeypair(ctx context.Context) (Vapid, error) {
	pair := Vapid{}
	query := Vapid{}
	query.ID = 1
	d.conn.First(&pair, query)
	if pair.ID != 1 {
		return pair, fmt.Errorf("no Vapid found")
	}
	return pair, nil
}
