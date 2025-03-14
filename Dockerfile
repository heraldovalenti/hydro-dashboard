FROM us-central1-docker.pkg.dev/hydro-dashboard-283320/aes-docker-repo/nginx-base:20231023

COPY dist/ /usr/share/nginx/html/
