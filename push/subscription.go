package push

type Registration struct {
	Subscription Subscription `json:"subscription"`
	UserID       string       `json:"userID"`
}

type Subscription struct {
	Endpoint       string      `json:"endpoint"`
	ExpirationTime interface{} `json:"expirationTime"`
	Keys           Keys        `json:"keys"`
}

type Keys struct {
	P256Dh string `json:"p256dh"`
	Auth   string `json:"auth"`
}
