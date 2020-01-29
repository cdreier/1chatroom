package server

import (
	"log"
	"net/http"

	"github.com/cdreier/golang-snippets/snippets"
	"github.com/go-chi/chi"
	"github.com/gobuffalo/packr/v2"
	"github.com/urfave/cli/v2"
)

type server struct {
	dev              bool
	webpackDevServer string
}

func Run(c *cli.Context) error {
	h := server{
		dev:              c.Bool("dev"),
		webpackDevServer: c.String("webpackDevServer"),
	}

	r := chi.NewRouter()
	r.Get("/favicon.ico", http.NotFound)

	distBox := packr.New("dist", "./frontend/dist")
	snippets.ChiFileServer(r, "/dist", distBox)

	r.Get("/*", h.index)

	port := c.String("port")
	log.Println("starting server on port ", port)
	server := snippets.CreateHTTPServer(":"+port, r)
	return server.ListenAndServe()
}
