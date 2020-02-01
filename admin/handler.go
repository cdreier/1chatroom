package admin

import (
	"log"
	"net/http"

	"github.com/go-chi/chi"
)

func (a *Admin) ListUser(w http.ResponseWriter, r *http.Request) {

}

func (a *Admin) AddUser(w http.ResponseWriter, r *http.Request) {

}

func (a *Admin) RmUser(w http.ResponseWriter, r *http.Request) {
	userID := chi.URLParam(r, "id")
	log.Println(userID)
}
