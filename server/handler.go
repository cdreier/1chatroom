package server

import (
	"html/template"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/markbates/pkger"
)

func (s *server) webappHandler(w http.ResponseWriter, r *http.Request) {
	tmpl, err := pkger.Open("/www/index.html")

	if err != nil {
		log.Fatal(err)
	}

	tmplString, _ := ioutil.ReadAll(tmpl)
	t, _ := template.New("index").Parse(string(tmplString))

	data := map[string]string{
		"server": "/",
	}

	if s.dev {
		data["server"] = s.webpackDevServer
	}

	t.Execute(w, data)
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func (s *server) realtimeHandler(w http.ResponseWriter, r *http.Request) {
	connection, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("could not start dev-websocket:", err)
		return
	}
	defer connection.Close()

	for {
		// mt, message, err := connection.ReadMessage()
		_, message, err := connection.ReadMessage()
		if err != nil {
			break
		}
		log.Printf("recv: %s", message)
		// err = connection.WriteMessage(mt, message)
		// if err != nil {
		// 	log.Println("write:", err)
		// 	break
		// }
	}
}
