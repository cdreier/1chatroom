package server

import (
	"html/template"
	"net/http"

	"github.com/gobuffalo/packr/v2"
)

func (s server) index(w http.ResponseWriter, r *http.Request) {
	b := packr.New("www", "./www")
	tmplString, _ := b.FindString("index.html")
	t, _ := template.New("index").Parse(tmplString)

	data := map[string]string{
		"server": "/",
	}

	if s.dev {
		data["server"] = s.webpackDevServer
	}

	t.Execute(w, data)
}
