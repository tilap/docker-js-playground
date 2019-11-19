# base
FROM mhart/alpine-node:12.13.1 AS base

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

# dependancies
FROM base AS dependancies

RUN yarn install --no-cache --frozen-lockfile --production;

# build
FROM dependancies AS build

COPY . .

RUN yarn run build

EXPOSE 3000

CMD ["node", "build/index.js"]
