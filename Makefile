LINKERFLAGS = -X main.Version=`git describe --tags --always --long --dirty` -X main.BuildTimestamp=`date -u '+%Y-%m-%d_%I:%M:%S_UTC'`

build:
	pkger
	go build -o main -ldflags "$(LINKERFLAGS)"
	rm pkged.go

start:
	go run . -dev

test:
	go test ./... -cover -coverprofile=coverage.txt

coverage:
	make test
	go tool cover -html=coverage.txt