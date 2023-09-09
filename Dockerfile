FROM node:18.17.1-alpine3.17

RUN apk add --no-cache bash

USER node

WORKDIR /home/node/app
