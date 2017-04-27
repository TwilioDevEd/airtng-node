# Dockerfile for lead-alerts-node

FROM node:latest

RUN mkdir -p /usr/src
COPY . /usr/src
WORKDIR /usr/src

RUN npm install

RUN npm test

EXPOSE 3000

CMD [ "npm", "start" ]
