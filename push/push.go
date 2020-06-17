package push

import (
	"context"
	"encoding/json"
	"fmt"
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

func (p *Push) SendNotification(user storage.User, message string) error {

	if len(user.Subscription) == 0 {
		return fmt.Errorf("unable to send notification: user has no subscription")
	}

	for _, sub := range user.Subscription {

		s := &webpush.Subscription{}
		json.Unmarshal([]byte(sub), s)

		resp, err := webpush.SendNotification([]byte(message), s, &webpush.Options{
			Subscriber:      "1Chatroom",
			VAPIDPublicKey:  p.publicKey,
			VAPIDPrivateKey: p.privateKey,
			TTL:             30,
		})
		if err != nil {
			log.Println("unable to send notification", err.Error())
			continue
		}

		defer resp.Body.Close()
		// responseBody, _ := ioutil.ReadAll(resp.Body)
		// log.Println(string(responseBody))
	}

	return nil
}
