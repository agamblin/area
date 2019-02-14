FROM node:alpine

RUN yarn global add pm2

WORKDIR /app

COPY ./package.json ./

RUN yarn install

COPY . .

RUN yarn build

CMD ["pm2-runtime", "build/server.js"]