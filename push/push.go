package push

import (
	"context"
	"encoding/json"
	"io/ioutil"
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
	SaveRegistration(ctx context.Context, userID string, subscription string) error
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

func (p *Push) SendNotification(subscription string, message string) error {

	s := &webpush.Subscription{}
	json.Unmarshal([]byte(subscription), s)

	// TODO
	resp, err := webpush.SendNotification([]byte(message), s, &webpush.Options{
		Subscriber:      "1Chatroom",
		VAPIDPublicKey:  p.publicKey,
		VAPIDPrivateKey: p.privateKey,
		TTL:             30,
	})

	defer resp.Body.Close()

	responseBody, _ := ioutil.ReadAll(resp.Body)
	log.Println(string(responseBody))

	return err
}
