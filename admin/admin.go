package admin

import (
	"context"
	"net/http"
)

type Admin struct {
	config AdminConfig
	db     AdminPersistence
}

func NewAdmin(c AdminConfig, db AdminPersistence) *Admin {
	a := new(Admin)
	a.config = c
	a.db = db
	return a
}

type AdminConfig struct {
	Token   string
	Enabled bool
}

type User struct{}

type AdminPersistence interface {
	GetAllUsers(ctx context.Context) ([]User, error)
	StoreUser(ctx context.Context, u User) error
	DeleteUser(ctx context.Context, userID string) error
}

func (a *Admin) CreateAdminTokenMiddleware() func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if !a.config.Enabled {
				http.Error(w, "no admin panel today", http.StatusForbidden)
				return
			}
			auth := r.Header.Get("Authorization")
			if auth != a.config.Token {
				http.Error(w, "unable to verify admin token!", http.StatusUnauthorized)
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}
