package admin

import "context"

type Admin struct{}

type User struct{}

type AdminPersistence interface {
	GetAllUsers(ctx context.Context) ([]User, error)
	StoreUser(ctx context.Context, u User) error
	DeleteUser(ctx context.Context, userID string) error
}
