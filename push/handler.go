package push

import "net/http"

func (p *Push) VapidPublicKey(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte(p.publicKey))
}
