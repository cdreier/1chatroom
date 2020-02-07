package admin

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/cdreier/chatroom/storage"

	"github.com/google/uuid"

	"github.com/go-chi/chi"
)

func (a *Admin) ListUser(w http.ResponseWriter, r *http.Request) {

	users, err := a.db.GetAllUsers(r.Context())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	log.Println("list users", len(users))

	json.NewEncoder(w).Encode(users)

}

func (a *Admin) AddUser(w http.ResponseWriter, r *http.Request) {
	b := struct {
		Name string `json:"name,omitempty"`
	}{}

	json.NewDecoder(r.Body).Decode(&b)
	log.Println("adding", b)
	id, err := uuid.NewUUID()
	if err != nil {
		log.Println("unable to add user", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	u := storage.User{
		Name: b.Name,
		ID:   id.String(),
	}
	a.db.StoreUser(r.Context(), u)
	json.NewEncoder(w).Encode(u)

}

func (a *Admin) RmUser(w http.ResponseWriter, r *http.Request) {
	userID := chi.URLParam(r, "id")
	log.Println(userID)
}
