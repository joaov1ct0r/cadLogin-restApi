#!/bin/bash

npm pkg set type='commonjs';

npx prisma migrate dev;

npm run start;
