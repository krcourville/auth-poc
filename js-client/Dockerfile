FROM node:17.9.0-alpine3.15

WORKDIR /app

COPY package.json ./

# WORKAROUND:
# npm and vite do not currently play well in Docker environment
# https://github.com/vitejs/vite/issues/6767
RUN yarn install

CMD [ "yarn", "run", "dev" ]
