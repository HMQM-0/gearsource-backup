FROM nginx:stable-alpine
WORKDIR /app
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY /dist/ /app/