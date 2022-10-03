#!/bin/bash

npm pkg set type='commonjs';

npx sequelize-cli db:create;

npx sequelize-cli db:migrate;

npm run start
