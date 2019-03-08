FROM node:11.10.1-alpine

WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY . .
CMD ["yarn", "run", "start"];