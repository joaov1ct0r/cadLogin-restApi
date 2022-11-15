#!/bin/sh

npm pkg set type='module';

npx prisma migrate dev;

npm run dev;
