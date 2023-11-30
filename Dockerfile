FROM us-central1-docker.pkg.dev/hydro-dashboard-283320/aes-docker-repo/nginx:20230804
COPY build/ /usr/share/nginx/html/
