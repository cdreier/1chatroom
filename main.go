package main

import (
	"log"
	"os"

	"github.com/cdreier/chatroom/server"
	"github.com/urfave/cli/v2"
)

var (
	// Version is the git hash of the running code
	Version = "Unknown Version"
	// BuildTimestamp ... is the BuildTimestamp
	BuildTimestamp = ""
)

func main() {

	app := &cli.App{
		Name:    "golang frontend webserver",
		Version: Version,
		Action:  server.Run,
		Flags: []cli.Flag{
			&cli.BoolFlag{
				Name:  "dev, d",
				Usage: "indicates if you want to serve from webpack-dev-server or dist bundle",
			},
			&cli.StringFlag{
				Name:  "webpackDevServer, devServer, ds",
				Value: "http://127.0.0.1:8080/",
				Usage: "server and port your webpack server is running on",
			},
			&cli.StringFlag{
				Name:    "port, p",
				EnvVars: []string{"HTTP_PORT"},
				Value:   "3000",
				Usage:   "`PORT` to start the server on",
			},
		},
	}

	if err := app.Run(os.Args); err != nil {
		log.Fatal(err)
	}
}
