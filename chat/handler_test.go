package chat

import (
	"context"
	"net/http"
	"net/http/httptest"
	"testing"
)

type mockDB struct {
	ChatPersistence
	userExist bool
}

func (m *mockDB) VerifyUserID(ctx context.Context, userID string) bool {
	return userID != "" && m.userExist
}

func TestChat_UserAuthMiddleware(t *testing.T) {
	type fields struct {
		userInDB bool
		r        *http.Request
	}
	tests := []struct {
		name       string
		fields     fields
		wantStatus int
	}{
		{
			name: "check is working, no auth",
			fields: fields{
				userInDB: true,
				r:        httptest.NewRequest("GET", "/", nil),
			},
			wantStatus: http.StatusUnauthorized,
		},
		{
			name: "existing user, auth in query string",
			fields: fields{
				userInDB: true,
				r:        httptest.NewRequest("GET", "/?Authorization=123", nil),
			},
			wantStatus: http.StatusOK,
		},
		{
			name: "existing user, auth in header",
			fields: fields{
				userInDB: true,
				r: func() *http.Request {
					r := httptest.NewRequest("GET", "/", nil)
					r.Header.Add("Authorization", "123")
					return r
				}(),
			},
			wantStatus: http.StatusOK,
		},
		{
			name: "user not in db",
			fields: fields{
				userInDB: false,
				r: func() *http.Request {
					r := httptest.NewRequest("GET", "/", nil)
					r.Header.Add("Authorization", "123")
					return r
				}(),
			},
			wantStatus: http.StatusUnauthorized,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {

			dbMock := new(mockDB)
			dbMock.userExist = tt.fields.userInDB
			c := &Chat{
				db: dbMock,
			}

			rr := httptest.NewRecorder()

			c.UserAuthMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

			})).ServeHTTP(rr, tt.fields.r)

			if got := rr.Code; got != tt.wantStatus {
				t.Errorf("Chat.UserAuthMiddleware() = %v, want %v", got, tt.wantStatus)
			}

		})
	}
}
