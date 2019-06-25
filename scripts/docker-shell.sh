#!/bin/sh

NAME=`node -e "console.log(require('./package.json').name)"`

# enter container shell
docker exec -ti $NAME /bin/sh