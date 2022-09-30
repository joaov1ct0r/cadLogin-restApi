#!/bin/bash

npm pkg set type='module';

npx sequelize-cli db:create;

npx sequelize-cli db:migrate;

npm run start
