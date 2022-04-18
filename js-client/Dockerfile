FROM node:17.9.0-alpine3.15

WORKDIR /app

COPY package.json ./

RUN yarn install

CMD [ "yarn", "run", "dev" ]
