FROM node:14-alpine as development

ARG DB_DIALECT=postgres

ARG NODE_ENV=development

ENV DB_DIALECT=postgres

ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY [ "package*.json", "./" ]

RUN npm install --only=production

RUN npm install

COPY [".sequelizerc", ".eslintignore", ".eslintrc.json", "tsconfig.json", "./"]

COPY [ "./src", "./src"]

RUN npm install -g npm@8.19.2

FROM node:16-alpine as production

ARG DB_DIALECT=postgres

ARG NODE_ENV=production

ENV DB_DIALECT=postgres

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY [ "package*.json", ".sequelizerc", "./" ]

RUN npm install --only=production

RUN npm run build
