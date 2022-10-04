# Stage 1 Development
FROM node:14-alpine as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install sequelize-cli --save-dev

RUN npm install -g npm@8.19.2

# Stage 2 Production
FROM node:16-alpine as production

WORKDIR /usr/src/app

RUN npm install -g npm@8.19.2

RUN npm config set fetch-retry-mintimeout 20000

RUN npm config set fetch-retry-maxtimeout 120000

COPY --from=development /usr/src/app/src/scripts ./src/scripts

COPY --from=development /usr/src/app/.sequelizerc ./

COPY --from=development /usr/src/app/package*.json ./

COPY --from=development /usr/src/app/build ./build

RUN npm install --only=production
