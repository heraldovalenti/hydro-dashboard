#!/bin/bash

IMAGE_NAME=aes-web
DOCKER_BUILDER=node:16-alpine
DOCKER_TAG=us-central1-docker.pkg.dev/hydro-dashboard-283320/aes-docker-repo/$IMAGE_NAME
SKIP_APP_BUILD=0

VERSION=$1
if [[ -z $VERSION ]]
then
  echo "Missing Version argument"
  exit 1
fi

VERSION_EXISTS=$(git tag --list | grep $VERSION | wc -l)
if [[ $VERSION_EXISTS -gt 0 ]]
then
  echo "Version $VERSION already exists"
  exit 1
fi

for ARG in $@
do
  if [[ $ARG == "--skipAppBuild" ]]; then SKIP_APP_BUILD=1; fi
done

if [[ $SKIP_APP_BUILD == 0 ]]; then
  echo "executing app build..."
  docker run --rm \
      -w /aes \
      -v $HOME/.npm:/root/.npm \
      -v $HOME/.yarn:/root/.yarn \
      -v $PWD:/aes \
      $DOCKER_BUILDER yarn

  docker run --rm \
      -w /aes \
      -v $HOME/.npm:/root/.npm \
      -v $HOME/.yarn:/root/.yarn \
      -v $PWD:/aes \
      $DOCKER_BUILDER yarn clean

  docker run --rm \
      -w /aes \
      -v $HOME/.npm:/root/.npm \
      -v $HOME/.yarn:/root/.yarn \
      -v $PWD:/aes \
      $DOCKER_BUILDER yarn build:aes-server
else
  echo "skipping app build..."
fi

docker build -t $IMAGE_NAME:$VERSION .

docker tag $IMAGE_NAME:$VERSION $DOCKER_TAG:$VERSION

docker push $DOCKER_TAG:$VERSION

git tag $VERSION
git push origin $VERSION
