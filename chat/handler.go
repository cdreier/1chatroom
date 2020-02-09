package chat

import (
	"context"
	"net/http"
)

type contextKey int

const userContextKey contextKey = iota

func getUserIDFrom(ctx context.Context) string {
	return ctx.Value(userContextKey).(string)
}

func (c *Chat) UserAuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		auth := r.Header.Get("Authorization")
		if auth == "" {
			auth = r.URL.Query().Get("Authorization")
		}
		verified := c.db.VerifyUserID(r.Context(), auth)
		if !verified {
			http.Error(w, "nope", http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), userContextKey, auth)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
