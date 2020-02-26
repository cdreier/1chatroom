FROM alpine

# installing sqlite
RUN apk update
RUN apk --update upgrade
RUN apk add sqlite
# link all required dependencies
RUN mkdir /lib64 && ln -s /lib/libc.musl-x86_64.so.1 /lib64/ld-linux-x86-64.so.2

# install glibc
RUN wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub
RUN wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.30-r0/glibc-2.30-r0.apk
RUN apk add glibc-2.30-r0.apk

# cleanup cache
RUN rm -rf /var/cache/apk/*

# preparing chatroom app
ARG CHATROOM_BIN_ARG=main-master-alpine
ENV CHATROOM_BIN=$CHATROOM_BIN_ARG
RUN mkdir /app
ADD $CHATROOM_BIN /app
WORKDIR /app

EXPOSE 3000

CMD [ "sh", "-c", "./${CHATROOM_BIN}" ]