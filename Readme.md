# React TypeScript Template

> including golang http server for pretty quick and simple deployments

## Base-Libraries

* react
* react-router
* mobx (with mobx-react-lite)
* styled-components

## for quality

* tslint
* jest

## for comfort

* react-hot-loader

# go-frontend-webserver 

we use a small [golang](https://golang.org/) webserver to serve the frontend. The HTML Template (and later the react bundle) is bundled into the binary using [packr2](https://github.com/gobuffalo/packr/tree/master/v2)

With this setup it is possible to run a standalone docker image with very low hardware requirements!

## starting

when building the server (with a simple `go build`), you will find a go-ts-react-mobx-binary. 
start it along with the webpack server (in 2 diffrent terminals... obviously)

```
cd frontend
npm start
```

```
./go-ts-react-mobx -dev
```

and you can see everything on http://localhost:3000/

## pseudo pipeline

the `npm run build` command, will create the react bundle and place it in the `dist` folder. 

when running `packr2 build`, everything is bundled into the binary, so you have a simple single self-contained binary to ship.

``` yaml
frontend:
  image: node
  script: 
    - cd frontend
    - npm install
    - npm test
    - npm run build
build:
  image: drailing/go_packr_zip # image with go and packr2 pre-installed
  script:
    - go get # no 'go mod' for now
    - go test
    - packr2 build -o your-binary-name
```

after these steps, you can simply deploy your single-binary or dockerize it on a small alpine image.

## CLI

```
GLOBAL OPTIONS:
  --dev, -d                                                indicates if you want to serve from webpack-dev-server or dist bundle
  --webpackDevServer value, --devServer value, --ds value  server and port your webpack serveris running on (default: "http://127.0.0.1:8080/")
  --port PORT, -p PORT                                     PORT to start the server on (default: "3000") [$HTTP_PORT]
  --help, -h                                               show help
  --version, -v                                            print the version
```