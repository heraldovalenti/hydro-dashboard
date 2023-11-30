#!/bin/bash

DOCKER_BUILDER=node:16-alpine
DOCKER_TAG=us-central1-docker.pkg.dev/hydro-dashboard-283320/aes-docker-repo/aes-web
DOCKER_PLATFORM=linux/x86_64

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

docker run --rm \
    --platform $DOCKER_PLATFORM \
    -w /aes \
    -v $HOME/.npm:/root/.npm \
    -v $HOME/.yarn:/root/.yarn \
    -v $PWD:/aes \
    $DOCKER_BUILDER yarn

docker run --rm \
    --platform $DOCKER_PLATFORM \
    -w /aes \
    -v $HOME/.npm:/root/.npm \
    -v $HOME/.yarn:/root/.yarn \
    -v $PWD:/aes \
    $DOCKER_BUILDER yarn clean

docker run --rm \
    --platform $DOCKER_PLATFORM \
    -w /aes \
    -v $HOME/.npm:/root/.npm \
    -v $HOME/.yarn:/root/.yarn \
    -v $PWD:/aes \
    $DOCKER_BUILDER yarn build:aes-server

docker build -t aes-web:$VERSION --platform $DOCKER_PLATFORM .

docker tag aes-web:$VERSION $DOCKER_TAG:$VERSION

docker push $DOCKER_TAG:$VERSION

git tag $VERSION
git push origin $VERSION
