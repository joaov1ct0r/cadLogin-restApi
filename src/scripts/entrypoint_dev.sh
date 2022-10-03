#!/bin/sh

npm pkg set type='commonjs';

npx sequelize-cli db:create;

npx sequelize-cli db:migrate;

npm pkg set type='module';

npm run dev;
