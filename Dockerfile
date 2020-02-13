FROM alpine

# RUN apk update
# RUN apk add ca-certificates

# build go server with packr2
# packr build -o server-binary

RUN mkdir /app
ADD main /app
WORKDIR /app

EXPOSE 3000

CMD [ "./main" ]