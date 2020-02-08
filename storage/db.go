package storage

import (
	"context"

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
		panic("failed to connect database")
	}

	db := new(DB)
	db.conn = conn
	db.conn.AutoMigrate(&User{})

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

func (d *DB) StoreUser(ctx context.Context, u User) error {
	d.conn.Create(&u)
	return nil
}

func (d *DB) DeleteUser(ctx context.Context, userID string) error {
	d.conn.Delete(&User{
		ID: userID,
	})
	return nil
}

func (d *DB) GetMessages(ctx context.Context, count int) ([]Message, error) {
	return nil, nil
}

func (d *DB) VerifyUserID(ctx context.Context, userID string) bool {
	if userID == "" {
		return false
	}
	u := User{}
	d.conn.Where("ID = ?", userID).First(&u)
	return u.ID == userID
}
