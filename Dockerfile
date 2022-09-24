FROM node:16-alpine as development

WORKDIR /usr/src/app

COPY ["./package*.json",".sequelizerc", "./"]

RUN npm install

COPY . .

RUN npm run build

FROM node:16-alpine as production

ARG Dialect=postgres

ARG DB_DIALECT=postgres

ARG NODE_ENV=production

ENV Dialect=postgres

ENV DB_DIALECT=postgres

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY [ "package*.json", ".sequelizerc", "./" ]

COPY ["./src/scripts", "./build/scripts"]

RUN npm install --omit=dev
