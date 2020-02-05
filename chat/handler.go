package chat

import "net/http"

func (c *Chat) ListMessages(w http.ResponseWriter, r *http.Request) {

}

func (c *Chat) UserAuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		auth := r.Header.Get("Authorization")
		verified := c.db.VerifyUserID(r.Context(), auth)
		if !verified {
			http.Error(w, "nope", http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r)
	})
}
