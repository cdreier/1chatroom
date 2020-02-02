package storage

import (
	"context"

	"github.com/cdreier/chatroom/admin"
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
	return db
}

func (d *DB) Close() {
	defer d.conn.Close()
}

func (d *DB) GetAllUsers(ctx context.Context) ([]admin.User, error) {
	return nil, nil
}

func (d *DB) StoreUser(ctx context.Context, u admin.User) error {
	return nil
}

func (d *DB) DeleteUser(ctx context.Context, userID string) error {
	return nil
}
