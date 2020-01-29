package main

import (
	"html/template"
	"log"
	"net/http"
	"os"

	"github.com/urfave/cli"

	"github.com/gobuffalo/packr/v2"

	"github.com/go-chi/chi"
)

type holder struct {
	dev              bool
	webpackDevServer string
}

func run(c *cli.Context) error {
	h := holder{
		dev:              c.Bool("dev"),
		webpackDevServer: c.String("webpackDevServer"),
	}

	r := chi.NewRouter()
	r.Get("/favicon.ico", http.NotFound)

	distBox := packr.New("dist", "./frontend/dist")
	chiFileServer(r, "/dist", distBox)

	r.Get("/*", h.index)

	port := c.String("port")
	log.Println("starting server on port ", port)
	server := createHTTPServer(":"+port, r)
	return server.ListenAndServe()
}

func (h holder) index(w http.ResponseWriter, r *http.Request) {
	b := packr.New("www", "./www")
	tmplString, _ := b.FindString("index.html")
	t, _ := template.New("index").Parse(tmplString)

	data := map[string]string{
		"server": "/",
	}

	if h.dev {
		data["server"] = h.webpackDevServer
	}

	t.Execute(w, data)
}

func main() {

	app := cli.NewApp()
	app.Name = "golang frontend webserver"
	app.Version = "0.0.1"
	app.Action = run
	app.Flags = []cli.Flag{
		cli.BoolFlag{
			Name:  "dev, d",
			Usage: "indicates if you want to serve from webpack-dev-server or dist bundle",
		},
		cli.StringFlag{
			Name:  "webpackDevServer, devServer, ds",
			Value: "http://127.0.0.1:8080/",
			Usage: "server and port your webpack server is running on",
		},
		cli.StringFlag{
			Name:   "port, p",
			EnvVar: "HTTP_PORT",
			Value:  "3000",
			Usage:  "`PORT` to start the server on",
		},
	}

	if err := app.Run(os.Args); err != nil {
		log.Fatal(err)
	}
}
