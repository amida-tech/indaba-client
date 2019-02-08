FROM node:10.15.0-alpine as builder

WORKDIR /app

COPY ./ /app

RUN yarn
RUN yarn build

FROM nginx:1.15.3

RUN apt-get update && apt-get install gzip

RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/public/favicon.ico /usr/share/nginx/html/favicon.ico
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/docker-entrypoint.sh /etc/nginx/docker-entrypoint.sh
RUN chmod a+x /etc/nginx/docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/etc/nginx/docker-entrypoint.sh"]
