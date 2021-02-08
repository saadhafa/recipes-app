FROM node:latest


WORKDIR /front

COPY . .

EXPOSE 3000

RUN yarn install -y

CMD ["yarn","start"]