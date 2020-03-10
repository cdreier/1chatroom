package server

import (
	"log"

	"github.com/cdreier/chatroom/admin"
	"github.com/cdreier/chatroom/chat"
	"github.com/cdreier/chatroom/push"
	"github.com/cdreier/chatroom/storage"

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

	db := storage.NewDB()
	defer db.Close()

	s := server{
		dev:              c.Bool("dev"),
		webpackDevServer: c.String("webpackDevServer"),
	}

	adm := admin.NewAdmin(admin.AdminConfig{
		Enabled: c.Bool("adminEnabled"),
		Token:   c.String("adminToken"),
	}, db)

	psh := push.NewPush(db)

	chat := chat.NewChatroom(db)
	chat.WelcomeMessage = c.String("welcomeMessage")

	r := chi.NewRouter()

	distDir := pkger.Dir("/frontend/dist")
	snippets.ChiFileServer(r, "/dist", distDir)

	r.Route("/api", func(apiRouter chi.Router) {

		apiRouter.With(chat.UserAuthMiddleware).HandleFunc("/ws", chat.RealtimeHandler)

		apiRouter.Route("/admin", func(adminRouter chi.Router) {
			adminRouter.Use(adm.CreateAdminTokenMiddleware())
			adminRouter.Get("/users", adm.ListUser)
			adminRouter.Post("/users", adm.AddUser)
			adminRouter.Delete("/users/{id}", adm.RmUser)
		})
	})

	r.Get("/service-worker", psh.ServiceWorker)
	r.Route("/push", func(pushRouter chi.Router) {
		pushRouter.Get("/publickey", psh.VapidPublicKey)
		pushRouter.Get("/register", psh.Register)
	})

	r.Get("/*", s.webappHandler)

	port := c.String("port")
	log.Println("starting server on port ", port)
	server := snippets.CreateHTTPServer(":"+port, r)
	return server.ListenAndServe()
}
