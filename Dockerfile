FROM node:6.11

#make a directory indaba
copy ./ /indaba

WORKDIR /indaba
#run yarn
RUN "yarn"

EXPOSE 3000

CMD ["yarn", "start"]
