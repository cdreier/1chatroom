FROM alpine

# preparing chatroom app
ARG CHATROOM_BIN_ARG=main-master-alpine
ENV CHATROOM_BIN=$CHATROOM_BIN_ARG
RUN mkdir /app
ADD $CHATROOM_BIN /app
WORKDIR /app

EXPOSE 3000

CMD [ "sh", "-c", "./${CHATROOM_BIN}" ]