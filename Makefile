LINKERFLAGS = -X main.Version=`git describe --tags --always --long --dirty` -X main.BuildTimestamp=`date -u '+%Y-%m-%d_%I:%M:%S_UTC'`

VERSION := $(if $(DRONE_TAG),$(DRONE_TAG),local)
BINARY_NAME := $(if $(DRONE_REPO_NAME),$(DRONE_REPO_NAME),main)

build-local-docker:
	APP_NAME=main-local-linux-amd64 docker build --rm -t chatroom .

build-all:
	make build-frontend
	pkger
	make build-linux
	make build-alpine
	make build-mac
	make build-win
	rm pkged.go

zip-all:
	mkdir -p release
	zip release/$(BINARY_NAME)-$(VERSION)-linux-amd64.zip $(BINARY_NAME)-$(VERSION)-linux-amd64
	zip release/$(BINARY_NAME)-$(VERSION)-alpine.zip $(BINARY_NAME)-$(VERSION)-alpine
	zip release/$(BINARY_NAME)-$(VERSION)-darwin-amd64.zip $(BINARY_NAME)-$(VERSION)-darwin-amd64
	zip release/$(BINARY_NAME)-$(VERSION)-win-amd64.zip $(BINARY_NAME)-$(VERSION)-win-amd64.exe

.ONESHELL:
build-frontend:
	cd frontend
	npm run build

build-linux:
	GOOS=linux GOARCH=amd64 go build -o $(BINARY_NAME)-$(VERSION)-linux-amd64 -ldflags "$(LINKERFLAGS)"

build-mac:
	GOOS=darwin GOARCH=amd64 go build -o $(BINARY_NAME)-$(VERSION)-darwin-amd64 -ldflags "$(LINKERFLAGS)"

build-win:
	GOOS=windows GOARCH=amd64 go build -o $(BINARY_NAME)-$(VERSION)-win-amd64.exe -ldflags "$(LINKERFLAGS)"

build-alpine:
	GOOS=linux GOARCH=amd64 CGO_ENABLED=1 go build -a -o $(BINARY_NAME)-$(VERSION)-alpine -ldflags "$(LINKERFLAGS)"

start:
	go run . -dev

test:
	go test ./... -cover -coverprofile=coverage.txt

coverage:
	make test
	go tool cover -html=coverage.txt