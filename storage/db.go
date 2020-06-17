package storage

import (
	"context"
	"log"
	"time"

	"github.com/cdreier/golang-snippets/snippets"
	"github.com/timshannon/bolthold"
)

type DB struct {
	store *bolthold.Store
}

func NewDB() *DB {
	snippets.EnsureDir("./data")
	store, err := bolthold.Open("./data/chatroom.db", 0666, nil)
	if err != nil {
		log.Fatal("failed to connect database", err.Error())
	}

	db := new(DB)
	db.store = store

	return db
}

func (d *DB) Close() {
	defer d.store.Close()
}

func (d *DB) GetAllUsers(ctx context.Context) ([]User, error) {
	users := make([]User, 0)
	err := d.store.Find(&users, nil)
	return users, err
}

func (d *DB) GetUser(ctx context.Context, userID string) (User, error) {
	u := User{}
	err := d.store.Get(userID, &u)
	return u, err
}

func (d *DB) StoreUser(ctx context.Context, u *User) error {
	u.CreatedAt = time.Now()
	return d.store.Insert(u.ID, u)
}

func (d *DB) DeleteUser(ctx context.Context, userID string) error {
	return d.store.Delete(userID, new(User))
}

func (d *DB) GetMessages(ctx context.Context, count int) ([]Message, error) {
	result := make([]Message, 0)
	err := d.store.Find(&result, bolthold.Where("Author").Ne("").SortBy("CreatedAt").Reverse().Limit(count))
	return result, err
}

func (d *DB) GetMessagesSince(ctx context.Context, since time.Time, count int) ([]Message, error) {
	result := make([]Message, 0)
	err := d.store.Find(&result, bolthold.Where("CreatedAt").Lt(since).SortBy("CreatedAt").Reverse().Limit(count))
	return result, err
}

func (d *DB) VerifyUserID(ctx context.Context, userID string) bool {
	if userID == "" {
		return false
	}
	u := User{}
	err := d.store.Get(userID, &u)
	return err == nil && u.ID == userID
}

func (d *DB) StoreMessage(ctx context.Context, msg *Message) error {
	msg.CreatedAt = time.Now()
	return d.store.Insert(bolthold.NextSequence(), msg)
}

func (d *DB) StoreKeypair(ctx context.Context, pair *Vapid) error {
	return d.store.Insert("theOneKeyPair", pair)
}

func (d *DB) GetKeypair(ctx context.Context) (Vapid, error) {
	pair := Vapid{}
	err := d.store.Get("theOneKeyPair", &pair)
	if err != nil {
		return Vapid{}, err
	}
	return pair, nil
}

func (d *DB) SaveRegistration(ctx context.Context, userID string, subscription string) error {
	user, err := d.GetUser(ctx, userID)
	if err != nil {
		return err
	}
	if user.Subscription == nil {
		user.Subscription = make([]string, 0)
	}
	user.Subscription = append(user.Subscription, subscription)
	return d.store.Update(userID, user)
}
