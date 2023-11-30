FROM --platform=linux/x86_64 us-central1-docker.pkg.dev/hydro-dashboard-283320/aes-docker-repo/nginx-base:20231015
# FROM --platform=linux/x86_64 nginx:1.25.1-alpine

COPY build/ /usr/share/nginx/html/
