#!/bin/bash

DOCKER_BASE_IMAGE=nginx:1.25.1-alpine
DOCKER_TAG=us-central1-docker.pkg.dev/hydro-dashboard-283320/aes-docker-repo/nginx

VERSION=$1
if [[ -z $VERSION ]]
then
  echo "Missing Version argument (format YYYYMMDD)"
  exit 1
fi

docker pull nginx:1.25.1-alpine
docker tag nginx:1.25.1-alpine $DOCKER_TAG:$VERSION
docker push $DOCKER_TAG:$VERSION
