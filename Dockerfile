FROM node:16-alpine as development

WORKDIR /usr/src/app

COPY [ "package*.json", ".sequelizerc", "./" ]

RUN npm install

COPY . .

RUN npm install sequelize-cli -g

RUN ./src/scripts/db.sh

RUN npm run build

FROM node:16-alpine as production

ARG DB_DIALECT=postgres

ARG NODE_ENV=production

ENV DB_DIALECT=postgres

ENV NODE_ENV=production

WORKDIR /usr/src/app

ADD ./src/scripts /usr/src/app/scripts

COPY [ "package*.json", "./" ]

RUN npm install --omit=dev
