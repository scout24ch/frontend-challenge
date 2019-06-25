#!/bin/bash

## read name
NAME=`node -e "console.log(require('./package.json').name)"`

## clean start
docker rm --force --volumes $NAME 2>/dev/null || true

## run app inside docker
docker run \
  -p 8080:8080 \
  -p 8081:8081 \
  -p 3000:3000 \
  -v $PWD:/app \
  -w /app \
  --name $NAME \
  node:10.16.0-alpine \
  sh -c "npm install && npm run reset && npm start -s"
