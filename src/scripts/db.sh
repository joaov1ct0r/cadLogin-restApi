#!/bin/bash

npx sequelize-cli db:create --env "production";

npx sequelize-cli db:migrate --env "production";
