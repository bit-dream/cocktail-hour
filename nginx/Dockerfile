FROM nginx:1.15.8-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY /dev.conf /etc/nginx/conf.d
COPY /options-ssl-nginx.conf /etc/letsencrypt/options-ssl-nginx.conf