#/bin/bash
docker run --rm \
    -w /aes \
    -v $HOME/.npm:/root/.npm \
    -v $HOME/.yarn:/root/.yarn \
    -v $PWD:/aes \
    node:14-alpine yarn

docker run --rm \
    -w /aes \
    -v $HOME/.npm:/root/.npm \
    -v $HOME/.yarn:/root/.yarn \
    -v $PWD:/aes \
    node:14-alpine yarn build:local

docker build -t aes-web .
