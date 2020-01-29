FROM alpine

# RUN apk update
# RUN apk add ca-certificates

# build go server with packr2
# packr build -o server-binary

RUN mkdir /app
ADD server-binary /app
WORKDIR /app

EXPOSE 8080

CMD [ "./server-binary" ]