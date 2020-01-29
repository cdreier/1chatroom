package server

import (
	"html/template"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/markbates/pkger"
)

func (s server) index(w http.ResponseWriter, r *http.Request) {
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
