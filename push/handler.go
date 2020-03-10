package push

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/markbates/pkger"
)

func (p *Push) VapidPublicKey(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte(p.publicKey))
}

func (p *Push) ServiceWorker(w http.ResponseWriter, r *http.Request) {
	f, err := pkger.Open("/www/service-worker.js")
	if err != nil {
		http.Error(w, fmt.Sprint("unable to find service worker file:", err.Error()), http.StatusNotFound)
		return
	}
	serviceWorkerFile, err := ioutil.ReadAll(f)
	if err != nil {
		http.Error(w, fmt.Sprint("unable to read service worker file: ", err.Error()), http.StatusInternalServerError)
		return
	}
	w.Header().Add("Content-Type", "application/javascript")
	w.Write(serviceWorkerFile)
}

func (p *Push) Register(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	all, _ := ioutil.ReadAll(r.Body)
	log.Println(string(all))
}
