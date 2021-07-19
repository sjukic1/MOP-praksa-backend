FROM node:16.5.0-slim

USER root

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "start" ]