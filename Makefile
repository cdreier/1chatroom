LINKERFLAGS = -X main.Version=`git describe --tags --always --long --dirty` -X main.BuildTimestamp=`date -u '+%Y-%m-%d_%I:%M:%S_UTC'`

VERSION := $(if $(DRONE_TAG),$(DRONE_TAG),master)
BINARY_NAME := $(if $(DRONE_REPO_NAME),$(DRONE_REPO_NAME),main)

build-local-docker:
	APP_NAME=main-local-linux-amd64 docker build --rm -t chatroom .

build-all:
	make build-linux
	make build-alpine
	make build-mac
	make build-win

zip-all:
	mkdir -p release
	zip release/$(BINARY_NAME)-$(VERSION)-linux-amd64.zip $(BINARY_NAME)-$(VERSION)-linux-amd64
	zip release/$(BINARY_NAME)-$(VERSION)-darwin-amd64.zip $(BINARY_NAME)-$(VERSION)-darwin-amd64
	zip release/$(BINARY_NAME)-$(VERSION)-win-amd64.zip $(BINARY_NAME)-$(VERSION)-win-amd64.exe
	zip release/$(BINARY_NAME)-$(VERSION)-alpine.zip $(BINARY_NAME)-$(VERSION)-alpine

build-linux:
	GOOS=linux GOARCH=amd64 pkger
	GOOS=linux GOARCH=amd64 go build -o $(BINARY_NAME)-$(VERSION)-linux-amd64 -ldflags "$(LINKERFLAGS)"
	rm pkged.go

build-mac:
	GOOS=darwin GOARCH=amd64 pkger
	GOOS=darwin GOARCH=amd64 go build -o $(BINARY_NAME)-$(VERSION)-darwin-amd64 -ldflags "$(LINKERFLAGS)"
	rm pkged.go

build-win:
	GOOS=windows GOARCH=amd64 pkger
	GOOS=windows GOARCH=amd64 go build -o $(BINARY_NAME)-$(VERSION)-win-amd64.exe -ldflags "$(LINKERFLAGS)"
	rm pkged.go

build-alpine:
	GOOS=linux GOARCH=amd64 pkger
	GOOS=linux GOARCH=amd64 CGO_ENABLED=1 go build -a -o $(BINARY_NAME)-$(VERSION)-alpine -ldflags "$(LINKERFLAGS)"
	rm pkged.go

start:
	go run . -dev

test:
	go test ./... -cover -coverprofile=coverage.txt

coverage:
	make test
	go tool cover -html=coverage.txt