FROM node:6.11

#make a directory indaba
copy ./ /indaba

WORKDIR /indaba
# install dependencies
RUN yarn
# build
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
