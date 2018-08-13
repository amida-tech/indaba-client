FROM node:6.14.3-alpine as builder
ENV NODE_ENV "development"
WORKDIR /app
COPY ./ /app
RUN yarn
RUN yarn build

FROM nginx:stable
ENV NODE_ENV "production"
COPY --from=builder /app/dist /usr/share/nginx/html

