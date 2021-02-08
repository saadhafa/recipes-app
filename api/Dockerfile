FROM node:latest


WORKDIR /api

COPY . .

EXPOSE 3333


RUN yarn install -y

CMD ["yarn","start"]