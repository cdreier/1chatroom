package push

import (
	"context"
	"log"

	"github.com/SherClockHolmes/webpush-go"
	"github.com/cdreier/chatroom/storage"
)

type Push struct {
	privateKey string
	publicKey  string
	db         PushPersistence
}

type PushPersistence interface {
	GetKeypair(context.Context) (storage.Vapid, error)
	StoreKeypair(context.Context, *storage.Vapid) error
}

func NewPush(db PushPersistence) *Push {
	p := new(Push)
	p.db = db
	p.loadKeys()
	return p
}

func (p *Push) loadKeys() {
	pair, err := p.db.GetKeypair(context.Background())
	if err != nil {
		log.Println("did not found a valid vapid keypiar, generating new...")
		pair = storage.Vapid{}
		privateKey, publicKey, err := webpush.GenerateVAPIDKeys()
		if err != nil {
			log.Fatal("unable to initiate the push service due error: ", err.Error())
		}
		pair.PrivateKey = privateKey
		pair.PublicKey = publicKey
		p.db.StoreKeypair(context.Background(), &pair)
	}
	p.privateKey = pair.PrivateKey
	p.publicKey = pair.PublicKey
}
