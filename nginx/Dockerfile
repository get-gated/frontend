FROM nginx:1.23.1-alpine
WORKDIR /app

COPY ./nginx.conf /etc/nginx/nginx.temp
ENV NGINX_GATEWAY=host.docker.internal
RUN envsubst '$NGINX_GATEWAY' < /etc/nginx/nginx.temp > /etc/nginx/nginx.conf
