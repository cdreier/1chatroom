# eins chatroom

this is the most basic version of a self-hosted persistent chatroom.

all packaged in one binary, including webserver, websockets and react frontend.

just choose an admin password (with a flag or environment variable), create accounts, send links and start chatting

![demo](https://github.com/cdreier/1chatroom/blob/master/demo.png)

## features

* frontend included
  * perhaps you can guess it, i'm more the tech guy
    * but i did my best
  * if you want to contribute a better design, please do so ;) 
  * just open an issue with a layout
  * thank you... i really need help with that kind of beautiful stuff
* boltdb persistence with https://github.com/timshannon/bolthold
* web push notifications
* small footprint
  * in terms of size (biggest binary is ~16MB)
  * memory (like 4 MB)
  * or cpu usage
* admin interface to create "accounts"

## run it

i am not sure what approach is more simple

* download a prebuild binary from the [release page](https://github.com/cdreier/1chatroom/releases) and start it
* or docker pull the image and run it

at least with a prebuild binaray you need to know what OS you are running. let's start with that 

[choose one](https://github.com/cdreier/1chatroom/releases), start it. 

A data folder beside the binary will be created with the database.

Assuming you test it on localhost, go to http://localhost:3000/admin, type "asdf" - this is the default admin password - and you will see the admin page.

on the admin page you can create your accounts. Just type in the names, and a link is generated for that user.

there are also a few start options:

```
--port value              port to start the server on (default: "3000") [$HTTP_PORT]
--adminToken value        the admin token to log in to the admin panel (default: "asdf") [$ADMIN_TOKEN]
--adminEnabled            if set to false, the admin panel is disabled (default: true) [$ADMIN_ENABLED]
--welcomeMessage value    the welcome message every user sees when joining [$WELCOME_MESSAGE]
```

### docker

```bash
docker pull drailing/1chatroom:latest
docker run -v ./data:/app/data drailing/1chatroom:latest
```

i also started it on a docker swarm host with traefik reverse proxy:

please note: this are traefik 1 labels

```yaml
version: '3.2'

services:
  chatroom:
    image: drailing/1chatroom:latest
    networks: 
      - traefik-overlay
    deploy:
      labels:
        - traefik.port=3000
        - traefik.frontend.rule=Host:your.domain.com
        - traefik.enable=true
        - traefik.docker.network=traefik-overlay
    volumes:
      - chatroomvolume:/app/data
    environment:
      - ADMIN_ENABLED=true
      - ADMIN_TOKEN=secret-admin-token

networks:
  traefik-overlay:
    external: true

volumes:
  chatroomvolume:
    external: true
```
