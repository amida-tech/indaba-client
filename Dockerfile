FROM node:6.14.3-alpine as builder
ENV NODE_ENV "development"
WORKDIR /app
COPY ./ /app
RUN yarn
RUN yarn build

FROM nginx:stable
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/public/favicon.ico /usr/share/nginx/html/favicon.ico
COPY --from=builder /app/settings.js /usr/share/nginx/html/settings.js
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
