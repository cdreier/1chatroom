package server

import (
	"log"

	"github.com/cdreier/golang-snippets/snippets"
	"github.com/go-chi/chi"
	"github.com/markbates/pkger"
	"github.com/urfave/cli/v2"
)

type server struct {
	dev              bool
	webpackDevServer string
}

func Run(c *cli.Context) error {
	s := server{
		dev:              c.Bool("dev"),
		webpackDevServer: c.String("webpackDevServer"),
	}

	r := chi.NewRouter()

	distDir := pkger.Dir("/frontend/dist")
	snippets.ChiFileServer(r, "/dist", distDir)

	r.Get("/*", s.webappHandler)

	r.Route("/api", func(apiRouter chi.Router) {
		apiRouter.HandleFunc("/ws", s.realtimeHandler)
	})

	port := c.String("port")
	log.Println("starting server on port ", port)
	server := snippets.CreateHTTPServer(":"+port, r)
	return server.ListenAndServe()
}
