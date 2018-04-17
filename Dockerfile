FROM nginx:stable

# support running as arbitrary user which belongs to the root group
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
# users are not allowed to listen on privileged ports
EXPOSE 8081

RUN apt-get update

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV "development"
RUN rm -rf dist || true
COPY ./package.json /usr/src/app
COPY ./dist /usr/src/app/dist


RUN rm -rf /usr/share/nginx/html/* || true
RUN chmod -R 777 ./dist/*
RUN cp -r ./dist/* /usr/share/nginx/html/

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf