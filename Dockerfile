# Stage 1 Development
FROM node:14-alpine as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

RUN npm install

COPY . .

RUN npm install -g npm@8.19.2

RUN npm run build

CMD [ "chmod", "+x", "/usr/src/app/src/scripts/entrypoint_dev.sh" ]

# Stage 2 Production
FROM node:16-alpine as production

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/src/scripts ./src/scripts

COPY --from=development /usr/src/app/.sequelizerc ./

COPY --from=development /usr/src/app/package*.json ./

COPY --from=development /usr/src/app/build ./build

RUN npm install --only=production

CMD [ "chmod", "755", "/usr/src/app/src/scripts/entrypoint.sh" ]
