# FROM --platform=linux/x86_64 us-central1-docker.pkg.dev/hydro-dashboard-283320/aes-docker-repo/nginx:20230804
FROM --platform=linux/x86_64 nginx:1.25.1-alpine

ADD conf/nginx.conf    /etc/nginx/nginx.conf
ADD conf/default.conf  /etc/nginx/conf.d/default.conf
ADD conf/cert.pem      /etc/nginx/conf.d/cert.pem
ADD conf/key.pem       /etc/nginx/conf.d/key.pem

COPY build/ /usr/share/nginx/html/
